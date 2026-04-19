import { useTheme } from './theme';
import { Icons } from './icons';
import { Tag } from './primitives';
import { type Route } from './pages';

interface Props { onNav: (r: Route) => void; }

const STACK = [
  {
    label: 'Backend',
    items: ['Java / Spring Boot', 'Python / FastAPI', 'Node.js', 'REST API · gRPC'],
  },
  {
    label: 'Database',
    items: ['PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch'],
  },
  {
    label: 'Infrastructure',
    items: ['Docker / Kubernetes', 'AWS · GCP', 'Kafka', 'GitHub Actions'],
  },
  {
    label: 'Frontend',
    items: ['React / TypeScript', 'Astro', 'Next.js', 'Figma'],
  },
];

export function ProfilePage({ onNav }: Props) {
  const { t, type } = useTheme();

  return (
    <div>
      {/* Hero */}
      <section style={{ borderBottom: `1px solid ${t.border}`, background: `linear-gradient(180deg, ${t.surfaceAlt} 0%, ${t.bg} 100%)` }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '64px 24px 56px', display: 'flex', gap: 48, alignItems: 'center' }}>
          {/* Avatar */}
          <div style={{ flexShrink: 0 }}>
            <div style={{ width: 96, height: 96, borderRadius: 12, background: t.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: type.display, fontSize: 40, fontWeight: 700, color: t.accentText, boxShadow: `0 0 0 3px ${t.border}` }}>
              J
            </div>
          </div>

          <div>
            <div style={{ fontSize: 11, fontFamily: type.mono, color: t.accent, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10 }}>
              $ whoami
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap', marginBottom: 6 }}>
              <h1 style={{ margin: 0, fontSize: 36, fontFamily: type.display, fontWeight: 700, letterSpacing: -0.8, color: t.text }}>
                이예진
              </h1>
              <span style={{ fontSize: 20, color: t.textMuted, fontFamily: type.display, fontWeight: 500 }}>Yejin Lee</span>
            </div>
            <p style={{ margin: '0 0 20px', fontSize: 16, color: t.textMuted, fontFamily: type.body }}>
              Backend-leaning Full-stack Engineer
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a href="https://github.com/525tea" target="_blank" rel="noopener"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '7px 14px', background: t.surface, border: `1px solid ${t.border}`, borderRadius: 6, color: t.textMuted, fontSize: 13, fontFamily: type.body, textDecoration: 'none', fontWeight: 500 }}
                onMouseEnter={e => { e.currentTarget.style.color = t.text; e.currentTarget.style.borderColor = t.borderStrong; }}
                onMouseLeave={e => { e.currentTarget.style.color = t.textMuted; e.currentTarget.style.borderColor = t.border; }}>
                <Icons.Github size={15} /> github.com/525tea
              </a>
              <a href="mailto:jene0028@gmail.com"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '7px 14px', background: t.surface, border: `1px solid ${t.border}`, borderRadius: 6, color: t.textMuted, fontSize: 13, fontFamily: type.body, textDecoration: 'none', fontWeight: 500 }}
                onMouseEnter={e => { e.currentTarget.style.color = t.text; e.currentTarget.style.borderColor = t.borderStrong; }}
                onMouseLeave={e => { e.currentTarget.style.color = t.textMuted; e.currentTarget.style.borderColor = t.border; }}>
                <Icons.Mail size={15} /> jene0028@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '56px 24px 80px', display: 'flex', flexDirection: 'column', gap: 56 }}>

        {/* Tech Stack */}
        <section>
          <SectionLabel>Tech Stack</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {STACK.map(group => (
              <div key={group.label} style={{ padding: 20, border: `1px solid ${t.border}`, borderRadius: 8, background: t.surface }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 1, color: t.accent, textTransform: 'uppercase', marginBottom: 14, fontFamily: type.mono }}>
                  {group.label}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {group.items.map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ width: 4, height: 4, borderRadius: '50%', background: t.accent, flexShrink: 0 }} />
                      <span style={{ fontSize: 13.5, color: t.text, fontFamily: type.body }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* This Blog */}
        <section>
          <SectionLabel>This Blog</SectionLabel>
          <div style={{ padding: 24, border: `1px solid ${t.border}`, borderRadius: 8, background: t.surface }}>
            <div style={{ fontFamily: type.mono, fontSize: 12, color: t.textSubtle, marginBottom: 16 }}>
              <span style={{ color: t.accent }}>$ cat</span> /etc/readme/stack.txt
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['Astro 5', 'React 18', 'TypeScript', 'MDX', 'GitHub Pages', 'Giscus', 'GoatCounter'].map(tech => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>
            <p style={{ margin: '16px 0 0', fontSize: 13.5, color: t.textMuted, lineHeight: 1.65 }}>
              이 블로그는 Astro + GitHub Pages로 빌드됩니다. 글은 MDX로 작성하고, 댓글은 GitHub Discussions 기반의 Giscus를 사용합니다. 방문 통계는 GoatCounter로 수집합니다.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section>
          <SectionLabel>Contact</SectionLabel>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <ContactLink href="https://github.com/525tea" icon={<Icons.Github size={16} />} label="GitHub" sub="github.com/525tea" />
            <ContactLink href="mailto:jene0028@gmail.com" icon={<Icons.Mail size={16} />} label="Email" sub="jene0028@gmail.com" />
          </div>
        </section>

      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  const { t, type } = useTheme();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
      <div style={{ fontSize: 22, fontFamily: type.display, fontWeight: 700, color: t.text, letterSpacing: -0.5 }}>{children}</div>
      <div style={{ flex: 1, height: 1, background: t.border }} />
    </div>
  );
}

function ContactLink({ href, icon, label, sub }: { href: string; icon: React.ReactNode; label: string; sub: string }) {
  const { t, type } = useTheme();
  return (
    <a href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener"
      style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', border: `1px solid ${t.border}`, borderRadius: 8, background: t.surface, textDecoration: 'none', minWidth: 240, transition: 'border-color 0.15s' }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = t.borderStrong)}
      onMouseLeave={e => (e.currentTarget.style.borderColor = t.border)}>
      <span style={{ color: t.accent, display: 'flex' }}>{icon}</span>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: t.text, fontFamily: type.body }}>{label}</div>
        <div style={{ fontSize: 12, color: t.textMuted, fontFamily: type.mono, marginTop: 2 }}>{sub}</div>
      </div>
    </a>
  );
}
