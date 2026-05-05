// ZüriBühni Components v3 — with Event Detail + Comments

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
  const p = GRADIENT_PALETTES[h % GRADIENT_PALETTES.length];
  return `radial-gradient(ellipse at ${30+(h%40)}% ${20+(h%60)}%, ${p[0]}, ${p[1]} 60%, ${p[2]})`;
}

const SIZE_CFG = {
  mega: { label: 'MEGA', dots: 4, bg: 'var(--burgundy)', color: 'var(--paper)' },
  major: { label: 'MAJOR', dots: 3, bg: 'var(--ink)', color: 'var(--paper)' },
  mid: { label: 'MID', dots: 2, bg: 'var(--paper-dim)', color: 'var(--ink)', border: true },
  intimate: { label: 'INTIMATE', dots: 1, bg: 'transparent', color: 'var(--ink-muted)', border: true },
};

function SizeBadge({ size = 'mid' }) {
  const c = SIZE_CFG[size] || SIZE_CFG.mid;
  return <span style={{ display:'inline-flex',alignItems:'center',gap:4,padding:'2px 10px',borderRadius:9999,fontSize:10,fontFamily:'var(--body-font)',fontWeight:500,letterSpacing:'0.15em',textTransform:'uppercase',background:c.bg,color:c.color,border:c.border?'1px solid var(--line)':'none' }}>
    {Array.from({length:c.dots}).map((_,i)=><span key={i} style={{width:4,height:4,borderRadius:'50%',background:'currentColor',opacity:.7}}></span>)}
    {c.label}
  </span>;
}

