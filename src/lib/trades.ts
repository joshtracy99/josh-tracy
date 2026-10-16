export const trades = [
  {
    id: "plumber",
    label: "Plumber",
    lead: "Plumbing and heating,",
    pitch: "Leaks seen the same day when we can. Boilers and bathrooms booked in. The full site is the one you can open.",
    services: [
      { index: "01", title: "Leaks and call-outs", body: "A burst pipe, a tap that won’t stop, no heating on a cold morning." },
      { index: "02", title: "Boilers", body: "A new combi, a repair, or a service before winter." },
      { index: "03", title: "Bathrooms", body: "A replacement suite, from the first photograph to the finished room." },
    ],
    image: "/example/kitchen.jpg",
    alt: "Copper pipework and a butler sink in a kitchen.",
    position: "object-[22%_58%] md:object-[28%_62%]",
    caption: "From the plumber example. Not a real job, and not a real business.",
    place: "Godalming",
    openLabel: "Open the example website",
  },
  {
    id: "electrician",
    label: "Electrician",
    lead: "Electrical work,",
    pitch: "Faults, a rewire, extra sockets. Written the same way: what you do, where you do it, and how to reach you.",
    services: [
      { index: "01", title: "Faults and call-outs", body: "A circuit that trips, a light that fails, a job that can’t wait until next week." },
      { index: "02", title: "Consumer units and rewires", body: "A board that’s had its day, or a house that needs the wiring done properly." },
      { index: "03", title: "Lighting and sockets", body: "Extra points, outside lights, the work people book once they’ve decided." },
    ],
    image: "/example/van.jpg",
    alt: "A dark green van parked on the gravel drive of a brick house. The photograph is from the plumber example, not an electrician’s job.",
    position: "object-[center_58%]",
    caption: "The van is from the plumber example. Your site would use your own jobs.",
    place: "Your towns",
    openLabel: "Open the plumber example",
  },
  {
    id: "landscaper",
    label: "Landscaper",
    lead: "Gardens,",
    pitch: "Planting, a patio, a fence. The same kind of site: a few services, the towns, and a way to ask for a price.",
    services: [
      { index: "01", title: "Gardens and planting", body: "A border, a lawn, or a garden put back together after building work." },
      { index: "02", title: "Patios and paths", body: "Level, drained, and photographed once the furniture is back." },
      { index: "03", title: "Fencing and gates", body: "The boundary, done so it still looks right next year." },
    ],
    image: "/example/van.jpg",
    alt: "A dark green van parked on the gravel drive of a brick house. The photograph is from the plumber example, not a landscaper’s job.",
    position: "object-[center_58%]",
    caption: "Illustrative photograph, not a garden this firm built. A live site uses your own.",
    place: "Your towns",
    openLabel: "Open the plumber example",
  },
  {
    id: "builder",
    label: "Builder",
    lead: "Building work,",
    pitch: "An extension, a repair, the making-good. Customers see the services before they ask what you charge.",
    services: [
      { index: "01", title: "Extensions", body: "The shell, the openings, and a clear account of what the job includes." },
      { index: "02", title: "Alterations", body: "A wall out, a kitchen opened up, the work people want to see finished." },
      { index: "03", title: "Repairs", body: "Making good after a leak, a crack, or a job someone else left." },
    ],
    image: "/example/van.jpg",
    alt: "A dark green van parked on the gravel drive of a brick house. The photograph is from the plumber example, not a builder’s job.",
    position: "object-[center_58%]",
    caption: "The photograph is not a building job. Yours would be.",
    place: "Your towns",
    openLabel: "Open the plumber example",
  },
  {
    id: "roofer",
    label: "Roofer",
    lead: "Roofing,",
    pitch: "A slipped tile, a flat roof, a re-roof. Same shape of site, with the work shown in your photographs.",
    services: [
      { index: "01", title: "Leaks and slipped tiles", body: "The call that comes when the ceiling has already stained." },
      { index: "02", title: "Re-roofs", body: "Stripped and replaced, with photographs of the job rather than a stock roof." },
      { index: "03", title: "Flat roofs and leadwork", body: "The details people worry about, explained without the jargon." },
    ],
    image: "/example/van.jpg",
    alt: "A dark green van parked on the gravel drive of a brick house. The photograph is from the plumber example, not a roofer’s job.",
    position: "object-[center_58%]",
    caption: "Not a roof. The plumber example’s van. A live site uses photographs of your own work.",
    place: "Your towns",
    openLabel: "Open the plumber example",
  },
] as const;

export type TradeId = (typeof trades)[number]["id"];

export function tradeById(id: string | undefined) {
  return trades.find((trade) => trade.id === id);
}
