import { directionForTrade } from "@/lib/directions";
import type { CreateInput, Demo, DemoService, TradeId } from "@/lib/demos/schema";

const tradeLines: Record<TradeId, { line: string; contact: string }> = {
  plumber: { line: "Plumbing and heating", contact: "A leak is a phone call. Everything else is this form." },
  electrician: { line: "Electrical work", contact: "A fault is a phone call. Everything else is this form." },
  landscaper: { line: "Gardens", contact: "Tell them the garden. The price comes back from this form." },
  builder: { line: "Building work", contact: "Tell them the job. The price comes back from this form." },
  roofer: { line: "Roofing", contact: "A leak is a phone call. Everything else is this form." },
};

type Kit = {
  trade: TradeId;
  test: RegExp;
  pageTitle: string;
  summary: string;
  intro: string;
  askLabel: string;
  points: [{ title: string; body: string }, { title: string; body: string }, { title: string; body: string }];
};

const kits: Kit[] = [
  {
    trade: "plumber",
    test: /leak|burst|call-?out|emergency/i,
    pageTitle: "If it’s leaking, call.",
    summary: "A burst pipe, a tap that won’t stop, no heating on a cold morning.",
    intro: "Say what’s leaking and the address. A price is for that visit, not for a job already finished.",
    askLabel: "Call about a leak",
    points: [
      { title: "The problem", body: "Where it is, and whether the water is still running." },
      { title: "The house", body: "The town, and whether anyone is there to let them in." },
      { title: "A price", body: "Asked for from those details. This page is not a quotation." },
    ],
  },
  {
    trade: "plumber",
    test: /boiler|heat|radiator/i,
    pageTitle: "Boilers, from a service to a full swap.",
    summary: "A new combi, a repair, or a service before winter.",
    intro: "A service, a repair, or a replacement sized for the house.",
    askLabel: "Ask about a boiler",
    points: [
      { title: "Service", body: "A look over the boiler before the cold weather." },
      { title: "Repair", body: "No hot water, a leak underneath, a pressure fault." },
      { title: "Replacement", body: "The old boiler out, a new one in." },
    ],
  },
  {
    trade: "plumber",
    test: /bath|shower|ensuite|wet\s*room/i,
    pageTitle: "A bathroom, planned before it is fitted.",
    summary: "A replacement suite, from the first conversation to the finished room.",
    intro: "What stays, what goes, and how the room is used. The price is for that room.",
    askLabel: "Ask about a bathroom",
    points: [
      { title: "The room", body: "What is there now, and what has to go." },
      { title: "The suite", body: "Bath, shower, basin, and what is being kept." },
      { title: "A price", body: "For the work described, before anyone starts." },
    ],
  },
  {
    trade: "electrician",
    test: /fault|call-?out|emergency|trip/i,
    pageTitle: "When a circuit trips.",
    summary: "A circuit that trips, a light that fails, a fitting that has stopped.",
    intro: "Say which circuit, and whether it stays on. A price is for that visit.",
    askLabel: "Call about a fault",
    points: [
      { title: "What failed", body: "The circuit, the light, or the fitting." },
      { title: "The house", body: "Whether the power is off, and who is there." },
      { title: "A price", body: "For the visit you described. This page is not a quotation." },
    ],
  },
  {
    trade: "electrician",
    test: /consumer|rewire|fuse|board/i,
    pageTitle: "A board, or a rewire.",
    summary: "A consumer unit that has had its day, or a house that needs the wiring done properly.",
    intro: "The age of the board, and whether the house is lived in while the work is done.",
    askLabel: "Ask about the wiring",
    points: [
      { title: "The board", body: "What is there now, and whether it still trips." },
      { title: "The house", body: "How old the wiring is, if you know, and which rooms." },
      { title: "A price", body: "Given once those facts are in. Nothing here is a quote." },
    ],
  },
  {
    trade: "electrician",
    test: /light|socket|charger|point/i,
    pageTitle: "Lights, sockets, and the extra points.",
    summary: "Extra sockets, outside lights, the work people book once they have decided.",
    intro: "How many points, and where they need to be. A price follows from that.",
    askLabel: "Ask about the job",
    points: [
      { title: "What you want", body: "Sockets, lights, or a point outside." },
      { title: "Where", body: "The room, and how you use it." },
      { title: "A price", body: "For that list, not for a job already done." },
    ],
  },
  {
    trade: "landscaper",
    test: /garden|plant|lawn|border/i,
    pageTitle: "A garden, put back together.",
    summary: "A border, a lawn, or a garden after building work.",
    intro: "What the garden has to do, and what is already there. The price is for that.",
    askLabel: "Ask about the garden",
    points: [
      { title: "The ground", body: "Lawn, border, or a garden that building work has left." },
      { title: "The use", body: "Who it is for, and what has to stay." },
      { title: "A price", body: "For the work you described. This page is not a quotation." },
    ],
  },
  {
    trade: "landscaper",
    test: /patio|path|paving|drive/i,
    pageTitle: "A patio or a path, level and drained.",
    summary: "Level, drained, and ready for the furniture to go back.",
    intro: "The size, the levels, and where the water should go.",
    askLabel: "Ask about the paving",
    points: [
      { title: "The size", body: "Roughly how big, and what it replaces." },
      { title: "The water", body: "Where it runs now, and where it should go." },
      { title: "A price", body: "Once the size and the levels are known." },
    ],
  },
  {
    trade: "landscaper",
    test: /fenc|gate|deck/i,
    pageTitle: "The boundary, done so it still looks right.",
    summary: "A fence, a gate, or a deck. The line of the garden, not a brochure.",
    intro: "How long the run is, and what is on the other side.",
    askLabel: "Ask about the boundary",
    points: [
      { title: "The line", body: "Fence, gate, or deck, and roughly how far." },
      { title: "The ground", body: "Level, sloping, or shared with a neighbour." },
      { title: "A price", body: "For that run. Nothing on this page is a quote." },
    ],
  },
  {
    trade: "builder",
    test: /extens/i,
    pageTitle: "An extension, with the work written down.",
    summary: "The shell, the openings, and a clear account of what the job includes.",
    intro: "What the extra room is for, and what is already standing.",
    askLabel: "Ask about an extension",
    points: [
      { title: "The room", body: "What it is for, and which way it faces." },
      { title: "The house", body: "What it joins onto, and what has to stay open." },
      { title: "A price", body: "For the work named. This page is not a quotation." },
    ],
  },
  {
    trade: "builder",
    test: /alter|kitchen|loft|wall|open/i,
    pageTitle: "An alteration, shown before it is priced.",
    summary: "A wall out, a kitchen opened up, the work people want to see finished.",
    intro: "Which wall, which room, and what has to keep working while it’s done.",
    askLabel: "Ask about the alteration",
    points: [
      { title: "The change", body: "What comes out, and what the room is afterwards." },
      { title: "The house", body: "Whether people are living in it during the work." },
      { title: "A price", body: "From that description, not from a guess." },
    ],
  },
  {
    trade: "builder",
    test: /repair|crack|making/i,
    pageTitle: "Making good, after the damage.",
    summary: "Making good after a leak, a crack, or a job someone else left.",
    intro: "What failed, and how far it goes. A price is for that repair.",
    askLabel: "Ask about the repair",
    points: [
      { title: "The damage", body: "A crack, a leak, or work that was left unfinished." },
      { title: "How far", body: "One patch, or a wall that needs opening up." },
      { title: "A price", body: "For the repair described. This page is not a quote." },
    ],
  },
  {
    trade: "roofer",
    test: /leak|slip|tile|repair/i,
    pageTitle: "When a tile has slipped.",
    summary: "The call that comes when the ceiling has already stained.",
    intro: "Where the stain is, and how long it has been there. A price is for that visit.",
    askLabel: "Call about a leak",
    points: [
      { title: "The leak", body: "Which room, and whether it is still coming in." },
      { title: "The roof", body: "Tile, slate, or flat, if you know." },
      { title: "A price", body: "For the visit. This page is not a quotation." },
    ],
  },
  {
    trade: "roofer",
    test: /re-?roof|replac/i,
    pageTitle: "A re-roof, stripped and replaced.",
    summary: "Stripped and replaced, with the scope written down before the price.",
    intro: "Which slopes, and what is on them now. The price is for that roof.",
    askLabel: "Ask about a re-roof",
    points: [
      { title: "The roof", body: "Which part, and what it is covered with." },
      { title: "The house", body: "Whether people are in it, and how it is reached." },
      { title: "A price", body: "Once the slopes are named. Nothing here is a quote." },
    ],
  },
  {
    trade: "roofer",
    test: /flat|lead|gutter|valley/i,
    pageTitle: "Flat roofs, leadwork, and the details.",
    summary: "The details people worry about, explained without the jargon.",
    intro: "Where the flat roof or the gutter sits, and what the water is doing.",
    askLabel: "Ask about the detail",
    points: [
      { title: "The detail", body: "A flat roof, a gutter, a valley, or a piece of lead." },
      { title: "The water", body: "Where it gets in, or where it sits." },
      { title: "A price", body: "For that detail. This page is not a quotation." },
    ],
  },
];

