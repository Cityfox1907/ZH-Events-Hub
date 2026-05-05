// ZüriBühni Components v2 — Sidebar, Carousel, Polls, Reviews

// Gradient palettes
const GRADIENT_PALETTES = [
  ['#7c1f1f', '#4a1212', '#1a0a0a'],
  ['#1a2744', '#0f1a2e', '#080e1a'],
  ['#8b6914', '#5c3d0a', '#2a1a04'],
  ['#2d5a3a', '#1a3d24', '#0a1a0e'],
  ['#5a2d5a', '#3d1a3d', '#1a0a1a'],
  ['#8b7014', '#5c4a0a', '#2a2004'],
];

function hashId(id) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = ((h << 5) - h + id.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function getGradient(eventId) {
  const h = hashId(eventId);
  const palette = GRADIENT_PALETTES[h % GRADIENT_PALETTES.length];
  return `radial-gradient(ellipse at ${30 + (h % 40)}% ${20 + (h % 60)}%, ${palette[0]}, ${palette[1]} 60%, ${palette[2]})`;
}

const SIZE_CONFIG = {
  mega: { label: 'MEGA', dots: 4, bg: 'var(--burgundy)', color: 'var(--paper)' },
  major: { label: 'MAJOR', dots: 3, bg: 'var(--ink)', color: 'var(--paper)' },
  mid: { label: 'MID', dots: 2, bg: 'var(--paper-dim)', color: 'var(--ink)', border: true },
  intimate: { label: 'INTIMATE', dots: 1, bg: 'transparent', color: 'var(--ink-muted)', border: true },
};

function SizeBadge({ size = 'mid' }) {
  const cfg = SIZE_CONFIG[size] || SIZE_CONFIG.mid;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '4px',
      padding: '2px 10px', borderRadius: '9999px', fontSize: '10px',
      fontFamily: 'var(--body-font)', fontWeight: 500,
      letterSpacing: '0.15em', textTransform: 'uppercase',
      background: cfg.bg, color: cfg.color,
      border: cfg.border ? '1px solid var(--line)' : 'none',
    }}>
      {Array.from({ length: cfg.dots }).map((_, i) => (
        <span key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: 'currentColor', opacity: 0.7 }}></span>
      ))}
      {cfg.label}
    </span>
  );
}

