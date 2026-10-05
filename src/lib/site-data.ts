export const services = [
  { title: "Automation", text: "Turn fragmented operations into adaptive workflows that move work forward without losing human control.", to: "/services/automation" },
  { title: "AI & ML Development", text: "Build governed intelligence that understands domain context, explains outcomes, and improves in production.", to: "/services/ai-ml" },
  { title: "Product Engineering", text: "Design and ship resilient digital products for complex, regulated, and high-consequence environments.", to: "/services/product-engineering" },
] as const;

export const platforms = [
  { code: "Muv", label: "Muv", sector: "Maritime", title: "Shipping Management", text: "A live operating picture for fleets, cargo, routes, maintenance, and port coordination.", to: "/platforms/muv" },
  { code: "Aigis", label: "Aigis", sector: "Defense", title: "Defense Systems", text: "Secure decision infrastructure that unifies signals, operations, and accountable command workflows.", to: "/platforms/aigis" },
  { code: "HMIS", label: "Medis", sector: "Healthcare", title: "Hospital Management Information Software", text: "A connected operating layer for patient journeys, clinical teams, inventory, finance, and hospital networks.", to: "/platforms/hmis" },
  { code: "Indus", label: "Dots", sector: "Manufacturing", title: "Industry 4.0 System", text: "Connect machines, people, quality, and production data into one adaptive industrial system.", to: "/platforms/indus" },
];

export const navigation = [
  { label: "About", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Case studies", to: "/case-studies" },
  { label: "More", to: "/more" },
] as const;