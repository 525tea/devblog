// Pages — Home, Project category, Project sub (detail), General category (Docs layout only)

function HomePage({ onNav }) {
  const { t, type } = useTheme();
  const pinned = window.POSTS.filter(p => p.pinned);
  const latest = window.POSTS.filter(p => !p.pinned).slice(0, 12);
  const popular = [...window.POSTS].sort((a, b) => b.views - a.views).slice(0, 6);

  const [heroIdx, setHeroIdx] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const perPage = 6;
  const pagedLatest = latest.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(latest.length / perPage);

  React.useEffect(() => {
    const id = setInterval(() => setHeroIdx(i => (i + 1) % pinned.length), 7000);
    return () => clearInterval(id);
  }, [pinned.length]);

  return (
    <div>
      {/* BANNER */}
      <section style={{ borderBottom: `1px solid ${t.border}`, background: `linear-gradient(180deg, ${t.surfaceAlt} 0%, ${t.bg} 100%)` }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '64px 24px 72px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 60, alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, fontFamily: type.mono, color: t.accent, letterSpacing: 1.2, marginBottom: 14, textTransform: 'uppercase' }}>
                $ cat README.md
              </div>
              <h1 style={{ margin: 0, fontSize: 52, fontFamily: type.display, fontWeight: 700, letterSpacing: -1.2, lineHeight: 1.08, color: t.text, textWrap: 'balance' }}>
                Backend notes,<br/>system design,<br/>and what I shipped.
              </h1>
              <p style={{ margin: '24px 0 0', fontSize: 16, color: t.textMuted, lineHeight: 1.6, maxWidth: 520, textWrap: 'pretty' }}>
                Full-stack engineering log — languages, distributed systems, infrastructure,
                and the side projects where I try things before putting them in production.
              </p>
              <div style={{ display: 'flex', gap: 10, marginTop: 28 }}>
                <Button onClick={() => onNav({ route: 'category', cat: 'project' })} iconRight={<Icons.ArrowRight size={14}/>}>프로젝트 둘러보기</Button>
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ fontFamily: type.mono, fontSize: 11, color: t.textSubtle, marginBottom: 10 }}>// recently</div>
              <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 8, fontFamily: type.mono, fontSize: 12.5, padding: 18, boxShadow: window.TOKENS.shadow.md }}>
                {window.POSTS.slice(0, 4).map((p, i) => (
                  <div key={p.id} onClick={() => onNav({ route: 'post', id: p.id })}
                       style={{ padding: '8px 0', borderTop: i === 0 ? 'none' : `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', gap: 12, cursor: 'pointer' }}
                       onMouseEnter={e => e.currentTarget.style.color = t.accent}
                       onMouseLeave={e => e.currentTarget.style.color = t.text}>
                    <span style={{ color: t.textSubtle, flexShrink: 0 }}>{p.date.slice(5)}</span>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '48px 24px', display: 'flex', gap: 40 }}>
        <Sidebar current={{}} onNav={onNav} />
        <main style={{ flex: 1, minWidth: 0 }}>
          <SectionHead kicker="Pinned" title="Headline" count={pinned.length} />
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 32, background: t.surfaceAlt, border: `1px solid ${t.border}`, borderRadius: 10, padding: 28, marginBottom: 14 }}>
            <div style={{ borderRadius: 6, overflow: 'hidden', border: `1px solid ${t.border}` }}>
              <PlaceholderThumb {...(pinned[heroIdx].thumb || {})} aspect="16/10" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
                  {pinned[heroIdx].tags.map(tag => <Tag key={tag}>#{tag}</Tag>)}
                </div>
                <h2 style={{ margin: 0, fontSize: 28, fontFamily: type.display, fontWeight: 700, color: t.text, letterSpacing: -0.5, lineHeight: 1.2, textWrap: 'pretty' }}>{pinned[heroIdx].title}</h2>
                <p style={{ margin: '16px 0 0', fontSize: 14.5, color: t.textMuted, lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{pinned[heroIdx].excerpt}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 24 }}>
                <Button onClick={() => onNav({ route: 'post', id: pinned[heroIdx].id })} iconRight={<Icons.ArrowRight size={14}/>}>더보기</Button>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: type.mono, fontSize: 12, color: t.textSubtle }}>
                  <button onClick={() => setHeroIdx(i => (i - 1 + pinned.length) % pinned.length)} style={carouselBtn(t)}><Icons.ArrowLeft size={14}/></button>
                  <span>{String(heroIdx + 1).padStart(2,'0')} / {String(pinned.length).padStart(2,'0')}</span>
                  <button onClick={() => setHeroIdx(i => (i + 1) % pinned.length)} style={carouselBtn(t)}><Icons.ArrowRight size={14}/></button>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, marginBottom: 60 }}>
            {pinned.map((p, i) => (
              <div key={p.id} onClick={() => setHeroIdx(i)} style={{
                position: 'relative', cursor: 'pointer', borderRadius: 5, overflow: 'hidden',
                border: `1px solid ${i === heroIdx ? t.accent : t.border}`,
                outline: i === heroIdx ? `2px solid ${t.accent}44` : 'none',
              }}>
                <PlaceholderThumb {...(p.thumb || {})} aspect="16/9" />
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent 40%, ${t.overlay} 100%)`, display: 'flex', alignItems: 'flex-end', padding: 10 }}>
                  <div style={{ color: '#fff', fontSize: 11, fontWeight: 600, lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.title}</div>
                </div>
                {p.pinned && <div style={{ position: 'absolute', top: 6, left: 6, color: '#fff' }}><Icons.Pin size={12}/></div>}
              </div>
            ))}
          </div>

          <SectionHead kicker="Newest first" title="Latest" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, marginBottom: 8 }}>
            {pagedLatest.map(p => <PostCard key={p.id} post={p} onNav={onNav} />)}
          </div>
          <Pagination page={page} total={totalPages} onChange={setPage} />

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

