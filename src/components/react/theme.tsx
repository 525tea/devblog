import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import {
  THEMES, TYPE_PAIRS,
  DEFAULT_THEME, DEFAULT_MODE, DEFAULT_TYPE,
  type ThemeName, type Mode, type TypeName, type ColorSet, type TypePair,
} from '@/lib/tokens';

interface ThemeState {
  themeName: ThemeName;
  mode: Mode;
  typeName: TypeName;
  lang: 'ko' | 'en';
}

interface ThemeCtxValue extends ThemeState {
  t: ColorSet;
  type: TypePair;
  isGlass: boolean;
  set: (patch: Partial<ThemeState>) => void;
}

const ThemeCtx = createContext<ThemeCtxValue | null>(null);

function readStorage(): Partial<ThemeState> {
  try {
    const raw = localStorage.getItem('readme:theme');
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ThemeState>(() => {
    const saved = readStorage();
    return {
      themeName: (saved.themeName as ThemeName) || DEFAULT_THEME,
      mode: (saved.mode as Mode) || DEFAULT_MODE,
      typeName: (saved.typeName as TypeName) || DEFAULT_TYPE,
      lang: (saved.lang as 'ko' | 'en') || 'ko',
    };
  });

  const t = THEMES[state.themeName][state.mode];
  const type = TYPE_PAIRS[state.typeName];
  const isGlass = state.themeName === 'glass';

  const set = useCallback((patch: Partial<ThemeState>) => {
    setState(s => {
      const next = { ...s, ...patch };
      try { localStorage.setItem('readme:theme', JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  // Apply CSS variables + data-theme attribute to <html>
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(t).forEach(([k, v]) => root.style.setProperty(`--${k}`, v));
    root.style.setProperty('--font-display', type.display);
    root.style.setProperty('--font-body', type.body);
    root.style.setProperty('--font-mono', type.mono);
    root.style.setProperty('color-scheme', state.mode);
    root.setAttribute('data-theme', state.themeName);
    root.setAttribute('data-mode', state.mode);
    document.body.style.background = isGlass ? 'transparent' : t.bg;
    document.body.style.color = t.text;
    document.body.style.fontFamily = type.body;
  }, [t, type, state.mode, state.themeName, isGlass]);

  return (
    <ThemeCtx.Provider value={{ ...state, t, type, isGlass, set }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export function useTheme(): ThemeCtxValue {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error('useTheme must be inside ThemeProvider');
  return ctx;
}
