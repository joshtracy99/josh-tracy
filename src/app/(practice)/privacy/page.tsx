import { studioPageMetadata } from "@/lib/seo";

export const metadata = studioPageMetadata({
  title: "Privacy",
  description: "What happens to the details you send Josh Tracy.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main id="content" className="studio-legal-content">
      <h1>Privacy</h1>
      <div className="studio-legal-copy">
        <p>
          This page covers the enquiry form on this site. It is not the privacy notice for a
          tradesperson’s own website. Each live client site has its own, because the enquiries on
          that site belong to them.
        </p>
        <p>
          If you use the form, I receive your name, trade, town, mobile number, and any link you
          paste. I use that to reply to you and, if you want one, to build a homepage. I don’t sell
          it, and I don’t add you to a mailing list.
        </p>
        <p>
          The message is emailed to me with Resend, who process it to deliver the email. If email
          isn’t set up yet, a development copy is only written to the server log and is not stored
          in a database.
        </p>
        <p>
          The free preview asks for a business name, a trade and a town, and shows them on a labelled
          page. When the wording is drafted, those three details are sent to xAI. I don’t store them,
          and I don’t email them to myself. If that draft can’t be written, you still see a plain
          version from the same three details, and nothing is sent. The page is not a live website.
          It does not include a photograph, a review, a registration number, or a phone number.
        </p>
        <p>
          The example plumber’s quote form does not send or store what you type. Alderton is not a
          real business, and that form is there to show how a form works.
        </p>
        <p>
          If I prepare a demonstration for a business, I keep the name, town, phone number, services
          and photographs they supplied, so I can show them a private page and later turn that same
          page into their site. The page says it is not affiliated with or endorsed by them. Search
          engines are told not to list it. A form on a demonstration is not sent to that business
          and does not call them. I don’t add a review, a year in trade, or a registration number
          they didn’t give me.
        </p>
        <p>
          To ask for a copy of what I hold, or for it to be deleted, reply to the text I send you.
          There is no account to log into.
        </p>
      </div>
    </main>
  );
}
