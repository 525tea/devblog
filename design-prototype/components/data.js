// Sample content for Devnote IT Blog

const CATEGORIES = [
  {
    slug: 'project',
    name: 'Project',
    nameKo: '프로젝트',
    description: 'Apps, services and side-projects I built.',
    kind: 'project',
    children: [
      { slug: 'devnote', name: 'Devnote', thumb: '#8c5e3c', tags: ['Astro', 'TypeScript', 'MDX'], intro: 'This very blog — a static site built for fast reading and comfortable writing.' },
      { slug: 'leafwatch', name: 'Leafwatch', thumb: '#3c6e3c', tags: ['Next.js', 'Supabase', 'PostGIS'], intro: 'A tree-canopy monitoring dashboard for urban planners.' },
      { slug: 'relay', name: 'Relay', thumb: '#3c5e8c', tags: ['Go', 'Kafka', 'gRPC'], intro: 'Event bus for microservices with exactly-once delivery semantics.' },
      { slug: 'paperstack', name: 'Paperstack', thumb: '#8c3c5e', tags: ['Python', 'FastAPI', 'Postgres'], intro: 'Research paper manager with citation graph + semantic search.' },
      { slug: 'tealeaf', name: 'Tealeaf', thumb: '#6e3c8c', tags: ['React Native', 'Expo'], intro: 'A personal journaling app with moodboards and on-device encryption.' },
    ],
  },
  {
    slug: 'language',
    name: 'Language',
    nameKo: '언어',
    description: 'Deep-dives into programming languages, idioms, and gotchas.',
    kind: 'general',
    children: [
      { slug: 'java', name: 'Java', count: 14 },
      { slug: 'python', name: 'Python', count: 22 },
      { slug: 'sql', name: 'SQL', count: 9 },
      { slug: 'javascript', name: 'JavaScript', count: 18 },
    ],
  },
  {
    slug: 'cs',
    name: 'CS',
    nameKo: '컴퓨터과학',
    description: 'Core computer-science topics — the fundamentals.',
    kind: 'general',
    children: [
      { slug: 'os', name: 'Operating Systems', count: 11 },
      { slug: 'network', name: 'Networks', count: 8 },
      { slug: 'db', name: 'Databases', count: 15 },
      { slug: 'arch', name: 'Architecture', count: 7 },
      { slug: 'security', name: 'Information Security', count: 6 },
    ],
  },
  {
    slug: 'devops',
    name: 'DevOps',
    nameKo: '데브옵스',
    description: 'Infrastructure, CI/CD, containers and observability.',
    kind: 'general',
    children: [
      { slug: 'infra', name: 'Infrastructure', count: 9 },
      { slug: 'cicd', name: 'CI / CD', count: 6 },
      { slug: 'containers', name: 'Containers', count: 8 },
      { slug: 'observability', name: 'Observability', count: 4 },
    ],
  },
  {
    slug: 'algorithm',
    name: 'Algorithm',
    nameKo: '알고리즘',
    description: 'Problem solving, data structures, and interview prep.',
    kind: 'general',
    children: [
      { slug: 'ds', name: 'Data Structures', count: 12 },
      { slug: 'graph', name: 'Graph', count: 7 },
      { slug: 'dp', name: 'Dynamic Programming', count: 5 },
      { slug: 'string', name: 'String', count: 4 },
    ],
  },
  {
    slug: 'skills',
    name: 'Skills',
    nameKo: '스킬',
    description: 'Tools of the trade — design, AI pairing, and productivity.',
    kind: 'general',
    children: [
      { slug: 'figma', name: 'Figma', count: 5 },
      { slug: 'claude', name: 'Claude', count: 8 },
      { slug: 'codex', name: 'Codex', count: 3 },
    ],
  },
];

// Tinted placeholder helper — uses category color + index to make distinct thumbs
function tint(hue, lightness = 55, c = 18) {
  return `oklch(${lightness}% ${c / 100} ${hue})`;
}

