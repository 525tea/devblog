// Tweaks — visitor version (theme + mode only) and admin version (full)
// Mount a floating panel in the bottom-right.

function TweaksPanel({ open, onClose }) {
  const theme = useTheme();
  const { t, type, themeName, mode, typeName, set } = theme;
  const isAdmin = typeof window !== 'undefined' &&
    (window.location.search.includes('tweaks') || window.__tweaksEditMode);

  if (!open) return null;

  return (
    <div style={{
      position: 'fixed', right: 20, bottom: 20, zIndex: 150,
      width: 320, maxWidth: 'calc(100vw - 40px)',
      background: t.surface, border: `1px solid ${t.border}`,
      borderRadius: 10, boxShadow: window.TOKENS.shadow.lg,
      fontFamily: type.body, overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px', borderBottom: `1px solid ${t.border}`,
        background: t.surfaceAlt,
      }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.text, fontFamily: type.display }}>Tweaks</div>
          <div style={{ fontSize: 10.5, color: t.textSubtle, marginTop: 1 }}>
            {isAdmin ? 'Admin — 전체 옵션' : '방문자 — 테마 · 모드'}
          </div>
        </div>
        <button onClick={onClose} style={{
          width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'transparent', border: 'none', color: t.textMuted, cursor: 'pointer', borderRadius: 4,
        }}><Icons.X size={14}/></button>
      </div>

      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 18, maxHeight: 'calc(100vh - 140px)', overflowY: 'auto' }}>
        <Field label="Theme" hint="색 팔레트를 고르세요">
          <SegRow
            options={[
              { v: 'terminal', label: 'Terminal', sub: 'dark · green' },
              { v: 'paper', label: 'Paper', sub: 'warm · terra' },
              { v: 'docs', label: 'Docs', sub: 'clean · blue' },
            ]}
            value={themeName} onChange={v => set({ themeName: v })} t={t}
          />
        </Field>

        <Field label="Mode" hint="라이트 / 다크">
          <SegRow
            options={[
              { v: 'light', label: 'Light', icon: <Icons.Sun size={13}/> },
              { v: 'dark', label: 'Dark', icon: <Icons.Moon size={13}/> },
            ]}
            value={mode} onChange={v => set({ mode: v })} t={t}
          />
        </Field>

        {isAdmin && (
          <>
            <Field label="Typography" hint="폰트 조합 (관리자만)">
              <SegRow
                options={[
                  { v: 'geoSans', label: 'Geo Sans', sub: 'Space Grotesk' },
                  { v: 'modernSerif', label: 'Modern Serif', sub: 'Fraunces' },
                  { v: 'humanist', label: 'Humanist', sub: 'IBM Plex' },
                ]}
                value={typeName} onChange={v => set({ typeName: v })} t={t}
              />
            </Field>

            <div style={{ padding: 10, border: `1px dashed ${t.border}`, borderRadius: 5, background: t.surfaceAlt }}>
              <div style={{ fontSize: 10.5, color: t.textSubtle, lineHeight: 1.55 }}>
                배포된 사이트에서는 <code style={{ fontFamily: type.mono, color: t.accent }}>?tweaks</code> 파라미터가 있을 때만 전체 옵션이 노출됩니다. 방문자에게는 <b>Theme / Mode</b>만 보여요.
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Field({ label, hint, children }) {
  const { t, type } = useTheme();
  return (
    <div>
      <div style={{ fontSize: 10.5, fontWeight: 700, color: t.textSubtle, letterSpacing: 0.8, textTransform: 'uppercase' }}>{label}</div>
      {hint && <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2, marginBottom: 8 }}>{hint}</div>}
      <div style={{ marginTop: hint ? 0 : 8 }}>{children}</div>
    </div>
  );
}

function SegRow({ options, value, onChange, t }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${options.length}, 1fr)`, gap: 6 }}>
      {options.map(o => {
        const active = value === o.v;
        return (
          <button key={o.v} onClick={() => onChange(o.v)} style={{
            padding: '8px 6px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            border: `1px solid ${active ? t.accent : t.border}`,
            background: active ? t.accent : 'transparent',
            color: active ? t.accentText : t.text,
            borderRadius: 5, cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: 600,
            transition: 'all 0.15s',
          }}>
            {o.icon && <span>{o.icon}</span>}
            <span>{o.label}</span>
            {o.sub && <span style={{ fontSize: 9.5, fontWeight: 400, opacity: active ? 0.85 : 0.6 }}>{o.sub}</span>}
          </button>
        );
      })}
    </div>
  );
}

window.TweaksPanel = TweaksPanel;
