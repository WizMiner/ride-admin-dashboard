// Simplified theme system using Tailwind classes
export const themes = {
  default: {
    name: 'Default',
    classes: {
      primary: 'blue',
      secondary: 'gray',
      accent: 'orange',
      background: 'white',
      text: 'gray-900',
      textMuted: 'gray-600',
      border: 'gray-200',
      card: 'white',
      hover: 'gray-50'
    }
  },
  
  dark: {
    name: 'Dark',
    classes: {
      primary: 'blue',
      secondary: 'gray',
      accent: 'orange',
      background: 'gray-900',
      text: 'white',
      textMuted: 'gray-300',
      border: 'gray-700',
      card: 'gray-800',
      hover: 'gray-700'
    }
  },
  
  green: {
    name: 'Green',
    classes: {
      primary: 'green',
      secondary: 'gray',
      accent: 'yellow',
      background: 'white',
      text: 'gray-900',
      textMuted: 'gray-600',
      border: 'gray-200',
      card: 'white',
      hover: 'gray-50'
    }
  },
  
  purple: {
    name: 'Purple',
    classes: {
      primary: 'purple',
      secondary: 'gray',
      accent: 'pink',
      background: 'white',
      text: 'gray-900',
      textMuted: 'gray-600',
      border: 'gray-200',
      card: 'white',
      hover: 'gray-50'
    }
  },
  
  red: {
    name: 'Red',
    classes: {
      primary: 'red',
      secondary: 'gray',
      accent: 'blue',
      background: 'white',
      text: 'gray-900',
      textMuted: 'gray-600',
      border: 'gray-200',
      card: 'white',
      hover: 'gray-50'
    }
  },
  
  orange: {
    name: 'Orange',
    classes: {
      primary: 'orange',
      secondary: 'gray',
      accent: 'teal',
      background: 'white',
      text: 'gray-900',
      textMuted: 'gray-600',
      border: 'gray-200',
      card: 'white',
      hover: 'gray-50'
    }
  },
  
  teal: {
    name: 'Teal',
    classes: {
      primary: 'teal',
      secondary: 'gray',
      accent: 'purple',
      background: 'white',
      text: 'gray-900',
      textMuted: 'gray-600',
      border: 'gray-200',
      card: 'white',
      hover: 'gray-50'
    }
  },
  
  indigo: {
    name: 'Indigo',
    classes: {
      primary: 'indigo',
      secondary: 'gray',
      accent: 'rose',
      background: 'white',
      text: 'gray-900',
      textMuted: 'gray-600',
      border: 'gray-200',
      card: 'white',
      hover: 'gray-50'
    }
  },
  
  rose: {
    name: 'Rose',
    classes: {
      primary: 'rose',
      secondary: 'gray',
      accent: 'emerald',
      background: 'white',
      text: 'gray-900',
      textMuted: 'gray-600',
      border: 'gray-200',
      card: 'white',
      hover: 'gray-50'
    }
  },
  
  emerald: {
    name: 'Emerald',
    classes: {
      primary: 'emerald',
      secondary: 'gray',
      accent: 'violet',
      background: 'white',
      text: 'gray-900',
      textMuted: 'gray-600',
      border: 'gray-200',
      card: 'white',
      hover: 'gray-50'
    }
  }
};

export const applyTheme = (themeName) => {
  const theme = themes[themeName];
  if (!theme) return;
  
  const root = document.documentElement;
  
  // Apply theme classes to the root element
  root.setAttribute('data-theme', themeName);
  
  // Update CSS custom properties for dynamic theming
  const colors = theme.classes;
  root.style.setProperty('--theme-primary', colors.primary);
  root.style.setProperty('--theme-secondary', colors.secondary);
  root.style.setProperty('--theme-accent', colors.accent);
  root.style.setProperty('--theme-background', colors.background);
  root.style.setProperty('--theme-text', colors.text);
  root.style.setProperty('--theme-text-muted', colors.textMuted);
  root.style.setProperty('--theme-border', colors.border);
  root.style.setProperty('--theme-card', colors.card);
  root.style.setProperty('--theme-hover', colors.hover);
};

export const getThemeList = () => {
  return Object.keys(themes).map(key => ({
    key,
    name: themes[key].name
  }));
};