function genericService(trade: TradeId, title: string, town: string): Omit<DemoService, "slug" | "image"> {
  const line = tradeLines[trade].line.toLowerCase();
  return {
    title,
    summary: `${title}. The sort of ${line} people ask about in ${town}.`,
    pageTitle: title.endsWith(".") ? title : `${title}.`,
    intro: `Say what you need done. A price is for that job, in ${town}, not for one already finished.`,
    askLabel: title.length <= 28 ? `Ask about ${title.charAt(0).toLowerCase()}${title.slice(1)}` : "Ask for a price",
    points: [
      { title: "The job", body: "What needs doing, in a few plain sentences." },
      { title: "The place", body: `The address in or near ${town}.` },
      { title: "A price", body: "Given for the job you described. This page is not a quotation." },
    ],
  };
}

export function tradeLabel(trade: TradeId) {
  return tradeLines[trade].line;
}

function serviceFromTitle(trade: TradeId, title: string, town: string, note?: string): Omit<DemoService, "slug" | "image"> {
  const kit = kits.find((item) => item.trade === trade && item.test.test(title));
  const base = kit
    ? {
        title,
        summary: note || kit.summary,
        pageTitle: kit.pageTitle,
        intro: kit.intro,
        askLabel: kit.askLabel,
        points: kit.points.map((point) => ({ ...point })) as DemoService["points"],
      }
    : genericService(trade, title, town);
  if (note && note.length >= 2) base.summary = note;
  if (base.askLabel.length > 40) base.askLabel = "Ask for a price";
  return base;
}

