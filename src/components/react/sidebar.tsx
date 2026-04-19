import { useState, useMemo } from 'react';
import { useTheme } from './theme';
import { Icons } from './icons';
import { PlaceholderThumb } from './placeholder';
import { CATEGORIES, POSTS } from '@/lib/data';
import { type Route } from './pages';

interface SidebarProps {
  current: { cat?: string; sub?: string };
  onNav: (r: Route) => void;
  compact?: boolean;
}

export function Sidebar({ current, onNav, compact }: SidebarProps) {
  const { t, type } = useTheme();
  const [open, setOpen] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    CATEGORIES.forEach(c => { init[c.slug] = current?.cat === c.slug; });
    return init;
  });

  return (
    <aside style={{ width: compact ? 220 : 240, flexShrink: 0, padding: '8px 0', fontFamily: type.body }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: t.textSubtle, padding: '8px 14px 12px', textTransform: 'uppercase' }}>
        Categories
      </div>
      <nav>
        {CATEGORIES.map(cat => {
          const isOpen = open[cat.slug];
          const isParentActive = current?.cat === cat.slug && !current?.sub;
          return (
            <div key={cat.slug} style={{ marginBottom: 2 }}>
              <div style={{ display: 'flex', alignItems: 'stretch' }}>
                <button
                  onClick={() => onNav({ route: 'category', cat: cat.slug })}
                  style={{ flex: 1, textAlign: 'left', padding: '7px 8px 7px 14px', background: isParentActive ? t.surfaceAlt : 'transparent', border: 'none', cursor: 'pointer', color: isParentActive ? t.text : t.textMuted, fontSize: 13.5, fontWeight: isParentActive ? 600 : 500, fontFamily: type.body, borderRadius: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ display: 'inline-block', width: 4, height: 4, borderRadius: 1, background: isParentActive ? t.accent : t.border }} />
                  {cat.name}
                  {isParentActive && <span style={{ marginLeft: 'auto', fontSize: 10.5, color: t.accent, fontFamily: type.mono }}>All</span>}
                </button>
                <button
                  onClick={() => setOpen(o => ({ ...o, [cat.slug]: !o[cat.slug] }))}
                  style={{ width: 28, background: 'none', border: 'none', cursor: 'pointer', color: t.textSubtle, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `rotate(${isOpen ? 90 : 0}deg)`, transition: 'transform 0.15s' }}>
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
                        style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', padding: '5px 8px 5px 10px', background: subActive ? t.accent : 'transparent', border: 'none', cursor: 'pointer', color: subActive ? t.accentText : t.textMuted, fontSize: 12.5, fontFamily: type.body, borderRadius: 4, textAlign: 'left', marginBottom: 1, fontWeight: subActive ? 600 : 400 }}
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

      {/* Tags section */}
      <div style={{ padding: '20px 14px 12px', borderTop: `1px solid ${t.border}`, marginTop: 8 }}>
        <button
          onClick={() => onNav({ route: 'tags' })}
          style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: t.textSubtle, textTransform: 'uppercase', marginBottom: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 6, fontFamily: type.body }}
          onMouseEnter={e => (e.currentTarget.style.color = t.text)}
          onMouseLeave={e => (e.currentTarget.style.color = t.textSubtle)}>
          <Icons.Tag size={11} /> Tags
        </button>
        <TopTags onNav={onNav} />
      </div>

      <div style={{ padding: '20px 14px 12px', borderTop: `1px solid ${t.border}` }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: t.textSubtle, textTransform: 'uppercase', marginBottom: 10 }}>
          Recently viewed
        </div>
        <RecentPosts onNav={onNav} />
      </div>
    </aside>
  );
}

function TopTags({ onNav }: { onNav: (r: Route) => void }) {
  const { t, type } = useTheme();
  const tags = useMemo(() => {
    const count: Record<string, number> = {};
    POSTS.forEach(p => p.tags.forEach(tag => { count[tag] = (count[tag] || 0) + 1; }));
    return Object.entries(count).sort((a, b) => b[1] - a[1]).slice(0, 12).map(([tag]) => tag);
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
      {tags.map(tag => (
        <button key={tag} onClick={() => onNav({ route: 'tags', tag })}
          style={{ padding: '2px 8px', fontSize: 11, fontFamily: type.mono, background: t.tag, color: t.tagText, border: `1px solid ${t.border}`, borderRadius: 3, cursor: 'pointer', fontWeight: 500 }}
          onMouseEnter={e => { e.currentTarget.style.background = t.accent; e.currentTarget.style.color = t.accentText; e.currentTarget.style.borderColor = t.accent; }}
          onMouseLeave={e => { e.currentTarget.style.background = t.tag; e.currentTarget.style.color = t.tagText; e.currentTarget.style.borderColor = t.border; }}>
          #{tag}
        </button>
      ))}
    </div>
  );
}

function RecentPosts({ onNav }: { onNav: (r: Route) => void }) {
  const { t, type } = useTheme();
  const recent = useMemo(() => {
    try {
      const ids = JSON.parse(localStorage.getItem('readme:recent') || '[]') as string[];
      const list = ids.map(id => POSTS.find(p => p.id === id)).filter(Boolean);
      if (list.length) return list.slice(0, 4);
    } catch {}
    return POSTS.slice(3, 7);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {recent.map(p => p && (
        <button key={p.id} onClick={() => onNav({ route: 'post', id: p.id })}
          style={{ display: 'flex', gap: 8, padding: 8, border: `1px solid ${t.border}`, borderRadius: 4, background: 'transparent', cursor: 'pointer', textAlign: 'left', alignItems: 'center' }}
          onMouseEnter={e => { e.currentTarget.style.background = t.surfaceAlt; e.currentTarget.style.borderColor = t.borderStrong; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = t.border; }}>
          <div style={{ width: 32, height: 32, borderRadius: 3, overflow: 'hidden', flexShrink: 0, border: `1px solid ${t.border}` }}>
            <PlaceholderThumb {...(p.thumb || { hue: 45 })} aspect="1/1" />
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 11.5, color: t.text, lineHeight: 1.35, fontWeight: 500, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as any }}>
              {p.title}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
