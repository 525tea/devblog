// Header + Footer wrapper for standalone Astro post pages
// Each is a separate React island (client:load) with its own ThemeProvider

import { ThemeProvider } from './theme';
import { Header } from './header';
import { Footer } from './primitives';
import { POSTS } from '@/lib/data';
import { type Route } from './pages';

type FooterRoute = { route: 'category'; cat: string } | { route: 'profile' | 'tags' };

// ─── PostHeader ────────────────────────────────��──────────
export function PostHeader() {
  return (
    <ThemeProvider>
      <PostHeaderInner />
    </ThemeProvider>
  );
}

function PostHeaderInner() {
  const onNav = (r: Route) => {
    if (r.route === 'post') {
      const post = POSTS.find(p => p.id === r.id);
      if (post) { window.location.href = `/posts/${post.slug}`; return; }
    }
    window.location.href = '/';
  };
  return <Header onNav={onNav} onOpenSearch={() => {}} onOpenTweaks={() => {}} />;
}

// ─── PostFooter ───────────────────────────────────────────
export function PostFooter() {
  return (
    <ThemeProvider>
      <PostFooterInner />
    </ThemeProvider>
  );
}

function PostFooterInner() {
  const onNav = (_r: FooterRoute) => { window.location.href = '/'; };
  return <Footer onNav={onNav} />;
}
