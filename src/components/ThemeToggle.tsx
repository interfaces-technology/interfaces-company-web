"use client";

import { useSyncExternalStore } from "react";
import {
  applyTheme,
  isTheme,
  toggleTheme,
  type Theme,
} from "@/lib/theme";

const THEME_CHANGE_EVENT = "interfaces-theme-change";

function subscribe(onStoreChange: () => void) {
  const handler = () => onStoreChange();
  window.addEventListener("storage", handler);
  window.addEventListener(THEME_CHANGE_EVENT, handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(THEME_CHANGE_EVENT, handler);
  };
}

function getSnapshot(): Theme {
  const attr = document.documentElement.getAttribute("data-theme");
  return isTheme(attr) ? attr : "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

type ThemeToggleProps = {
  className?: string;
  onHover?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function ThemeToggle({ className, onHover }: ThemeToggleProps) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const handleToggle = () => {
    const next = toggleTheme(theme);
    applyTheme(next);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      onMouseEnter={onHover}
      className={className}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`theme: ${theme}`}
    >
      [theme: {theme}]
    </button>
  );
}
