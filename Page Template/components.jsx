// ZüriBühni Components

// Gradient palettes for event covers
const GRADIENT_PALETTES = [
  ['#7c1f1f', '#4a1212', '#1a0a0a'], // Burgundy → Dark Red → Black
  ['#1a2744', '#0f1a2e', '#080e1a'], // Deep Blue → Night → Black
  ['#8b6914', '#5c3d0a', '#2a1a04'], // Bronze → Coffee → Dark
  ['#2d5a3a', '#1a3d24', '#0a1a0e'], // Forest → Moss → Dark Green
  ['#5a2d5a', '#3d1a3d', '#1a0a1a'], // Plum → Wine → Dark Purple
  ['#8b7014', '#5c4a0a', '#2a2004'], // Ochre → Umber → Dark Brown
];

function hashId(id) {
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = ((h << 5) - h + id.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function getGradient(eventId) {
  const h = hashId(eventId);
  const palette = GRADIENT_PALETTES[h % GRADIENT_PALETTES.length];
  const angle = (h % 360);
  return `radial-gradient(ellipse at ${30 + (h % 40)}% ${20 + (h % 60)}%, ${palette[0]}, ${palette[1]} 60%, ${palette[2]})`;
}

// Size categories
const SIZE_CONFIG = {
  mega: { label: 'MEGA', dots: 4, bg: 'var(--burgundy)', color: 'var(--paper)' },
  major: { label: 'MAJOR', dots: 3, bg: 'var(--ink)', color: 'var(--paper)' },
  mid: { label: 'MID', dots: 2, bg: 'var(--paper-dim)', color: 'var(--ink)', border: true },
  intimate: { label: 'INTIMATE', dots: 1, bg: 'transparent', color: 'var(--ink-muted)', border: true },
};

function SizeBadge({ size = 'mid' }) {
  const cfg = SIZE_CONFIG[size] || SIZE_CONFIG.mid;
  const badgeStyle = {
    display: 'inline-flex', alignItems: 'center', gap: '4px',
    padding: '2px 10px', borderRadius: '9999px', fontSize: '10px',
    fontFamily: 'var(--body-font)', fontWeight: 500,
    letterSpacing: '0.15em', textTransform: 'uppercase',
    background: cfg.bg, color: cfg.color,
    border: cfg.border ? '1px solid var(--line)' : 'none',
  };
  return (
    <span style={badgeStyle}>
      {Array.from({ length: cfg.dots }).map((_, i) => (
        <span key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: 'currentColor', opacity: 0.7 }}></span>
      ))}
      {cfg.label}
    </span>
  );
}

function CategoryBadge({ label }) {
  return (
    <span style={{
      display: 'inline-block', padding: '2px 10px', borderRadius: '9999px',
      fontSize: '10px', fontFamily: 'var(--body-font)', fontWeight: 500,
      letterSpacing: '0.15em', textTransform: 'uppercase',
      background: 'rgba(255,255,255,0.15)', color: 'var(--paper)',
      backdropFilter: 'blur(4px)',
    }}>{label}</span>
  );
}

function EventCard({ event, index = 0 }) {
  const [hovered, setHovered] = React.useState(false);
  const cardStyles = {
    container: {
      borderRadius: '8px', overflow: 'hidden',
      border: '1px solid var(--line)', background: 'var(--card)',
      cursor: 'pointer', transition: 'transform 300ms cubic-bezier(0.16,1,0.3,1), box-shadow 300ms cubic-bezier(0.16,1,0.3,1)',
      transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
      boxShadow: hovered
        ? '0 4px 16px rgba(28,25,23,0.08), 0 0 0 1px rgba(28,25,23,0.06)'
        : '0 1px 2px rgba(28,25,23,0.04), 0 0 0 1px rgba(28,25,23,0.04)',
      animation: `fadeUp 500ms cubic-bezier(0.16,1,0.3,1) ${Math.min(index * 60, 600)}ms both`,
    },
    cover: {
      aspectRatio: '3/2', background: getGradient(event.id),
      position: 'relative', display: 'flex', flexDirection: 'column',
      justifyContent: 'space-between', padding: '12px',
    },
    overlay: {
      position: 'absolute', inset: 0,
      background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)',
    },
    content: { padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' },
    eyebrow: {
      fontSize: '10px', fontFamily: 'var(--body-font)', fontWeight: 500,
      letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ink-faint)',
    },
    title: {
      fontSize: '24px', fontFamily: 'var(--display-font)', lineHeight: 1.15,
      color: 'var(--ink)', fontVariationSettings: '"SOFT" 50, "WONK" 0',
      letterSpacing: '-0.02em',
    },
    subtitle: {
      fontSize: '14px', fontFamily: 'var(--body-font)', color: 'var(--ink-muted)',
      lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
    },
    footer: {
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      borderTop: '1px solid var(--line)', paddingTop: '16px', marginTop: '8px',
      fontSize: '12px', fontFamily: 'var(--body-font)', color: 'var(--ink-muted)',
    },
  };

  return (
    <div style={cardStyles.container} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={cardStyles.cover}>
        <div style={cardStyles.overlay}></div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <SizeBadge size={event.size} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--display-font)', fontSize: '32px', color: 'var(--paper)', lineHeight: 1, fontVariationSettings: '"SOFT" 50, "WONK" 0' }}>
            {event.time}
          </div>
          <div style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--body-font)', marginTop: '2px' }}>
            {event.dateShort}
          </div>
        </div>
      </div>
      <div style={cardStyles.content}>
        <div style={cardStyles.eyebrow}>{event.category} · {event.venue} · {event.district}</div>
        <div style={cardStyles.title}>{event.title}</div>
        {event.subtitle && <div style={cardStyles.subtitle}>{event.subtitle}</div>}
        <div style={cardStyles.footer}>
          <span>{event.going} gehen hin</span>
          <span>{event.price}</span>
        </div>
      </div>
    </div>
  );
}

