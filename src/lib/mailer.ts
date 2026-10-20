import { Resend } from "resend";

const CONTACT_EMAIL = process.env.CONTACT_EMAIL;
const EMAIL_FROM = process.env.EMAIL_FROM ?? "Josh Tracy <onboarding@resend.dev>";

export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && CONTACT_EMAIL);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendEnquiryEmail(
  fields: Record<string, string>,
  options?: { idempotencyKey?: string },
) {
  if (!process.env.RESEND_API_KEY || !CONTACT_EMAIL) {
    throw new Error("Email is not configured");
  }

  const rows = Object.entries(fields)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px 8px 0;vertical-align:top;font-weight:600;">${escapeHtml(label)}</td><td style="padding:8px 0;">${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("");

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { data, error } = await resend.emails.send({
    from: EMAIL_FROM,
    to: CONTACT_EMAIL,
    subject: `Website enquiry — ${fields.Name ?? "New"}`,
    html: `<table style="font-family:system-ui,sans-serif;font-size:15px;color:#1c1b19;">${rows}</table>`,
  }, options?.idempotencyKey ? { idempotencyKey: options.idempotencyKey } : undefined);

  if (error) {
    throw new Error(error.message);
  }
  if (!data?.id) {
    throw new Error("Email provider did not confirm acceptance.");
  }
}
