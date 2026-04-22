export const themeModes = ["light", "dark"] as const;

export type ThemeMode = (typeof themeModes)[number];
export type PrimaryTheme = "cobalt" | "emerald" | "amber" | "rose";

export const primaryThemeOptions: Array<{
  value: PrimaryTheme;
  label: string;
  accent: string;
}> = [
  { value: "cobalt", label: "Cobalt", accent: "#2f6df5" },
  { value: "emerald", label: "Emerald", accent: "#069669" },
  { value: "amber", label: "Amber", accent: "#d97706" },
  { value: "rose", label: "Rose", accent: "#e11d48" },
];

export const defaultThemePreferences = {
  mode: "light" as ThemeMode,
  primary: "cobalt" as PrimaryTheme,
};

export const themeStorageKeys = {
  mode: "landing-theme",
  primary: "landing-primary",
} as const;

export function isThemeMode(value: string | undefined): value is ThemeMode {
  return themeModes.some((mode) => mode === value);
}

export function isPrimaryTheme(
  value: string | undefined,
): value is PrimaryTheme {
  return primaryThemeOptions.some((item) => item.value === value);
}
