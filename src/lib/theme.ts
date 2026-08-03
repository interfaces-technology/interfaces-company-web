export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "interfaces-theme";

export function isTheme(value: string | null | undefined): value is Theme {
  return value === "dark" || value === "light";
}

export function getPreferredTheme(): Theme {
  if (typeof window === "undefined") return "dark";

  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (isTheme(stored)) return stored;
  } catch {
    // ignore storage access errors
  }

  if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    return "light";
  }

  return "dark";
}

export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // ignore storage access errors
  }
}

export function toggleTheme(current: Theme): Theme {
  return current === "dark" ? "light" : "dark";
}

/** Inline boot script — set theme before paint to avoid a flash. */
export const THEME_BOOT_SCRIPT = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var t=localStorage.getItem(k);if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;
