import { type ReactNode, type CSSProperties } from 'react';
import { useTheme } from './theme';
import { Icons } from './icons';
import { SHADOW } from '@/lib/tokens';

// ─── Tag ────────────────────────────────────────────────
interface TagProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'accent';
  active?: boolean;
}
export function Tag({ children, onClick, variant = 'default', active = false }: TagProps) {
  const { t, type } = useTheme();
  const style: CSSProperties = (variant === 'accent' || active)
    ? { background: t.accent, color: t.accentText, border: 'none' }
    : { background: t.tag, color: t.tagText, border: `1px solid ${t.border}` };
  return (
    <span onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', padding: '3px 10px',
      fontSize: 12.5, fontWeight: 500, fontFamily: type.mono, borderRadius: 6,
      cursor: onClick ? 'pointer' : 'default', letterSpacing: 0.2, ...style,
    }}>{children}</span>
  );
}

// ─── Button ─────────────────────────────────────────────
interface ButtonProps {
  children?: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'ghost' | 'text';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  iconRight?: ReactNode;
}
export function Button({ children, onClick, variant = 'primary', size = 'md', icon, iconRight }: ButtonProps) {
  const { t, type } = useTheme();
  const sizes = { sm: { padding: '5px 10px', fontSize: 12 }, md: { padding: '8px 14px', fontSize: 13 }, lg: { padding: '10px 20px', fontSize: 14 } };
  const variants: Record<string, CSSProperties> = {
    primary: { background: t.accent, color: t.accentText, border: 'none' },
    ghost: { background: 'transparent', color: t.text, border: `1px solid ${t.border}` },
    text: { background: 'transparent', color: t.text, border: 'none' },
  };
  return (
    <button onClick={onClick}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 600, fontFamily: type.body, borderRadius: 5, cursor: 'pointer', transition: 'opacity 0.15s', ...sizes[size], ...variants[variant] }}
      onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
      onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
      {icon}{children}{iconRight}
    </button>
  );
}

