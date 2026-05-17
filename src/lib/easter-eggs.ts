export const CONSOLE_JOKES = [
  "%c🎨 Designer detected in viewport",
  "color: #A855F7; font-size: 14px; font-weight: bold;",
  "%c💻 Developer note: This site has more animations than my last PR",
  "color: #8B5CF6; font-size: 12px;",
  "%c☕ Tip: Coffee levels directly correlate with approval chance",
  "color: #EC4899; font-size: 12px;",
  "%c🐛 Known issue: emotional stability module still loading",
  "color: #64748B; font-size: 11px;",
  "%c⌨️  Try typing: MEET, DESIGN, or FRIEND",
  "color: #38BDF8; font-size: 11px;",
];

export const TERMINAL_LINES = [
  { type: "command" as const, text: "$ npm run ask-her-out" },
  { type: "success" as const, text: "✔ confidence loaded" },
  { type: "success" as const, text: "✔ humor installed" },
  { type: "success" as const, text: "✔ friendship verified" },
  { type: "warn" as const, text: "⚠ emotional stability missing" },
  { type: "info" as const, text: "→ Meeting request ready." },
];

export const KEYBOARD_SECRETS: Record<string, string> = {
  MEET: "🎉 Secret unlocked: Best meetings include good coffee and zero Figma blame.",
  DESIGN: "🎨 Designer supremacy acknowledged. Developer CSS has entered safe mode.",
  FRIEND: "💜 Friendship.dll loaded successfully. Cannot uninstall.",
  APPROVED: "😌 You found the cheat code. Meeting status: obviously yes.",
};
