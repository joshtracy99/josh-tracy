import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col justify-center bg-paper px-6 font-sans text-ink">
      <p className="text-xl">Josh Tracy</p>
      <h1 className="mt-4 text-5xl font-medium tracking-[-0.045em]">That page isn’t here.</h1>
      <Link href="/" className="mt-8 underline underline-offset-4">
        Back home
      </Link>
    </main>
  );
}
