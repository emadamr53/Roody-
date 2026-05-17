export const LOADING_MESSAGES = [
  "Checking designer availability...",
  "Compiling courage...",
  "Verifying friendship status...",
  "Fixing emotional bugs...",
  "Analyzing vibes...",
  "Removing awkward silence...",
  "Requesting approval from creative department...",
  "Aligning pixels with feelings...",
  "Running npm install confidence...",
] as const;

export const INTRO_SEQUENCE = [
  "Initializing Meeting Protocol...",
  "Graphic Designer Detected 🎨",
  "Developer Request Pending 💻",
] as const;

export const MOOD_OPTIONS = [
  { value: "creative", label: "Peak creative chaos" },
  { value: "chill", label: "Calm but judging silently" },
  { value: "caffeinated", label: "Powered by espresso" },
  { value: "mysterious", label: "Designer mood: classified" },
] as const;

export const CSS_JUDGMENT_OPTIONS = [
  { value: "low", label: "I'll be nice today" },
  { value: "medium", label: "Mild side-eye possible" },
  { value: "high", label: "I brought my red pen" },
  { value: "critical", label: "I already opened Figma comments" },
] as const;
