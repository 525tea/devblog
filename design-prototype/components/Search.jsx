// Search overlay — expanding search with suggestions, autocomplete, post previews

function SearchOverlay({ open, onClose, onNav }) {
  const { t, type } = useTheme();
  const [query, setQuery] = React.useState('');
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 10);
  }, [open]);

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const results = React.useMemo(() => {
    if (!query.trim()) return { posts: [], tags: [], cats: [] };
    const q = query.toLowerCase();
    const posts = window.POSTS.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    ).slice(0, 5);
    const tagSet = new Set();
    window.POSTS.forEach(p => p.tags.forEach(tag => {
      if (tag.toLowerCase().includes(q)) tagSet.add(tag);
    }));
    const cats = window.CATEGORIES.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.children.some(s => s.name.toLowerCase().includes(q))
    );
    return { posts, tags: Array.from(tagSet).slice(0, 6), cats };
  }, [query]);

  const suggestions = ['Astro', 'Postgres', 'Docker', 'Kafka', 'TypeScript', 'Graph', 'Java Loom'];

  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: t.overlay, backdropFilter: 'blur(4px)',
      animation: 'fadeIn 0.15s',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        maxWidth: 640, margin: '80px auto 0', padding: '0 24px',
      }}>
        <div style={{
          background: t.surface, border: `1px solid ${t.border}`,
          borderRadius: 12, boxShadow: window.TOKENS.shadow.lg,
          overflow: 'hidden',
        }}>
          {/* Input row */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '16px 18px', borderBottom: query ? `1px solid ${t.border}` : 'none',
          }}>
            <Icons.Search size={20} style={{ color: t.textMuted }} />
            <input
              ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && query) alert('검색: ' + query); }}
              placeholder="글, 태그, 카테고리 검색…"
              style={{
                flex: 1, border: 'none', outline: 'none', background: 'transparent',
                fontSize: 16, color: t.text, fontFamily: type.body,
              }}
            />
            {query && (
              <button onClick={() => setQuery('')} style={{
                width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: t.surfaceAlt, border: 'none', borderRadius: '50%',
                cursor: 'pointer', color: t.textMuted,
              }}>
                <Icons.X size={12} />
              </button>
            )}
            <kbd style={{
              fontFamily: 'var(--font-mono)', fontSize: 11,
              padding: '2px 6px', color: t.textSubtle,
              border: `1px solid ${t.border}`, borderRadius: 3,
            }}>ESC</kbd>
          </div>

          {/* Results */}
          <div style={{ maxHeight: 460, overflowY: 'auto' }}>
            {!query && (
              <div style={{ padding: 18 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.8, color: t.textSubtle, textTransform: 'uppercase', marginBottom: 10 }}>추천 검색어</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {suggestions.map(s => (
                    <button key={s} onClick={() => setQuery(s)} style={{
                      padding: '5px 12px', borderRadius: 999, background: t.surfaceAlt,
                      border: `1px solid ${t.border}`, color: t.text,
                      fontSize: 12, fontFamily: type.body, cursor: 'pointer',
                    }}>{s}</button>
                  ))}
                </div>
              </div>
            )}
            {query && results.posts.length > 0 && (
              <div style={{ padding: '12px 0' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.8, color: t.textSubtle, textTransform: 'uppercase', padding: '6px 18px 8px' }}>관련 글</div>
                {results.posts.map(p => (
                  <div key={p.id} onClick={() => { onNav({ route: 'post', id: p.id }); onClose(); }}
                    style={{ padding: '10px 18px', cursor: 'pointer' }}
                    onMouseEnter={e => e.currentTarget.style.background = t.surfaceAlt}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <div style={{ fontSize: 14, color: t.text, marginBottom: 2, fontWeight: 500 }}>{highlight(p.title, query, t.accent)}</div>
                    <div style={{ fontSize: 12, color: t.textMuted, lineHeight: 1.5 }}>{p.excerpt.slice(0, 100)}…</div>
                  </div>
                ))}
              </div>
            )}
            {query && results.tags.length > 0 && (
              <div style={{ padding: '8px 18px 16px', borderTop: `1px solid ${t.border}` }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.8, color: t.textSubtle, textTransform: 'uppercase', marginBottom: 8 }}>태그</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {results.tags.map(tag => (
                    <span key={tag} style={{ padding: '3px 8px', fontSize: 12, borderRadius: 3, background: t.tag, color: t.tagText }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {query && !results.posts.length && !results.tags.length && (
              <div style={{ padding: 32, textAlign: 'center', color: t.textSubtle, fontSize: 13 }}>
                "{query}"에 대한 결과가 없습니다.
              </div>
            )}
          </div>

          {/* Bottom */}
          <div style={{
            padding: '10px 18px', borderTop: `1px solid ${t.border}`,
            background: t.surfaceAlt, display: 'flex', justifyContent: 'space-between',
            fontSize: 11, color: t.textSubtle,
          }}>
            <span>엔터로 검색</span>
            <button onClick={() => query && alert('검색: ' + query)}
              style={{
                padding: '4px 12px', background: t.accent, color: t.accentText,
                border: 'none', borderRadius: 4, fontSize: 11, fontWeight: 600,
                cursor: 'pointer', fontFamily: type.body,
              }}>검색</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function highlight(text, q, color) {
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return text;
  return <>
    {text.slice(0, i)}
    <mark style={{ background: 'transparent', color, fontWeight: 700 }}>{text.slice(i, i + q.length)}</mark>
    {text.slice(i + q.length)}
  </>;
}

window.SearchOverlay = SearchOverlay;
