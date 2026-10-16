# Josh Tracy — websites for tradespeople

The practice site, and an example plumber’s website inside it. Alderton Plumbing & Heating is not a real business. The phone number on the example is not connected.

Next.js, TypeScript, Tailwind. One Vercel project. A real client’s site, later, is a separate project.

There is no LocalBusiness markup on the example. Publishing a fictional plumber as a local business would put a fake firm into search.

## Run it

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The example is at [/example](http://localhost:3000/example). Demonstrations are edited at [/studio](http://localhost:3000/studio), which exists only while this development server is running.

Without `RESEND_API_KEY` and `CONTACT_EMAIL`, the homepage form still succeeds in development and prints the enquiry in the terminal. In production it refuses to pretend the message was sent.

Without `XAI_API_KEY`, the free preview still shows a plain draft from the business name, trade and town. With the key, those three details are sent to the xAI API and the wording comes back from `grok-4.7`. The page does not say so. The preview is not stored.

The example quote form never emails anyone. It only checks that the fields are filled in.

## Demonstrations

A demonstration is one JSON file in `content/demos`, plus any photographs they supplied in `public/demos`. There is no database and no separate design. The pages are the same ones as the example, filled from that file.

Editing only works on your machine. Open `/studio`, enter the business name, trade, town, phone, the services they actually do, and a photograph if you have one of theirs. The usual-three button only fills service titles for that trade. Read the pages, change a sentence if it isn’t how they talk, then approve. A draft opens here and is not found once the site is deployed. Approving, then deploying, publishes `/d/<slug>`.

That address is labelled as a demonstration and is not affiliated with or endorsed by the business. It is left out of the sitemap. `robots.txt` disallows `/d/` and `/studio`, and those responses send `X-Robots-Tag: noindex`. `/studio` is not in the public navigation, and it is not available in production. The offer on a demonstration is the finished website at £29 a month, with nothing to pay to set it up.

The wording comes from the trade and the service names. It does not add reviews, years trading, qualifications, completed jobs, or towns they didn’t name. A registration is shown only when both the name and the number were typed in. The example plumber’s photographs are never reused. If there is no photograph, the page has no picture, rather than a stand-in.

Marking an approved demonstration as the finished site keeps the same pages. The demonstration label and the £29 pitch come off, and call and WhatsApp use their number. A quote on that version is emailed to you, the same way as the homepage form, not to their inbox. This address stays out of search either way. Their own domain is a later project: the same JSON file and the same pages, not a new design. Hobby remains the right plan only while no paying client site is hosted here.

## Before anyone is contacted

Set `CONTACT_EMAIL`, `RESEND_API_KEY` and `EMAIL_FROM`, and deploy. Hobby on Vercel is fine while the only trade site is this labelled example. A paying client’s site needs the Pro plan, because Hobby is not for commercial sites.

## What to ask a tradesperson

- Name, as they want it on the site
- Trade
- Mobile
- Towns they cover
- Google listing or Facebook
- Gas Safe, NICEIC, or whatever they actually hold — the number, not a claim
- Photos of their own jobs, the van, and them if they want a face on the about page
- Where a quote form should go (their mobile is enough to start)

Do not invent reviews, years trading, or a registration number.

## A text you can send

Once you would be happy for them to judge you by this site:

> Saw your listing, and nowhere decent for someone to look before they ring. I put a demonstration together with your name and the work you do, so you can see it rather than hear me describe it: [link]. It isn’t your site, and it isn’t live. Nothing to pay to look. If you want it, it’s £29 a month and nothing to set it up. Josh

Don’t contact anyone until the live URL is one you’d send your own mother.
