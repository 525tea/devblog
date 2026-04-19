import { useState, useEffect, useCallback } from 'react';
import { ThemeProvider } from './theme';
import { Header } from './header';
import { Footer } from './primitives';
import { SearchOverlay } from './search';
import { TweaksPanel, TweaksGate } from './tweaks';
import { HomePage, ProjectCategoryPage, SubProjectPage, GeneralCategoryPage, TagsPage, type Route } from './pages';
import { PostDetailPage } from './post-detail';
import { ProfilePage } from './profile';
import { CATEGORIES } from '@/lib/data';

function AppInner() {
  const [route, setRoute] = useState<Route>({ route: 'home' });
  const [searchOpen, setSearchOpen] = useState(false);
  const [tweaksOpen, setTweaksOpen] = useState(false);
  const [tweaksGateOpen, setTweaksGateOpen] = useState(false);

  // Check if already authenticated this session
  const isAdminSession = () => { try { return sessionStorage.getItem('readme:admin') === '1'; } catch { return false; } };

  const onNav = useCallback((r: Route) => {
    setRoute(r);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // ⌘K = 검색 / Ctrl+Shift+T = Tweaks (숨겨진 단축키)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault(); setSearchOpen(true);
      }
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 't') {
        e.preventDefault();
        if (isAdminSession()) {
          setTweaksOpen(x => !x);
        } else {
          setTweaksGateOpen(true);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  let page;
  if (route.route === 'home') {
    page = <HomePage onNav={onNav} />;
  } else if (route.route === 'category') {
    const cat = CATEGORIES.find(c => c.slug === route.cat);
    if (!cat) page = <div style={{ padding: 80, textAlign: 'center' }}>Not found</div>;
    else if (cat.kind === 'project') page = <ProjectCategoryPage onNav={onNav} />;
    else page = <GeneralCategoryPage catSlug={route.cat} subSlug={null} onNav={onNav} />;
  } else if (route.route === 'sub') {
    const cat = CATEGORIES.find(c => c.slug === route.cat);
    if (cat?.kind === 'project') page = <SubProjectPage catSlug={route.cat} subSlug={route.sub} onNav={onNav} />;
    else page = <GeneralCategoryPage catSlug={route.cat} subSlug={route.sub} onNav={onNav} />;
  } else if (route.route === 'post') {
    page = <PostDetailPage postId={route.id} onNav={onNav} />;
  } else if (route.route === 'tags') {
    page = <TagsPage onNav={onNav} tag={route.tag} />;
  } else if (route.route === 'profile') {
    page = <ProfilePage onNav={onNav} />;
  } else {
    page = <HomePage onNav={onNav} />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header onNav={onNav} onOpenSearch={() => setSearchOpen(true)} onOpenTweaks={() => {}} />
      <main style={{ flex: 1 }}>{page}</main>
      <Footer onNav={onNav} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} onNav={(r) => { onNav(r as any); setSearchOpen(false); }} />
      <TweaksPanel open={tweaksOpen} onClose={() => setTweaksOpen(false)} />
      {tweaksGateOpen && (
        <TweaksGate
          onSuccess={() => { setTweaksGateOpen(false); setTweaksOpen(true); }}
          onClose={() => setTweaksGateOpen(false)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}

export default App;
