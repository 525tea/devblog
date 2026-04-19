import { useState, useEffect, useMemo, useRef, type CSSProperties } from 'react';
import { useTheme } from './theme';
import { Icons } from './icons';
import { Tag, Button } from './primitives';
import { PlaceholderThumb } from './placeholder';
import { GiscusComments } from './giscus';
import { POSTS, CATEGORIES } from '@/lib/data';
import { SHADOW } from '@/lib/tokens';

type Route =
  | { route: 'sub'; cat: string; sub: string }
  | { route: 'post'; id: string };

interface Props { postId: string; onNav: (r: Route) => void; }

const SECTIONS = [
  { id: 's-intro', title: '들어가며', level: 1 },
  { id: 's-problem', title: '문제 상황', level: 1 },
  { id: 's-context', title: '이전까지의 접근', level: 2 },
  { id: 's-approach', title: '접근 방법', level: 1 },
  { id: 's-benchmark', title: '벤치마크 결과', level: 2 },
  { id: 's-impl', title: '실제 구현', level: 1 },
  { id: 's-code', title: '코드 살펴보기', level: 2 },
  { id: 's-edge', title: '엣지 케이스', level: 2 },
  { id: 's-conclusion', title: '마치며', level: 1 },
];

export function PostDetailPage({ postId, onNav }: Props) {
  const { t, type } = useTheme();
  const post = POSTS.find(p => p.id === postId);
  const cat = post ? CATEGORIES.find(c => c.slug === post.cat) : null;
  const sub = post ? cat?.children.find(s => s.slug === post.sub) : null;
  const [activeId, setActiveId] = useState(SECTIONS[0].id);

  useEffect(() => {
    if (!post) return;
    try {
      const ids = JSON.parse(localStorage.getItem('readme:recent') || '[]') as string[];
      const next = [post.id, ...ids.filter(id => id !== post.id)].slice(0, 10);
      localStorage.setItem('readme:recent', JSON.stringify(next));
    } catch {}
  }, [post?.id]);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActiveId(visible[0].target.id);
    }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });
    SECTIONS.forEach(s => { const el = document.getElementById(s.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  if (!post) return <div style={{ padding: 80, textAlign: 'center', color: t.textMuted }}>글을 찾을 수 없어요.</div>;

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '40px 24px', display: 'grid', gridTemplateColumns: '220px 1fr 240px', gap: 40 }}>
      {/* Left sidebar */}
      <aside style={{ fontFamily: type.body }}>
        <div style={{ position: 'sticky', top: 80 }}>
          <button onClick={() => onNav({ route: 'sub', cat: post.cat, sub: post.sub })}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: t.textMuted, fontSize: 12, fontFamily: type.mono, display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: 14 }}>
            <Icons.ArrowLeft size={12} /> {sub?.name || cat?.name}
          </button>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: t.textSubtle, textTransform: 'uppercase', marginBottom: 10 }}>Breadcrumb</div>
          <div style={{ fontSize: 12.5, lineHeight: 1.7, color: t.textMuted }}>
            <div>{cat?.name}</div>
            <div style={{ paddingLeft: 10 }}>· {sub?.name}</div>
            <div style={{ paddingLeft: 20, color: t.text, fontWeight: 500 }}>· Current</div>
          </div>
          {post.series && (
            <div style={{ marginTop: 24, padding: 12, border: `1px solid ${t.border}`, borderRadius: 6, background: t.surfaceAlt }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: t.accent, textTransform: 'uppercase', marginBottom: 6 }}>Series</div>
              <div style={{ fontSize: 13, color: t.text, fontWeight: 600, lineHeight: 1.4 }}>{post.series}</div>
            </div>
          )}
        </div>
      </aside>

      {/* Article */}
      <main style={{ minWidth: 0, maxWidth: 720, justifySelf: 'center' as any, width: '100%' }}>
        <header style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
            <Tag>{cat?.name}</Tag><Tag>{sub?.name}</Tag>
            {post.tags.slice(0, 3).map(tag => <Tag key={tag}>#{tag}</Tag>)}
          </div>
          <h1 style={{ margin: 0, fontSize: 42, fontFamily: type.display, fontWeight: 700, letterSpacing: -1, lineHeight: 1.15, color: t.text }}>{post.title}</h1>
          <p style={{ margin: '20px 0 0', fontSize: 18, color: t.textMuted, lineHeight: 1.6 }}>{post.excerpt}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 24, paddingTop: 18, borderTop: `1px solid ${t.border}`, fontFamily: type.mono, fontSize: 12, color: t.textSubtle }}>
            <span><Icons.Calendar size={12} style={{ marginRight: 4 }} />{post.date}</span>
            <span><Icons.Clock size={12} style={{ marginRight: 4 }} />{post.readMin} min</span>
            <span><Icons.Eye size={12} style={{ marginRight: 4 }} />{post.views.toLocaleString()}</span>
            <div style={{ flex: 1 }} />
            <ShareButton slug={post.slug} />
          </div>
        </header>

        <div style={{ borderRadius: 8, overflow: 'hidden', border: `1px solid ${t.border}`, marginBottom: 40 }}>
          <PlaceholderThumb {...(post.thumb || {})} aspect="16/9" />
        </div>

        <article style={{ fontSize: 16.5, lineHeight: 1.75, color: t.text, fontFamily: type.body }}>
          {SECTIONS.map((s, i) => (
            <section key={s.id} id={s.id} style={{ marginBottom: 36, scrollMarginTop: 80 }}>
              <h2 style={{ margin: '32px 0 16px', fontFamily: type.display, fontWeight: 700, color: t.text, letterSpacing: -0.4, fontSize: s.level === 1 ? 26 : 20 }}>{s.title}</h2>
              <DummyPara />
              {i % 2 === 0 && <DummyCode />}
              <DummyPara />
            </section>
          ))}
        </article>

        <div style={{ marginTop: 48, paddingTop: 28, borderTop: `1px solid ${t.border}`, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {post.tags.map(tag => <Tag key={tag}>#{tag}</Tag>)}
        </div>

        <div style={{ marginTop: 40, padding: 20, border: `1px solid ${t.border}`, borderRadius: 8, background: t.surfaceAlt, display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: t.accent, color: t.accentText, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 22, fontFamily: type.display, flexShrink: 0 }}>J</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: t.text }}>525tea</div>
            <div style={{ fontSize: 12.5, color: t.textMuted, lineHeight: 1.5, marginTop: 2 }}>Backend-leaning full-stack engineer — Java / Spring, Python, Postgres, K8s.</div>
          </div>
          <Button variant="ghost" size="sm" icon={<Icons.Github size={13} />}>Follow</Button>
        </div>

        {/* Comments */}
        <div style={{ marginTop: 48, paddingTop: 28, borderTop: `1px solid ${t.border}` }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: t.textSubtle, textTransform: 'uppercase', marginBottom: 20, fontFamily: type.body }}>
            Comments
          </div>
          <GiscusComments />
        </div>
      </main>

      {/* Right: TOC */}
      <aside style={{ fontFamily: type.body }}>
        <div style={{ position: 'sticky', top: 80 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: t.textSubtle, textTransform: 'uppercase', marginBottom: 12 }}>On this page</div>
          <nav style={{ borderLeft: `1px solid ${t.border}`, paddingLeft: 1 }}>
            {SECTIONS.map(s => {
              const active = s.id === activeId;
              return (
                <a key={s.id} href={`#${s.id}`}
                  onClick={(e) => { e.preventDefault(); document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                  style={{ display: 'block', padding: '6px 12px', marginLeft: s.level === 2 ? 12 : 0, borderLeft: active ? `2px solid ${t.accent}` : '2px solid transparent', fontSize: s.level === 2 ? 12 : 12.5, color: active ? t.text : t.textMuted, fontWeight: active ? 600 : 400, textDecoration: 'none', lineHeight: 1.5, transition: 'all 0.15s' }}>
                  {s.title}
                </a>
              );
            })}
          </nav>
          <div style={{ marginTop: 24, paddingTop: 16, borderTop: `1px solid ${t.border}` }}>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: t.textMuted, fontSize: 12, fontFamily: type.body }}>
              <Icons.ArrowUp size={12} /> Back to top
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}

