import { useState, useEffect, useCallback } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const DARK_CLASS = "dark";
const DARK_MODE_QUERY = "(prefers-color-scheme: dark)";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  try {
    const savedTheme = localStorage.getItem(STORAGE_KEY);

    if (savedTheme === "dark" || savedTheme === "light") {
      return savedTheme;
    }
  } catch (error) {
    // localStorage may be unavailable.
    console.log(error);
  }

  return window.matchMedia(DARK_MODE_QUERY).matches ? "dark" : "light";
}

export default function useDarkMode() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const isDarkMode = theme === "dark";

  useEffect(() => {
    const html = document.documentElement;

    html.classList.toggle(DARK_CLASS, isDarkMode);

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // The theme still works if localStorage is unavailable.
    }
  }, [theme, isDarkMode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DARK_MODE_QUERY);

    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      try {
        const savedTheme = localStorage.getItem(STORAGE_KEY);

        // Respect the user's explicit theme preference.
        if (savedTheme === "dark" || savedTheme === "light") {
          return;
        }
      } catch {
        // Fall back to the system preference.
      }

      setTheme(event.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  const toggleDarkMode = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return {
    isDarkMode,
    toggleDarkMode,
  };
}
