import { promises as fs } from "node:fs";
import path from "node:path";
import { demoSchema, studioEnabled, type Demo } from "@/lib/demos/schema";

const root = path.join(process.cwd(), "content", "demos");
const imageRoot = path.join(process.cwd(), "public", "demos");

function demoPath(slug: string) {
  const file = path.join(root, `${slug}.json`);
  if (path.dirname(file) !== root) throw new Error("Bad demonstration path");
  return file;
}

function imageDir(slug: string) {
  const dir = path.join(imageRoot, slug);
  if (path.dirname(dir) !== imageRoot) throw new Error("Bad photograph path");
  return dir;
}

export function assertStudio() {
  if (!studioEnabled()) {
    const error = new Error("Demonstrations are edited on your machine, then deployed.");
    (error as Error & { status: number }).status = 403;
    throw error;
  }
}

export async function listDemos(): Promise<Demo[]> {
  let names: string[] = [];
  try {
    names = await fs.readdir(root);
  } catch {
    return [];
  }
  const demos = await Promise.all(
    names
      .filter((name) => name.endsWith(".json"))
      .map(async (name) => {
        try {
          return await readDemo(name.replace(/\.json$/, ""));
        } catch {
          return null;
        }
      }),
  );
  return demos
    .filter((demo): demo is Demo => Boolean(demo))
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function readDemo(slug: string): Promise<Demo | null> {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  try {
    const raw = await fs.readFile(demoPath(slug), "utf8");
    const parsed = demoSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

export async function writeDemo(demo: Demo) {
  assertStudio();
  const parsed = demoSchema.parse(demo);
  await fs.mkdir(root, { recursive: true });
  const file = demoPath(parsed.slug);
  const temp = `${file}.tmp`;
  await fs.writeFile(temp, `${JSON.stringify(parsed, null, 2)}\n`);
  await fs.rename(temp, file);
  return parsed;
}

export async function uniqueSlug(base: string) {
  let slug = base || "demonstration";
  let n = 2;
  for (;;) {
    try {
      await fs.access(demoPath(slug));
    } catch {
      return slug;
    }
    slug = `${base.slice(0, 44)}-${n}`;
    n += 1;
    if (n > 50) throw new Error("Too many demonstrations with that name");
  }
}

export function publicFile(slug: string, name: string) {
  if (!/^[a-z0-9-]+\.(jpg|png|webp)$/.test(name)) throw new Error("Bad photograph name");
  const file = path.join(imageDir(slug), name);
  if (path.dirname(file) !== imageDir(slug)) throw new Error("Bad photograph path");
  return file;
}

export async function saveImage(slug: string, name: string, bytes: Buffer) {
  assertStudio();
  const file = publicFile(slug, name);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, bytes);
  return `/demos/${slug}/${name}`;
}

export async function removeImage(src: string | undefined) {
  if (!src) return;
  const match = src.match(/^\/demos\/([a-z0-9-]+)\/([a-z0-9-]+\.(?:jpg|png|webp))$/);
  if (!match) return;
  assertStudio();
  await fs.rm(publicFile(match[1], match[2]), { force: true });
}

export async function deleteDemo(slug: string) {
  assertStudio();
  await fs.rm(demoPath(slug), { force: true });
  await fs.rm(imageDir(slug), { recursive: true, force: true });
}

const kinds = { jpg: "jpg", png: "png", webp: "webp" } as const;

export function sniffImage(bytes: Buffer): keyof typeof kinds | null {
  if (bytes.length > 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "jpg";
  if (
    bytes.length > 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    return "png";
  }
  if (bytes.length > 12 && bytes.subarray(0, 4).toString("ascii") === "RIFF" && bytes.subarray(8, 12).toString("ascii") === "WEBP") {
    return "webp";
  }
  return null;
}
