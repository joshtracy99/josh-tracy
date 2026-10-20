export const practice = {
  name: "Josh Tracy",
  price: "£29",
  year: "£348",
  handover: "£99",
  description:
    "Built, hosted and looked after for £29 a month. Nothing to pay until you’ve seen a homepage.",
} as const;

export const included = [
  "Up to six pages, written for you",
  "Laid out for a phone, as well as a larger screen",
  "A page for the services you actually do",
  "Photographs of your jobs",
  "Click-to-call, WhatsApp, and a quote form to your phone",
  "The domain registered in your name",
  "Hosting, the padlock, and keeping the site up",
  "Small text and photo changes when you message",
] as const;

export const notIncluded = [
  "A promise that the phone will ring",
  "Google ads, or a ranking on a particular search",
  "A login for you to learn",
  "A business email inbox",
] as const;

export const steps = [
  {
    n: "01",
    title: "Tell me about the business",
    body: "Your trade, the services, the towns, your mobile, and any photographs. A Google listing or a Facebook page is enough to start.",
  },
  {
    n: "02",
    title: "I build the website",
    body: "You see a homepage with your name on it before you pay anything. Nothing technical to learn, and no call to sit through.",
  },
  {
    n: "03",
    title: "It goes live for £29 a month",
    body: "If you want it, it goes live and I look after the technical side. Cancel any month. The domain stays in your name.",
  },
] as const;

export const reasons = [
  {
    title: "A place that makes you look established",
    body: "Services, towns, qualifications you actually hold, and photographs of finished work. A customer can see them in one place, under your name.",
  },
  {
    title: "They can reach you while you’re on a job",
    body: "Call, WhatsApp, or a quote form. The enquiry waits on your phone. You don’t have to stop the work to write the details down.",
  },
  {
    title: "Show the standard of the work",
    body: "A few photographs of jobs you’ve done say more than a paragraph. If you haven’t got any yet, we start without them.",
  },
  {
    title: "Somewhere that is yours",
    body: "Recommendations, Facebook and Checkatrade still matter. A website is the address that belongs to the business, not a profile you rent.",
  },
  {
    title: "Easier for people to find you",
    body: "A clear site can be what someone opens when they search the trade and the town. Where it sits on Google is not guaranteed.",
  },
  {
    title: "A better first look than the next firm",
    body: "People understand what you do more quickly, and the business looks like it expects to be taken seriously.",
  },
] as const;

export const figures = [
  {
    value: "65%",
    claim: "of UK construction businesses said they have a website.",
    note: "Construction is the building sector as a whole (SIC F), not only sole traders, and not only plumbers or electricians. Firms said this themselves. It is not a count of tradespeople.",
    source: "UK Business Data Survey 2026, GOV.UK",
    href: "https://www.gov.uk/government/statistics/uk-business-data-survey-2026/uk-business-data-survey-2026",
  },
  {
    value: "78%",
    claim: "of all UK businesses said they have a website. Construction, at 65%, was among the sectors least likely to say so.",
    note: "Same survey, October 2025 to January 2026. 4,450 UK businesses, weighted to the UK business population. Published by the Department for Science, Innovation and Technology on 18 June 2026.",
    source: "UK Business Data Survey 2026, GOV.UK",
    href: "https://www.gov.uk/government/statistics/uk-business-data-survey-2026/uk-business-data-survey-2026",
  },
] as const;

export const questions = [
  {
    q: "Is there really no upfront cost?",
    a: "None. You can see a page from your business name, trade and town, with no mobile number. It is not the finished site. A proper homepage, once you send the details, still costs nothing to look at. £29 a month starts only if you want the site live.",
  },
  {
    q: "Do I need to know anything about websites?",
    a: "No. There’s no login and nothing to learn. You send the details. After that, you text me when a photograph or a line needs changing.",
  },
  {
    q: "Can I use my own photographs?",
    a: "Yes. They’re what make the site believable. We can start without them and add them when you send some. I won’t pass off a stock photograph as one of your jobs.",
  },
  {
    q: "Can customers contact me through the website?",
    a: "Yes. A live site has click-to-call, WhatsApp, and a quote form that reaches your phone. The example uses a number that isn’t connected, so you can look without ringing anyone.",
  },
  {
    q: "Can I request changes once it’s live?",
    a: "Small changes to text and photographs, when you message. There isn’t a set number of edits a month, and it isn’t an unlimited rewrite. If something is bigger than a small change, I’ll say so before I do it.",
  },
  {
    q: "Will my website work on mobile phones?",
    a: "Yes. It’s built for a phone first. That’s the screen most people will use.",
  },
  {
    q: "Will my website appear on Google?",
    a: "It can be found. I don’t promise a position. The price doesn’t include ads or ongoing search-engine work. The pages say what you do and where, in plain language.",
  },
  {
    q: "What happens if I want to cancel?",
    a: "Any month. No minimum term. You stop paying and I stop hosting. The domain stays in your name. If you want the files so someone else can host them, that handover is £99.",
  },
  {
    q: "How long does it take?",
    a: "A homepage is a few days. The rest of the site goes up once you’ve said you want it.",
  },
  {
    q: "Do I own the domain?",
    a: "Yes. It’s registered in your name, and the first year of a .co.uk is included. If you cancel, it stays yours. Renewal after that first year isn’t part of the £29.",
  },
] as const;
