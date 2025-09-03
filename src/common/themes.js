// src/common/themes.js
// Theme registry with HSL token sets (vars) + static Tailwind class palette (classes).
// - vars are H S% L% triplets (no hsl() wrapper) so components can use hsl(var(--...))
// - classes are static Tailwind utility strings (discoverable by JIT)

// ---------------------------------------------
// Theme definitions
// ---------------------------------------------
export const themes = {
  default: {
    name: "Default",
    vars: {
      // core
      background: "0 0% 100%", // white
      text: "220 15% 10%", // gray-900-ish
      mutedText: "220 8% 50%", // gray-600-ish
      border: "220 12% 92%", // gray-200-ish
      card: "0 0% 100%", // card background
      hover: "220 12% 98%",
      // primary / accents
      primary100: "210 90% 96%",
      primary500: "210 90% 43%",
      primary600: "210 90% 36%",
      accent500: "24 100% 50%",
    },
    classes: {
      background: "bg-white",
      text: "text-gray-900",
      mutedText: "text-gray-600",
      border: "border-gray-200",
      card: "bg-white",
      hover: "hover:bg-gray-50",
      btnPrimary:
        "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500",
      avatarBg: "bg-blue-600",
      iconText: "text-blue-600",
      primaryLightBg: "bg-blue-100",
      sidebarBg: "bg-white",
      sidebarText: "text-gray-600",
      sidebarMuted: "text-gray-500",
      sidebarBorder: "border-gray-200",
      sidebarHoverBg: "hover:bg-gray-100",
      sidebarActiveBg: "bg-gray-100",
      sidebarActiveText: "text-gray-900",
    },
  },

  dark: {
    name: "Dark",
    vars: {
      background: "220 13% 10%", // dark bg
      text: "0 0% 100%", // white text
      mutedText: "220 12% 72%", // lighter muted in dark
      border: "220 13% 20%", // dark border
      card: "220 12% 14%",
      hover: "220 13% 16%",
      primary100: "210 50% 12%",
      primary500: "210 60% 60%",
      primary600: "210 60% 50%",
      accent500: "24 100% 50%",
    },
    classes: {
      background: "bg-gray-900",
      text: "text-white",
      mutedText: "text-gray-300",
      border: "border-gray-700",
      card: "bg-gray-800",
      hover: "hover:bg-gray-800",
      btnPrimary:
        "bg-slate-600 text-white hover:bg-slate-700 focus-visible:ring-slate-500",
      avatarBg: "bg-slate-600",
      iconText: "text-slate-400",
      primaryLightBg: "bg-slate-800",
      sidebarBg: "bg-gray-900",
      sidebarText: "text-gray-300",
      sidebarMuted: "text-gray-400",
      sidebarBorder: "border-gray-700",
      sidebarHoverBg: "hover:bg-gray-800",
      sidebarActiveBg: "bg-gray-800",
      sidebarActiveText: "text-white",
    },
  },

  green: {
    name: "Green",
    vars: {
      background: "0 0% 100%",
      text: "220 15% 10%",
      mutedText: "220 8% 50%",
      border: "220 12% 92%",
      card: "0 0% 100%",
      hover: "220 12% 98%",
      primary100: "145 60% 96%",
      primary500: "145 60% 40%",
      primary600: "145 60% 34%",
      accent500: "48 100% 50%",
    },
    classes: {
      background: "bg-white",
      text: "text-gray-900",
      mutedText: "text-gray-600",
      border: "border-gray-200",
      card: "bg-white",
      hover: "hover:bg-gray-100",
      btnPrimary:
        "bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-500",
      avatarBg: "bg-green-600",
      iconText: "text-green-600",
      primaryLightBg: "bg-green-100",
      sidebarBg: "bg-white",
      sidebarText: "text-gray-600",
      sidebarMuted: "text-gray-500",
      sidebarBorder: "border-gray-200",
      sidebarHoverBg: "hover:bg-gray-100",
      sidebarActiveBg: "bg-green-50",
      sidebarActiveText: "text-green-700",
    },
  },

  purple: {
    name: "Purple",
    vars: {
      background: "0 0% 100%",
      text: "220 15% 10%",
      mutedText: "220 8% 50%",
      border: "220 12% 92%",
      card: "0 0% 100%",
      hover: "220 12% 98%",
      primary100: "270 60% 96%",
      primary500: "270 60% 45%",
      primary600: "270 60% 38%",
      accent500: "320 80% 60%",
    },
    classes: {
      background: "bg-white",
      text: "text-gray-900",
      mutedText: "text-gray-600",
      border: "border-gray-200",
      card: "bg-white",
      hover: "hover:bg-gray-100",
      btnPrimary:
        "bg-purple-600 text-white hover:bg-purple-700 focus-visible:ring-purple-500",
      avatarBg: "bg-purple-600",
      iconText: "text-purple-600",
      primaryLightBg: "bg-purple-100",
      sidebarBg: "bg-white",
      sidebarText: "text-gray-600",
      sidebarMuted: "text-gray-500",
      sidebarBorder: "border-gray-200",
      sidebarHoverBg: "hover:bg-gray-100",
      sidebarActiveBg: "bg-purple-50",
      sidebarActiveText: "text-purple-700",
    },
  },

  orange: {
    name: "Orange",
    vars: {
      background: "0 0% 100%",
      text: "220 15% 10%",
      mutedText: "220 8% 50%",
      border: "220 12% 92%",
      card: "0 0% 100%",
      hover: "220 12% 98%",
      primary100: "24 100% 96%",
      primary500: "24 100% 45%",
      primary600: "24 100% 38%",
      accent500: "210 90% 43%",
    },
    classes: {
      background: "bg-white",
      text: "text-gray-900",
      mutedText: "text-gray-600",
      border: "border-gray-200",
      card: "bg-white",
      hover: "hover:bg-gray-100",
      btnPrimary:
        "bg-orange-600 text-white hover:bg-orange-700 focus-visible:ring-orange-500",
      avatarBg: "bg-orange-600",
      iconText: "text-orange-600",
      primaryLightBg: "bg-orange-100",
      sidebarBg: "bg-white",
      sidebarText: "text-gray-600",
      sidebarMuted: "text-gray-500",
      sidebarBorder: "border-gray-200",
      sidebarHoverBg: "hover:bg-gray-100",
      sidebarActiveBg: "bg-orange-50",
      sidebarActiveText: "text-orange-700",
    },
  },

  teal: {
    name: "Teal",
    vars: {
      background: "0 0% 100%",
      text: "220 15% 10%",
      mutedText: "220 8% 50%",
      border: "220 12% 92%",
      card: "0 0% 100%",
      hover: "220 12% 98%",
      primary100: "175 60% 96%",
      primary500: "175 60% 40%",
      primary600: "175 60% 34%",
      accent500: "280 80% 60%",
    },
    classes: {
      background: "bg-white",
      text: "text-gray-900",
      mutedText: "text-gray-600",
      border: "border-gray-200",
      card: "bg-white",
      hover: "hover:bg-gray-100",
      btnPrimary:
        "bg-teal-600 text-white hover:bg-teal-700 focus-visible:ring-teal-500",
      avatarBg: "bg-teal-600",
      iconText: "text-teal-600",
      primaryLightBg: "bg-teal-100",
      sidebarBg: "bg-white",
      sidebarText: "text-gray-600",
      sidebarMuted: "text-gray-500",
      sidebarBorder: "border-gray-200",
      sidebarHoverBg: "hover:bg-gray-100",
      sidebarActiveBg: "bg-teal-50",
      sidebarActiveText: "text-teal-700",
    },
  },

  indigo: {
    name: "Indigo",
    vars: {
      background: "0 0% 100%",
      text: "220 15% 10%",
      mutedText: "220 8% 50%",
      border: "220 12% 92%",
      card: "0 0% 100%",
      hover: "220 12% 98%",
      primary100: "230 60% 96%",
      primary500: "230 60% 45%",
      primary600: "230 60% 38%",
      accent500: "330 80% 60%",
    },
    classes: {
      background: "bg-white",
      text: "text-gray-900",
      mutedText: "text-gray-600",
      border: "border-gray-200",
      card: "bg-white",
      hover: "hover:bg-gray-100",
      btnPrimary:
        "bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-500",
      avatarBg: "bg-indigo-600",
      iconText: "text-indigo-600",
      primaryLightBg: "bg-indigo-100",
      sidebarBg: "bg-white",
      sidebarText: "text-gray-600",
      sidebarMuted: "text-gray-500",
      sidebarBorder: "border-gray-200",
      sidebarHoverBg: "hover:bg-gray-100",
      sidebarActiveBg: "bg-indigo-50",
      sidebarActiveText: "text-indigo-700",
    },
  },

  rose: {
    name: "Rose",
    vars: {
      background: "0 0% 100%",
      text: "220 15% 10%",
      mutedText: "220 8% 50%",
      border: "220 12% 92%",
      card: "0 0% 100%",
      hover: "220 12% 98%",
      primary100: "340 60% 96%",
      primary500: "340 60% 45%",
      primary600: "340 60% 38%",
      accent500: "150 60% 45%",
    },
    classes: {
      background: "bg-white",
      text: "text-gray-900",
      mutedText: "text-gray-600",
      border: "border-gray-200",
      card: "bg-white",
      hover: "hover:bg-gray-100",
      btnPrimary:
        "bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-rose-500",
      avatarBg: "bg-rose-600",
      iconText: "text-rose-600",
      primaryLightBg: "bg-rose-100",
      sidebarBg: "bg-white",
      sidebarText: "text-gray-600",
      sidebarMuted: "text-gray-500",
      sidebarBorder: "border-gray-200",
      sidebarHoverBg: "hover:bg-gray-100",
      sidebarActiveBg: "bg-rose-50",
      sidebarActiveText: "text-rose-700",
    },
  },

  emerald: {
    name: "Emerald",
    vars: {
      background: "0 0% 100%",
      text: "220 15% 10%",
      mutedText: "220 8% 50%",
      border: "220 12% 92%",
      card: "0 0% 100%",
      hover: "220 12% 98%",
      primary100: "140 60% 96%",
      primary500: "140 60% 40%",
      primary600: "140 60% 34%",
      accent500: "260 80% 60%",
    },
    classes: {
      background: "bg-white",
      text: "text-gray-900",
      mutedText: "text-gray-600",
      border: "border-gray-200",
      card: "bg-white",
      hover: "hover:bg-gray-100",
      btnPrimary:
        "bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:ring-emerald-500",
      avatarBg: "bg-emerald-600",
      iconText: "text-emerald-600",
      primaryLightBg: "bg-emerald-100",
      sidebarBg: "bg-white",
      sidebarText: "text-gray-600",
      sidebarMuted: "text-gray-500",
      sidebarBorder: "border-gray-200",
      sidebarHoverBg: "hover:bg-gray-100",
      sidebarActiveBg: "bg-emerald-50",
      sidebarActiveText: "text-emerald-700",
    },
  },
};