function CompactCard({ event, index = 0 }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 0',
      borderBottom: '1px solid var(--line)', cursor: 'pointer',
      background: hovered ? 'rgba(239,231,216,0.4)' : 'transparent',
      transition: 'background 200ms', borderRadius: hovered ? '6px' : 0,
      paddingLeft: hovered ? '12px' : 0, paddingRight: hovered ? '12px' : 0,
      animation: `fadeUp 500ms cubic-bezier(0.16,1,0.3,1) ${Math.min(index * 60, 600)}ms both`,
    }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={{
        width: '56px', height: '56px', borderRadius: '6px', flexShrink: 0,
        background: getGradient(event.id),
      }}></div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '10px', fontFamily: 'var(--body-font)', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>
          {event.category} · {event.venue}
        </div>
        <div style={{
          fontSize: '20px', fontFamily: 'var(--display-font)', color: 'var(--ink)', lineHeight: 1.2,
          fontVariationSettings: '"SOFT" 50, "WONK" 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{event.title}</div>
        <div style={{ fontSize: '14px', fontFamily: 'var(--body-font)', color: 'var(--ink-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {event.subtitle}
        </div>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ fontFamily: 'var(--display-font)', fontSize: '24px', color: 'var(--ink)', lineHeight: 1, fontVariationSettings: '"SOFT" 50, "WONK" 0' }}>
          {event.time}
        </div>
        <div style={{ fontSize: '12px', fontFamily: 'var(--body-font)', color: 'var(--ink-muted)', marginTop: '4px' }}>{event.dateShort}</div>
      </div>
    </div>
  );
}

function FilterPill({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      height: '32px', padding: '0 14px', borderRadius: '9999px', border: active ? 'none' : '1px solid var(--line)',
      background: active ? 'var(--burgundy)' : 'transparent', color: active ? 'var(--paper)' : 'var(--ink-muted)',
      fontSize: '10px', fontFamily: 'var(--body-font)', fontWeight: 500,
      letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
      transition: 'all 200ms cubic-bezier(0.16,1,0.3,1)', whiteSpace: 'nowrap', flexShrink: 0,
    }}>{label}</button>
  );
}

function HighlightCard({ event, index = 0 }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div style={{
      borderRadius: '8px', overflow: 'hidden', cursor: 'pointer',
      position: 'relative', aspectRatio: '16/9',
      background: getGradient(event.id),
      transition: 'transform 300ms cubic-bezier(0.16,1,0.3,1), box-shadow 300ms cubic-bezier(0.16,1,0.3,1)',
      transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
      boxShadow: hovered
        ? '0 8px 32px rgba(28,25,23,0.12)'
        : '0 2px 8px rgba(28,25,23,0.06)',
      animation: `fadeUp 500ms cubic-bezier(0.16,1,0.3,1) ${Math.min(index * 80, 600)}ms both`,
    }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)' }}></div>
      <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 1, display: 'flex', gap: '8px' }}>
        <SizeBadge size={event.size} />
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px', zIndex: 1 }}>
        <div style={{ fontSize: '10px', fontFamily: 'var(--body-font)', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>
          {event.category} · {event.venue}
        </div>
        <div style={{
          fontFamily: 'var(--display-font)', fontSize: '32px', color: 'var(--paper)', lineHeight: 1.1,
          fontVariationSettings: '"SOFT" 50, "WONK" 0', letterSpacing: '-0.02em',
        }}>{event.title}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
          <span style={{ fontSize: '12px', fontFamily: 'var(--body-font)', color: 'rgba(255,255,255,0.6)' }}>{event.going} gehen hin</span>
          <span style={{ fontFamily: 'var(--display-font)', fontSize: '24px', color: 'var(--paper)', fontVariationSettings: '"SOFT" 50, "WONK" 0' }}>{event.time}</span>
        </div>
      </div>
    </div>
  );
}

window.SizeBadge = SizeBadge;
window.CategoryBadge = CategoryBadge;
window.EventCard = EventCard;
window.CompactCard = CompactCard;
window.FilterPill = FilterPill;
window.HighlightCard = HighlightCard;
window.getGradient = getGradient;
