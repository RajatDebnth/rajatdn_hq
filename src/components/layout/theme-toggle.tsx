"use client";

import { useEffect } from "react";

type Theme = "light" | "dark";

function preferredTheme(): Theme {
  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle() {
  useEffect(() => {
    document.documentElement.dataset.theme = preferredTheme();
  }, []);

  function toggleTheme() {
    const currentTheme = document.documentElement.dataset.theme ?? preferredTheme();
    const nextTheme: Theme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("theme", nextTheme);
  }

  return (
    <button
      aria-label="Toggle color theme"
      className="theme-toggle"
      onClick={toggleTheme}
      title="Toggle color theme"
      type="button"
    >
      <span aria-hidden="true">◐</span>
    </button>
  );
}
