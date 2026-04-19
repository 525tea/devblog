import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// Cloudflare Pages: 커스텀 도메인이 생기면 아래 site를 교체
// 예: 'https://yourdomain.com' 또는 'https://devblog.pages.dev'
export default defineConfig({
  site: 'https://read-me.pages.dev',
  base: '/',
  integrations: [
    mdx(),
    react(),
    sitemap(),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
