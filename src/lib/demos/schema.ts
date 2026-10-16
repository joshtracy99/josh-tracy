import { z } from "zod";

export const tradeIds = ["plumber", "electrician", "landscaper", "builder", "roofer"] as const;
export type TradeId = (typeof tradeIds)[number];

export const demoStatuses = ["draft", "approved", "live"] as const;
export type DemoStatus = (typeof demoStatuses)[number];

const reservedSlugs = new Set(["areas", "about", "contact"]);

const reviewLike =
  /\b(reviews?|testimonials?|stars?|rated|award|awards|since\s+(?:19|20)\d{2}|\d{1,2}\s+years?)\b|\b\d(?:\.\d)?\s*\/\s*5\b|★/i;

const inventedClaim =
  /\b(reviews?|testimonials?|stars?|rated|award|awards|certified|accredited|gas\s*safe|niceic|napit|checkatrade|since\s+(?:19|20)\d{2}|\d{1,2}\s+years?|years?'?\s+(?:experience|trading|in the trade))\b|\b\d(?:\.\d)?\s*\/\s*5\b|★/i;

export const claimMessage =
  "Take that out. Reviews, star ratings, years trading and qualifications are not written onto the page. A registration number they actually gave you goes in the registration fields, and nowhere else.";

function oneLine(value: string) {
  return value.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim();
}

function prose(value: string) {
  return value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim();
}

const slug = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  .max(48);

export const imageSchema = z.object({
  src: z.string().regex(/^\/demos\/[a-z0-9-]+\/[a-z0-9-]+\.(jpg|png|webp)$/),
  alt: z.string().trim().min(2).max(180),
});

const pointSchema = z.object({
  title: z.string().trim().min(2).max(48),
  body: z.string().trim().min(2).max(220),
});

export const serviceSchema = z.object({
  slug,
  title: z.string().trim().min(2).max(48),
  summary: z.string().trim().min(2).max(220),
  pageTitle: z.string().trim().min(2).max(90),
  intro: z.string().trim().min(2).max(320),
  askLabel: z.string().trim().min(2).max(40),
  points: z.tuple([pointSchema, pointSchema, pointSchema]),
  image: imageSchema.optional(),
});

export const demoSchema = z
  .object({
    slug,
    status: z.enum(demoStatuses),
    businessName: z.string().trim().min(2).max(80),
    shortName: z.string().trim().min(2).max(40),
    trade: z.enum(tradeIds),
    town: z.string().trim().min(2).max(80),
    region: z.string().trim().max(40),
    phone: z.string().trim().min(8).max(20),
    email: z.string().trim().max(80),
    headlineLead: z.string().trim().min(2).max(48),
    headlineEmphasis: z.string().trim().max(24),
    headlineTail: z.string().trim().max(24),
    pitch: z.string().trim().min(2).max(320),
    contactHeadline: z.string().trim().min(2).max(120),
    services: z.array(serviceSchema).min(1).max(3),
    areas: z.array(z.string().trim().min(2).max(40)).min(1).max(12),
    about: z.string().max(600),
    registrationLabel: z.string().trim().max(40),
    registrationNumber: z.string().trim().max(40),
    hero: imageSchema.optional(),
    wide: imageSchema.optional(),
    createdAt: z.string().min(10).max(40),
    updatedAt: z.string().min(10).max(40),
  })
  .superRefine((demo, ctx) => {
    const titles = demo.services.map((service) => service.title.toLowerCase());
    if (new Set(titles).size !== titles.length) {
      ctx.addIssue({ code: "custom", message: "Each service needs its own name.", path: ["services"] });
    }
    if (titles.some((title) => title === "something else")) {
      ctx.addIssue({
        code: "custom",
        message: "Use the name of the work. “Something else” is already on the quote form.",
        path: ["services"],
      });
    }
    if (demo.services.some((service) => reservedSlugs.has(service.slug))) {
      ctx.addIssue({ code: "custom", message: "That service address is reserved.", path: ["services"] });
    }
    const label = demo.registrationLabel;
    const number = demo.registrationNumber;
    if ((label && !number) || (!label && number)) {
      ctx.addIssue({
        code: "custom",
        message: "A registration needs both the name and the number, or neither.",
        path: ["registrationNumber"],
      });
    }
    if (number && !/^[A-Za-z0-9][A-Za-z0-9\s./-]{0,39}$/.test(number)) {
      ctx.addIssue({
        code: "custom",
        message: "The registration number should be the number they gave you, not a sentence.",
        path: ["registrationNumber"],
      });
    }
    if (label && reviewLike.test(label)) {
      ctx.addIssue({ code: "custom", message: claimMessage, path: ["registrationLabel"] });
    }
    if (demo.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(demo.email)) {
      ctx.addIssue({ code: "custom", message: "That email doesn’t look right.", path: ["email"] });
    }
    if (!demo.areas.some((area) => area.toLowerCase() === demo.town.toLowerCase())) {
      ctx.addIssue({ code: "custom", message: "The town they work from stays on the list.", path: ["areas"] });
    }
    const images = [demo.hero, demo.wide, ...demo.services.map((service) => service.image)].filter(
      (image): image is z.infer<typeof imageSchema> => Boolean(image),
    );
    for (const image of images) {
      if (!image.src.startsWith(`/demos/${demo.slug}/`)) {
        ctx.addIssue({ code: "custom", message: "Photographs have to belong to this demonstration." });
      }
      if (inventedClaim.test(image.alt)) {
        ctx.addIssue({ code: "custom", message: claimMessage, path: ["hero"] });
      }
    }
    const pub = publicCopy(demo);
    if (pub.some((line) => inventedClaim.test(line))) {
      ctx.addIssue({ code: "custom", message: claimMessage });
    }
  });

export type Demo = z.infer<typeof demoSchema>;
export type DemoService = Demo["services"][number];
export type DemoImage = z.infer<typeof imageSchema>;

export function publicCopy(demo: {
  headlineLead: string;
  headlineEmphasis: string;
  headlineTail: string;
  pitch: string;
  contactHeadline: string;
  about: string;
  services: { title: string; summary: string; pageTitle: string; intro: string; askLabel: string; points: { title: string; body: string }[] }[];
}) {
  return [
    demo.headlineLead,
    demo.headlineEmphasis,
    demo.headlineTail,
    demo.pitch,
    demo.contactHeadline,
    demo.about,
    ...demo.services.flatMap((service) => [
      service.title,
      service.summary,
      service.pageTitle,
      service.intro,
      service.askLabel,
      ...service.points.flatMap((point) => [point.title, point.body]),
    ]),
  ];
}

export const createSchema = z
  .object({
    businessName: z.string().transform(oneLine).pipe(z.string().min(2).max(80)),
    shortName: z.string().transform(oneLine).pipe(z.string().max(40)).optional(),
    trade: z.enum(tradeIds),
    town: z.string().transform(oneLine).pipe(z.string().min(2).max(80)),
    region: z.string().transform(oneLine).pipe(z.string().max(40)).optional(),
    phone: z.string().transform(oneLine).pipe(z.string().min(8).max(20)),
    email: z.string().transform(oneLine).pipe(z.string().max(80)).optional(),
    services: z
      .array(
        z.object({
          title: z.string().transform(oneLine).pipe(z.string().min(2).max(48)),
          note: z.string().transform(oneLine).pipe(z.string().max(160)).optional(),
        }),
      )
      .min(1)
      .max(3),
    areas: z.array(z.string().transform(oneLine).pipe(z.string().min(2).max(40))).max(12).optional(),
    registrationLabel: z.string().transform(oneLine).pipe(z.string().max(40)).optional(),
    registrationNumber: z.string().transform(oneLine).pipe(z.string().max(40)).optional(),
    about: z.string().transform(prose).pipe(z.string().max(600)).optional(),
  });

export type CreateInput = z.infer<typeof createSchema>;

export function studioEnabled() {
  return process.env.NODE_ENV === "development";
}

export function demoIsPublic(status: DemoStatus) {
  if (process.env.NODE_ENV !== "production") return true;
  return status === "approved" || status === "live";
}