function joinTitles(titles: string[]) {
  if (titles.length === 1) return titles[0];
  if (titles.length === 2) return `${titles[0]} and ${titles[1]}`;
  return `${titles.slice(0, -1).join(", ")} and ${titles[titles.length - 1]}`;
}

const trailingFirm = /\s+(ltd|limited|llp|plc)\.?$/i;
const tradeWord =
  /^(plumbing|heating|electrical|electricians?|roofing|roofers?|landscaping|landscapes?|gardens?|building|builders?|construction)$/i;

export function suggestShortName(businessName: string) {
  const cleaned = businessName.replace(trailingFirm, "").trim();
  const parts = cleaned.split(/\s+/);
  if (parts.length === 2 && tradeWord.test(parts[1]) && parts[0].length >= 2) return parts[0].slice(0, 40);
  return cleaned.slice(0, 40);
}

export function slugify(value: string) {
  const slug = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48)
    .replace(/-+$/g, "");
  return slug || "demonstration";
}

export function usualServices(trade: TradeId) {
  const titles: Record<TradeId, [string, string, string]> = {
    plumber: ["Leaks and call-outs", "Boilers", "Bathrooms"],
    electrician: ["Faults and call-outs", "Consumer units and rewires", "Lighting and sockets"],
    landscaper: ["Gardens and planting", "Patios and paths", "Fencing and gates"],
    builder: ["Extensions", "Alterations", "Repairs"],
    roofer: ["Leaks and slipped tiles", "Re-roofs", "Flat roofs and leadwork"],
  };
  return titles[trade];
}

function uniqueSlug(base: string, used: Set<string>) {
  let slug = base;
  let n = 2;
  while (used.has(slug) || slug === "areas" || slug === "about" || slug === "contact") {
    slug = `${base}-${n}`.slice(0, 48);
    n += 1;
  }
  used.add(slug);
  return slug;
}

export function areasFrom(town: string, extra: string[] | undefined) {
  const areas: string[] = [];
  for (const name of [town, ...(extra ?? [])]) {
    const clean = name.trim();
    if (clean.length < 2) continue;
    if (areas.some((area) => area.toLowerCase() === clean.toLowerCase())) continue;
    areas.push(clean);
    if (areas.length === 12) break;
  }
  return areas;
}

export function buildDemo(
  input: CreateInput,
  slug: string,
  now: string,
): Omit<Demo, "hero" | "wide"> & { hero?: Demo["hero"]; wide?: Demo["wide"] } {
  const line = tradeLines[input.trade];
  const used = new Set<string>();
  const services = input.services.map((service) => ({
    slug: uniqueSlug(slugify(service.title), used),
    ...serviceFromTitle(input.trade, service.title, input.town, service.note),
  }));
  return {
    slug,
    status: "draft",
    businessName: input.businessName,
    shortName: [input.shortName?.trim(), suggestShortName(input.businessName), input.businessName].find(
      (name) => name && name.length >= 2,
    )!.slice(0, 40),
    trade: input.trade,
    direction: directionForTrade(input.trade),
    town: input.town,
    region: input.region?.trim() ?? "",
    phone: input.phone,
    email: input.email?.trim() ?? "",
    headlineLead: `${line.line},`,
    headlineEmphasis: "properly",
    headlineTail: "finished.",
    pitch: `${joinTitles(services.map((service) => service.title))}. Based in ${input.town}.`,
    contactHeadline: line.contact,
    services,
    areas: areasFrom(input.town, input.areas),
    about: input.about?.trim() ?? "",
    registrationLabel: input.registrationLabel?.trim() ?? "",
    registrationNumber: input.registrationNumber?.trim() ?? "",
    createdAt: now,
    updatedAt: now,
  };
}

export function rewriteWording(demo: Demo, now: string): Demo {
  const line = tradeLines[demo.trade];
  return {
    ...demo,
    headlineLead: `${line.line},`,
    headlineEmphasis: "properly",
    headlineTail: "finished.",
    pitch: `${joinTitles(demo.services.map((service) => service.title))}. Based in ${demo.town}.`,
    contactHeadline: line.contact,
    services: demo.services.map((service) => ({
      ...service,
      ...serviceFromTitle(demo.trade, service.title, demo.town),
      slug: service.slug,
      image: service.image,
    })),
    updatedAt: now,
  };
}
