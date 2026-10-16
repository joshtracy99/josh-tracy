import type { Metadata } from "next";
import { ExampleChrome } from "@/components/example/ExampleChrome";

export const metadata: Metadata = {
  title: {
    default: "Alderton Plumbing & Heating — example",
    template: "%s — Alderton example",
  },
  description:
    "An example website for a Godalming plumber. Alderton Plumbing & Heating is not a real business.",
  robots: { index: true, follow: true },
};

export default function ExampleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`html{scroll-padding-top:0px}`}</style>
      <ExampleChrome>{children}</ExampleChrome>
    </>
  );
}