// --- SIDEBAR NAV ---
function SidebarNav({ active, onNavigate }) {
  const items = [
    { key: 'home', icon: 'M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10', label: 'Home' },
    { key: 'calendar', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', label: 'Kalender' },
    { key: 'aftermath', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', label: 'Aftermath' },
    { key: 'polls', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', label: 'Umfragen' },
    { key: 'discover', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', label: 'Entdecken' },
  ];

  return (
    <nav className="sidebar-nav" style={{
      width: '72px', minHeight: '100vh', background: 'var(--card)',
      borderRight: '1px solid var(--line)', display: 'flex', flexDirection: 'column',
      alignItems: 'center', paddingTop: '20px', gap: '4px', position: 'fixed',
      left: 0, top: 0, zIndex: 200,
    }}>
      <div style={{
        width: '40px', height: '40px', borderRadius: '10px', background: 'var(--burgundy)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '24px', cursor: 'pointer',
      }}>
        <span style={{ fontFamily: 'var(--display-font)', fontSize: '16px', color: 'var(--paper)', fontWeight: 500, fontVariationSettings: '"SOFT" 50, "WONK" 0' }}>ZB</span>
      </div>
      {items.map(item => (
        <button key={item.key} onClick={() => onNavigate(item.key)} style={{
          width: '52px', height: '52px', borderRadius: '12px', border: 'none',
          background: active === item.key ? 'var(--paper-dim)' : 'transparent',
          cursor: 'pointer', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '4px',
          transition: 'all 200ms',
          color: active === item.key ? 'var(--ink)' : 'var(--ink-faint)',
        }} title={item.label}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d={item.icon}></path>
          </svg>
          <span style={{ fontSize: '9px', fontFamily: 'var(--body-font)', fontWeight: 500, letterSpacing: '0.02em' }}>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

// --- HERO CAROUSEL ---
function HeroCarousel({ slides }) {
  const [current, setCurrent] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const timerRef = React.useRef(null);

  React.useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => setCurrent(c => (c + 1) % slides.length), 5000);
    return () => clearInterval(timerRef.current);
  }, [paused, slides.length]);

  const slide = slides[current];

  return (
    <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', aspectRatio: '21/9', minHeight: '320px' }}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* Background */}
      {slides.map((s, i) => (
        <div key={s.id} style={{
          position: 'absolute', inset: 0,
          background: s.type === 'poll' ? 'linear-gradient(135deg, #1a2744 0%, #0f1a2e 100%)' : getGradient(s.id),
          opacity: i === current ? 1 : 0,
          transition: 'opacity 600ms cubic-bezier(0.16,1,0.3,1)',
        }}></div>
      ))}
      {/* Overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)' }}></div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(20px, 4vw, 40px)' }}>
        {/* Tag */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          <span style={{
            padding: '4px 12px', borderRadius: '9999px', fontSize: '10px',
            fontFamily: 'var(--body-font)', fontWeight: 500, letterSpacing: '0.12em',
            textTransform: 'uppercase',
            background: slide.type === 'aftermath' ? 'var(--brass)' : slide.type === 'poll' ? 'rgba(255,255,255,0.2)' : 'var(--burgundy)',
            color: 'var(--paper)',
          }}>
            {slide.type === 'aftermath' ? 'Aftermath' : slide.type === 'poll' ? 'Umfrage' : 'Highlight'}
          </span>
          {slide.size && <SizeBadge size={slide.size} />}
        </div>

        <h2 style={{
          fontFamily: 'var(--display-font)', fontSize: 'clamp(28px, 3.5vw, 48px)', color: '#fff',
          lineHeight: 1.05, fontVariationSettings: '"SOFT" 50, "WONK" 0', letterSpacing: '-0.02em',
          maxWidth: '700px', fontWeight: 400,
        }}>{slide.title}</h2>

        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--body-font)', marginTop: '8px', maxWidth: '500px', lineHeight: 1.5 }}>
          {slide.subtitle}
        </p>

        {/* Aftermath review quote */}
        {slide.type === 'aftermath' && slide.review && (
          <div style={{
            marginTop: '16px', padding: '12px 16px', borderRadius: '8px',
            background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)',
            maxWidth: '440px', borderLeft: '3px solid var(--brass)',
          }}>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)', fontFamily: 'var(--body-font)', fontStyle: 'italic', lineHeight: 1.5 }}>
              «{slide.review.text}»
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--body-font)' }}>{slide.review.author}</span>
              <span style={{ fontSize: '11px', color: 'var(--brass)', fontFamily: 'var(--body-font)' }}>▲ {slide.review.upvotes}</span>
            </div>
          </div>
        )}

        {/* Poll */}
        {slide.type === 'poll' && slide.poll && (
          <PollWidget poll={slide.poll} />
        )}
      </div>

      {/* Dots */}
      <div style={{ position: 'absolute', bottom: '16px', right: '20px', zIndex: 3, display: 'flex', gap: '6px', alignItems: 'center' }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} style={{
            width: i === current ? '24px' : '8px', height: '8px', borderRadius: '9999px',
            background: i === current ? '#fff' : 'rgba(255,255,255,0.4)',
            border: 'none', cursor: 'pointer', transition: 'all 300ms cubic-bezier(0.16,1,0.3,1)',
          }}></button>
        ))}
      </div>

      {/* Arrows */}
      <button onClick={() => setCurrent((current - 1 + slides.length) % slides.length)} style={{
        position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', zIndex: 3,
        width: '36px', height: '36px', borderRadius: '50%', border: 'none',
        background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)', color: '#fff',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '18px', opacity: 0.7, transition: 'opacity 200ms',
      }} onMouseEnter={e => e.target.style.opacity = 1} onMouseLeave={e => e.target.style.opacity = 0.7}>‹</button>
      <button onClick={() => setCurrent((current + 1) % slides.length)} style={{
        position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', zIndex: 3,
        width: '36px', height: '36px', borderRadius: '50%', border: 'none',
        background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)', color: '#fff',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '18px', opacity: 0.7, transition: 'opacity 200ms',
      }} onMouseEnter={e => e.target.style.opacity = 1} onMouseLeave={e => e.target.style.opacity = 0.7}>›</button>
    </div>
  );
}

