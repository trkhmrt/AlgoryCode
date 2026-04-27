"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useLayoutEffect,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "algory-theme";

function readThemeFromDocument(): Theme | null {
  if (typeof document === "undefined") return null;
  const a = document.documentElement.getAttribute("data-theme");
  if (a === "light" || a === "dark") return a;
  return null;
}

function resolveTheme(): Theme {
  const fromDom = readThemeFromDocument();
  if (fromDom) return fromDom;
  if (typeof window === "undefined") return "light";
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "light" || v === "dark") return v;
  } catch {
    /* ignore */
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
} | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [hydrated, setHydrated] = useState(false);

  const setTheme = useCallback((t: Theme) => setThemeState(t), []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  useLayoutEffect(() => {
    if (!hydrated) {
      const r = resolveTheme();
      setHydrated(true);
      setThemeState(r);
      document.documentElement.setAttribute("data-theme", r);
      document.documentElement.style.colorScheme = r === "dark" ? "dark" : "light";
      try {
        localStorage.setItem(STORAGE_KEY, r);
      } catch {
        /* ignore */
      }
      return;
    }
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme === "dark" ? "dark" : "light";
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme, hydrated]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