function carouselBtn(t) {
  return { width: 28, height: 28, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: `1px solid ${t.border}`, borderRadius: 4, cursor: 'pointer', color: t.textMuted };
}

function SectionHead({ kicker, title, count, more }) {
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
          {more.label} <Icons.ArrowRight size={12}/>
        </button>
      )}
    </div>
  );
}

// Project category
function ProjectCategoryPage({ onNav }) {
  const { t, type } = useTheme();
  const cat = window.findCat('project');
  const posts = window.postsOfCat('project');
  const latest = [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);
  const popular = [...posts].sort((a, b) => b.views - a.views).slice(0, 5);

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '40px 24px', display: 'flex', gap: 40 }}>
      <Sidebar current={{ cat: 'project' }} onNav={onNav} />
      <main style={{ flex: 1, minWidth: 0 }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 11, fontFamily: type.mono, color: t.accent, letterSpacing: 1.2, textTransform: 'uppercase' }}>Category</div>
          <h1 style={{ margin: '6px 0 10px', fontSize: 40, fontFamily: type.display, fontWeight: 700, letterSpacing: -0.8, color: t.text }}>Projects</h1>
          <p style={{ margin: 0, fontSize: 15, color: t.textMuted, maxWidth: 640, lineHeight: 1.6 }}>
            {cat.description} Each project is a sub-category — click one to read its posts.
          </p>
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
            <div>
              {popular.map((p, i) => <PopularItem key={p.id} post={p} rank={i + 1} onNav={onNav} />)}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ProjectCard({ sub, onNav }) {
  const { t, type } = useTheme();
  const [hover, setHover] = React.useState(false);
  const posts = window.POSTS.filter(p => p.cat === 'project' && p.sub === sub.slug);
  const thumb = posts[0]?.thumb || { hue: 45, l: 60, c: 14 };
  return (
    <article onClick={() => onNav({ route: 'sub', cat: 'project', sub: sub.slug })}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ cursor: 'pointer', borderRadius: 8, overflow: 'hidden', border: `1px solid ${t.border}`, background: t.surface }}>
      <div style={{ position: 'relative' }}>
        <PlaceholderThumb {...thumb} aspect="16/10" />
        <div style={{ position: 'absolute', inset: 0, padding: 18, background: t.overlay, color: '#fff', display: 'flex', alignItems: 'center', opacity: hover ? 1 : 0, transition: 'opacity 0.2s', fontSize: 13.5, lineHeight: 1.55, textWrap: 'pretty' }}>
          {sub.intro}
        </div>
      </div>
      <div style={{ padding: 14 }}>
        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600, fontFamily: type.display, letterSpacing: -0.3, color: t.text }}>{sub.name}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 10 }}>
          {sub.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
        </div>
        <div style={{ marginTop: 10, fontFamily: type.mono, fontSize: 11, color: t.textSubtle }}>{posts.length} posts</div>
      </div>
    </article>
  );
}

