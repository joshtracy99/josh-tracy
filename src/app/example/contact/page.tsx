import type { Metadata } from "next";
import { QuoteForm } from "@/components/example/QuoteForm";
import { example } from "@/lib/example";

export const metadata: Metadata = { title: "Contact" };

const notes: Record<string, string> = {
  call: `On your website, this button rings ${example.phoneDisplay}. Nothing is being called from this example.`,
  whatsapp:
    "On your website, this opens WhatsApp with a short message ready for the customer to send. Nothing is being sent from this example.",
  quote: "Tell them the job in a few lines. On a live site it lands on the tradesperson’s phone.",
};

export default function ContactPage({
  searchParams,
}: {
  searchParams?: { intent?: string; sent?: string; error?: string };
}) {
  const intent = searchParams?.intent ?? "";
  const note = notes[intent];

  return (
    <main
      className={`grid px-5 md:px-8 lg:grid lg:grid-cols-12 lg:gap-12 lg:py-20 ${
        note ? "gap-3 pb-4 pt-3 md:gap-4 md:py-5" : "gap-5 py-6 md:py-8"
      }`}
    >
      <div className="flex flex-col lg:col-span-5 lg:h-full lg:justify-between">
        <div>
          <h1 className="max-w-[14ch] font-example-serif text-[clamp(2.15rem,8.5vw,2.6rem)] font-medium leading-[0.96] tracking-[-0.03em] md:text-[clamp(2.75rem,5.5vw,5rem)] md:leading-[0.92]">
            A leak is a phone call. Everything else is this form.
          </h1>
          <p
            className={`max-w-md leading-snug text-ex-mute lg:mt-6 lg:leading-relaxed ${
              note ? "mt-2 md:mt-4" : "mt-4"
            }`}
          >
            {example.fullName} does not exist, so this page will not contact anyone. It shows where
            the number, WhatsApp and the quote form sit.
          </p>
          {note ? (
            <p className="mt-2 max-w-md border-l border-ex-ink pl-4 text-ex-ink md:mt-6" role="status">
              {note}
            </p>
          ) : null}
        </div>
        <p className={`text-sm text-ex-mute lg:mt-10 ${note ? "mt-2 md:mt-4" : "mt-4"}`}>
          Shown as {example.phoneDisplay}. Not a working line.
        </p>
      </div>
      <div className="lg:col-span-6 lg:col-start-7">
        {searchParams?.error === "1" ? (
          <p className="mb-6 text-sm text-ex-copper" role="alert">
            Add your name, phone, town and a short note.
          </p>
        ) : null}
        <QuoteForm initialSent={searchParams?.sent === "1"} pushNote={Boolean(note)} />
      </div>
    </main>
  );
}
