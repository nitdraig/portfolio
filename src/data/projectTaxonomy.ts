export const DELIVERY_TYPES = [
  "mvp",
  "platform",
  "landing",
  "internal",
] as const;

export const INDUSTRIES = [
  "healthcare",
  "freelance",
  "hackathons",
  "sports",
  "education",
  "mining",
  "sustainability",
  "nonprofit",
  "social",
  "consulting",
  "food",
  "devtools",
  "management",
  "security",
  "tech",
] as const;

export type DeliveryType = (typeof DELIVERY_TYPES)[number];
export type Industry = (typeof INDUSTRIES)[number];

export type ProjectFilters = {
  deliveryType: DeliveryType | "all";
  industry: Industry | "all";
};
