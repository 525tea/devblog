import { useEffect, useRef } from 'react';
import { useTheme } from './theme';

// 설정값은 .env.local에서 관리:
//   PUBLIC_GISCUS_REPO=525tea/devblog
//   PUBLIC_GISCUS_REPO_ID=...
//   PUBLIC_GISCUS_CATEGORY=Comments
//   PUBLIC_GISCUS_CATEGORY_ID=...
const REPO          = import.meta.env.PUBLIC_GISCUS_REPO          ?? '';
const REPO_ID       = import.meta.env.PUBLIC_GISCUS_REPO_ID       ?? '';
const CATEGORY      = import.meta.env.PUBLIC_GISCUS_CATEGORY      ?? 'Comments';
const CATEGORY_ID   = import.meta.env.PUBLIC_GISCUS_CATEGORY_ID   ?? '';

function giscusTheme(themeName: string, mode: string): string {
  if (themeName === 'paper') return 'light';
  if (themeName === 'docs')  return mode === 'dark' ? 'dark' : 'light_protanopia';
  if (themeName === 'glass') return 'transparent_dark';
  return 'dark_dimmed'; // terminal
}

export function GiscusComments() {
  const { themeName, mode } = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !REPO || !REPO_ID || !CATEGORY_ID) return;

    // 기존 스크립트 제거 (테마 변경 시 재로드)
    ref.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', REPO);
    script.setAttribute('data-repo-id', REPO_ID);
    script.setAttribute('data-category', CATEGORY);
    script.setAttribute('data-category-id', CATEGORY_ID);
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', giscusTheme(themeName, mode));
    script.setAttribute('data-lang', 'ko');
    script.setAttribute('data-loading', 'lazy');
    script.async = true;
    script.crossOrigin = 'anonymous';
    ref.current.appendChild(script);
  }, [themeName, mode]);

  if (!REPO || !REPO_ID || !CATEGORY_ID) {
    return null; // env 미설정 시 조용히 숨김
  }

  return <div ref={ref} style={{ marginTop: 8 }} />;
}
