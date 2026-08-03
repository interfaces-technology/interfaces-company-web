export const NAV = [
  { id: "what-we-do", label: "what_we_do", index: "01" },
  { id: "operating-model", label: "operating_model", index: "02" },
  { id: "current-directions", label: "current_work", index: "03" },
  { id: "point-of-view", label: "point_of_view", index: "04" },
  { id: "contact", label: "contact", index: "05" },
] as const;

export const BOOT_LINES = [
  "> initializing public interface...",
  "> loading practice model...",
  "> lab .......... online",
  "> studio ....... online",
  "> foundry ...... online",
  "> company ...... online",
] as const;

export const CAPABILITIES = [
  { index: "01", label: "product strategy" },
  { index: "02", label: "interface design" },
  { index: "03", label: "software development" },
  { index: "04", label: "brand systems" },
  { index: "05", label: "product experiments" },
] as const;

export const OPERATING_MODEL = [
  { name: "LAB", description: "explores new ideas" },
  { name: "STUDIO", description: "applies craft to client and partner work" },
  { name: "FOUNDRY", description: "releases products" },
  { name: "COMPANY", description: "maintains the practice" },
] as const;

export const DIRECTIONS = [
  {
    index: "01",
    name: "PLAY",
    path: "/play",
    description: "tools for playful thinking and making",
  },
  {
    index: "02",
    name: "SCREENING",
    path: "/screening",
    description: "systems for review, selection, and evaluation",
  },
  {
    index: "03",
    name: "WORKBENCH",
    path: "/workbench",
    description: "creative operating tools",
  },
  {
    index: "04",
    name: "FIELD MANUAL",
    path: "/field-manual",
    description: "documentation for practice",
  },
  {
    index: "05",
    name: "POSTRUN",
    path: "/postrun",
    description: "private running instrument",
  },
] as const;

export const STATUS = {
  company: "active",
  mode: "public",
  version: "0.1",
  build: "existence-proof",
  operator: "Hamza",
  contact: "hamza@justinterfaces.tech",
  location: "London / Web",
} as const;