// ─── Pagination ──────────────────────────────────────────
interface PaginationProps { page: number; total: number; onChange: (p: number) => void; }
export function Pagination({ page, total, onChange }: PaginationProps) {
  const { t, type } = useTheme();
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  const S = 32;
  const cell = (content: ReactNode, active: boolean, onClick: () => void, disabled = false) => (
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

// ─── Footer ──────────────────────────────────────────────
type FooterRoute =
  | { route: 'category'; cat: string }
  | { route: 'profile' | 'tags' };

export function Footer({ onNav }: { onNav: (r: FooterRoute) => void }) {
  const { t, type } = useTheme();
  return (
    <footer style={{ borderTop: `1px solid ${t.border}`, background: t.surfaceAlt, padding: '40px 24px 32px' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, marginBottom: 32 }}>
          <div style={{ minWidth: 200 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
              <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 2, background: t.accent }} />
              <span style={{ fontFamily: type.display, fontSize: 20, fontWeight: 700, letterSpacing: -0.5, color: t.text }}>README</span>
            </div>
            <p style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.6, maxWidth: 280 }}>
              A full-stack engineer's log — backend systems, infra, and the projects in between.
            </p>
          </div>

          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 24 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: t.textSubtle, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 10 }}>Topics</div>
              {[
                { label: 'Backend', hint: 'Java · Python · API', cat: 'backend' },
                { label: 'CS', hint: 'OS · Network · 분산 시스템', cat: 'cs' },
                { label: 'DevOps', hint: '인프라 · K8s · 모니터링', cat: 'devops' },
              ].map(i => (
                <div key={i.label} onClick={() => onNav({ route: 'category', cat: i.cat })}
                  style={{ fontSize: 13.5, color: t.textMuted, padding: '4px 0', cursor: 'pointer', lineHeight: 1.3 }}
                  onMouseEnter={e => (e.currentTarget.style.color = t.text)}
                  onMouseLeave={e => (e.currentTarget.style.color = t.textMuted)}>
                  {i.label}
                  <div style={{ fontSize: 11.5, color: t.textSubtle, marginTop: 1 }}>{i.hint}</div>
                </div>
              ))}
            </div>

            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: t.textSubtle, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 10 }}>About</div>
              <div onClick={() => onNav({ route: 'profile' })}
                style={{ fontSize: 13.5, color: t.textMuted, padding: '4px 0', cursor: 'pointer', lineHeight: 1.3 }}
                onMouseEnter={e => (e.currentTarget.style.color = t.text)}
                onMouseLeave={e => (e.currentTarget.style.color = t.textMuted)}>
                Profile
                <div style={{ fontSize: 11.5, color: t.textSubtle, marginTop: 1 }}>소개 · 기술 스택</div>
              </div>
              <div onClick={() => onNav({ route: 'tags' })}
                style={{ fontSize: 13.5, color: t.textMuted, padding: '4px 0', cursor: 'pointer', lineHeight: 1.3 }}
                onMouseEnter={e => (e.currentTarget.style.color = t.text)}
                onMouseLeave={e => (e.currentTarget.style.color = t.textMuted)}>
                Tags
                <div style={{ fontSize: 11.5, color: t.textSubtle, marginTop: 1 }}>태그 모아보기</div>
              </div>
            </div>
          </div>

          <div style={{ minWidth: 200 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.textSubtle, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 10 }}>Visits</div>
            <div style={{ display: 'flex', gap: 18, fontFamily: type.mono }}>
              <div>
                <div style={{ fontSize: 12, color: t.textSubtle }}>today</div>
                <div style={{ fontSize: 20, color: t.text, fontWeight: 600 }}>—</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: t.textSubtle }}>total</div>
                <div style={{ fontSize: 20, color: t.text, fontWeight: 600 }}>—</div>
              </div>
            </div>
            <div style={{ fontSize: 11.5, color: t.textSubtle, fontFamily: type.mono, marginTop: 4 }}>via GoatCounter</div>
            <div style={{ marginTop: 14, display: 'flex', gap: 10 }}>
              <a href="https://github.com/525tea" title="GitHub" style={iconLinkStyle(t)}><Icons.Github size={16} /></a>
              <a href="mailto:jene0028@gmail.com" title="Email" style={iconLinkStyle(t)}><Icons.Mail size={16} /></a>
            </div>
          </div>
        </div>

        <div style={{ paddingTop: 20, borderTop: `1px solid ${t.border}`, display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between', fontSize: 12, color: t.textSubtle }}>
          <span>© 2026 README. Built with Astro · Hosted on Cloudflare Pages.</span>
          <span>jene0028@gmail.com · github.com/525tea</span>
        </div>
      </div>
    </footer>
  );
}

function iconLinkStyle(t: ReturnType<typeof useTheme>['t']): CSSProperties {
  return { width: 30, height: 30, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${t.border}`, borderRadius: 4, color: t.textMuted, cursor: 'pointer', textDecoration: 'none' };
}

// ─── SectionHead ─────────────────────────────────────────
interface SectionHeadProps {
  kicker: string; title: string; count?: number;
  more?: { label: string; onClick: () => void };
}
export function SectionHead({ kicker, title, count, more }: SectionHeadProps) {
  const { t, type } = useTheme();
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 20 }}>
      <div>
        <div style={{ fontSize: 10.5, fontFamily: type.mono, color: t.accent, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 4 }}>{kicker}</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <h2 style={{ margin: 0, fontSize: 26, fontFamily: type.display, fontWeight: 700, letterSpacing: -0.5, color: t.text }}>{title}</h2>
          {count != null && <span style={{ fontSize: 13, color: t.textSubtle, fontFamily: type.mono }}>{count}</span>}
        </div>
      </div>
      {more && (
        <button onClick={more.onClick} style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.textMuted, fontSize: 12, fontFamily: type.body, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4 }}>
          {more.label} <Icons.ArrowRight size={12} />
        </button>
      )}
    </div>
  );
}
