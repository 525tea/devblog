// Header — sticky top bar with hover dropdowns + expanding search
// Minimalist: logo · (category on hover) · search · user · menu

function Header({ onNav, onOpenSearch, onOpenTweaks, blogName }) {
  const { t, type, mode, lang, set } = useTheme();
  const [hoverCat, setHoverCat] = React.useState(null);
  const barH = 56;

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: t.bg + 'ee', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${t.border}`,
    }}>
      <div style={{
        maxWidth: 1400, margin: '0 auto', height: barH, padding: '0 24px',
        display: 'flex', alignItems: 'center', gap: 32,
      }}>
        <a onClick={() => onNav({ route: 'home' })}
           style={{
             display: 'flex', alignItems: 'baseline', gap: 8, cursor: 'pointer',
             fontFamily: type.display, fontSize: 20, fontWeight: 700,
             color: t.text, letterSpacing: -0.5, userSelect: 'none',
           }}>
          <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 2, background: t.accent, transform: 'translateY(-1px)' }} />
          {blogName || 'README'}
        </a>

        <nav style={{ display: 'flex', gap: 4, flex: 1 }} onMouseLeave={() => setHoverCat(null)}>
          {window.CATEGORIES.map(cat => (
            <div key={cat.slug} style={{ position: 'relative' }} onMouseEnter={() => setHoverCat(cat.slug)}>
              <button onClick={() => onNav({ route: 'category', cat: cat.slug })}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '10px 12px', fontSize: 13.5, fontWeight: 500,
                  color: hoverCat === cat.slug ? t.text : t.textMuted,
                  fontFamily: type.body, transition: 'color 0.15s',
                }}>{cat.name}</button>
              {hoverCat === cat.slug && (
                <div style={{
                  position: 'absolute', top: '100%', left: 0, minWidth: 220, padding: 8,
                  background: t.surface, border: `1px solid ${t.border}`,
                  boxShadow: window.TOKENS.shadow.lg, borderRadius: 8, zIndex: 50,
                }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.8, color: t.textSubtle, padding: '6px 10px 8px', textTransform: 'uppercase' }}>
                    {cat.slug === 'project' ? 'Projects' : 'Topics'}
                  </div>
                  {cat.children.map(sub => (
                    <button key={sub.slug} onClick={() => { setHoverCat(null); onNav({ route: 'sub', cat: cat.slug, sub: sub.slug }); }}
                      style={{
                        display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center',
                        padding: '8px 10px', background: 'none', border: 'none', cursor: 'pointer',
                        textAlign: 'left', borderRadius: 5, color: t.text, fontSize: 13, fontFamily: type.body,
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = t.surfaceAlt}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <span>{sub.name}</span>
                      {sub.count != null && <span style={{ fontSize: 11, color: t.textSubtle }}>{sub.count}</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <IconBtn onClick={() => set({ lang: lang === 'ko' ? 'en' : 'ko' })} label={lang === 'ko' ? 'EN' : 'KO'} width={44} title="언어" />
          <IconBtn onClick={() => set({ mode: mode === 'dark' ? 'light' : 'dark' })} icon={mode === 'dark' ? <Icons.Sun size={18}/> : <Icons.Moon size={18}/>} title="다크/라이트" />
          <IconBtn onClick={onOpenSearch} icon={<Icons.Search size={18}/>} title="검색 (⌘K)" />
          <IconBtn icon={<Icons.User size={18}/>} title="로그인" />
          <MenuButton onNav={onNav} onOpenTweaks={onOpenTweaks} />
        </div>
      </div>
    </header>
  );
}

function IconBtn({ onClick, icon, label, width = 38, title }) {
  const { t, type } = useTheme();
  return (
    <button onClick={onClick} title={title} style={{
      width, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'none', border: 'none', cursor: 'pointer', color: t.textMuted,
      borderRadius: 6, fontFamily: type.body, fontSize: 12, fontWeight: 600, letterSpacing: 0.5,
    }}
    onMouseEnter={e => { e.currentTarget.style.background = t.surfaceAlt; e.currentTarget.style.color = t.text; }}
    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = t.textMuted; }}>
      {icon || label}
    </button>
  );
}

function MenuButton({ onNav, onOpenTweaks }) {
  const { t, type } = useTheme();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  // Show admin items only if ?admin is in URL
  const isAdmin = typeof window !== 'undefined' && window.location.search.includes('admin');
  // Tweaks are only visible to the owner (?tweaks in URL)
  const showTweaks = typeof window !== 'undefined' && window.location.search.includes('tweaks');

  React.useEffect(() => {
    const onClick = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const items = [
    { label: 'Series', icon: <Icons.Book size={14}/>, hint: '연재 글 묶음', action: () => onNav({ route: 'series' }) },
    { label: 'Archive', icon: <Icons.Calendar size={14}/>, hint: '연도별 전체 글', action: () => onNav({ route: 'archive' }) },
    { label: 'Tags', icon: <Icons.Tag size={14}/>, hint: '태그 모음', action: () => onNav({ route: 'tags' }) },
    { label: 'RSS', icon: <Icons.Rss size={14}/>, hint: '피드 구독' },
    isAdmin && { label: '새 글 작성', icon: <Icons.Edit size={14}/>, hint: 'GitHub로 이동', kbd: 'N' },
    isAdmin && { label: '관리', icon: <Icons.Folder size={14}/>, hint: '레포 이동' },
    showTweaks && { label: 'Tweaks', icon: <Icons.Globe size={14}/>, hint: '테마 · 레이아웃', action: onOpenTweaks },
  ].filter(Boolean);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <IconBtn onClick={() => setOpen(x => !x)} icon={<Icons.Menu size={18}/>} title="메뉴" />
      {open && (
        <div style={{
          position: 'absolute', top: '100%', right: 0, marginTop: 4, minWidth: 220, padding: 6,
          background: t.surface, border: `1px solid ${t.border}`, borderRadius: 8,
          boxShadow: window.TOKENS.shadow.lg, zIndex: 50,
        }}>
          {items.map((it, i) => (
            <button key={i} onClick={() => { setOpen(false); it.action && it.action(); }}
              style={{
                display: 'flex', width: '100%', alignItems: 'center', gap: 10, padding: '8px 10px',
                background: 'none', border: 'none', cursor: 'pointer', color: t.text, fontSize: 13,
                fontFamily: type.body, borderRadius: 5, textAlign: 'left',
              }}
              onMouseEnter={e => e.currentTarget.style.background = t.surfaceAlt}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <span style={{ color: t.textMuted, display: 'flex' }}>{it.icon}</span>
              <span style={{ flex: 1 }}>
                <div>{it.label}</div>
                {it.hint && <div style={{ fontSize: 10.5, color: t.textSubtle, marginTop: 1 }}>{it.hint}</div>}
              </span>
              {it.kbd && <kbd style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: t.textSubtle, padding: '1px 5px', border: `1px solid ${t.border}`, borderRadius: 3 }}>{it.kbd}</kbd>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

window.Header = Header;
