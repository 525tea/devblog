import { useState, useEffect, useMemo } from 'react';
import { useTheme } from './theme';
import { Icons } from './icons';
import { Tag, Button, Pagination, SectionHead } from './primitives';
import { PostCard, PostRow, PopularItem } from './cards';
import { PlaceholderThumb } from './placeholder';
import { Sidebar } from './sidebar';
import { CATEGORIES, POSTS, postsOfCat, postsOfSub } from '@/lib/data';
import { SHADOW } from '@/lib/tokens';

export type Route =
  | { route: 'home' }
  | { route: 'category'; cat: string }
  | { route: 'sub'; cat: string; sub: string }
  | { route: 'post'; id: string }
  | { route: 'profile' }
  | { route: 'tags'; tag?: string };

// ─── Home ────────────────────────────────────────────────
export function HomePage({ onNav }: { onNav: (r: Route) => void }) {
  const { t, type } = useTheme();
  const pinned = POSTS.filter(p => p.pinned);
  const latest = POSTS.filter(p => !p.pinned).slice(0, 12);
  const popular = [...POSTS].sort((a, b) => b.views - a.views).slice(0, 6);

  const [heroIdx, setHeroIdx] = useState(0);
  const [page, setPage] = useState(1);
  const perPage = 6;
  const paged = latest.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(latest.length / perPage);

  useEffect(() => {
    const id = setInterval(() => setHeroIdx(i => (i + 1) % pinned.length), 7000);
    return () => clearInterval(id);
  }, [pinned.length]);

  const hero = pinned[heroIdx];

  return (
    <div>
      {/* Main */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '40px 24px', display: 'flex', gap: 40 }}>
        <Sidebar current={{}} onNav={onNav} />
        <main style={{ flex: 1, minWidth: 0 }}>
          {/* Pinned carousel */}
          <SectionHead kicker="Pinned" title="Headline" count={pinned.length} />
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 32, background: t.surfaceAlt, border: `1px solid ${t.border}`, borderRadius: 10, padding: 28, marginBottom: 14 }}>
            <div style={{ borderRadius: 6, overflow: 'hidden', border: `1px solid ${t.border}` }}>
              <PlaceholderThumb {...(hero.thumb || {})} aspect="16/10" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
                  {hero.tags.map(tag => <Tag key={tag}>#{tag}</Tag>)}
                </div>
                <h2 style={{ margin: 0, fontSize: 28, fontFamily: type.display, fontWeight: 700, color: t.text, letterSpacing: -0.5, lineHeight: 1.2 }}>{hero.title}</h2>
                <p style={{ margin: '16px 0 0', fontSize: 14.5, color: t.textMuted, lineHeight: 1.6, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as any }}>{hero.excerpt}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 24 }}>
                <Button onClick={() => onNav({ route: 'post', id: hero.id })} iconRight={<Icons.ArrowRight size={14} />}>더보기</Button>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: type.mono, fontSize: 12, color: t.textSubtle }}>
                  <CarouselBtn onClick={() => setHeroIdx(i => (i - 1 + pinned.length) % pinned.length)}><Icons.ArrowLeft size={14} /></CarouselBtn>
                  <span>{String(heroIdx + 1).padStart(2, '0')} / {String(pinned.length).padStart(2, '0')}</span>
                  <CarouselBtn onClick={() => setHeroIdx(i => (i + 1) % pinned.length)}><Icons.ArrowRight size={14} /></CarouselBtn>
                </div>
              </div>
            </div>
          </div>

          {/* Pinned thumbnails */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, marginBottom: 60 }}>
            {pinned.map((p, i) => (
              <div key={p.id} onClick={() => setHeroIdx(i)}
                style={{ position: 'relative', cursor: 'pointer', borderRadius: 5, overflow: 'hidden', border: `1px solid ${i === heroIdx ? t.accent : t.border}`, outline: i === heroIdx ? `2px solid ${t.accent}44` : 'none' }}>
                <PlaceholderThumb {...(p.thumb || {})} aspect="16/9" />
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent 40%, ${t.overlay} 100%)`, display: 'flex', alignItems: 'flex-end', padding: 10 }}>
                  <div style={{ color: '#fff', fontSize: 11, fontWeight: 600, lineHeight: 1.3, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as any }}>{p.title}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Latest */}
          <SectionHead kicker="Newest first" title="Latest" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, marginBottom: 8 }}>
            {paged.map(p => <PostCard key={p.id} post={p} onNav={onNav} />)}
          </div>
          <Pagination page={page} total={totalPages} onChange={setPage} />

          {/* Popular */}
          <div style={{ marginTop: 48 }}>
            <SectionHead kicker="Most read" title="Popular" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
              {popular.map(p => <PostCard key={p.id} post={p} onNav={onNav} />)}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function CarouselBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  const { t } = useTheme();
  return (
    <button onClick={onClick} style={{ width: 28, height: 28, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: `1px solid ${t.border}`, borderRadius: 4, cursor: 'pointer', color: t.textMuted }}>
      {children}
    </button>
  );
}

// ─── Project Category ─────────────────────────────────────
export function ProjectCategoryPage({ onNav }: { onNav: (r: Route) => void }) {
  const { t, type } = useTheme();
  const cat = CATEGORIES.find(c => c.slug === 'project')!;
  const posts = postsOfCat('project');
  const latest = [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);
  const popular = [...posts].sort((a, b) => b.views - a.views).slice(0, 5);

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '40px 24px', display: 'flex', gap: 40 }}>
      <Sidebar current={{ cat: 'project' }} onNav={onNav} />
      <main style={{ flex: 1, minWidth: 0 }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 11, fontFamily: type.mono, color: t.accent, letterSpacing: 1.2, textTransform: 'uppercase' }}>Category</div>
          <h1 style={{ margin: '6px 0 10px', fontSize: 40, fontFamily: type.display, fontWeight: 700, letterSpacing: -0.8, color: t.text }}>Projects</h1>
          <p style={{ margin: 0, fontSize: 15, color: t.textMuted, maxWidth: 640, lineHeight: 1.6 }}>{cat.description}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 64 }}>
          {cat.children.map(sub => <ProjectCard key={sub.slug} sub={sub} onNav={onNav} />)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 40 }}>
          <div>
            <SectionHead kicker="In Projects" title="Latest" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {latest.map(p => <PostCard key={p.id} post={p} onNav={onNav} size="sm" />)}
            </div>
          </div>
          <div>
            <SectionHead kicker="In Projects" title="Popular" />
            {popular.map((p, i) => <PopularItem key={p.id} post={p} rank={i + 1} onNav={onNav} />)}
          </div>
        </div>
      </main>
    </div>
  );
}

function ProjectCard({ sub, onNav }: { sub: any; onNav: (r: Route) => void }) {
  const { t, type } = useTheme();
  const [hover, setHover] = useState(false);
  const posts = POSTS.filter(p => p.cat === 'project' && p.sub === sub.slug);
  const thumb = posts[0]?.thumb || { hue: 45, l: 60, c: 14 };
  return (
    <article onClick={() => onNav({ route: 'sub', cat: 'project', sub: sub.slug })}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ cursor: 'pointer', borderRadius: 8, overflow: 'hidden', border: `1px solid ${t.border}`, background: t.surface }}>
      <div style={{ position: 'relative' }}>
        <PlaceholderThumb {...thumb} aspect="16/10" />
        <div style={{ position: 'absolute', inset: 0, padding: 18, background: t.overlay, color: '#fff', display: 'flex', alignItems: 'center', opacity: hover ? 1 : 0, transition: 'opacity 0.2s', fontSize: 13.5, lineHeight: 1.55 }}>
          {sub.intro}
        </div>
      </div>
      <div style={{ padding: 14 }}>
        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600, fontFamily: type.display, letterSpacing: -0.3, color: t.text }}>{sub.name}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 10 }}>
          {sub.tags?.map((tag: string) => <Tag key={tag}>{tag}</Tag>)}
        </div>
        <div style={{ marginTop: 10, fontFamily: type.mono, fontSize: 11, color: t.textSubtle }}>{posts.length} posts</div>
      </div>
    </article>
  );
}

// ─── Project Sub ─────────────────────────────────────────
export function SubProjectPage({ catSlug, subSlug, onNav }: { catSlug: string; subSlug: string; onNav: (r: Route) => void }) {
  const { t, type } = useTheme();
  const cat = CATEGORIES.find(c => c.slug === catSlug);
  const sub = cat?.children.find(s => s.slug === subSlug);
  const posts = postsOfSub(catSlug, subSlug).sort((a, b) => b.date.localeCompare(a.date));
  const [page, setPage] = useState(1);
  const perPage = 6;
  const paged = posts.slice((page - 1) * perPage, page * perPage);

  if (!sub) return <div style={{ padding: 80, textAlign: 'center', color: t.textMuted }}>프로젝트를 찾을 수 없어요.</div>;

  return (
    <div>
      <section style={{ borderBottom: `1px solid ${t.border}`, background: t.surfaceAlt }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '40px 24px', display: 'grid', gridTemplateColumns: '1.6fr 0.8fr', gap: 40, alignItems: 'center' }}>
          <div>
            <button onClick={() => onNav({ route: 'category', cat: catSlug })}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: t.textMuted, fontSize: 12, fontFamily: type.mono, marginBottom: 14, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <Icons.ArrowLeft size={12} /> {cat?.name}
            </button>
            <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
              {sub.tags?.map((tag: string) => <Tag key={tag} variant="accent">{tag}</Tag>)}
            </div>
            <h1 style={{ margin: 0, fontSize: 44, fontFamily: type.display, fontWeight: 700, letterSpacing: -1, color: t.text }}>{sub.name}</h1>
            <p style={{ margin: '16px 0 0', fontSize: 16, color: t.textMuted, lineHeight: 1.65, maxWidth: 580 }}>{sub.intro}</p>
            <div style={{ marginTop: 22, display: 'flex', gap: 16, fontFamily: type.mono, fontSize: 12, color: t.textSubtle }}>
              <span>{posts.length} posts</span><span>·</span><span>Latest {posts[0]?.date}</span>
            </div>
          </div>
          <div style={{ borderRadius: 8, overflow: 'hidden', border: `1px solid ${t.border}`, boxShadow: SHADOW.md }}>
            <PlaceholderThumb {...(posts[0]?.thumb || { hue: 45 })} aspect="16/9" />
          </div>
        </div>
      </section>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '40px 24px', display: 'flex', gap: 40 }}>
        <Sidebar current={{ cat: catSlug, sub: subSlug }} onNav={onNav} />
        <main style={{ flex: 1, minWidth: 0 }}>
          <SectionHead kicker="Articles" title="All posts" count={posts.length} />
          {paged.map(p => <PostRow key={p.id} post={p} onNav={onNav} />)}
          {paged.length === 0 && <div style={{ padding: 60, textAlign: 'center', color: t.textSubtle }}>아직 작성된 글이 없어요.</div>}
          {posts.length > perPage && <Pagination page={page} total={Math.ceil(posts.length / perPage)} onChange={setPage} />}
        </main>
      </div>
    </div>
  );
}

// ─── General Category (Docs layout) ──────────────────────
export function GeneralCategoryPage({ catSlug, subSlug, onNav }: { catSlug: string; subSlug?: string | null; onNav: (r: Route) => void }) {
  const { t, type } = useTheme();
  const cat = CATEGORIES.find(c => c.slug === catSlug);
  const allPosts = postsOfCat(catSlug);
  const posts = subSlug ? allPosts.filter(p => p.sub === subSlug) : allPosts;
  const activeSub = subSlug ? cat?.children.find(s => s.slug === subSlug) : null;
  const [page, setPage] = useState(1);
  useEffect(() => setPage(1), [catSlug, subSlug]);
  const perPage = 6;
  const paged = posts.slice((page - 1) * perPage, page * perPage);

  if (!cat) return null;

  return (
    <div>
      <section style={{ borderBottom: `1px solid ${t.border}` }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '40px 24px 28px' }}>
          <div style={{ fontSize: 11, fontFamily: type.mono, color: t.accent, letterSpacing: 1.2, textTransform: 'uppercase' }}>
            Category {activeSub && `› ${activeSub.name}`}
          </div>
          <h1 style={{ margin: '6px 0 6px', fontSize: 40, fontFamily: type.display, fontWeight: 700, letterSpacing: -0.8, color: t.text }}>
            {activeSub ? activeSub.name : cat.name}
          </h1>
          <p style={{ margin: 0, fontSize: 15, color: t.textMuted, maxWidth: 640, lineHeight: 1.6 }}>
            {activeSub ? `${cat.name} › ${activeSub.name}` : cat.description}
          </p>
          <div style={{ marginTop: 18, display: 'flex', gap: 14, fontFamily: type.mono, fontSize: 12, color: t.textSubtle }}>
            <span>{activeSub ? posts.length : allPosts.length} posts</span>
            {!activeSub && <><span>·</span><span>{cat.children.length} topics</span></>}
          </div>
        </div>
      </section>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 24px', display: 'flex', gap: 40 }}>
        <Sidebar current={{ cat: catSlug, sub: subSlug || undefined }} onNav={onNav} />
        <main style={{ flex: 1, minWidth: 0 }}>
          {/* Sub-category filter chips — always visible */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6, marginBottom: 20, paddingBottom: 14, borderBottom: `1px solid ${t.border}` }}>
            {/* All chip */}
            <button onClick={() => onNav({ route: 'category', cat: catSlug })}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 12px', borderRadius: 999, background: !subSlug ? t.accent : t.surfaceAlt, color: !subSlug ? t.accentText : t.textMuted, fontSize: 12, fontFamily: type.body, fontWeight: 600, border: `1px solid ${!subSlug ? t.accent : t.border}`, cursor: 'pointer', transition: 'all 0.15s' }}>
              All <span style={{ opacity: 0.75, fontFamily: type.mono, fontSize: 11 }}>{allPosts.length}</span>
            </button>
            {/* Per-subcategory chips */}
            {cat.children.map(sub => {
              const count = allPosts.filter(p => p.sub === sub.slug).length;
              const active = subSlug === sub.slug;
              return (
                <button key={sub.slug} onClick={() => onNav({ route: 'sub', cat: catSlug, sub: sub.slug })}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 12px', borderRadius: 999, background: active ? t.accent : t.surfaceAlt, color: active ? t.accentText : t.textMuted, fontSize: 12, fontFamily: type.body, fontWeight: 600, border: `1px solid ${active ? t.accent : t.border}`, cursor: 'pointer', transition: 'all 0.15s' }}
                  onMouseEnter={e => { if (!active) { e.currentTarget.style.color = t.text; e.currentTarget.style.borderColor = t.borderStrong; } }}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.color = t.textMuted; e.currentTarget.style.borderColor = t.border; } }}>
                  {sub.name} <span style={{ opacity: 0.75, fontFamily: type.mono, fontSize: 11 }}>{count}</span>
                </button>
              );
            })}
          </div>

          {paged.length > 0 ? (
            <>
              {paged.map(p => <PostRow key={p.id} post={p} onNav={onNav} />)}
              {posts.length > perPage && <Pagination page={page} total={Math.ceil(posts.length / perPage)} onChange={setPage} />}
            </>
          ) : (
            <div style={{ padding: 60, textAlign: 'center', color: t.textSubtle, fontSize: 14 }}>아직 작성된 글이 없어요.</div>
          )}
        </main>
      </div>
    </div>
  );
}

// ─── Tags Page ────────────────────────────────────────────
export function TagsPage({ onNav, tag: initialTag }: { onNav: (r: Route) => void; tag?: string }) {
  const { t, type } = useTheme();
  const [selectedTag, setSelectedTag] = useState<string | null>(initialTag ?? null);

  const tagMap = useMemo(() => {
    const map: Record<string, typeof POSTS> = {};
    POSTS.forEach(p => p.tags.forEach(tag => {
      if (!map[tag]) map[tag] = [];
      map[tag].push(p);
    }));
    return map;
  }, []);

  const sortedTags = Object.entries(tagMap).sort((a, b) => b[1].length - a[1].length);
  const filteredPosts = selectedTag ? tagMap[selectedTag] : [];

  return (
    <div>
      <section style={{ borderBottom: `1px solid ${t.border}` }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '40px 24px 28px' }}>
          <div style={{ fontSize: 11, fontFamily: type.mono, color: t.accent, letterSpacing: 1.2, textTransform: 'uppercase' }}>Browse by tag</div>
          <h1 style={{ margin: '6px 0 6px', fontSize: 40, fontFamily: type.display, fontWeight: 700, letterSpacing: -0.8, color: t.text }}>Tags</h1>
          <p style={{ margin: 0, fontSize: 15, color: t.textMuted, lineHeight: 1.6 }}>
            {sortedTags.length}개의 태그 · {POSTS.length}개의 글
          </p>
        </div>
      </section>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 24px', display: 'flex', gap: 40 }}>
        <Sidebar current={{}} onNav={onNav} />
        <main style={{ flex: 1, minWidth: 0 }}>
          {/* Tag cloud */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
            {sortedTags.map(([tag, posts]) => {
              const active = selectedTag === tag;
              const size = Math.max(11, Math.min(15, 11 + posts.length));
              return (
                <button key={tag} onClick={() => setSelectedTag(active ? null : tag)}
                  style={{ padding: '5px 12px', fontSize: size, fontFamily: type.mono, fontWeight: 500, background: active ? t.accent : t.tag, color: active ? t.accentText : t.tagText, border: `1px solid ${active ? t.accent : t.border}`, borderRadius: 4, cursor: 'pointer', transition: 'all 0.15s' }}
                  onMouseEnter={e => { if (!active) { e.currentTarget.style.background = t.surfaceAlt; e.currentTarget.style.color = t.text; } }}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.background = t.tag; e.currentTarget.style.color = t.tagText; } }}>
                  #{tag} <span style={{ fontSize: 10, opacity: 0.65 }}>{posts.length}</span>
                </button>
              );
            })}
          </div>

          {/* Posts for selected tag */}
          {selectedTag && (
            <div>
              <div style={{ fontSize: 10.5, fontFamily: type.mono, color: t.accent, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 16 }}>
                #{selectedTag} · {filteredPosts.length}개의 글
              </div>
              {filteredPosts.map(p => <PostRow key={p.id} post={p} onNav={onNav} />)}
            </div>
          )}

          {!selectedTag && (
            <p style={{ color: t.textSubtle, fontSize: 13, fontFamily: type.mono }}>// 태그를 클릭하면 해당 글 목록이 표시돼요</p>
          )}
        </main>
      </div>
    </div>
  );
}
