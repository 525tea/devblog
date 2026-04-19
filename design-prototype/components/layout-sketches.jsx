// Layout sketches — 3 options for general-category pages
// Compact low-fi comps so the user can choose

function Sketch({ title, subtitle, children, w = 420, h = 300 }) {
  return (
    <div style={{ width: w }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1814', marginBottom: 2 }}>{title}</div>
      <div style={{ fontSize: 11, color: '#6b655b', marginBottom: 12, lineHeight: 1.5 }}>{subtitle}</div>
      <div style={{
        width: w, height: h, background: '#fff',
        border: '1px solid #e6e1d7', borderRadius: 6,
        overflow: 'hidden', position: 'relative',
        boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
      }}>{children}</div>
    </div>
  );
}

const blk = (color = '#e6e1d7') => ({ background: color });
const line = (w = '70%', color = '#d4cdbe') => (
  <div style={{ height: 4, width: w, background: color, borderRadius: 2, marginBottom: 6 }} />
);

// Option A: Docs — left tree + right article list
function OptionA() {
  return (
    <Sketch title="Option A — Docs 스타일 (좌측 트리 + 우측 리스트)"
            subtitle="왼쪽에 하위카테고리 트리가 펼쳐져 있고, 오른쪽은 선택된 하위카테고리의 글 리스트. 레퍼런스 문서 사이트 느낌. 글이 많아질수록 유리.">
      {/* top bar */}
      <div style={{ height: 28, borderBottom: '1px solid #e6e1d7', padding: '8px 12px', fontSize: 10, color: '#6b655b' }}>Language ›</div>
      <div style={{ display: 'flex', height: 'calc(100% - 28px)' }}>
        {/* left nav */}
        <div style={{ width: 120, borderRight: '1px solid #e6e1d7', padding: 10, background: '#faf8f5' }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: '#6b655b', marginBottom: 6 }}>LANGUAGE</div>
          {['Java', 'Python', 'SQL', 'JavaScript'].map((n, i) => (
            <div key={n} style={{
              fontSize: 10, padding: '4px 6px', marginBottom: 2,
              background: i === 1 ? '#b45632' : 'transparent',
              color: i === 1 ? '#fff' : '#1a1814',
              borderRadius: 3,
            }}>{n}</div>
          ))}
        </div>
        {/* right list */}
        <div style={{ flex: 1, padding: 14, overflow: 'hidden' }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>Python</div>
          <div style={{ fontSize: 9, color: '#9a9286', marginBottom: 14 }}>22 articles</div>
          {[0,1,2,3].map(i => (
            <div key={i} style={{ borderBottom: i < 3 ? '1px solid #f0ede5' : 'none', padding: '8px 0' }}>
              {line('78%', '#3a342c')}
              {line('95%')}
              {line('42%')}
            </div>
          ))}
        </div>
      </div>
    </Sketch>
  );
}

// Option B: Tabs + card grid
function OptionB() {
  return (
    <Sketch title="Option B — 상단 탭 + 카드 그리드"
            subtitle="하위카테고리를 상단 수평탭으로, 아래엔 3열 썸네일 카드 그리드. 가장 '블로그'스러운 레이아웃. 이미지와 함께 읽기 편함.">
      <div style={{ height: 36, padding: '10px 14px', borderBottom: '1px solid #e6e1d7' }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#1a1814' }}>LANGUAGE</div>
      </div>
      <div style={{ height: 28, padding: '6px 14px', borderBottom: '1px solid #e6e1d7', display: 'flex', gap: 6 }}>
        {['All', 'Java', 'Python', 'SQL', 'JavaScript'].map((n, i) => (
          <div key={n} style={{
            fontSize: 9, padding: '3px 8px',
            background: i === 2 ? '#1a1814' : 'transparent',
            color: i === 2 ? '#fff' : '#6b655b',
            borderRadius: 999, border: i === 2 ? 'none' : '1px solid #e6e1d7',
          }}>{n}</div>
        ))}
      </div>
      <div style={{ padding: 12, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        {[0,1,2,3,4,5].map(i => (
          <div key={i}>
            <div style={{ width: '100%', aspectRatio: '16/10', background: `oklch(${55 + i * 5}% 0.12 ${45 + i * 40})`, marginBottom: 6, borderRadius: 3 }} />
            {line('92%', '#3a342c')}
            {line('55%')}
          </div>
        ))}
      </div>
    </Sketch>
  );
}

// Option C: Nested sections
function OptionC() {
  return (
    <Sketch title="Option C — 하위카테고리별 섹션 누적"
            subtitle="페이지 하나에 하위카테고리마다 섹션을 쌓아 스크롤. 전체 개요 훑기 좋지만 글이 많아지면 길어짐. 지금처럼 카테고리 초반엔 유리.">
      <div style={{ height: 32, padding: '10px 14px', borderBottom: '1px solid #e6e1d7' }}>
        <div style={{ fontSize: 11, fontWeight: 700 }}>CS</div>
      </div>
      <div style={{ padding: 12, overflow: 'hidden' }}>
        {['Operating Systems', 'Networks', 'Databases'].map((name, idx) => (
          <div key={name} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#1a1814' }}>{name}</div>
              <div style={{ fontSize: 8, color: '#b45632' }}>더보기 →</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              {[0,1,2].map(i => (
                <div key={i}>
                  <div style={{ height: 38, background: `oklch(${58 + idx * 2}% 0.10 ${180 + idx * 45})`, marginBottom: 4, borderRadius: 2 }} />
                  {line('88%', '#3a342c')}
                  {line('60%')}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Sketch>
  );
}

function LayoutSketches() {
  return (
    <DesignCanvas>
      <DCSection
        title="일반 카테고리 레이아웃 — 3옵션"
        subtitle="'Language / CS / DevOps / Skills' 같은 글 중심 카테고리의 레이아웃 후보입니다. 셋 다 Tweaks로 전환 가능하게 넣을 예정이에요."
        gap={40}
      >
        <DCArtboard label="A · Docs 스타일" width={420} height={380} style={{ background: 'transparent', boxShadow: 'none' }}>
          <OptionA />
        </DCArtboard>
        <DCArtboard label="B · 상단 탭 + 카드" width={420} height={380} style={{ background: 'transparent', boxShadow: 'none' }}>
          <OptionB />
        </DCArtboard>
        <DCArtboard label="C · 하위 섹션 누적" width={420} height={380} style={{ background: 'transparent', boxShadow: 'none' }}>
          <OptionC />
        </DCArtboard>
      </DCSection>

      <DCPostIt top={40} right={80} rotate={3} width={240}>
        추천: <b>B 옵션</b>이 가장 안전 — 글 수가 적어도 자연스럽고 썸네일로 시각적 풍성함 확보.
        <br/><br/>
        Tweaks로 A/C도 토글해볼 수 있도록 구현할 예정!
      </DCPostIt>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<LayoutSketches />);
