import { type ReactNode, useState, useRef, useEffect } from 'react';
import { useTheme } from './theme';
import { Icons } from './icons';
import { SHADOW } from '@/lib/tokens';

// PIN baked in at build time from .env.local (PUBLIC_TWEAKS_PIN)
// Never committed to source — gitignored via .env.*
// Must use exact import.meta.env.* pattern for Vite to substitute at build time
const OWNER_PIN: string = import.meta.env.PUBLIC_TWEAKS_PIN ?? '';

// ─── TweaksGate (PIN 인증 다이얼로그) ────────────────────
interface GateProps { onSuccess: () => void; onClose: () => void; }

export function TweaksGate({ onSuccess, onClose }: GateProps) {
  const { t, type } = useTheme();
  const [pin, setPin] = useState('');
  const [shake, setShake] = useState(false);
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // PIN not configured → skip gate entirely
  useEffect(() => { if (!OWNER_PIN) onSuccess(); }, []);

  function verify(value: string) {
    if (value === OWNER_PIN) {
      try { sessionStorage.setItem('readme:admin', '1'); } catch {}
      onSuccess();
    } else {
      setShake(true);
      setError(true);
      setPin('');
      setTimeout(() => { setShake(false); inputRef.current?.focus(); }, 500);
      setTimeout(() => setError(false), 2000);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter') verify(pin);
    if (e.key === 'Escape') onClose();
  }

  if (!OWNER_PIN) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: t.overlay,
      backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{
        width: 320, background: t.surface, border: `1px solid ${t.border}`,
        borderRadius: 14, boxShadow: SHADOW.lg, padding: '32px 28px',
        fontFamily: type.body,
        animation: shake ? 'shake 0.4s ease' : 'fadeIn 0.15s ease',
      }}>
        <style>{`
          @keyframes shake {
            0%,100% { transform: translateX(0); }
            20%,60%  { transform: translateX(-8px); }
            40%,80%  { transform: translateX(8px); }
          }
        `}</style>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: t.surfaceAlt, border: `1px solid ${t.border}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
            <Icons.Edit size={20} />
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: t.text, fontFamily: type.display, marginBottom: 6 }}>Tweaks</div>
          <div style={{ fontSize: 12.5, color: t.textMuted }}>소유자 PIN을 입력하세요</div>
        </div>

        <input
          ref={inputRef}
          autoFocus
          type="password"
          value={pin}
          onChange={e => { setPin(e.target.value); setError(false); }}
          onKeyDown={handleKey}
          placeholder="PIN"
          style={{
            width: '100%', padding: '10px 14px', borderRadius: 8,
            border: `1px solid ${error ? '#ef4444' : t.border}`,
            background: t.surfaceAlt, color: t.text,
            fontFamily: type.mono, fontSize: 18, letterSpacing: 6,
            textAlign: 'center', outline: 'none',
            transition: 'border-color 0.15s',
            boxSizing: 'border-box',
          }}
        />
        {error && (
          <div style={{ fontSize: 11.5, color: '#ef4444', textAlign: 'center', marginTop: 8 }}>
            PIN이 올바르지 않습니다
          </div>
        )}

        <button
          onClick={() => verify(pin)}
          style={{
            width: '100%', marginTop: 16, padding: '10px', borderRadius: 8,
            background: t.accent, color: t.accentText,
            border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
            fontFamily: type.body, transition: 'opacity 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
          확인
        </button>
      </div>
    </div>
  );
}

// ─── TweaksPanel ─────────────────────────────────────────
interface Props { open: boolean; onClose: () => void; }

export function TweaksPanel({ open, onClose }: Props) {
  const { t, type, themeName, mode, typeName, set } = useTheme();

  if (!open) return null;
  return (
    <div style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 150, width: 320, maxWidth: 'calc(100vw - 40px)', background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, boxShadow: SHADOW.lg, fontFamily: type.body, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: `1px solid ${t.border}`, background: t.surfaceAlt }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.text, fontFamily: type.display }}>Tweaks</div>
          <div style={{ fontSize: 10.5, color: t.textSubtle, marginTop: 1 }}>테마 · 모드 · 폰트 설정</div>
        </div>
        <button onClick={onClose} style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: t.textMuted, cursor: 'pointer', borderRadius: 4 }}>
          <Icons.X size={14} />
        </button>
      </div>

      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 18, maxHeight: 'calc(100vh - 140px)', overflowY: 'auto' }}>
        <Field label="Theme" hint="색 팔레트를 고르세요">
          <SegRow options={[
            { v: 'terminal', label: 'Terminal', sub: 'dark · green' },
            { v: 'paper', label: 'Paper', sub: 'warm · terra' },
            { v: 'docs', label: 'Docs', sub: 'clean · blue' },
            { v: 'glass', label: 'Glass', sub: 'blur · violet' },
          ]} value={themeName} onChange={v => set({ themeName: v as any })} />
        </Field>

        <Field label="Mode" hint="라이트 / 다크">
          <SegRow options={[
            { v: 'light', label: 'Light', icon: <Icons.Sun size={13} /> },
            { v: 'dark', label: 'Dark', icon: <Icons.Moon size={13} /> },
          ]} value={mode} onChange={v => set({ mode: v as any })} />
        </Field>

        <Field label="Typography" hint="폰트 조합">
          <SegRow options={[
            { v: 'geoSans', label: 'Geo Sans', sub: 'Space Grotesk' },
            { v: 'modernSerif', label: 'Serif', sub: 'Fraunces' },
            { v: 'humanist', label: 'Humanist', sub: 'IBM Plex' },
          ]} value={typeName} onChange={v => set({ typeName: v as any })} />
        </Field>
      </div>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  const { t } = useTheme();
  return (
    <div>
      <div style={{ fontSize: 10.5, fontWeight: 700, color: t.textSubtle, letterSpacing: 0.8, textTransform: 'uppercase' }}>{label}</div>
      {hint && <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2, marginBottom: 8 }}>{hint}</div>}
      <div style={{ marginTop: hint ? 0 : 8 }}>{children}</div>
    </div>
  );
}

function SegRow({ options, value, onChange }: { options: { v: string; label: string; sub?: string; icon?: ReactNode }[]; value: string; onChange: (v: string) => void }) {
  const { t } = useTheme();
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${options.length}, 1fr)`, gap: 6 }}>
      {options.map(o => {
        const active = value === o.v;
        return (
          <button key={o.v} onClick={() => onChange(o.v)}
            style={{ padding: '8px 6px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, border: `1px solid ${active ? t.accent : t.border}`, background: active ? t.accent : 'transparent', color: active ? t.accentText : t.text, borderRadius: 5, cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, transition: 'all 0.15s' }}>
            {o.icon && <span>{o.icon}</span>}
            <span>{o.label}</span>
            {o.sub && <span style={{ fontSize: 9.5, fontWeight: 400, opacity: active ? 0.85 : 0.6 }}>{o.sub}</span>}
          </button>
        );
      })}
    </div>
  );
}