// Project sub (detail)
function SubProjectPage({ catSlug, subSlug, onNav }) {
  const { t, type } = useTheme();
  const cat = window.findCat(catSlug);
  const sub = window.findSub(catSlug, subSlug);
  const posts = window.postsOfSub(catSlug, subSlug).sort((a, b) => b.date.localeCompare(a.date));
  const [page, setPage] = React.useState(1);
  const perPage = 6;
  const paged = posts.slice((page - 1) * perPage, page * perPage);

  if (!sub) return <div style={{ padding: 80, textAlign: 'center', color: t.textMuted }}>프로젝트를 찾을 수 없어요.</div>;

  return (
    <div>
      <section style={{ borderBottom: `1px solid ${t.border}`, background: t.surfaceAlt }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '48px 24px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 48, alignItems: 'center' }}>
          <div>
            <button onClick={() => onNav({ route: 'category', cat: catSlug })} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: t.textMuted, fontSize: 12, fontFamily: type.mono, marginBottom: 14, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <Icons.ArrowLeft size={12}/> {cat.name}
            </button>
            <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
              {sub.tags.map(tag => <Tag key={tag} variant="accent">{tag}</Tag>)}
            </div>
            <h1 style={{ margin: 0, fontSize: 44, fontFamily: type.display, fontWeight: 700, letterSpacing: -1, color: t.text, textWrap: 'balance' }}>{sub.name}</h1>
            <p style={{ margin: '16px 0 0', fontSize: 16, color: t.textMuted, lineHeight: 1.65, maxWidth: 580, textWrap: 'pretty' }}>{sub.intro}</p>
            <div style={{ marginTop: 22, display: 'flex', gap: 16, fontFamily: type.mono, fontSize: 12, color: t.textSubtle }}>
              <span>{posts.length} posts</span><span>·</span><span>Latest {posts[0]?.date}</span>
            </div>
          </div>
          <div style={{ borderRadius: 10, overflow: 'hidden', border: `1px solid ${t.border}`, boxShadow: window.TOKENS.shadow.md }}>
            <PlaceholderThumb hue={45} l={60} c={14} {...(posts[0]?.thumb || {})} aspect="4/3" />
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '40px 24px', display: 'flex', gap: 40 }}>
        <Sidebar current={{ cat: catSlug, sub: subSlug }} onNav={onNav} />
        <main style={{ flex: 1, minWidth: 0 }}>
          <SectionHead kicker="Articles" title="All posts" count={posts.length} />
          <div>
            {paged.map(p => <PostRow key={p.id} post={p} onNav={onNav} />)}
            {paged.length === 0 && <div style={{ padding: 60, textAlign: 'center', color: t.textSubtle }}>아직 작성된 글이 없어요.</div>}
          </div>
          {posts.length > perPage && <Pagination page={page} total={Math.ceil(posts.length / perPage)} onChange={setPage} />}
        </main>
      </div>
    </div>
  );
}

// General category — Docs layout, sidebar-driven (Obsidian/Notion/Stripe Docs style)
// Sidebar's current.sub === null → "All", sub selected → filtered. No separate tabs.
function GeneralCategoryPage({ catSlug, subSlug, onNav }) {
  const { t, type } = useTheme();
  const cat = window.findCat(catSlug);
  const allPosts = window.postsOfCat(catSlug);
  const posts = subSlug ? allPosts.filter(p => p.sub === subSlug) : allPosts;
  const activeSub = subSlug ? window.findSub(catSlug, subSlug) : null;
  if (!cat) return null;

  const [page, setPage] = React.useState(1);
  React.useEffect(() => setPage(1), [catSlug, subSlug]);
  const perPage = 6;
  const paged = posts.slice((page - 1) * perPage, page * perPage);

  return (
    <div>
      <section style={{ borderBottom: `1px solid ${t.border}` }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '40px 24px 28px' }}>
          <div style={{ fontSize: 11, fontFamily: type.mono, color: t.accent, letterSpacing: 1.2, textTransform: 'uppercase' }}>
            Category {activeSub && `›  ${activeSub.name}`}
          </div>
          <h1 style={{ margin: '6px 0 6px', fontSize: 40, fontFamily: type.display, fontWeight: 700, letterSpacing: -0.8, color: t.text }}>
            {activeSub ? activeSub.name : cat.name}
          </h1>
          <p style={{ margin: 0, fontSize: 15, color: t.textMuted, maxWidth: 640, lineHeight: 1.6 }}>
            {activeSub ? `${cat.name} › ${activeSub.name}` : cat.description}
          </p>
          <div style={{ marginTop: 18, display: 'flex', gap: 14, fontFamily: type.mono, fontSize: 12, color: t.textSubtle }}>
            <span>{activeSub ? posts.length : allPosts.length} posts</span>
            {!activeSub && (<><span>·</span><span>{cat.children.length} topics</span></>)}
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 24px', display: 'flex', gap: 40 }}>
        <Sidebar current={{ cat: catSlug, sub: subSlug }} onNav={onNav} />
        <main style={{ flex: 1, minWidth: 0 }}>
          {/* Breadcrumb / filter chip row — shows active filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, paddingBottom: 14, borderBottom: `1px solid ${t.border}` }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 999, background: subSlug ? t.surfaceAlt : t.accent, color: subSlug ? t.textMuted : t.accentText, fontSize: 12, fontFamily: type.body, fontWeight: 600, border: `1px solid ${subSlug ? t.border : t.accent}`, cursor: 'pointer' }}
                 onClick={() => onNav({ route: 'category', cat: catSlug })}>
              All · {allPosts.length}
            </div>
            {activeSub && (
              <>
                <Icons.Chevron size={11} style={{ color: t.textSubtle }} />
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 999, background: t.accent, color: t.accentText, fontSize: 12, fontFamily: type.body, fontWeight: 600 }}>
                  {activeSub.name} · {posts.length}
                </div>
              </>
            )}
            <div style={{ flex: 1 }} />
            <span style={{ fontSize: 11, color: t.textSubtle, fontFamily: type.mono }}>
              {subSlug ? `filtered by ${activeSub.name}` : 'showing all sub-categories'}
            </span>
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

window.HomePage = HomePage;
window.ProjectCategoryPage = ProjectCategoryPage;
window.SubProjectPage = SubProjectPage;
window.GeneralCategoryPage = GeneralCategoryPage;
