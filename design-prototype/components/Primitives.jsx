// Footer — streamlined: no Projects dup, no RSS icon confusion
function Footer() {
  const { t, type } = useTheme();
  return (
    <footer style={{ marginTop: 80, borderTop: `1px solid ${t.border}`, background: t.surfaceAlt, padding: '40px 24px 32px' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, marginBottom: 32 }}>
          <div style={{ minWidth: 200 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
              <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 2, background: t.accent }} />
              <span style={{ fontFamily: type.display, fontSize: 18, fontWeight: 700, letterSpacing: -0.5 }}>README</span>
            </div>
            <p style={{ fontSize: 12, color: t.textMuted, lineHeight: 1.6, maxWidth: 280 }}>
              A full-stack engineer's log — backend systems, infra, and the projects in between.
            </p>
          </div>

          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 24 }}>
            <FooterCol title="Topics" items={[
              { label: 'Language', hint: 'Java · Python · SQL' },
              { label: 'CS', hint: 'OS · Network · DB' },
              { label: 'DevOps', hint: 'infra, CI/CD, K8s' },
              { label: 'Algorithm', hint: 'problem solving' },
            ]} />
            <FooterCol title="About" items={[
              { label: 'Profile', hint: '소개 · 이력' },
              { label: 'Uses', hint: '장비 · 에디터 · 폰트' },
            ]} />
            <FooterCol title="Feed" items={[
              { label: 'RSS', hint: '/rss.xml 구독' },
              { label: 'Sitemap', hint: '/sitemap.xml · SEO용' },
              { label: 'Archive', hint: '연도별 전체 글' },
            ]} />
          </div>

          <div style={{ minWidth: 200 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: t.textSubtle, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 10 }}>Visits</div>
            <div style={{ display: 'flex', gap: 18, fontFamily: type.mono }}>
              <div>
                <div style={{ fontSize: 11, color: t.textSubtle }}>today</div>
                <div style={{ fontSize: 18, color: t.text, fontWeight: 600 }}>142</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: t.textSubtle }}>total</div>
                <div style={{ fontSize: 18, color: t.text, fontWeight: 600 }}>48.2k</div>
              </div>
            </div>
            <div style={{ fontSize: 10.5, color: t.textSubtle, fontFamily: type.mono, marginTop: 4 }}>via GoatCounter</div>
            <div style={{ marginTop: 14, display: 'flex', gap: 10 }}>
              <a href="https://github.com/525tea" title="GitHub" style={iconLinkStyle(t)}><Icons.Github size={16}/></a>
              <a href="mailto:jene0028@gmail.com" title="Email" style={iconLinkStyle(t)}><Icons.Mail size={16}/></a>
            </div>
          </div>
        </div>

        <div style={{
          paddingTop: 20, borderTop: `1px solid ${t.border}`,
          display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between',
          fontSize: 11, color: t.textSubtle, fontFamily: type.body,
        }}>
          <span>© 2026 README. Built with Astro · Hosted on GitHub Pages.</span>
          <span>jene0028@gmail.com · github.com/525tea</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }) {
  const { t } = useTheme();
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 700, color: t.textSubtle, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 10 }}>{title}</div>
      {items.map(i => (
        <div key={i.label} title={i.hint} style={{ fontSize: 12.5, color: t.textMuted, padding: '4px 0', cursor: 'pointer', lineHeight: 1.3 }}
             onMouseEnter={e => e.currentTarget.style.color = t.text}
             onMouseLeave={e => e.currentTarget.style.color = t.textMuted}>
          {i.label}
          {i.hint && <div style={{ fontSize: 10.5, color: t.textSubtle, marginTop: 1 }}>{i.hint}</div>}
        </div>
      ))}
    </div>
  );
}

function iconLinkStyle(t) {
  return {
    width: 30, height: 30, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    border: `1px solid ${t.border}`, borderRadius: 4, color: t.textMuted, cursor: 'pointer', textDecoration: 'none',
  };
}

// Tag, Button, Pagination unchanged
function Tag({ children, onClick, variant = 'default', active = false }) {
  const { t, type } = useTheme();
  const style = variant === 'accent' || active
    ? { background: t.accent, color: t.accentText, border: 'none' }
    : { background: t.tag, color: t.tagText, border: `1px solid ${t.border}` };
  return (
    <span onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', padding: '2px 7px', fontSize: 11, fontWeight: 500,
      fontFamily: type.mono, borderRadius: 3, cursor: onClick ? 'pointer' : 'default', letterSpacing: 0.2, ...style,
    }}>{children}</span>
  );
}

function Button({ children, onClick, variant = 'primary', size = 'md', icon, iconRight }) {
  const { t, type } = useTheme();
  const sizes = { sm: { padding: '5px 10px', fontSize: 12 }, md: { padding: '8px 14px', fontSize: 13 }, lg: { padding: '10px 20px', fontSize: 14 } };
  const variants = {
    primary: { background: t.accent, color: t.accentText, border: 'none' },
    ghost: { background: 'transparent', color: t.text, border: `1px solid ${t.border}` },
    text: { background: 'transparent', color: t.text, border: 'none' },
  };
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 600, fontFamily: type.body,
      borderRadius: 5, cursor: 'pointer', transition: 'opacity 0.15s', ...sizes[size], ...variants[variant],
    }}
    onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
    onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
      {icon}{children}{iconRight}
    </button>
  );
}

function Pagination({ page, total, onChange }) {
  const { t, type } = useTheme();
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  const S = 32;
  const cell = (content, active, onClick, disabled) => (
    <button onClick={onClick} disabled={disabled} style={{
      minWidth: S, height: S, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      padding: '0 8px', background: active ? t.text : 'transparent',
      color: active ? t.bg : (disabled ? t.textSubtle : t.textMuted),
      border: `1px solid ${active ? t.text : t.border}`, borderRadius: 4,
      cursor: disabled ? 'default' : 'pointer', fontSize: 12.5, fontFamily: type.body, fontWeight: active ? 700 : 500,
    }}>{content}</button>
  );
  return (
    <div style={{ display: 'flex', gap: 4, justifyContent: 'center', padding: '24px 0' }}>
      {cell(<Icons.ArrowLeft size={13} />, false, () => onChange(Math.max(1, page - 1)), page === 1)}
      {pages.map(p => <span key={p}>{cell(p, p === page, () => onChange(p))}</span>)}
      {cell(<Icons.ArrowRight size={13} />, false, () => onChange(Math.min(total, page + 1)), page === total)}
    </div>
  );
}

window.Tag = Tag; window.Button = Button; window.Pagination = Pagination; window.Footer = Footer;
