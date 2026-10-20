# Studio enquiry delivery

Owner decision, 20 October 2026: defer email setup and keep contact details private. This branch does not publish an address/number, add a paid service, change DNS, configure production credentials or send a real test enquiry.

## Current boundary

The homepage form POSTs JSON to `/api/enquire`. Both client and server require a business name, name, trade, town and mobile; the listing is optional. The server keeps the existing honeypot. A production server without mail credentials returns an honest 503; it does not claim a lead was saved or delivered. There is no enquiry database or durable queue.

The client locks immediate duplicate submissions, retains values after errors/timeouts and accepts success only when the server explicitly confirms it. The same unchanged submission uses the same retry key while the page remains open (up to 23 hours); editing details starts a new attempt. Keys are kept in memory, not localStorage. Resend receives a scoped idempotency key derived from that attempt and validated fields. This helps retries within the provider's 24-hour window; it does not guarantee delivery or protect a brand-new submission after reloading the page.

The UI stops waiting after 30 seconds. Aborting the browser request does not prove the server stopped sending; stable retry keys account for that uncertainty. Server validation errors identify the relevant fields. A response without confirmed provider acceptance is an error rather than a false success. Submission contents and provider error text are not logged by the production studio handler.

## Later owner setup

Configure directly in Vercel, never in chat or committed source:

- `RESEND_API_KEY`: sending key for the intended account (Secret).
- `CONTACT_EMAIL`: intended recipient inbox (server-only configuration).
- `EMAIL_FROM`: an approved sender on a domain verified with Resend. The existing onboarding fallback is restricted to the Resend account owner and is not a general production sender.

Review sender-domain verification/DNS in Resend, recipient ownership, processor terms and privacy wording. Rebuild/deploy after environment changes with approval. Use a controlled test record, verify provider acceptance, delivery/bounce status and actual receipt in the intended inbox. Confirm replies reach the promised text workflow. Do not use genuine prospect details in tests.

## Verification performed in this iteration

Tests use browser-intercepted responses and a mocked email provider. They cover validation, immediate duplicates, retry identity, provider rejection, missing acceptance ID, unavailable credentials, network/timeout errors and truthful success/failure UI. No real provider request or enquiry is needed. These tests do not verify sender-domain configuration, provider-side deduplication internals, spam-folder placement or inbox receipt.

Customer preview-generation routes and fictional portfolio forms are outside this change; their existing contracts remain.

Reference: https://resend.com/docs/dashboard/emails/idempotency-keys
