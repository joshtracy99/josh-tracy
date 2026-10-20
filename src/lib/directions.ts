export const directionIds = ["heritage", "contemporary", "industrial"] as const;
export type DirectionId = (typeof directionIds)[number];

export const directionCopy: Record<DirectionId, { name: string; note: string }> = {
  heritage: {
    name: "Heritage",
    note: "Warm paper, a serif headline, and more room around the photograph.",
  },
  contemporary: {
    name: "Contemporary",
    note: "Clear sans-serif type, and the services set out so a call is obvious.",
  },
  industrial: {
    name: "Industrial",
    note: "A dark ground and large type, for roofing and building work.",
  },
};

export function directionForTrade(trade: string): DirectionId {
  if (trade === "landscaper") return "heritage";
  if (trade === "builder" || trade === "roofer") return "industrial";
  return "contemporary";
}

export function resolveDirection(demo: { direction?: DirectionId; trade: string }): DirectionId {
  return demo.direction ?? directionForTrade(demo.trade);
}
