// App — main router and entrypoint

function App() {
  const [route, setRoute] = React.useState({ route: 'home' });
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [tweaksOpen, setTweaksOpen] = React.useState(false);

  const onNav = React.useCallback((r) => {
    setRoute(r);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  React.useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setSearchOpen(true); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // host-integration: edit mode
  React.useEffect(() => {
    const onMsg = (e) => {
      if (e.data?.type === '__activate_edit_mode') { window.__tweaksEditMode = true; setTweaksOpen(true); }
      if (e.data?.type === '__deactivate_edit_mode') { window.__tweaksEditMode = false; setTweaksOpen(false); }
    };
    window.addEventListener('message', onMsg);
    window.parent?.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  let page;
  if (route.route === 'home') page = <HomePage onNav={onNav} />;
  else if (route.route === 'category') {
    const cat = window.findCat(route.cat);
    if (!cat) page = <div style={{ padding: 80, textAlign: 'center' }}>Not found</div>;
    else if (cat.kind === 'project') page = <ProjectCategoryPage onNav={onNav} />;
    else page = <GeneralCategoryPage catSlug={route.cat} subSlug={null} onNav={onNav} />;
  }
  else if (route.route === 'sub') {
    const cat = window.findCat(route.cat);
    if (cat?.kind === 'project') page = <SubProjectPage catSlug={route.cat} subSlug={route.sub} onNav={onNav} />;
    else page = <GeneralCategoryPage catSlug={route.cat} subSlug={route.sub} onNav={onNav} />;
  }
  else if (route.route === 'post') page = <PostDetailPage postId={route.id} onNav={onNav} />;
  else if (route.route === 'series' || route.route === 'archive' || route.route === 'tags') page = <StubPage name={route.route} onNav={onNav} />;
  else page = <HomePage onNav={onNav} />;

  return (
    <>
      <Header onNav={onNav} onOpenSearch={() => setSearchOpen(true)} onOpenTweaks={() => setTweaksOpen(x => !x)} blogName="README" />
      {page}
      <Footer />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} onNav={onNav} />
      <TweaksPanel open={tweaksOpen} onClose={() => setTweaksOpen(false)} />
    </>
  );
}

function StubPage({ name, onNav }) {
  const { t, type } = useTheme();
  const labels = { series: 'Series', archive: 'Archive', tags: 'Tags' };
  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '64px 24px', display: 'flex', gap: 40 }}>
      <Sidebar current={{}} onNav={onNav} />
      <main style={{ flex: 1 }}>
        <div style={{ fontSize: 11, fontFamily: type.mono, color: t.accent, letterSpacing: 1.2, textTransform: 'uppercase' }}>Menu</div>
        <h1 style={{ margin: '6px 0 12px', fontSize: 40, fontFamily: type.display, fontWeight: 700, letterSpacing: -0.8, color: t.text }}>{labels[name]}</h1>
        <p style={{ color: t.textMuted, fontSize: 14, maxWidth: 560 }}>이 페이지는 구조만 잡아둔 자리입니다. 본문은 실제 글/메타데이터가 쌓이면 바로 붙일 수 있어요.</p>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
