// PostCard — unified post card with consistent aspect ratios
function PostCard({ post, size = 'md', onNav }) {
  const { t, type } = useTheme();
  const sub = window.findSub(post.cat, post.sub);
  const subName = sub?.name || post.sub;

  const sizes = {
    sm: { titleFont: 13, excerpt: 0, aspect: '16/10' },
    md: { titleFont: 15, excerpt: 2, aspect: '16/10' },
    lg: { titleFont: 17, excerpt: 3, aspect: '16/9' },
  };
  const cfg = sizes[size];

  return (
    <article onClick={() => onNav({ route: 'post', id: post.id })} style={{
      cursor: 'pointer', background: 'transparent',
      display: 'flex', flexDirection: 'column', gap: 10,
    }}
    onMouseEnter={e => e.currentTarget.querySelector('.pc-title').style.color = t.accent}
    onMouseLeave={e => e.currentTarget.querySelector('.pc-title').style.color = t.text}>
      <div style={{
        position: 'relative', overflow: 'hidden', borderRadius: 6,
        border: `1px solid ${t.border}`,
      }}>
        <PlaceholderThumb {...(post.thumb || { hue: 45 })} aspect={cfg.aspect} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          <Tag>{window.findCat(post.cat)?.name}</Tag>
          <Tag>{subName}</Tag>
        </div>
        <h3 className="pc-title" style={{
          margin: 0, fontSize: cfg.titleFont, fontWeight: 600,
          lineHeight: 1.35, color: t.text, fontFamily: type.body,
          transition: 'color 0.15s',
          textWrap: 'pretty',
        }}>{post.title}</h3>
        {cfg.excerpt > 0 && (
          <p style={{
            margin: 0, fontSize: 12.5, color: t.textMuted,
            lineHeight: 1.55, overflow: 'hidden',
            display: '-webkit-box', WebkitLineClamp: cfg.excerpt, WebkitBoxOrient: 'vertical',
          }}>{post.excerpt}</p>
        )}
        <div style={{ display: 'flex', gap: 10, fontSize: 11, color: t.textSubtle, fontFamily: type.mono, marginTop: 2 }}>
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readMin} min read</span>
        </div>
      </div>
    </article>
  );
}

// Popular list item — compact with rank + thumb
function PopularItem({ post, rank, onNav }) {
  const { t, type } = useTheme();
  const sub = window.findSub(post.cat, post.sub);
  return (
    <div onClick={() => onNav({ route: 'post', id: post.id })} style={{
      display: 'flex', gap: 12, padding: '12px 0',
      cursor: 'pointer', borderTop: rank === 1 ? 'none' : `1px solid ${t.border}`,
    }}>
      <div style={{
        width: 28, fontFamily: type.mono, fontSize: 14, fontWeight: 700,
        color: rank <= 3 ? t.accent : t.textSubtle, lineHeight: 1.2,
        paddingTop: 2,
      }}>{String(rank).padStart(2, '0')}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
          <Tag>{sub?.name || post.sub}</Tag>
        </div>
        <div style={{
          fontSize: 13, color: t.text, fontWeight: 500, lineHeight: 1.4,
          overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        }}>{post.title}</div>
        <div style={{ display: 'flex', gap: 8, fontSize: 11, color: t.textSubtle, fontFamily: type.mono, marginTop: 4 }}>
          <Icons.Eye size={11} /><span>{post.views.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

// List-style card for subcategory / project detail
function PostRow({ post, onNav }) {
  const { t, type } = useTheme();
  const sub = window.findSub(post.cat, post.sub);
  return (
    <article onClick={() => onNav({ route: 'post', id: post.id })} style={{
      display: 'grid', gridTemplateColumns: '200px 1fr', gap: 20,
      padding: '20px 0', borderBottom: `1px solid ${t.border}`,
      cursor: 'pointer',
    }}
    onMouseEnter={e => e.currentTarget.querySelector('.pr-title').style.color = t.accent}
    onMouseLeave={e => e.currentTarget.querySelector('.pr-title').style.color = t.text}>
      <div style={{ borderRadius: 6, overflow: 'hidden', border: `1px solid ${t.border}` }}>
        <PlaceholderThumb {...(post.thumb || { hue: 45 })} aspect="16/10" />
      </div>
      <div>
        <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
          <Tag>{window.findCat(post.cat)?.name}</Tag>
          <Tag>{sub?.name || post.sub}</Tag>
          {post.series && <Tag variant="accent">{post.series}</Tag>}
        </div>
        <h3 className="pr-title" style={{
          margin: '0 0 8px', fontSize: 18, fontWeight: 600,
          color: t.text, fontFamily: type.body, lineHeight: 1.35,
          transition: 'color 0.15s', textWrap: 'pretty',
        }}>{post.title}</h3>
        <p style={{
          margin: '0 0 10px', fontSize: 13.5, color: t.textMuted,
          lineHeight: 1.55, overflow: 'hidden',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        }}>{post.excerpt}</p>
        <div style={{ display: 'flex', gap: 14, fontSize: 11.5, color: t.textSubtle, fontFamily: type.mono }}>
          <span><Icons.Calendar size={11} style={{ marginRight: 4 }}/>{post.date}</span>
          <span><Icons.Clock size={11} style={{ marginRight: 4 }}/>{post.readMin} min</span>
          <span><Icons.Eye size={11} style={{ marginRight: 4 }}/>{post.views.toLocaleString()}</span>
        </div>
      </div>
    </article>
  );
}

window.PostCard = PostCard;
window.PopularItem = PopularItem;
window.PostRow = PostRow;
