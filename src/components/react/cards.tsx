import { useTheme } from './theme';
import { Tag } from './primitives';
import { PlaceholderThumb } from './placeholder';
import { Icons } from './icons';
import { CATEGORIES } from '@/lib/data';
import type { Post } from '@/lib/data';

type Route =
  | { route: 'home' }
  | { route: 'category'; cat: string }
  | { route: 'sub'; cat: string; sub: string }
  | { route: 'post'; id: string };

interface Props { post: Post; onNav: (r: Route) => void; }

function findCat(slug: string) { return CATEGORIES.find(c => c.slug === slug); }
function findSub(catSlug: string, subSlug: string) { return findCat(catSlug)?.children.find(s => s.slug === subSlug); }

// ─── PostCard (grid card with thumbnail) ────────────────
export function PostCard({ post, onNav, size = 'md' }: Props & { size?: 'sm' | 'md' | 'lg' }) {
  const { t, type, isGlass } = useTheme();
  const sub = findSub(post.cat, post.sub);
  const cfg = { sm: { titleFont: 13, excerpt: 0 }, md: { titleFont: 15, excerpt: 2 }, lg: { titleFont: 17, excerpt: 3 } }[size];

  return (
    <article
      onClick={() => onNav({ route: 'post', id: post.id })}
      className={isGlass ? 'glass-pane' : undefined}
      style={{
        cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 10,
        ...(isGlass ? {
          background: t.surface, borderRadius: 12,
          border: `1px solid ${t.border}`, padding: 12,
          transition: 'transform 0.2s',
        } : { background: 'transparent' }),
      }}
      onMouseEnter={e => { const el = e.currentTarget.querySelector<HTMLElement>('.pc-title'); if (el) el.style.color = t.accent; }}
      onMouseLeave={e => { const el = e.currentTarget.querySelector<HTMLElement>('.pc-title'); if (el) el.style.color = t.text; }}>
      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 6, border: `1px solid ${t.border}` }}>
        <PlaceholderThumb {...(post.thumb || { hue: 45 })} aspect="16/10" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          <Tag>{findCat(post.cat)?.name}</Tag>
          <Tag>{sub?.name || post.sub}</Tag>
        </div>
        <h3 className="pc-title" style={{ margin: 0, fontSize: cfg.titleFont, fontWeight: 600, lineHeight: 1.35, color: t.text, fontFamily: type.body, transition: 'color 0.15s', textWrap: 'pretty' as any }}>
          {post.title}
        </h3>
        {cfg.excerpt > 0 && (
          <p style={{ margin: 0, fontSize: 12.5, color: t.textMuted, lineHeight: 1.55, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: cfg.excerpt, WebkitBoxOrient: 'vertical' as any }}>
            {post.excerpt}
          </p>
        )}
        <div style={{ display: 'flex', gap: 10, fontSize: 11, color: t.textSubtle, fontFamily: type.mono, marginTop: 2 }}>
          <span>{post.date}</span><span>·</span><span>{post.readMin} min read</span>
        </div>
      </div>
    </article>
  );
}

// ─── PostRow (list row with thumbnail) ──────────────────
export function PostRow({ post, onNav }: Props) {
  const { t, type, isGlass } = useTheme();
  const sub = findSub(post.cat, post.sub);
  return (
    <article
      onClick={() => onNav({ route: 'post', id: post.id })}
      className={isGlass ? 'glass-pane' : undefined}
      style={{
        display: 'grid', gridTemplateColumns: '200px 1fr', gap: 20, cursor: 'pointer',
        ...(isGlass ? {
          padding: '16px', marginBottom: 10, borderRadius: 12,
          background: t.surface, border: `1px solid ${t.border}`,
        } : {
          padding: '20px 0', borderBottom: `1px solid ${t.border}`,
        }),
      }}
      onMouseEnter={e => { const el = e.currentTarget.querySelector<HTMLElement>('.pr-title'); if (el) el.style.color = t.accent; }}
      onMouseLeave={e => { const el = e.currentTarget.querySelector<HTMLElement>('.pr-title'); if (el) el.style.color = t.text; }}>
      <div style={{ borderRadius: 6, overflow: 'hidden', border: `1px solid ${t.border}` }}>
        <PlaceholderThumb {...(post.thumb || { hue: 45 })} aspect="16/10" />
      </div>
      <div>
        <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
          <Tag>{findCat(post.cat)?.name}</Tag>
          <Tag>{sub?.name || post.sub}</Tag>
          {post.series && <Tag variant="accent">{post.series}</Tag>}
        </div>
        <h3 className="pr-title" style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 600, color: t.text, fontFamily: type.body, lineHeight: 1.35, transition: 'color 0.15s', textWrap: 'pretty' as any }}>
          {post.title}
        </h3>
        <p style={{ margin: '0 0 10px', fontSize: 13.5, color: t.textMuted, lineHeight: 1.55, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as any }}>
          {post.excerpt}
        </p>
        <div style={{ display: 'flex', gap: 14, fontSize: 11.5, color: t.textSubtle, fontFamily: type.mono }}>
          <span><Icons.Calendar size={11} style={{ marginRight: 4 }} />{post.date}</span>
          <span><Icons.Clock size={11} style={{ marginRight: 4 }} />{post.readMin} min</span>
          <span><Icons.Eye size={11} style={{ marginRight: 4 }} />{post.views.toLocaleString()}</span>
        </div>
      </div>
    </article>
  );
}

// ─── PopularItem (ranked list item) ─────────────────────
export function PopularItem({ post, rank, onNav }: Props & { rank: number }) {
  const { t, type } = useTheme();
  const sub = findSub(post.cat, post.sub);
  return (
    <div onClick={() => onNav({ route: 'post', id: post.id })}
      style={{ display: 'flex', gap: 12, padding: '12px 0', cursor: 'pointer', borderTop: rank === 1 ? 'none' : `1px solid ${t.border}` }}>
      <div style={{ width: 28, fontFamily: type.mono, fontSize: 14, fontWeight: 700, color: rank <= 3 ? t.accent : t.textSubtle, lineHeight: 1.2, paddingTop: 2 }}>
        {String(rank).padStart(2, '0')}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
          <Tag>{sub?.name || post.sub}</Tag>
        </div>
        <div style={{ fontSize: 13, color: t.text, fontWeight: 500, lineHeight: 1.4, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as any }}>
          {post.title}
        </div>
        <div style={{ display: 'flex', gap: 8, fontSize: 11, color: t.textSubtle, fontFamily: type.mono, marginTop: 4 }}>
          <Icons.Eye size={11} /><span>{post.views.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
