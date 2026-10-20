import { studioPageMetadata } from "@/lib/seo";

export const metadata = studioPageMetadata({
  title: "Terms",
  description: "What £29 a month covers, and what happens if you cancel.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <main id="content" className="studio-legal-content">
      <h1>Terms</h1>
      <div className="studio-legal-copy">
        <p>
          These are the terms of the website service. They are written in plain language. They are
          not a promise of work, rankings, or a particular number of enquiries.
        </p>
        <h2>Looking</h2>
        <p>
          A first homepage, built from the listing and photos you send, costs nothing. You don’t
          have to take it.
        </p>
        <h2>£29 a month</h2>
        <p>
          If you want the site live, it’s £29 a month. That covers up to six pages, the words, the
          first year of a .co.uk domain registered in your name, hosting, the padlock, a quote form
          to your phone, click-to-call, WhatsApp, and small changes to text and photos when you
          message. The site is built to be used on a phone. It does not cover a business email
          inbox, advertising, ongoing search-engine work, or the domain renewal after the first year.
        </p>
        <h2>Cancelling</h2>
        <p>
          You can cancel any month. There is no minimum term and no exit fee. The domain stays in
          your name. I stop hosting the site. If you want the files so someone else can host them,
          that handover is £99.
        </p>
        <h2>What you tell me</h2>
        <p>
          You confirm that the phone number, the towns, the accreditations and the photographs are
          yours to use, and that they are accurate. I won’t invent a Gas Safe number, a review, or
          a year you started trading.
        </p>
        <h2>Demonstrations</h2>
        <p>
          A demonstration prepared for a real business is labelled as one. It is not their website,
          and it is not affiliated with or endorsed by them. The phone number on a demonstration is
          not connected. Nothing typed into that form is sent to them. There is nothing to pay to
          look. The finished website, if they want it, is £29 a month, with nothing to pay to set it
          up.
        </p>
        <h2>The example</h2>
        <p>
          Alderton Plumbing & Heating is not a real business. The photographs are illustrative. The
          phone number is not connected. Don’t hire them, because there is no them.
        </p>
      </div>
    </main>
  );
}
