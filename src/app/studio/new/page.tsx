import type { Metadata } from "next";
import { CreateForm } from "@/components/studio/CreateForm";

export const metadata: Metadata = {
  title: "New demonstration",
  robots: { index: false, follow: false },
};

export default function NewDemonstrationPage() {
  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-4xl font-medium tracking-[-0.04em]">New demonstration</h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-mute">
          Only what they told you, or what’s already on a listing they published. The wording is filled in from the trade. You can change it on the next page before anyone else sees it.
        </p>
      </div>
      <CreateForm />
    </div>
  );
}
