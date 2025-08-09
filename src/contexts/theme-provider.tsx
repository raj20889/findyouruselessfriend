"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "girl" | "boy";

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "girl",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return "girl";
    }
    return (localStorage.getItem("useless-friend-theme") as Theme) || "girl";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    const body = window.document.body;

    root.classList.remove("dark", "light", "theme-boy", "theme-girl");
    body.classList.remove("font-space-grotesk", "font-poppins");

    if (theme === "boy") {
      root.classList.add("dark", "theme-boy");
      body.classList.add("font-space-grotesk");
    } else {
      root.classList.add("light", "theme-girl");
      body.classList.add("font-poppins");
    }

    localStorage.setItem("useless-friend-theme", theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