// ---------------------------------------------
// Helpers & exports
// ---------------------------------------------

export const DEFAULT_THEME = "default";

// Return an array usable by theme pickers: [{ key, name }, ...]
export const getThemeList = () =>
  Object.keys(themes).map((k) => ({ key: k, name: themes[k].name }));

// Backwards-compatible palette getter (returns the static Tailwind classes)
export const getPalette = (themeName) => {
  const t = themes[themeName];
  if (!t) return themes[DEFAULT_THEME].classes;
  return t.classes;
};

// Apply theme: write CSS variables (H S% L% triplets) to :root and set data-theme attr
export const applyTheme = (themeName) => {
  const root =
    typeof document !== "undefined" ? document.documentElement : null;
  if (!root) {
    // server-side environment: nothing to do
    return;
  }

  const theme = themes[themeName] || themes[DEFAULT_THEME];

  // set data attribute for legacy CSS hooks
  root.setAttribute("data-theme", themeName);

  // write vars (we prefix with --theme- and --primary-)
  const v = theme.vars || {};
  const setters = [
    ["--theme-background", v.background],
    ["--theme-text", v.text],
    ["--theme-muted-text", v.mutedText],
    ["--theme-border", v.border],
    ["--theme-card", v.card],
    ["--theme-hover", v.hover],
    ["--primary-100", v.primary100],
    ["--primary-500", v.primary500],
    ["--primary-600", v.primary600],
    ["--accent-500", v.accent500],
  ];

  setters.forEach(([name, val]) => {
    if (typeof val !== "undefined" && val !== null) {
      root.style.setProperty(name, val);
    }
  });

  // small debug trace
  // console.debug("[themes] applyTheme ->", themeName);
};

// Export themes object (so other modules can inspect available themes if needed)
export default themes;
