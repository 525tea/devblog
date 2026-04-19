// Sidebar — category tree + "All" via parent click + recent-posts as mini blocks

function Sidebar({ current, onNav, compact }) {
  const { t, type } = useTheme();
  const [open, setOpen] = React.useState(() => {
    const init = {};
    window.CATEGORIES.forEach(c => init[c.slug] = current?.cat === c.slug);
    return init;
  });

  return (
    <aside style={{
      width: compact ? 220 : 240, flexShrink: 0,
      padding: '8px 0', fontFamily: type.body,
    }}>
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: 1,
        color: t.textSubtle, padding: '8px 14px 12px', textTransform: 'uppercase',
      }}>Categories</div>
      <nav>
        {window.CATEGORIES.map(cat => {
          const isOpen = open[cat.slug];
          // Parent is "active (= All)" if current.cat matches and no sub is selected
          const isParentActive = current?.cat === cat.slug && !current?.sub;
          return (
            <div key={cat.slug} style={{ marginBottom: 2 }}>
              <div style={{ display: 'flex', alignItems: 'stretch' }}>
                <button onClick={() => onNav({ route: 'category', cat: cat.slug })}
                  style={{
                    flex: 1, textAlign: 'left', padding: '7px 8px 7px 14px',
                    background: isParentActive ? t.surfaceAlt : 'transparent',
                    border: 'none', cursor: 'pointer',
                    color: isParentActive ? t.text : t.textMuted,
                    fontSize: 13.5, fontWeight: isParentActive ? 600 : 500,
                    fontFamily: type.body, borderRadius: 4,
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                  <span style={{ display: 'inline-block', width: 4, height: 4, borderRadius: 1, background: isParentActive ? t.accent : t.border }} />
                  {cat.name}
                  {isParentActive && <span style={{ marginLeft: 'auto', fontSize: 10.5, color: t.accent, fontFamily: type.mono }}>All</span>}
                </button>
                <button onClick={() => setOpen(o => ({ ...o, [cat.slug]: !o[cat.slug] }))}
                  style={{
                    width: 28, background: 'none', border: 'none', cursor: 'pointer',
                    color: t.textSubtle, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transform: `rotate(${isOpen ? 90 : 0}deg)`, transition: 'transform 0.15s',
                  }}>
                  <Icons.Chevron size={12} />
                </button>
              </div>
              {isOpen && (
                <div style={{ paddingLeft: 22 }}>
                  {cat.children.map(sub => {
                    const subActive = current?.cat === cat.slug && current?.sub === sub.slug;
                    return (
                      <button key={sub.slug}
                        onClick={() => onNav({ route: 'sub', cat: cat.slug, sub: sub.slug })}
                        style={{
                          display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center',
                          padding: '5px 8px 5px 10px',
                          background: subActive ? t.accent : 'transparent',
                          border: 'none', cursor: 'pointer',
                          color: subActive ? t.accentText : t.textMuted,
                          fontSize: 12.5, fontFamily: type.body, borderRadius: 4,
                          textAlign: 'left', marginBottom: 1, fontWeight: subActive ? 600 : 400,
                        }}
                        onMouseEnter={e => { if (!subActive) e.currentTarget.style.color = t.text; }}
                        onMouseLeave={e => { if (!subActive) e.currentTarget.style.color = t.textMuted; }}>
                        <span>{sub.name}</span>
                        {sub.count != null && <span style={{ fontSize: 10.5, opacity: 0.7 }}>{sub.count}</span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div style={{ padding: '24px 14px 12px' }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: t.textSubtle, textTransform: 'uppercase', marginBottom: 10 }}>Recently viewed</div>
        <RecentPosts onNav={onNav} />
      </div>
    </aside>
  );
}

function RecentPosts({ onNav }) {
  const { t, type } = useTheme();
  const recent = React.useMemo(() => {
    try {
      const ids = JSON.parse(localStorage.getItem('readme:recent') || '[]');
      const list = ids.map(id => window.POSTS.find(p => p.id === id)).filter(Boolean);
      if (list.length) return list.slice(0, 4);
    } catch {}
    return window.POSTS.slice(3, 7); // seed
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {recent.map(p => (
        <button key={p.id} onClick={() => onNav({ route: 'post', id: p.id })}
          style={{
            display: 'flex', gap: 8, padding: 8, border: `1px solid ${t.border}`,
            borderRadius: 4, background: 'transparent', cursor: 'pointer', textAlign: 'left',
            alignItems: 'center',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = t.surfaceAlt; e.currentTarget.style.borderColor = t.borderStrong; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = t.border; }}>
          <div style={{
            width: 32, height: 32, borderRadius: 3, overflow: 'hidden', flexShrink: 0,
            border: `1px solid ${t.border}`,
          }}>
            <PlaceholderThumb {...(p.thumb || { hue: 45 })} aspect="1/1" />
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{
              fontSize: 11.5, color: t.text, lineHeight: 1.35, fontWeight: 500,
              overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
            }}>{p.title}</div>
          </div>
        </button>
      ))}
    </div>
  );
}

window.Sidebar = Sidebar;