// --- POLL WIDGET ---
function PollWidget({ poll }) {
  const [voted, setVoted] = React.useState(null);
  const total = poll.options.reduce((s, o) => s + o.votes, 0) + (voted !== null ? 1 : 0);

  return (
    <div style={{ marginTop: '16px', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {poll.options.map((opt, i) => {
        const votes = opt.votes + (voted === i ? 1 : 0);
        const pct = total > 0 ? Math.round((votes / total) * 100) : 0;
        return (
          <button key={i} onClick={() => voted === null && setVoted(i)} style={{
            position: 'relative', height: '40px', borderRadius: '8px', border: 'none',
            background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)',
            cursor: voted === null ? 'pointer' : 'default', overflow: 'hidden',
            display: 'flex', alignItems: 'center', padding: '0 14px',
            transition: 'all 200ms',
            outline: voted === i ? '2px solid var(--brass)' : 'none',
          }}>
            {voted !== null && (
              <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0,
                width: `${pct}%`, background: voted === i ? 'rgba(184,137,61,0.3)' : 'rgba(255,255,255,0.08)',
                transition: 'width 500ms cubic-bezier(0.16,1,0.3,1)',
                borderRadius: '8px',
              }}></div>
            )}
            <span style={{ position: 'relative', zIndex: 1, fontSize: '13px', fontFamily: 'var(--body-font)', color: '#fff', fontWeight: voted === i ? 500 : 400 }}>
              {opt.label}
            </span>
            {voted !== null && (
              <span style={{ position: 'relative', zIndex: 1, marginLeft: 'auto', fontSize: '12px', fontFamily: 'var(--body-font)', color: 'rgba(255,255,255,0.6)' }}>
                {pct}%
              </span>
            )}
          </button>
        );
      })}
      <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--body-font)' }}>{total} Stimmen</span>
    </div>
  );
}

// --- EVENT CARD ---
function EventCard({ event, index = 0 }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div style={{
      borderRadius: '8px', overflow: 'hidden',
      border: '1px solid var(--line)', background: 'var(--card)',
      cursor: 'pointer',
      transition: 'transform 300ms cubic-bezier(0.16,1,0.3,1), box-shadow 300ms cubic-bezier(0.16,1,0.3,1)',
      transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
      boxShadow: hovered ? '0 4px 16px rgba(28,25,23,0.08)' : '0 1px 2px rgba(28,25,23,0.04)',
      animation: `fadeUp 500ms cubic-bezier(0.16,1,0.3,1) ${Math.min(index * 60, 600)}ms both`,
    }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={{ aspectRatio: '1/1', background: getGradient(event.id), position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }}></div>
        <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 1 }}><SizeBadge size={event.size} /></div>
        <div style={{ position: 'absolute', bottom: '12px', right: '12px', zIndex: 1, textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--display-font)', fontSize: '28px', color: 'var(--paper)', lineHeight: 1, fontVariationSettings: '"SOFT" 50, "WONK" 0' }}>{event.time}</div>
          <div style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--body-font)', marginTop: '2px' }}>{event.dateShort}</div>
        </div>
      </div>
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ fontSize: '10px', fontFamily: 'var(--body-font)', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>
          {event.category} · {event.venue} · {event.district}
        </div>
        <div style={{ fontSize: '22px', fontFamily: 'var(--display-font)', lineHeight: 1.15, color: 'var(--ink)', fontVariationSettings: '"SOFT" 50, "WONK" 0', letterSpacing: '-0.02em' }}>
          {event.title}
        </div>
        {event.subtitle && <div style={{ fontSize: '14px', fontFamily: 'var(--body-font)', color: 'var(--ink-muted)', lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{event.subtitle}</div>}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--line)', paddingTop: '12px', marginTop: '4px', fontSize: '12px', fontFamily: 'var(--body-font)', color: 'var(--ink-muted)' }}>
          <span>{event.going} gehen hin</span>
          <span>{event.price}</span>
        </div>
      </div>
    </div>
  );
}