// AVATAR
const AVATARS = ['A','B','C','D','E','F','G','H','J','K','L','M','N','P','R','S','T'];
const AVATAR_COLORS = ['#7c1f1f','#1a2744','#2d5a3a','#5a2d5a','#8b6914','#8b7014','#b8893d'];
function Avatar({ name, size = 36 }) {
  const h = hashId(name);
  const bg = AVATAR_COLORS[h % AVATAR_COLORS.length];
  return <div style={{ width:size,height:size,borderRadius:'50%',background:bg,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
    <span style={{ color:'#fff',fontSize:size*0.4,fontFamily:'var(--body-font)',fontWeight:500 }}>{name.charAt(0).toUpperCase()}</span>
  </div>;
}

// SIDEBAR
function SidebarNav({ active, onNavigate }) {
  const items = [
    { key:'home', icon:'M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10', label:'Home' },
    { key:'calendar', icon:'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', label:'Kalender' },
    { key:'aftermath', icon:'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', label:'Aftermath' },
    { key:'polls', icon:'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', label:'Umfragen' },
    { key:'discover', icon:'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', label:'Entdecken' },
  ];
  return <nav className="sidebar-nav" style={{ width:72,minHeight:'100vh',background:'var(--card)',borderRight:'1px solid var(--line)',display:'flex',flexDirection:'column',alignItems:'center',paddingTop:20,gap:4,position:'fixed',left:0,top:0,zIndex:200 }}>
    <div style={{ width:40,height:40,borderRadius:10,background:'var(--burgundy)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:24,cursor:'pointer' }}>
      <span style={{ fontFamily:'var(--display-font)',fontSize:16,color:'var(--paper)',fontWeight:500,fontVariationSettings:'"SOFT" 50, "WONK" 0' }}>ZB</span>
    </div>
    {items.map(item=><button key={item.key} onClick={()=>onNavigate(item.key)} style={{ width:52,height:52,borderRadius:12,border:'none',background:active===item.key?'var(--paper-dim)':'transparent',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:4,transition:'all 200ms',color:active===item.key?'var(--ink)':'var(--ink-faint)' }} title={item.label}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={item.icon}></path></svg>
      <span style={{ fontSize:9,fontFamily:'var(--body-font)',fontWeight:500 }}>{item.label}</span>
    </button>)}
  </nav>;
}

// HERO CAROUSEL
function HeroCarousel({ slides }) {
  const [cur, setCur] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  React.useEffect(()=>{
    if(paused) return;
    const t = setInterval(()=>setCur(c=>(c+1)%slides.length),5000);
    return ()=>clearInterval(t);
  },[paused,slides.length]);
  const s = slides[cur];
  return <div style={{ position:'relative',borderRadius:12,overflow:'hidden',aspectRatio:'21/9',minHeight:320 }} onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}>
    {slides.map((sl,i)=><div key={sl.id} style={{ position:'absolute',inset:0,background:sl.type==='poll'?'linear-gradient(135deg,#1a2744,#0f1a2e)':getGradient(sl.id),opacity:i===cur?1:0,transition:'opacity 600ms cubic-bezier(0.16,1,0.3,1)' }}></div>)}
    <div style={{ position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,0.65) 0%,rgba(0,0,0,0.1) 50%,transparent 100%)' }}></div>
    <div style={{ position:'relative',zIndex:2,height:'100%',display:'flex',flexDirection:'column',justifyContent:'flex-end',padding:'clamp(20px,4vw,40px)' }}>
      <div style={{ display:'flex',gap:8,marginBottom:12 }}>
        <span style={{ padding:'4px 12px',borderRadius:9999,fontSize:10,fontFamily:'var(--body-font)',fontWeight:500,letterSpacing:'0.12em',textTransform:'uppercase',background:s.type==='aftermath'?'var(--brass)':s.type==='poll'?'rgba(255,255,255,0.2)':'var(--burgundy)',color:'var(--paper)' }}>
          {s.type==='aftermath'?'Aftermath':s.type==='poll'?'Umfrage':'Highlight'}
        </span>
        {s.size&&<SizeBadge size={s.size}/>}
      </div>
      <h2 style={{ fontFamily:'var(--display-font)',fontSize:'clamp(28px,3.5vw,48px)',color:'#fff',lineHeight:1.05,fontVariationSettings:'"SOFT" 50, "WONK" 0',letterSpacing:'-0.02em',maxWidth:700,fontWeight:400 }}>{s.title}</h2>
      <p style={{ fontSize:16,color:'rgba(255,255,255,0.7)',fontFamily:'var(--body-font)',marginTop:8,maxWidth:500,lineHeight:1.5 }}>{s.subtitle}</p>
      {s.type==='aftermath'&&s.review&&<div style={{ marginTop:16,padding:'12px 16px',borderRadius:8,background:'rgba(255,255,255,0.1)',backdropFilter:'blur(8px)',maxWidth:440,borderLeft:'3px solid var(--brass)' }}>
        <p style={{ fontSize:14,color:'rgba(255,255,255,0.9)',fontFamily:'var(--body-font)',fontStyle:'italic',lineHeight:1.5 }}>«{s.review.text}»</p>
        <div style={{ display:'flex',alignItems:'center',gap:8,marginTop:8 }}>
          <span style={{ fontSize:12,color:'rgba(255,255,255,0.6)' }}>{s.review.author}</span>
          <span style={{ fontSize:11,color:'var(--brass)' }}>▲ {s.review.upvotes}</span>
        </div>
      </div>}
      {s.type==='poll'&&s.poll&&<PollWidget poll={s.poll}/>}
    </div>
    <div style={{ position:'absolute',bottom:16,right:20,zIndex:3,display:'flex',gap:6 }}>
      {slides.map((_,i)=><button key={i} onClick={()=>setCur(i)} style={{ width:i===cur?24:8,height:8,borderRadius:9999,background:i===cur?'#fff':'rgba(255,255,255,0.4)',border:'none',cursor:'pointer',transition:'all 300ms cubic-bezier(0.16,1,0.3,1)' }}></button>)}
    </div>
    <button onClick={()=>setCur((cur-1+slides.length)%slides.length)} style={{ position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',zIndex:3,width:36,height:36,borderRadius:'50%',border:'none',background:'rgba(0,0,0,0.3)',backdropFilter:'blur(4px)',color:'#fff',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18 }}>‹</button>
    <button onClick={()=>setCur((cur+1)%slides.length)} style={{ position:'absolute',right:12,top:'50%',transform:'translateY(-50%)',zIndex:3,width:36,height:36,borderRadius:'50%',border:'none',background:'rgba(0,0,0,0.3)',backdropFilter:'blur(4px)',color:'#fff',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18 }}>›</button>
  </div>;
}

// POLL WIDGET
function PollWidget({ poll }) {
  const [voted,setVoted] = React.useState(null);
  const total = poll.options.reduce((s,o)=>s+o.votes,0)+(voted!==null?1:0);
  return <div style={{ marginTop:16,maxWidth:400,display:'flex',flexDirection:'column',gap:8 }}>
    {poll.options.map((opt,i)=>{
      const v = opt.votes+(voted===i?1:0);
      const pct = total>0?Math.round(v/total*100):0;
      return <button key={i} onClick={()=>voted===null&&setVoted(i)} style={{ position:'relative',height:40,borderRadius:8,border:'none',background:'rgba(255,255,255,0.1)',backdropFilter:'blur(4px)',cursor:voted===null?'pointer':'default',overflow:'hidden',display:'flex',alignItems:'center',padding:'0 14px',outline:voted===i?'2px solid var(--brass)':'none' }}>
        {voted!==null&&<div style={{ position:'absolute',left:0,top:0,bottom:0,width:`${pct}%`,background:voted===i?'rgba(184,137,61,0.3)':'rgba(255,255,255,0.08)',transition:'width 500ms cubic-bezier(0.16,1,0.3,1)',borderRadius:8 }}></div>}
        <span style={{ position:'relative',zIndex:1,fontSize:13,fontFamily:'var(--body-font)',color:'#fff',fontWeight:voted===i?500:400 }}>{opt.label}</span>
        {voted!==null&&<span style={{ position:'relative',zIndex:1,marginLeft:'auto',fontSize:12,color:'rgba(255,255,255,0.6)' }}>{pct}%</span>}
      </button>;
    })}
    <span style={{ fontSize:11,color:'rgba(255,255,255,0.4)' }}>{total} Stimmen</span>
  </div>;
}

// EVENT CARD — clickable
function EventCard({ event, index = 0, onClick }) {
  const [hovered,setHovered] = React.useState(false);
  return <div onClick={()=>onClick&&onClick(event)} style={{ borderRadius:8,overflow:'hidden',border:'1px solid var(--line)',background:'var(--card)',cursor:'pointer',transition:'transform 300ms cubic-bezier(0.16,1,0.3,1), box-shadow 300ms cubic-bezier(0.16,1,0.3,1)',transform:hovered?'translateY(-2px)':'translateY(0)',boxShadow:hovered?'0 4px 16px rgba(28,25,23,0.08)':'0 1px 2px rgba(28,25,23,0.04)',animation:`fadeUp 500ms cubic-bezier(0.16,1,0.3,1) ${Math.min(index*60,600)}ms both` }} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>
    <div style={{ aspectRatio:'1/1',background:getGradient(event.id),position:'relative' }}>
      <div style={{ position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,0.5) 0%,transparent 60%)' }}></div>
      <div style={{ position:'absolute',top:12,left:12,zIndex:1 }}><SizeBadge size={event.size}/></div>
      <div style={{ position:'absolute',bottom:12,right:12,zIndex:1,textAlign:'right' }}>
        <div style={{ fontFamily:'var(--display-font)',fontSize:28,color:'var(--paper)',lineHeight:1,fontVariationSettings:'"SOFT" 50, "WONK" 0' }}>{event.time}</div>
        <div style={{ fontSize:10,letterSpacing:'0.15em',textTransform:'uppercase',color:'rgba(255,255,255,0.7)',fontFamily:'var(--body-font)',marginTop:2 }}>{event.dateShort}</div>
      </div>
    </div>
    <div style={{ padding:20,display:'flex',flexDirection:'column',gap:8 }}>
      <div style={{ fontSize:10,fontFamily:'var(--body-font)',fontWeight:500,letterSpacing:'0.15em',textTransform:'uppercase',color:'var(--ink-faint)' }}>{event.category} · {event.venue} · {event.district}</div>
      <div style={{ fontSize:22,fontFamily:'var(--display-font)',lineHeight:1.15,color:'var(--ink)',fontVariationSettings:'"SOFT" 50, "WONK" 0',letterSpacing:'-0.02em' }}>{event.title}</div>
      {event.subtitle&&<div style={{ fontSize:14,fontFamily:'var(--body-font)',color:'var(--ink-muted)',lineHeight:1.5,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{event.subtitle}</div>}
      <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',borderTop:'1px solid var(--line)',paddingTop:12,marginTop:4,fontSize:12,fontFamily:'var(--body-font)',color:'var(--ink-muted)' }}>
        <span>{event.going} gehen hin</span>
        <span>{event.price}</span>
      </div>
    </div>
  </div>;
}

// COMPACT CARD
function CompactCard({ event, index = 0, onClick }) {
  const [hovered,setHovered] = React.useState(false);
  return <div onClick={()=>onClick&&onClick(event)} style={{ display:'flex',alignItems:'center',gap:16,padding:'16px 0',borderBottom:'1px solid var(--line)',cursor:'pointer',background:hovered?'rgba(239,231,216,0.4)':'transparent',transition:'background 200ms',borderRadius:hovered?6:0,paddingLeft:hovered?12:0,paddingRight:hovered?12:0,animation:`fadeUp 500ms cubic-bezier(0.16,1,0.3,1) ${Math.min(index*60,600)}ms both` }} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>
    <div style={{ width:56,height:56,borderRadius:6,flexShrink:0,background:getGradient(event.id) }}></div>
    <div style={{ flex:1,minWidth:0 }}>
      <div style={{ fontSize:10,fontFamily:'var(--body-font)',letterSpacing:'0.15em',textTransform:'uppercase',color:'var(--ink-faint)' }}>{event.category} · {event.venue}</div>
      <div style={{ fontSize:20,fontFamily:'var(--display-font)',color:'var(--ink)',lineHeight:1.2,fontVariationSettings:'"SOFT" 50, "WONK" 0',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{event.title}</div>
    </div>
    <div style={{ textAlign:'right',flexShrink:0 }}>
      <div style={{ fontFamily:'var(--display-font)',fontSize:22,color:'var(--ink)',lineHeight:1,fontVariationSettings:'"SOFT" 50, "WONK" 0' }}>{event.time}</div>
      <div style={{ fontSize:12,fontFamily:'var(--body-font)',color:'var(--ink-muted)',marginTop:4 }}>{event.dateShort}</div>
    </div>
  </div>;
}

function FilterPill({ label, active, onClick }) {
  return <button onClick={onClick} style={{ height:32,padding:'0 14px',borderRadius:9999,border:active?'none':'1px solid var(--line)',background:active?'var(--burgundy)':'transparent',color:active?'var(--paper)':'var(--ink-muted)',fontSize:10,fontFamily:'var(--body-font)',fontWeight:500,letterSpacing:'0.1em',textTransform:'uppercase',cursor:'pointer',transition:'all 200ms',whiteSpace:'nowrap',flexShrink:0 }}>{label}</button>;
}

function GoingButton({ initialGoing = false }) {
  const [going,setGoing] = React.useState(initialGoing);
  return <button onClick={()=>setGoing(!going)} style={{ height:44,padding:'0 24px',borderRadius:9999,border:'none',background:going?'var(--ink)':'var(--burgundy)',color:'var(--paper)',fontSize:14,fontFamily:'var(--body-font)',fontWeight:500,cursor:'pointer',transition:'all 300ms cubic-bezier(0.16,1,0.3,1)' }}>
    {going?'✓ Du gehst hin':'Ich gehe hin'}
  </button>;
}

function LiveCounter({ count }) {
  const [dc,setDc] = React.useState(count);
  React.useEffect(()=>{ const t=setInterval(()=>setDc(c=>c+(Math.random()>0.5?1:0)),3000); return()=>clearInterval(t); },[]);
  return <div style={{ padding:'16px 20px',borderRadius:8,border:'1px solid var(--line)',background:'var(--card)',display:'flex',alignItems:'center',gap:12 }}>
    <div style={{ width:8,height:8,borderRadius:'50%',background:'#22c55e',animation:'pulse 2s infinite' }}></div>
    <div>
      <div style={{ fontFamily:'var(--display-font)',fontSize:28,lineHeight:1,fontVariationSettings:'"SOFT" 50, "WONK" 0' }}>{dc}</div>
      <div style={{ fontSize:11,fontFamily:'var(--body-font)',color:'var(--ink-faint)',marginTop:2 }}>gehen heute hin</div>
    </div>
  </div>;
}

// --- COMMENT SYSTEM ---
const SAMPLE_COMMENTS = {
  'evt-01': [
    { id:'c1', author:'Lena M.', time:'vor 2 Std.', text:'Letztes Mal war die Stimmung im Park unglaublich. Bin gespannt auf dieses Mal!', upvotes:23, downvotes:2, replies:[
      { id:'c1r1', author:'Marco T.', time:'vor 1 Std.', text:'Kann ich bestätigen — der Sound war top.', upvotes:8, downvotes:0 },
      { id:'c1r2', author:'Sara K.', time:'vor 45 Min.', text:'Wisst ihr ob man Decken mitbringen darf?', upvotes:3, downvotes:0 },
    ]},
    { id:'c2', author:'David R.', time:'vor 1 Std.', text:'Hat jemand Infos zum Lineup? Auf der Website steht nur Jazz & Soul.', upvotes:15, downvotes:1, replies:[] },
    { id:'c3', author:'Nina W.', time:'vor 30 Min.', text:'Endlich wieder ein Konzert im Freien. Der Winter war lang genug.', upvotes:41, downvotes:0, replies:[
      { id:'c3r1', author:'Jan P.', time:'vor 20 Min.', text:'So wahr. Zürich lebt wieder!', upvotes:12, downvotes:0 },
    ]},
  ],
  'evt-02': [
    { id:'c4', author:'Anna K.', time:'vor 3 Std.', text:'Die Akustik in der Tonhalle ist jedes Mal aufs Neue überwältigend. Gänsehaut pur.', upvotes:63, downvotes:1, replies:[
      { id:'c4r1', author:'Felix H.', time:'vor 2 Std.', text:'Block B, Reihe 12 — perfekter Sweet Spot.', upvotes:9, downvotes:0 },
    ]},
    { id:'c5', author:'Thomas B.', time:'vor 1 Std.', text:'Preis-Leistung stimmt. Für CHF 65 bekommt man wirklich Premium-Erlebnis.', upvotes:18, downvotes:3, replies:[] },
  ],
};

// Generate default comments for events without specific ones
function getComments(eventId) {
  if (SAMPLE_COMMENTS[eventId]) return SAMPLE_COMMENTS[eventId];
  return [
    { id:'def1', author:'User', time:'vor 5 Std.', text:'Kennt jemand den Veranstaltungsort? Bin noch nie dort gewesen.', upvotes:4, downvotes:0, replies:[] },
    { id:'def2', author:'Züri Fan', time:'vor 3 Std.', text:'Freue mich! Wer kommt noch?', upvotes:7, downvotes:1, replies:[
      { id:'def2r1', author:'Local', time:'vor 2 Std.', text:'Bin dabei. Treffen wir uns vorher auf einen Drink?', upvotes:2, downvotes:0 },
    ]},
  ];
}

function Comment({ comment, isReply = false }) {
  const [votes, setVotes] = React.useState({ up: comment.upvotes, down: comment.downvotes });
  const [voted, setVoted] = React.useState(null);
  const [showReplies, setShowReplies] = React.useState(false);

  const handleVote = (type) => {
    if (voted === type) { setVoted(null); setVotes({up:comment.upvotes,down:comment.downvotes}); return; }
    setVoted(type);
    setVotes({ up: comment.upvotes + (type==='up'?1:0), down: comment.downvotes + (type==='down'?1:0) });
  };

  return <div style={{ display:'flex',gap:12,paddingLeft:isReply?48:0 }}>
    <Avatar name={comment.author} size={isReply?32:40} />
    <div style={{ flex:1,minWidth:0 }}>
      <div style={{ display:'flex',alignItems:'center',gap:8,marginBottom:4 }}>
        <span style={{ fontSize:14,fontFamily:'var(--body-font)',fontWeight:500,color:'var(--ink)' }}>{comment.author}</span>
        <span style={{ fontSize:12,fontFamily:'var(--body-font)',color:'var(--ink-faint)' }}>{comment.time}</span>
        <button style={{ marginLeft:'auto',background:'none',border:'none',color:'var(--ink-faint)',cursor:'pointer',fontSize:16,padding:4 }}>···</button>
      </div>
      <p style={{ fontSize:14,fontFamily:'var(--body-font)',color:'var(--ink)',lineHeight:1.6,marginBottom:8 }}>{comment.text}</p>
      <div style={{ display:'flex',alignItems:'center',gap:16,fontSize:13,fontFamily:'var(--body-font)' }}>
        <button onClick={()=>handleVote('up')} style={{ display:'flex',alignItems:'center',gap:4,background:'none',border:'none',cursor:'pointer',color:voted==='up'?'var(--burgundy)':'var(--ink-muted)',fontWeight:voted==='up'?600:400,fontSize:13,fontFamily:'var(--body-font)',padding:0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill={voted==='up'?'currentColor':'none'} stroke="currentColor" strokeWidth="2"><path d="M14 9V5a3 3 0 00-6 0v4H5l7-7 7 7h-5z"></path><path d="M5 9v10a2 2 0 002 2h10a2 2 0 002-2V9"></path></svg>
          {votes.up}
        </button>
        <button onClick={()=>handleVote('down')} style={{ display:'flex',alignItems:'center',gap:4,background:'none',border:'none',cursor:'pointer',color:voted==='down'?'var(--burgundy)':'var(--ink-faint)',fontSize:13,fontFamily:'var(--body-font)',padding:0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill={voted==='down'?'currentColor':'none'} stroke="currentColor" strokeWidth="2" style={{ transform:'rotate(180deg)' }}><path d="M14 9V5a3 3 0 00-6 0v4H5l7-7 7 7h-5z"></path><path d="M5 9v10a2 2 0 002 2h10a2 2 0 002-2V9"></path></svg>
          {votes.down}
        </button>
        {!isReply && comment.replies && comment.replies.length > 0 && (
          <button onClick={()=>setShowReplies(!showReplies)} style={{ background:'none',border:'none',cursor:'pointer',color:'var(--burgundy)',fontSize:13,fontFamily:'var(--body-font)',fontWeight:500,padding:0 }}>
            {showReplies ? 'Antworten ausblenden' : `Antworten (${comment.replies.length})`}
          </button>
        )}
        {!isReply && <button style={{ background:'none',border:'none',cursor:'pointer',color:'var(--ink-muted)',fontSize:13,fontFamily:'var(--body-font)',padding:0 }}>Antworten</button>}
      </div>
      {showReplies && comment.replies && (
        <div style={{ marginTop:16,display:'flex',flexDirection:'column',gap:16 }}>
          {comment.replies.map(r => <Comment key={r.id} comment={r} isReply={true} />)}
        </div>
      )}
    </div>
  </div>;
}

function CommentComposer({ onPost }) {
  const [text, setText] = React.useState('');
  return <div style={{ display:'flex',gap:12,alignItems:'flex-start' }}>
    <Avatar name="Du" size={40} />
    <div style={{ flex:1,background:'#fff',borderRadius:12,border:'1px solid var(--line)',overflow:'hidden' }}>
      <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Was denkst du?" style={{ width:'100%',border:'none',outline:'none',resize:'none',padding:'14px 16px',fontSize:14,fontFamily:'var(--body-font)',background:'transparent',minHeight:56,color:'var(--ink)' }}></textarea>
      <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',padding:'8px 16px',borderTop:'1px solid var(--line)' }}>
        <div style={{ display:'flex',gap:12 }}>
          {['M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13',
            'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
          ].map((d,i) => <button key={i} style={{ background:'none',border:'none',cursor:'pointer',color:'var(--ink-faint)',padding:0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={d}></path></svg>
          </button>)}
        </div>
        <button onClick={()=>{if(text.trim()){onPost&&onPost(text);setText('');}}} style={{ padding:'6px 20px',borderRadius:9999,border:'none',background:text.trim()?'var(--burgundy)':'var(--line)',color:text.trim()?'var(--paper)':'var(--ink-faint)',fontSize:13,fontFamily:'var(--body-font)',fontWeight:500,cursor:text.trim()?'pointer':'default',transition:'all 200ms' }}>
          Posten
        </button>
      </div>
    </div>
  </div>;
}

function CommentsSection({ eventId }) {
  const [comments, setComments] = React.useState(getComments(eventId));
  const [sortBy, setSortBy] = React.useState('top');
  const sorted = [...comments].sort((a,b) => sortBy==='top' ? (b.upvotes-b.downvotes)-(a.upvotes-a.downvotes) : 0);
  const totalCount = comments.reduce((s,c) => s + 1 + (c.replies?.length||0), 0);

  const handlePost = (text) => {
    setComments([{ id:'new-'+Date.now(), author:'Du', time:'gerade eben', text, upvotes:0, downvotes:0, replies:[] }, ...comments]);
  };

  return <div>
    <CommentComposer onPost={handlePost} />
    <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',margin:'28px 0 20px' }}>
      <div style={{ display:'flex',alignItems:'center',gap:10 }}>
        <span style={{ fontFamily:'var(--display-font)',fontSize:22,fontVariationSettings:'"SOFT" 50, "WONK" 0',fontWeight:400 }}>Kommentare</span>
        <span style={{ padding:'2px 10px',borderRadius:9999,background:'var(--burgundy)',color:'var(--paper)',fontSize:12,fontFamily:'var(--body-font)',fontWeight:500 }}>{totalCount}</span>
      </div>
      <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{ padding:'6px 12px',borderRadius:8,border:'1px solid var(--line)',background:'var(--card)',fontSize:13,fontFamily:'var(--body-font)',color:'var(--ink-muted)',cursor:'pointer',appearance:'auto' }}>
        <option value="top">Top</option>
        <option value="recent">Neueste</option>
      </select>
    </div>
    <div style={{ display:'flex',flexDirection:'column',gap:24 }}>
      {sorted.map(c => <Comment key={c.id} comment={c} />)}
    </div>
  </div>;
}

// EVENT DETAIL MODAL
function EventDetailModal({ event, onClose }) {
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return <div style={{ position:'fixed',inset:0,zIndex:300,display:'flex',justifyContent:'flex-end' }} onClick={onClose}>
    {/* Backdrop */}
    <div style={{ position:'absolute',inset:0,background:'rgba(28,25,23,0.4)',backdropFilter:'blur(4px)' }}></div>
    {/* Panel */}
    <div onClick={e=>e.stopPropagation()} style={{
      position:'relative',width:'100%',maxWidth:640,height:'100%',background:'var(--paper)',
      overflowY:'auto',animation:'slideIn 400ms cubic-bezier(0.16,1,0.3,1)',
      boxShadow:'-20px 0 60px rgba(28,25,23,0.15)',
    }}>
      {/* Hero */}
      <div style={{ aspectRatio:'21/9',background:getGradient(event.id),position:'relative',minHeight:200 }}>
        <div style={{ position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,0.7) 0%,transparent 60%)' }}></div>
        <button onClick={onClose} style={{ position:'absolute',top:16,right:16,zIndex:2,width:36,height:36,borderRadius:'50%',border:'none',background:'rgba(0,0,0,0.3)',backdropFilter:'blur(4px)',color:'#fff',cursor:'pointer',fontSize:18,display:'flex',alignItems:'center',justifyContent:'center' }}>✕</button>
        <div style={{ position:'absolute',bottom:0,left:0,right:0,padding:'24px 32px',zIndex:1 }}>
          <div style={{ display:'flex',gap:8,marginBottom:10 }}>
            <SizeBadge size={event.size} />
          </div>
          <h2 style={{ fontFamily:'var(--display-font)',fontSize:36,color:'#fff',lineHeight:1.05,fontVariationSettings:'"SOFT" 50, "WONK" 0',letterSpacing:'-0.02em' }}>{event.title}</h2>
          <p style={{ fontSize:15,color:'rgba(255,255,255,0.7)',fontFamily:'var(--body-font)',marginTop:6 }}>{event.subtitle}</p>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding:'24px 32px' }}>
        <div style={{ display:'flex',gap:12,flexWrap:'wrap',marginBottom:24 }}>
          <GoingButton />
          <button style={{ height:44,padding:'0 24px',borderRadius:9999,border:'1px solid var(--line)',background:'transparent',color:'var(--ink)',fontSize:14,fontFamily:'var(--body-font)',fontWeight:500,cursor:'pointer' }}>Tickets</button>
        </div>

        {/* Meta grid */}
        <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1px',background:'var(--line)',borderRadius:8,overflow:'hidden',marginBottom:32 }}>
          {[
            { label:'DATUM', value:event.dateShort },
            { label:'BEGINN', value:event.time },
            { label:'VENUE', value:event.venue },
            { label:'QUARTIER', value:event.district },
            { label:'KATEGORIE', value:event.category },
            { label:'PREIS', value:event.price },
          ].map(m => <div key={m.label} style={{ background:'var(--card)',padding:16 }}>
            <div style={{ fontSize:10,letterSpacing:'0.15em',textTransform:'uppercase',color:'var(--ink-faint)',fontFamily:'var(--body-font)',marginBottom:4 }}>{m.label}</div>
            <div style={{ fontSize:16,fontFamily:'var(--display-font)',fontVariationSettings:'"SOFT" 50, "WONK" 0',color:'var(--ink)' }}>{m.value}</div>
          </div>)}
        </div>

        {/* Comments */}
        <div style={{ borderTop:'1px solid var(--line)',paddingTop:24 }}>
          <CommentsSection eventId={event.id} />
        </div>
      </div>
    </div>
  </div>;
}

window.SizeBadge = SizeBadge;
window.Avatar = Avatar;
window.SidebarNav = SidebarNav;
window.HeroCarousel = HeroCarousel;
window.PollWidget = PollWidget;
window.EventCard = EventCard;
window.CompactCard = CompactCard;
window.FilterPill = FilterPill;
window.GoingButton = GoingButton;
window.LiveCounter = LiveCounter;
window.Comment = Comment;
window.CommentComposer = CommentComposer;
window.CommentsSection = CommentsSection;
window.EventDetailModal = EventDetailModal;
window.getGradient = getGradient;
