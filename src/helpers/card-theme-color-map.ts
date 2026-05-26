type CardTheme = "blue" | "purple" | "yellow" | "orange" | "gray";

export const themeColorMap: Record<
  CardTheme,
  { up: string; down: string; neutral: string }
> = {
  blue: {
    up: "#039855", // green
    down: "#D92D20", // red
    neutral: "#98A2B3", // gray
  },
  purple: {
    up: "#039855", // green
    down: "#D92D20", // red
    neutral: "#98A2B3",
  },
  yellow: {
    up: "#D92D20", // red
    down: "#039855", // green
    neutral: "#B54708", // maybe amber?
  },
  orange: {
    up: "#FF6B00",
    down: "#0057FF",
    neutral: "#9CA3AF",
  },
  gray: {
    up: "#444",
    down: "#999",
    neutral: "#ccc",
  },
};