// --- COMPACT CARD ---
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
      <div style={{ width: '56px', height: '56px', borderRadius: '6px', flexShrink: 0, background: getGradient(event.id) }}></div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '10px', fontFamily: 'var(--body-font)', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>{event.category} · {event.venue}</div>
        <div style={{ fontSize: '20px', fontFamily: 'var(--display-font)', color: 'var(--ink)', lineHeight: 1.2, fontVariationSettings: '"SOFT" 50, "WONK" 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{event.title}</div>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ fontFamily: 'var(--display-font)', fontSize: '22px', color: 'var(--ink)', lineHeight: 1, fontVariationSettings: '"SOFT" 50, "WONK" 0' }}>{event.time}</div>
        <div style={{ fontSize: '12px', fontFamily: 'var(--body-font)', color: 'var(--ink-muted)', marginTop: '4px' }}>{event.dateShort}</div>
      </div>
    </div>
  );
}

// --- FILTER PILL ---
function FilterPill({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      height: '32px', padding: '0 14px', borderRadius: '9999px',
      border: active ? 'none' : '1px solid var(--line)',
      background: active ? 'var(--burgundy)' : 'transparent',
      color: active ? 'var(--paper)' : 'var(--ink-muted)',
      fontSize: '10px', fontFamily: 'var(--body-font)', fontWeight: 500,
      letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
      transition: 'all 200ms', whiteSpace: 'nowrap', flexShrink: 0,
    }}>{label}</button>
  );
}

// --- GOING BUTTON ---
function GoingButton({ initialGoing = false }) {
  const [going, setGoing] = React.useState(initialGoing);
  return (
    <button onClick={() => setGoing(!going)} style={{
      height: '44px', padding: '0 24px', borderRadius: '9999px', border: 'none',
      background: going ? 'var(--ink)' : 'var(--burgundy)',
      color: 'var(--paper)', fontSize: '14px', fontFamily: 'var(--body-font)',
      fontWeight: 500, cursor: 'pointer',
      transition: 'all 300ms cubic-bezier(0.16,1,0.3,1)',
      transform: going ? 'scale(1)' : 'scale(1)',
    }}>
      {going ? '✓ Du gehst hin' : 'Ich gehe hin'}
    </button>
  );
}

// --- LIVE COUNTER ---
function LiveCounter({ count }) {
  const [displayCount, setDisplayCount] = React.useState(count);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setDisplayCount(c => c + (Math.random() > 0.5 ? 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div style={{
      padding: '16px 20px', borderRadius: '8px', border: '1px solid var(--line)',
      background: 'var(--card)', display: 'flex', alignItems: 'center', gap: '12px',
    }}>
      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', animation: 'pulse 2s infinite' }}></div>
      <div>
        <div style={{ fontFamily: 'var(--display-font)', fontSize: '28px', lineHeight: 1, fontVariationSettings: '"SOFT" 50, "WONK" 0' }}>{displayCount}</div>
        <div style={{ fontSize: '11px', fontFamily: 'var(--body-font)', color: 'var(--ink-faint)', marginTop: '2px' }}>gehen heute hin</div>
      </div>
    </div>
  );
}

window.SizeBadge = SizeBadge;
window.SidebarNav = SidebarNav;
window.HeroCarousel = HeroCarousel;
window.PollWidget = PollWidget;
window.EventCard = EventCard;
window.CompactCard = CompactCard;
window.FilterPill = FilterPill;
window.GoingButton = GoingButton;
window.LiveCounter = LiveCounter;
window.getGradient = getGradient;
