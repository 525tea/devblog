// Design tokens — README Blog

export type ThemeName = 'terminal' | 'paper' | 'docs' | 'glass';
export type Mode = 'light' | 'dark';
export type TypeName = 'geoSans' | 'modernSerif' | 'humanist';

export interface ColorSet {
  bg: string; surface: string; surfaceAlt: string;
  border: string; borderStrong: string;
  text: string; textMuted: string; textSubtle: string;
  accent: string; accentText: string;
  tag: string; tagText: string;
  code: string; codeBg: string;
  overlay: string;
}

export interface TypePair {
  display: string; body: string; mono: string;
}

export const DEFAULT_THEME: ThemeName = 'terminal';
export const DEFAULT_MODE: Mode = 'dark';
export const DEFAULT_TYPE: TypeName = 'humanist';

export const THEMES: Record<TheㅎmeName, Record<Mode, ColorSet>> = {
  terminal: {
    light: {
      bg: '#fafafa', surface: '#ffffff', surfaceAlt: '#f0f0f0',
      border: '#e0e0e0', borderStrong: '#c8c8c8',
      text: '#0a0a0a', textMuted: '#5a5a5a', textSubtle: '#909090',
      accent: '#0d7a3f', accentText: '#ffffff',
      tag: '#eeeeee', tagText: '#3a3a3a',
      code: '#0a0a0a', codeBg: '#f4f4f4', overlay: 'rgba(10,10,10,0.6)',
    },
    dark: {
      bg: '#0a0c0a', surface: '#111511', surfaceAlt: '#161b16',
      border: '#242a24', borderStrong: '#3a433a',
      text: '#e8eee6', textMuted: '#8a9488', textSubtle: '#5a655a',
      accent: '#4ade80', accentText: '#0a0c0a',
      tag: '#1a201a', tagText: '#a8b0a6',
      code: '#d0d8ce', codeBg: '#0f130f', overlay: 'rgba(0,0,0,0.75)',
    },
  },
  paper: {
    light: {
      bg: '#faf8f5', surface: '#ffffff', surfaceAlt: '#f2efe9',
      border: '#e6e1d7', borderStrong: '#d4cdbe',
      text: '#1a1814', textMuted: '#6b655b', textSubtle: '#9a9286',
      accent: '#b45632', accentText: '#ffffff',
      tag: '#edeae2', tagText: '#5a5247',
      code: '#2d2a24', codeBg: '#f5f2ec', overlay: 'rgba(26,24,20,0.55)',
    },
    dark: {
      bg: '#14120f', surface: '#1c1a16', surfaceAlt: '#24211c',
      border: '#34302a', borderStrong: '#4a453e',
      text: '#f5f1ea', textMuted: '#a89f91', textSubtle: '#6b655b',
      accent: '#d87a54', accentText: '#14120f',
      tag: '#2a2722', tagText: '#b8ae9e',
      code: '#e8e2d6', codeBg: '#201d18', overlay: 'rgba(0,0,0,0.65)',
    },
  },
  docs: {
    light: {
      bg: '#ffffff', surface: '#ffffff', surfaceAlt: '#f7f8fa',
      border: '#e5e8ec', borderStrong: '#c8cdd4',
      text: '#0f1419', textMuted: '#5b6470', textSubtle: '#8b94a0',
      accent: '#2563eb', accentText: '#ffffff',
      tag: '#eef1f6', tagText: '#3b4552',
      code: '#0f1419', codeBg: '#f4f6f9', overlay: 'rgba(15,20,25,0.55)',
    },
    dark: {
      bg: '#0c1016', surface: '#141922', surfaceAlt: '#1a2030',
      border: '#242b38', borderStrong: '#38414f',
      text: '#e8ecf2', textMuted: '#8b94a5', textSubtle: '#5b6373',
      accent: '#60a5fa', accentText: '#0c1016',
      tag: '#1c2230', tagText: '#a8b0bf',
      code: '#d8dde5', codeBg: '#10141b', overlay: 'rgba(0,0,0,0.65)',
    },
  },
  glass: {
    light: {
      bg: '#e8e0f8', surface: 'rgba(255,255,255,0.45)', surfaceAlt: 'rgba(255,255,255,0.28)',
      border: 'rgba(200,180,255,0.35)', borderStrong: 'rgba(160,120,255,0.55)',
      text: '#1a0f2e', textMuted: '#5a4070', textSubtle: '#9070c0',
      accent: '#7c3aed', accentText: '#ffffff',
      tag: 'rgba(124,58,237,0.12)', tagText: '#4c1d95',
      code: '#1a0f2e', codeBg: 'rgba(255,255,255,0.55)', overlay: 'rgba(26,15,46,0.45)',
    },
    dark: {
      bg: '#08040f', surface: 'rgba(255,255,255,0.07)', surfaceAlt: 'rgba(255,255,255,0.11)',
      border: 'rgba(255,255,255,0.13)', borderStrong: 'rgba(255,255,255,0.28)',
      text: '#f5f0ff', textMuted: '#b0a0cc', textSubtle: '#6e6090',
      accent: '#d08cff', accentText: '#08040f',
      tag: 'rgba(255,255,255,0.09)', tagText: '#ccc0e0',
      code: '#eedeff', codeBg: 'rgba(255,255,255,0.06)', overlay: 'rgba(0,0,0,0.80)',
    },
  },
};

export const TYPE_PAIRS: Record<TypeName, TypePair> = {
  geoSans: {
    display: '"Space Grotesk", "Pretendard", sans-serif',
    body: '"Inter", "Pretendard", -apple-system, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, Menlo, monospace',
  },
  modernSerif: {
    display: '"Fraunces", "Noto Serif KR", Georgia, serif',
    body: '"Inter", "Pretendard", -apple-system, BlinkMacSystemFont, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
  },
  humanist: {
    display: '"IBM Plex Sans", "Pretendard", sans-serif',
    body: '"IBM Plex Sans", "Pretendard", sans-serif',
    mono: '"IBM Plex Mono", ui-monospace, Menlo, monospace',
  },
};

export const SHADOW = {
  sm: '0 1px 2px rgba(0,0,0,0.04)',
  md: '0 2px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.08)',
  lg: '0 8px 24px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.06)',
};
