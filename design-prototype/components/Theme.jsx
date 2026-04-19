// Theme provider + global style hook
const ThemeCtx = React.createContext(null);

function ThemeProvider({ children, initial }) {
  const [state, setState] = React.useState(() => ({
    themeName: initial?.themeName || 'terminal',
    mode: initial?.mode || 'dark',
    typeName: initial?.typeName || 'geoSans',
    generalLayout: 'A',
    lang: initial?.lang || 'ko',
  }));

  const t = window.TOKENS.themes[state.themeName][state.mode];
  const type = window.TOKENS.typePairs[state.typeName];

  const set = React.useCallback((patch) => {
    setState(s => ({ ...s, ...patch }));
    try {
      const edits = {};
      for (const k of Object.keys(patch)) edits[k] = patch[k];
      window.parent?.postMessage({ type: '__edit_mode_set_keys', edits }, '*');
    } catch {}
  }, []);

  // Write CSS variables on <html> so global styles / markdown can pick them up
  React.useEffect(() => {
    const root = document.documentElement;
    for (const [k, v] of Object.entries(t)) root.style.setProperty(`--${k}`, v);
    root.style.setProperty('--font-display', type.display);
    root.style.setProperty('--font-body', type.body);
    root.style.setProperty('--font-mono', type.mono);
    root.style.setProperty('color-scheme', state.mode);
    document.body.style.background = t.bg;
    document.body.style.color = t.text;
    document.body.style.fontFamily = type.body;
  }, [t, type, state.mode]);

  return (
    <ThemeCtx.Provider value={{ ...state, t, type, set }}>
      {children}
    </ThemeCtx.Provider>
  );
}

function useTheme() { return React.useContext(ThemeCtx); }

window.ThemeProvider = ThemeProvider;
window.useTheme = useTheme;
window.ThemeCtx = ThemeCtx;
