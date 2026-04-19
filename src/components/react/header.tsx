import { useState } from 'react';
import { useTheme } from './theme';
import { Icons } from './icons';
import { CATEGORIES } from '@/lib/data';
import { SHADOW } from '@/lib/tokens';

type Route =
  | { route: 'home' }
  | { route: 'category'; cat: string }
  | { route: 'sub'; cat: string; sub: string }
  | { route: 'profile' | 'uses' | 'tags' };

interface HeaderProps {
  onNav: (r: Route) => void;
  onOpenSearch: () => void;
  onOpenTweaks: () => void; // called via Ctrl+Shift+T shortcut, not a button
}

export function Header({ onNav, onOpenSearch }: HeaderProps) {
  const { t, type, mode, lang, set, isGlass } = useTheme();
  const [hoverCat, setHoverCat] = useState<string | null>(null);

  return (
    <header
      className={isGlass ? 'glass-pane' : undefined}
      style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: isGlass ? t.surface : t.bg + 'ee',
        backdropFilter: isGlass ? undefined : 'blur(12px)',
        WebkitBackdropFilter: isGlass ? undefined : 'blur(12px)',
        borderBottom: `1px solid ${t.border}`,
        borderRadius: isGlass ? 0 : undefined,
      }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', height: 56, padding: '0 24px', display: 'flex', alignItems: 'center', gap: 32 }}>
        {/* Logo */}
        <a onClick={() => onNav({ route: 'home' })}
          style={{ display: 'flex', alignItems: 'baseline', gap: 8, cursor: 'pointer', fontFamily: type.display, fontSize: 20, fontWeight: 700, color: t.text, letterSpacing: -0.5, userSelect: 'none' }}>
          <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 2, background: t.accent, transform: 'translateY(-1px)' }} />
          README
        </a>

        {/* Nav */}
        <nav style={{ display: 'flex', gap: 4, flex: 1 }} onMouseLeave={() => setHoverCat(null)}>
          {CATEGORIES.map(cat => (
            <div key={cat.slug} style={{ position: 'relative' }} onMouseEnter={() => setHoverCat(cat.slug)}>
              <button
                onClick={() => onNav({ route: 'category', cat: cat.slug })}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '10px 12px', fontSize: 15, fontWeight: 500, color: hoverCat === cat.slug ? t.text : t.textMuted, fontFamily: type.body, transition: 'color 0.15s' }}>
                {cat.name}
              </button>
              {hoverCat === cat.slug && (
                <div style={{ position: 'absolute', top: '100%', left: 0, minWidth: 220, padding: 8, background: t.surface, border: `1px solid ${t.border}`, boxShadow: SHADOW.lg, borderRadius: 8, zIndex: 50 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.8, color: t.textSubtle, padding: '6px 10px 8px', textTransform: 'uppercase' }}>
                    {cat.slug === 'project' ? 'Projects' : 'Topics'}
                  </div>
                  {cat.children.map(sub => (
                    <button key={sub.slug}
                      onClick={() => { setHoverCat(null); onNav({ route: 'sub', cat: cat.slug, sub: sub.slug }); }}
                      style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', borderRadius: 5, color: t.text, fontSize: 14, fontFamily: type.body }}
                      onMouseEnter={e => (e.currentTarget.style.background = t.surfaceAlt)}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      <span>{sub.name}</span>
                      {sub.count != null && <span style={{ fontSize: 11, color: t.textSubtle }}>{sub.count}</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <IconBtn onClick={() => set({ lang: lang === 'ko' ? 'en' : 'ko' })} label={lang === 'ko' ? 'EN' : 'KO'} width={44} title="언어" />
          <IconBtn onClick={() => set({ mode: mode === 'dark' ? 'light' : 'dark' })} icon={mode === 'dark' ? <Icons.Sun size={18} /> : <Icons.Moon size={18} />} title="다크/라이트" />
          <IconBtn onClick={onOpenSearch} icon={<Icons.Search size={18} />} title="검색 (⌘K)" />
        </div>
      </div>
    </header>
  );
}

function IconBtn({ onClick, icon, label, width = 38, title }: { onClick?: () => void; icon?: React.ReactNode; label?: string; width?: number; title?: string }) {
  const { t, type } = useTheme();
  return (
    <button onClick={onClick} title={title}
      style={{ width, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: t.textMuted, borderRadius: 6, fontFamily: type.body, fontSize: 12, fontWeight: 600, letterSpacing: 0.5 }}
      onMouseEnter={e => { e.currentTarget.style.background = t.surfaceAlt; e.currentTarget.style.color = t.text; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = t.textMuted; }}>
      {icon || label}
    </button>
  );
}