function DummyPara() {
  const { t, type } = useTheme();
  return (
    <p style={{ margin: '0 0 16px', color: t.text }}>
      이 영역은 실제 글이 들어갈 자리의 더미 텍스트입니다. 본문 타이포그래피와 여백, 코드 블록과 제목의 리듬을 확인하기 위한 플레이스홀더예요. 실제 글은 MDX로 작성돼 이 자리에 렌더링돼요. <code style={{ fontFamily: type.mono, background: t.codeBg, padding: '1px 5px', borderRadius: 3, fontSize: '0.9em' }}>inline code</code> 의 색 대비도 여기서 확인해요.
    </p>
  );
}

function DummyCode() {
  const { t, type } = useTheme();
  const lines = [
    '// PostgreSQL lock modes in practice',
    'BEGIN;',
    'SELECT * FROM orders',
    '  WHERE id = $1',
    '  FOR UPDATE;  -- row-level exclusive',
    '',
    'UPDATE orders',
    "  SET status = 'shipped'",
    '  WHERE id = $1;',
    'COMMIT;',
  ];
  return (
    <pre style={{ margin: '20px 0', padding: 16, background: t.codeBg, border: `1px solid ${t.border}`, borderRadius: 6, fontFamily: type.mono, fontSize: 13.5, color: t.code, lineHeight: 1.6, overflowX: 'auto' }}>
      {lines.join('\n')}
    </pre>
  );
}

function ShareButton({ slug }: { slug: string }) {
  const { t, type } = useTheme();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const items = [
    { label: '링크 복사', icon: <Icons.Copy size={13} />, action: () => { try { navigator.clipboard.writeText(`${window.location.origin}/posts/${slug}`); } catch {} setCopied(true); setTimeout(() => { setCopied(false); setOpen(false); }, 1400); } },
    { label: 'X (Twitter)', icon: <Icons.Share size={13} />, action: () => setOpen(false) },
    { label: 'LinkedIn', icon: <Icons.Share size={13} />, action: () => setOpen(false) },
    { label: 'Hacker News', icon: <Icons.Share size={13} />, action: () => setOpen(false) },
  ];

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button onClick={() => setOpen(x => !x)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: 'transparent', border: `1px solid ${t.border}`, borderRadius: 4, color: t.text, fontSize: 12, cursor: 'pointer', fontFamily: type.body }}>
        <Icons.Share size={13} /> 공유
      </button>
      {open && (
        <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 6, minWidth: 180, padding: 6, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 6, boxShadow: SHADOW.lg, zIndex: 30 }}>
          {items.map((it, i) => (
            <button key={i} onClick={it.action}
              style={{ display: 'flex', width: '100%', alignItems: 'center', gap: 10, padding: '8px 10px', background: 'none', border: 'none', cursor: 'pointer', color: t.text, fontSize: 12.5, fontFamily: type.body, borderRadius: 4, textAlign: 'left' }}
              onMouseEnter={e => (e.currentTarget.style.background = t.surfaceAlt)}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              <span style={{ color: t.textMuted, display: 'flex' }}>{copied && i === 0 ? <Icons.Check size={13} /> : it.icon}</span>
              <span>{copied && i === 0 ? '복사됨' : it.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