const POSTS = [
  // Featured / headline candidates
  {
    id: 'p001', slug: 'why-astro', title: 'Why I chose Astro for a technical blog',
    cat: 'project', sub: 'devnote',
    tags: ['Astro', 'SSG', 'MDX'], series: 'Building Devnote',
    excerpt: 'After three rewrites in four years, I finally settled on Astro. Here is why the islands architecture wins for a content-first site, and what I gave up in exchange.',
    date: '2026-04-12', readMin: 8, views: 4821, pinned: true,
    thumb: { hue: 45, l: 62, c: 14 },
  },
  {
    id: 'p002', slug: 'event-loop-myths', title: 'Three myths about the JavaScript event loop',
    cat: 'language', sub: 'javascript',
    tags: ['JavaScript', 'Runtime', 'Performance'],
    excerpt: 'Microtasks vs macrotasks is only half the picture. Here is what actually happens when you await inside a setTimeout callback.',
    date: '2026-04-10', readMin: 12, views: 3204, pinned: true,
    thumb: { hue: 55, l: 60, c: 16 },
  },
  {
    id: 'p003', slug: 'postgres-locks', title: 'A field guide to Postgres locks',
    cat: 'cs', sub: 'db',
    tags: ['Postgres', 'Concurrency', 'SQL'], series: 'Databases at scale',
    excerpt: 'SELECT FOR UPDATE, advisory locks, and how to read pg_locks without going cross-eyed. A practical map of every lock mode you will meet in production.',
    date: '2026-04-08', readMin: 15, views: 2980, pinned: true,
    thumb: { hue: 200, l: 55, c: 14 },
  },
  {
    id: 'p004', slug: 'tcp-handshake', title: 'The TCP handshake, one byte at a time',
    cat: 'cs', sub: 'network',
    tags: ['TCP', 'Networking'],
    excerpt: 'A packet-level walkthrough of SYN, SYN-ACK, and ACK — including every flag and option you normally never look at.',
    date: '2026-04-06', readMin: 10, views: 2100, pinned: true,
    thumb: { hue: 220, l: 58, c: 14 },
  },
  {
    id: 'p005', slug: 'elasticsearch-shards', title: 'How many shards? A sizing framework for ElasticSearch',
    cat: 'devops', sub: 'infra',
    tags: ['ElasticSearch', 'Sharding', 'Capacity'],
    excerpt: 'The "one shard per GB" rule is wrong more often than it is right. Here is a simple model based on ingestion rate, heap, and query fan-out.',
    date: '2026-04-04', readMin: 14, views: 1875, pinned: true,
    thumb: { hue: 25, l: 58, c: 16 },
  },
  // Latest — more
  {
    id: 'p006', slug: 'python-dataclasses', title: 'Dataclasses vs Pydantic vs attrs — pick one',
    cat: 'language', sub: 'python', tags: ['Python', 'Types'],
    excerpt: 'After using all three in production, here is my decision tree. Short version: it depends on whether the thing crosses a trust boundary.',
    date: '2026-04-02', readMin: 9, views: 1420,
    thumb: { hue: 140, l: 60, c: 12 },
  },
  {
    id: 'p007', slug: 'b-tree-vs-lsm', title: 'B-trees vs LSM-trees, visually',
    cat: 'cs', sub: 'db', tags: ['Database', 'Storage'], series: 'Databases at scale',
    excerpt: 'Why Postgres picks one and RocksDB picks the other. With diagrams that actually explain the tradeoff instead of repeating the cliche.',
    date: '2026-03-30', readMin: 11, views: 1210,
    thumb: { hue: 190, l: 58, c: 14 },
  },
  {
    id: 'p008', slug: 'docker-caching', title: 'Dockerfile caching is not what you think it is',
    cat: 'devops', sub: 'containers', tags: ['Docker', 'Build'],
    excerpt: 'Three subtle ways your Dockerfile invalidates cache and slows every CI run — and the one-line fix for each.',
    date: '2026-03-28', readMin: 7, views: 1080,
    thumb: { hue: 210, l: 56, c: 12 },
  },
  {
    id: 'p009', slug: 'dijkstra-revisited', title: 'Dijkstra revisited — A* is not always better',
    cat: 'algorithm', sub: 'graph', tags: ['Graph', 'Pathfinding'],
    excerpt: 'When the heuristic is expensive, plain old Dijkstra wins. A benchmark on three real road-network datasets.',
    date: '2026-03-25', readMin: 10, views: 960,
    thumb: { hue: 280, l: 55, c: 14 },
  },
  {
    id: 'p010', slug: 'figma-handoff', title: 'The handoff checklist I wish designers gave me',
    cat: 'skills', sub: 'figma', tags: ['Figma', 'Handoff'],
    excerpt: 'Five things to check before you say the mock is ready, from a developer who has implemented too many ambiguous spacings.',
    date: '2026-03-22', readMin: 6, views: 840,
    thumb: { hue: 320, l: 62, c: 16 },
  },
  {
    id: 'p011', slug: 'claude-pair-coding', title: 'Pair-coding with Claude — the three-prompt pattern',
    cat: 'skills', sub: 'claude', tags: ['Claude', 'AI', 'Workflow'],
    excerpt: 'Plan → Draft → Review, each with its own system prompt. It turns AI coding from slot-machine into an actual process.',
    date: '2026-03-20', readMin: 8, views: 780,
    thumb: { hue: 10, l: 62, c: 14 },
  },
  {
    id: 'p012', slug: 'java-virtual-threads', title: 'Virtual threads are not free threads',
    cat: 'language', sub: 'java', tags: ['Java', 'Concurrency', 'Loom'],
    excerpt: 'Project Loom landed, but synchronized blocks still pin. Here is how I instrumented a real service to find pinning hotspots.',
    date: '2026-03-18', readMin: 13, views: 710,
    thumb: { hue: 30, l: 58, c: 15 },
  },
  // Popular — older, higher views
  {
    id: 'p013', slug: 'race-conditions', title: 'Every race condition I have ever shipped',
    cat: 'cs', sub: 'os', tags: ['Concurrency', 'Bugs'],
    excerpt: 'Nine stories, nine root causes, and one very short list of patterns to avoid them.',
    date: '2026-02-10', readMin: 18, views: 12480,
    thumb: { hue: 0, l: 55, c: 16 },
  },
  {
    id: 'p014', slug: 'indexing-101', title: 'Indexing 101 — stop guessing, start EXPLAINing',
    cat: 'cs', sub: 'db', tags: ['Postgres', 'Indexing'],
    excerpt: 'Read an EXPLAIN plan in 10 minutes. The three numbers that matter and the two that never do.',
    date: '2026-01-28', readMin: 12, views: 9870,
    thumb: { hue: 200, l: 60, c: 16 },
  },
  {
    id: 'p015', slug: 'kafka-exactly-once', title: 'Kafka exactly-once is real, but not free',
    cat: 'devops', sub: 'infra', tags: ['Kafka', 'Messaging'],
    excerpt: 'What the transactional producer actually guarantees, what it costs, and when idempotence alone is enough.',
    date: '2026-01-15', readMin: 14, views: 8120,
    thumb: { hue: 20, l: 60, c: 14 },
  },
  {
    id: 'p016', slug: 'tcp-head-of-line', title: 'Head-of-line blocking, from TCP to HTTP/3',
    cat: 'cs', sub: 'network', tags: ['HTTP', 'QUIC'],
    excerpt: 'Why HTTP/2 did not fix it and HTTP/3 did. The word "multiplexing" is doing a lot of work in this story.',
    date: '2026-01-05', readMin: 11, views: 6540,
    thumb: { hue: 230, l: 60, c: 14 },
  },
  {
    id: 'p017', slug: 'typescript-types-are-sets', title: 'TypeScript types are sets, not values',
    cat: 'language', sub: 'javascript', tags: ['TypeScript', 'Types'],
    excerpt: 'The mental model that makes union, intersection, and conditional types finally click.',
    date: '2025-12-20', readMin: 9, views: 5890,
    thumb: { hue: 215, l: 58, c: 15 },
  },
  {
    id: 'p018', slug: 'interview-big-o', title: 'Big-O in interviews — what is really being asked',
    cat: 'algorithm', sub: 'ds', tags: ['Interview', 'Complexity'],
    excerpt: 'It is not about memorizing the table. It is about modeling a system well enough to reason about it out loud.',
    date: '2025-12-10', readMin: 8, views: 5420,
    thumb: { hue: 290, l: 58, c: 14 },
  },
];

window.CATEGORIES = CATEGORIES;
window.POSTS = POSTS;

// Utility: look up a category / subcategory by slug
window.findCat = (slug) => CATEGORIES.find(c => c.slug === slug);
window.findSub = (catSlug, subSlug) => {
  const c = window.findCat(catSlug);
  return c && c.children.find(s => s.slug === subSlug);
};
window.postsOfCat = (slug) => POSTS.filter(p => p.cat === slug);
window.postsOfSub = (cat, sub) => POSTS.filter(p => p.cat === cat && p.sub === sub);
