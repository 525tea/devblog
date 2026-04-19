import { type CSSProperties, type ReactNode } from 'react';

interface Props {
  hue?: number;
  l?: number;
  c?: number;
  aspect?: string;
  children?: ReactNode;
  style?: CSSProperties;
}

export function PlaceholderThumb({ hue = 45, l = 60, c = 14, aspect = '16 / 10', children, style = {} }: Props) {
  const variants = ['stripes', 'dots', 'blocks', 'gradient', 'code'] as const;
  const v = variants[hue % 5];
  const bg = `oklch(${l}% ${c / 100} ${hue})`;
  const bgDeep = `oklch(${l - 10}% ${c / 100} ${hue})`;
  const bgLight = `oklch(${Math.min(92, l + 20)}% ${(c - 4) / 100} ${hue})`;
  const fg = `oklch(${Math.min(96, l + 30)}% ${c / 200} ${hue})`;

  let pattern: ReactNode = null;
  if (v === 'stripes') {
    pattern = <div style={{ position: 'absolute', inset: 0, background: `repeating-linear-gradient(135deg, ${bgDeep} 0 18px, ${bg} 18px 36px)` }} />;
  } else if (v === 'dots') {
    pattern = <div style={{ position: 'absolute', inset: 0, background: bg, backgroundImage: `radial-gradient(circle at 2px 2px, ${fg} 1.5px, transparent 0)`, backgroundSize: '16px 16px', opacity: 0.9 }} />;
  } else if (v === 'blocks') {
    pattern = <div style={{ position: 'absolute', inset: 0, background: bg }}>
      <div style={{ position: 'absolute', top: '12%', left: '10%', width: '35%', height: '44%', background: bgDeep }} />
      <div style={{ position: 'absolute', top: '40%', left: '48%', width: '30%', height: '32%', background: bgLight }} />
      <div style={{ position: 'absolute', top: '62%', left: '20%', width: '22%', height: '20%', background: fg, opacity: 0.6 }} />
    </div>;
  } else if (v === 'gradient') {
    pattern = <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${bgDeep} 0%, ${bg} 55%, ${bgLight} 100%)` }} />;
  } else {
    const widths = [85, 65, 92, 48, 78, 60, 88, 52];
    pattern = <div style={{ position: 'absolute', inset: 0, background: bgDeep, padding: '10%' }}>
      {widths.map((w, i) => (
        <div key={i} style={{ height: 6, width: `${w}%`, background: i % 3 === 0 ? fg : bgLight, opacity: 0.55, marginBottom: 8, borderRadius: 2 }} />
      ))}
    </div>;
  }

  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: aspect, overflow: 'hidden', background: bg, ...style }}>
      {pattern}
      {children}
    </div>
  );
}
