import { useState, useEffect, useRef } from "react";

// ─── QR Code SVG Generator (no external lib needed) ───────────────────────
function generateQRDataURL(text) {
  // We'll use a free QR API
  return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}&bgcolor=0a0a0a&color=d4af37&format=png`;
}

// ─── Particle System ──────────────────────────────────────────────────────
function Particles() {
  return (
    <div className="particles" aria-hidden="true">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 8}s`,
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
            opacity: 0.3 + Math.random() * 0.5,
          }}
        />
      ))}
    </div>
  );
}

// ─── Martial Arts SVG Silhouettes ─────────────────────────────────────────
function MartialArtsSilhouette({ className = "", style = {} }) {
  return (
    <svg
      viewBox="0 0 200 300"
      className={className}
      style={style}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Head */}
      <circle cx="100" cy="30" r="20" />
      {/* Body */}
      <path d="M80 55 Q60 120 50 160 L70 165 Q85 130 100 110 Q115 130 130 165 L150 160 Q140 120 120 55 Z" />
      {/* Kick pose arm */}
      <path d="M80 70 Q40 60 20 80 Q30 95 50 90 Q65 85 80 85Z" />
      <path d="M120 70 Q160 50 185 40 Q180 60 165 70 Q145 75 125 80Z" />
      {/* Kick leg */}
      <path d="M130 165 Q155 200 175 230 Q185 225 180 215 Q165 190 145 165Z" />
      {/* Standing leg */}
      <path d="M70 165 Q65 220 65 270 L80 270 Q82 220 85 165Z" />
    </svg>
  );
}

// ─── Intro Screen ─────────────────────────────────────────────────────────
function IntroScreen({ onComplete }) {
  const [phase, setPhase] = useState(0);
  // phase 0 = logo reveal, 1 = text in, 2 = exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 4000);
    const t3 = setTimeout(() => onComplete(), 5200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <div className={`intro-screen ${phase === 2 ? "fade-out" : ""}`}>
      <Particles />

      {/* Background silhouettes */}
      <MartialArtsSilhouette
        className="bg-silhouette left-sil"
        style={{ color: "rgba(212,175,55,0.06)" }}
      />
      <MartialArtsSilhouette
        className="bg-silhouette right-sil"
        style={{ color: "rgba(180,0,0,0.06)" }}
      />

      <div className={`intro-content ${phase >= 1 ? "visible" : ""}`}>
        {/* Top decorative line */}
        <div className="deco-line" />

        {/* Emblem */}
        <div className="emblem">
          <div className="emblem-ring outer-ring" />
          <div className="emblem-ring inner-ring" />
          <div className="emblem-icon">🥋</div>
        </div>

        {/* Institute name */}
        <p className="institute-label">INDIRA GANDHI INSTITUTE OF TECHNOLOGY</p>

        {/* Main title */}
        <h1 className="intro-title">
          <span className="title-line-1">MARTIAL ARTS</span>
          <span className="title-divider">✦ FAREWELL TRIBUTE ✦</span>
        </h1>

        {/* Subtitle */}
        <p className="intro-subtitle">
          A journey of strength, discipline, and honor
        </p>

        {/* Bottom decorative line */}
        <div className="deco-line" />

        {/* Belt colors bar */}
        <div className="belt-bar">
          {["#fff", "#FFD700", "#FFA500", "#22AA22", "#0000CC", "#4B0082", "#8B0000", "#000"].map((c, i) => (
            <div key={i} className="belt-segment" style={{ background: c }} />
          ))}
        </div>

        <p className="loading-text">Loading your tribute…</p>
      </div>
    </div>
  );
}

// ─── Video Screen ─────────────────────────────────────────────────────────
function VideoScreen({ visible }) {
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [useLocal, setUseLocal] = useState(false);
  const iframeRef = useRef(null);
  const videoRef = useRef(null);

  const driveFolderId = "175-pA7_x_mWq6C8cUgLFUql0hx-tMAKb";
  const driveVideoPreview = `https://drive.google.com/file/d/${driveFolderId}/preview`;
  const localVideoUrl = "/videos/Seniors.mp4";

  // Check if local video exists
  useEffect(() => {
    const checkLocalVideo = async () => {
      try {
        const res = await fetch(localVideoUrl, { method: "HEAD" });
        if (res.ok) {
          setUseLocal(true);
        }
      } catch (e) {
        setUseLocal(false);
      }
    };
    checkLocalVideo();
  }, []);

  const handleManualPlay = () => {
    setShowOverlay(false);
    setIsPlaying(true);
    if (useLocal && videoRef.current) {
      videoRef.current.play().catch(() => setVideoError(true));
    }
  };

  const handleReplay = () => {
    setShowOverlay(false);
    if (useLocal && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  // Auto-play video after intro completes
  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => {
        setShowOverlay(false);
        setIsPlaying(true);
        // Auto-play local video if available
        if (useLocal && videoRef.current) {
          videoRef.current.play().catch(() => setVideoError(true));
        }
      }, 300);
      return () => clearTimeout(t);
    }
  }, [visible, useLocal]);

  return (
    <div className={`video-screen ${visible ? "visible" : ""}`}>
      <Particles />

      {/* Decorative corner frames */}
      <div className="corner-frame top-left" />
      <div className="corner-frame top-right" />
      <div className="corner-frame bottom-left" />
      <div className="corner-frame bottom-right" />

      <div className="video-container">
        {/* ── Overlay before play (local video only) ── */}
        {showOverlay && useLocal && (
          <div className="video-overlay" onClick={handleManualPlay}>
            <div className="overlay-content">
              <div className="play-pulse" />
              <div className="play-btn">▶</div>
              <p className="overlay-text">TAP TO PLAY TRIBUTE</p>
            </div>
          </div>
        )}

        {/* ── Local HTML5 Video Player ── */}
        {useLocal ? (
          <video
            ref={videoRef}
            className="video-iframe"
            controls
            onEnded={() => setShowOverlay(false)}
            onError={() => setVideoError(true)}
          >
            <source src={localVideoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          /* ── Google Drive iframe embed (fallback) ── */
          <iframe
            ref={iframeRef}
            src={driveVideoPreview}
            className="video-iframe"
            allow="autoplay; fullscreen"
            allowFullScreen
            title="IGIT Martial Arts Farewell Video"
            onLoad={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
          />
        )}

        {/* ── Error fallback ── */}
        {videoError && (
          <div className="error-fallback">
            <div className="error-icon">🥋</div>
            <p>Tap below to open the tribute video</p>
            <a
              href={`https://drive.google.com/drive/folders/${driveFolderId}`}
              target="_blank"
              rel="noreferrer"
              className="gold-btn"
            >
              Open Tribute Video ▶
            </a>
          </div>
        )}
      </div>

      {/* ── Controls bar ── */}
      <div className="controls-bar">
        {useLocal && (
          <button className="ctrl-btn" onClick={handleReplay}>
            ↺ Replay
          </button>
        )}
        <span className="ctrl-title">IGIT Martial Arts Farewell {useLocal ? "(Local)" : "(Drive)"}</span>
        <a
          href={`https://drive.google.com/drive/folders/${driveFolderId}`}
          target="_blank"
          rel="noreferrer"
          className="ctrl-btn"
        >
          ⛶ Full View
        </a>
      </div>

      {/* ── Honor message ── */}
      <div className="honor-message">
        <span className="honor-text">
          "With respect, discipline, and gratitude — we honor your journey"
        </span>
      </div>
    </div>
  );
}

// ─── Seniors Grid ─────────────────────────────────────────────────────────
const SENIORS = [
  {
    name: "Biswa",
    belt: "Black Belt",
    emoji: "🥋",
    msg: "",
    connections: [
      { label: "Instagram", url: "https://www.instagram.com/biswabhusanmohapatra531" },
    ],
  },
  {
    name: "Anisha",
    belt: "Black Belt",
    emoji: "🥋",
    msg: "",
    connections: [
      { label: "Instagram", url: "https://www.instagram.com/anishasutar_5005" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/anisha-sutar-8a92b3345/" },
    ],
  },
  {
    name: "Trupti",
    belt: "Black Belt",
    emoji: "🥋",
    msg: "",
    connections: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/trupti-das-163a1a265/" },
    ],
  },
  {
    name: "Bajarangi",
    belt: "Brown Belt",
    emoji: "🟤",
    msg: "",
    connections: [
      { label: "Instagram", url: "https://www.instagram.com/bajarangi_jena" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/bajarangi-jena-907b7b2b8/" },
    ],
  },
  {
    name: "Sudip",
    belt: "Green Belt",
    emoji: "🟢",
    msg: "",
    connections: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/sudip-mohanty30/" },
      { label: "Instagram", url: "https://www.instagram.com/oye_its__sudip" },
    ],
  },
  {
    name: "Amlan",
    belt: "Green Belt",
    emoji: "🟢",
    msg: "",
    connections: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/amlan-sourav-sahoo-235325332/" },
      { label: "Instagram", url: "https://www.instagram.com/amlan.amlan.7121" },
    ],
  },
  {
    name: "Ayasi",
    belt: "Green Belt",
    emoji: "🟢",
    msg: "",
    connections: [
      { label: "Instagram", url: "https://www.instagram.com/_ayasi/" },
    ],
  },
  { name: "Shilpi", belt: "Blue Belt", emoji: "🔵", msg: "", connections: [ { label: "LinkedIn", url: "https://www.linkedin.com/in/shilpi-upadhyay-577135216/" } ] },
  { name: "Ankita", belt: "Blue Belt", emoji: "🔵", msg: "", connections: [ { label: "Instagram", url: "https://www.instagram.com/ankita_sahu_27/" } ] },
  { name: "Sujata", belt: "Blue Belt", emoji: "🔵", msg: "", connections: [ { label: "LinkedIn", url: "https://www.linkedin.com/in/sujatapriyadarshinisahoo/" }, { label: "Instagram", url: "https://www.instagram.com/sing_with_us715" } ] },
];

const BELT_ORDER = {
  "Black Belt": 0,
  "Brown Belt": 1,
  "Green Belt": 2,
  "Blue Belt": 3,
  "Purple Belt": 4,
};

const sortedSeniors = [...SENIORS].sort((a, b) => {
  const beltDelta = (BELT_ORDER[a.belt] ?? 99) - (BELT_ORDER[b.belt] ?? 99);
  if (beltDelta !== 0) return beltDelta;
  return a.name.localeCompare(b.name);
});

function BeltBadge({ belt }) {
  const colors = {
    "Black Belt": "#1a1a1a",
    "Brown Belt": "#5C2E00",
    "Purple Belt": "#4B0082",
    "Blue Belt": "#0033AA",
    "Green Belt": "#006600",
  };
  return (
    <span
      className="belt-badge"
      style={{ background: colors[belt] || "#333" }}
    >
      {belt}
    </span>
  );
}

function SeniorsPage() {
  // Start fresh - don't use cached localStorage (it has old data)
  const [images, setImages] = useState({});

  useEffect(() => {
    try { localStorage.setItem("seniorImages", JSON.stringify(images)); } catch (e) {}
  }, [images]);

  // Auto-detect images from public/avatars/ - ignore localStorage cache, always detect
  useEffect(() => {
    let cancelled = false;
    const detect = async () => {
      const newImages = {};
      for (const s of sortedSeniors) {
        if (cancelled) return;
        const base = `/avatars/${s.name.toLowerCase()}`;
        
        // Try PNG first
        try {
          const resPng = await fetch(`${base}.png`, { method: "HEAD" });
          if (resPng.ok) {
            if (cancelled) return;
            newImages[s.name] = `${base}.png`;
            continue;
          }
        } catch (e) {}
        
        // Try JPG
        try {
          const resJpg = await fetch(`${base}.jpg`, { method: "HEAD" });
          if (resJpg.ok) {
            if (cancelled) return;
            newImages[s.name] = `${base}.jpg`;
            continue;
          }
        } catch (e) {}
      }
      if (!cancelled) {
        setImages(newImages);
      }
    };
    detect();
    return () => { cancelled = true; };
  }, [sortedSeniors]);

  return (
    <div className="seniors-page">
      <div className="section-header">
        <div className="deco-line" />
        <h2 className="section-title">OUR CHAMPIONS</h2>
        <p className="section-sub">Honoring the warriors who walked this path, ordered by belt</p>
        <div className="deco-line" />
      </div>
      <div className="seniors-grid">
        {sortedSeniors.map((s, i) => {
          const img = images[s.name];
          const initials = s.name.split(" ").map((n) => n[0]).slice(0,2).join("");
          return (
            <div key={i} className="senior-card" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="senior-avatar">
                {img ? (
                  <img src={img} alt={s.name} style={{ width: 160, height: 160, borderRadius: 12, objectFit: "cover" }} onError={(e)=>{e.currentTarget.style.display='none';}} />
                ) : (
                  <div className="avatar-initials">{initials}</div>
                )}
              </div>
              <h3 className="senior-name">{s.name}</h3>
              <BeltBadge belt={s.belt} />
              <p className="senior-msg">"{s.msg}"</p>
              {s.connections?.length > 0 && (
                <div className="senior-connections">
                  {s.connections.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="connection-link"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── QR Page ──────────────────────────────────────────────────────────────
function QRPage() {
  const pageUrl = "https://igit-martial-arts-farewell.vercel.app";
  const qrUrl = generateQRDataURL(pageUrl);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(pageUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="qr-page">
      <div className="section-header">
        <div className="deco-line" />
        <h2 className="section-title">YOUR QR CODE</h2>
        <p className="section-sub">Print on ATM-style cards for each senior</p>
        <div className="deco-line" />
      </div>

      <div className="qr-card">
        <div className="qr-card-header">
          <span>🥋</span>
          <span>IGIT MARTIAL ARTS FAREWELL</span>
          <span>🥋</span>
        </div>
        <div className="qr-wrapper">
          <img src={qrUrl} alt="QR Code" className="qr-img" />
          <div className="qr-glow" />
        </div>
        <p className="qr-label">Scan to Watch Your Tribute</p>
        <div className="qr-url">{pageUrl}</div>
        <div className="qr-actions">
          <a href={qrUrl} download="igit-farewell-qr.png" className="gold-btn">
            ⬇ Download QR (PNG)
          </a>
          <button className="gold-btn outline" onClick={handleCopy}>
            {copied ? "✓ Copied!" : "⎘ Copy URL"}
          </button>
        </div>
        <p className="qr-note">
          💡 Update the URL above once you deploy to Vercel/Netlify
        </p>
      </div>

      <div className="deploy-guide">
        <h3>🚀 Quick Deploy Guide</h3>
        <ol>
          <li>
            <strong>Vercel (Recommended):</strong>
            <code>npx vercel deploy</code>
          </li>
          <li>
            <strong>Netlify:</strong> Drag the <code>dist/</code> folder to netlify.com
          </li>
          <li>
            <strong>Update video:</strong> Replace the Drive folder ID in the code's{" "}
            <code>driveFolderId</code> variable
          </li>
          <li>
            <strong>Custom domain:</strong> Add your domain in Vercel → Settings → Domains
          </li>
        </ol>
      </div>
    </div>
  );
}

// ─── Navigation ───────────────────────────────────────────────────────────
const TABS = [
  { id: "tribute", label: "🎬 Tribute" },
  { id: "seniors", label: "🥋 Seniors" },
  { id: "qr", label: "🔲 QR Code" },
];

// ─── Main App ─────────────────────────────────────────────────────────────
export default function App() {
  const [introPlayed, setIntroPlayed] = useState(false);
  const [activeTab, setActiveTab] = useState("tribute");
  const [navVisible, setNavVisible] = useState(false);

  const handleIntroComplete = () => {
    setIntroPlayed(true);
    setTimeout(() => setNavVisible(true), 600);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Crimson+Pro:ital,wght@0,300;0,400;1,300&family=Share+Tech+Mono&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --gold: #d4af37;
          --gold-light: #f0d060;
          --red: #8b0000;
          --red-bright: #cc1111;
          --black: #0a0a0a;
          --dark: #111111;
          --dark2: #1a1a1a;
          --text: #e8e0d0;
          --text-dim: #998877;
        }

        body {
          background: var(--black);
          color: var(--text);
          font-family: 'Crimson Pro', serif;
          overflow-x: hidden;
          min-height: 100vh;
        }

        /* ── INTRO ── */
        .intro-screen {
          position: fixed; inset: 0; z-index: 100;
          background: radial-gradient(ellipse at center, #1a0a00 0%, #000 70%);
          display: flex; align-items: center; justify-content: center;
          transition: opacity 1.2s ease, transform 1.2s ease;
        }
        .intro-screen.fade-out {
          opacity: 0;
          transform: scale(1.05);
          pointer-events: none;
        }

        .particles {
          position: absolute; inset: 0; overflow: hidden; pointer-events: none;
        }
        .particle {
          position: absolute; bottom: -10px;
          border-radius: 50%;
          background: var(--gold);
          animation: rise linear infinite;
        }
        @keyframes rise {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-110vh) rotate(720deg); opacity: 0; }
        }

        .bg-silhouette {
          position: absolute; width: 280px; opacity: 0.04;
          transition: opacity 2s;
        }
        .left-sil { left: -40px; bottom: 0; transform: scaleX(-1); }
        .right-sil { right: -40px; bottom: 0; }

        .intro-content {
          text-align: center; padding: 2rem;
          opacity: 0; transform: translateY(30px);
          transition: opacity 1s ease 0.3s, transform 1s ease 0.3s;
          max-width: 600px;
        }
        .intro-content.visible {
          opacity: 1; transform: translateY(0);
        }

        .deco-line {
          width: 100%; height: 1px; margin: 1rem auto;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
        }

        .emblem {
          position: relative; width: 100px; height: 100px;
          margin: 0 auto 1.5rem;
        }
        .emblem-ring {
          position: absolute; border-radius: 50%;
          border: 2px solid var(--gold);
          animation: spin linear infinite;
        }
        .outer-ring { inset: 0; animation-duration: 12s; opacity: 0.5; }
        .inner-ring { inset: 12px; animation-duration: 8s; animation-direction: reverse; opacity: 0.8; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .emblem-icon {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 2.5rem;
        }

        .institute-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.25em;
          color: var(--gold); opacity: 0.7;
          text-transform: uppercase; margin-bottom: 0.5rem;
        }

        .intro-title {
          display: flex; flex-direction: column; align-items: center;
          gap: 0.2rem;
        }
        .title-line-1 {
          font-family: 'Cinzel', serif;
          font-size: clamp(2.2rem, 8vw, 4.5rem);
          font-weight: 900; letter-spacing: 0.15em;
          background: linear-gradient(180deg, #f0d060 0%, #d4af37 50%, #8b6914 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          text-shadow: none;
          filter: drop-shadow(0 0 20px rgba(212,175,55,0.5));
        }
        .title-divider {
          font-family: 'Cinzel', serif;
          font-size: clamp(0.65rem, 2.5vw, 0.95rem);
          letter-spacing: 0.3em; color: var(--red-bright);
          font-weight: 700;
        }

        .intro-subtitle {
          font-family: 'Crimson Pro', serif; font-style: italic;
          font-size: clamp(0.9rem, 2.5vw, 1.2rem);
          color: var(--text-dim); letter-spacing: 0.05em;
          margin-top: 0.5rem;
        }

        .belt-bar {
          display: flex; margin: 1rem auto; width: 200px;
          border-radius: 4px; overflow: hidden; height: 6px;
        }
        .belt-segment { flex: 1; height: 100%; }

        .loading-text {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.7rem; color: var(--gold); opacity: 0.6;
          letter-spacing: 0.2em; margin-top: 0.5rem;
          animation: pulse 1.5s ease infinite;
        }
        @keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:1} }

        /* ── MAIN LAYOUT ── */
        .app-wrapper {
          min-height: 100vh;
          background:
            radial-gradient(ellipse at top, #1a0500 0%, transparent 60%),
            radial-gradient(ellipse at bottom, #0a0014 0%, transparent 60%),
            var(--black);
        }

        /* ── HEADER ── */
        .site-header {
          position: sticky; top: 0; z-index: 50;
          background: rgba(10,10,10,0.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(212,175,55,0.2);
          padding: 0.75rem 1.5rem;
          display: flex; align-items: center; justify-content: space-between;
          gap: 1rem;
          opacity: 0; transform: translateY(-20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .site-header.visible { opacity: 1; transform: translateY(0); }

        .header-logo {
          display: flex; align-items: center; gap: 0.75rem;
        }
        .header-logo-icon { font-size: 1.5rem; }
        .header-logo-text {
          font-family: 'Cinzel', serif; font-size: 0.85rem;
          font-weight: 700; letter-spacing: 0.1em;
          background: linear-gradient(135deg, #f0d060, #d4af37);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .header-logo-sub {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.55rem; letter-spacing: 0.2em;
          color: var(--text-dim); display: block;
        }

        .nav-tabs {
          display: flex; gap: 0.25rem;
        }
        .nav-tab {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.7rem; letter-spacing: 0.08em;
          padding: 0.4rem 0.8rem;
          background: transparent;
          border: 1px solid rgba(212,175,55,0.2);
          color: var(--text-dim); cursor: pointer;
          border-radius: 2px;
          transition: all 0.2s;
        }
        .nav-tab:hover { border-color: var(--gold); color: var(--gold); }
        .nav-tab.active {
          background: var(--gold); color: var(--black);
          border-color: var(--gold); font-weight: 700;
        }

        /* ── VIDEO SCREEN ── */
        .video-screen {
          min-height: calc(100vh - 60px);
          position: relative;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 1rem;
          opacity: 0; transition: opacity 1s ease 0.3s;
        }
        .video-screen.visible { opacity: 1; }

        .corner-frame {
          position: absolute; width: 60px; height: 60px;
          pointer-events: none;
        }
        .corner-frame::before, .corner-frame::after {
          content: ''; position: absolute;
          background: var(--gold);
        }
        .corner-frame::before { width: 100%; height: 2px; }
        .corner-frame::after { width: 2px; height: 100%; }
        .top-left { top: 1rem; left: 1rem; }
        .top-left::before { top: 0; left: 0; }
        .top-left::after { top: 0; left: 0; }
        .top-right { top: 1rem; right: 1rem; transform: scaleX(-1); }
        .top-right::before { top: 0; left: 0; }
        .top-right::after { top: 0; left: 0; }
        .bottom-left { bottom: 3.5rem; left: 1rem; transform: scaleY(-1); }
        .bottom-left::before { top: 0; left: 0; }
        .bottom-left::after { top: 0; left: 0; }
        .bottom-right { bottom: 3.5rem; right: 1rem; transform: scale(-1); }
        .bottom-right::before { top: 0; left: 0; }
        .bottom-right::after { top: 0; left: 0; }

        .video-container {
          position: relative;
          width: 100%; max-width: 900px;
          aspect-ratio: 16/9;
          background: #050505;
          border: 1px solid rgba(212,175,55,0.3);
          border-radius: 4px;
          overflow: hidden;
          box-shadow:
            0 0 40px rgba(212,175,55,0.15),
            0 0 80px rgba(139,0,0,0.1),
            inset 0 0 40px rgba(0,0,0,0.5);
        }

        .video-iframe {
          width: 100%; height: 100%;
          border: none; display: block;
        }

        .video-overlay {
          position: absolute; inset: 0; z-index: 10;
          background: rgba(0,0,0,0.85);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: background 0.3s;
        }
        .video-overlay:hover { background: rgba(0,0,0,0.7); }
        .overlay-content { text-align: center; }
        .play-pulse {
          position: absolute;
          width: 80px; height: 80px;
          border-radius: 50%;
          border: 2px solid var(--gold);
          animation: expand 1.5s ease-out infinite;
          top: 50%; left: 50%; transform: translate(-50%, -50%);
        }
        @keyframes expand {
          0% { transform: translate(-50%,-50%) scale(0.8); opacity: 1; }
          100% { transform: translate(-50%,-50%) scale(2.5); opacity: 0; }
        }
        .play-btn {
          width: 70px; height: 70px;
          border-radius: 50%;
          background: var(--gold);
          color: var(--black); font-size: 1.8rem;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1rem;
          position: relative; z-index: 1;
          box-shadow: 0 0 30px rgba(212,175,55,0.5);
        }
        .overlay-text {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.75rem; letter-spacing: 0.2em;
          color: var(--gold);
        }

        .error-fallback {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0.9);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 1rem; padding: 2rem; text-align: center;
        }
        .error-icon { font-size: 3rem; }

        .controls-bar {
          display: flex; align-items: center; justify-content: space-between;
          width: 100%; max-width: 900px;
          padding: 0.6rem 1rem; margin-top: 0.5rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(212,175,55,0.15);
          border-radius: 2px;
        }
        .ctrl-title {
          font-family: 'Cinzel', serif; font-size: 0.75rem;
          color: var(--gold); letter-spacing: 0.1em;
        }
        .ctrl-btn {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.7rem; padding: 0.3rem 0.7rem;
          background: transparent;
          border: 1px solid rgba(212,175,55,0.3);
          color: var(--gold); cursor: pointer;
          border-radius: 2px; text-decoration: none;
          transition: all 0.2s;
        }
        .ctrl-btn:hover { background: rgba(212,175,55,0.1); }

        .honor-message {
          margin-top: 1.5rem; text-align: center;
          padding: 0 1rem;
        }
        .honor-text {
          font-family: 'Crimson Pro', serif; font-style: italic;
          font-size: clamp(0.85rem, 2.5vw, 1.1rem);
          color: var(--text-dim); letter-spacing: 0.03em;
        }

        /* ── SENIORS ── */
        .seniors-page { padding: 2rem 1.5rem; }

        .section-header { text-align: center; padding: 1.5rem 0; }
        .section-title {
          font-family: 'Cinzel', serif; font-size: clamp(1.5rem, 5vw, 2.5rem);
          font-weight: 900; letter-spacing: 0.15em;
          background: linear-gradient(135deg, #f0d060, #d4af37);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          margin: 0.5rem 0;
        }
        .section-sub {
          font-family: 'Crimson Pro', serif; font-style: italic;
          color: var(--text-dim); font-size: 1rem;
        }

        .seniors-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1.5rem; max-width: 1000px; margin: 2rem auto;
        }

        .senior-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
          border: 1px solid rgba(212,175,55,0.2);
          border-radius: 4px; padding: 1.5rem;
          text-align: center;
          transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
          animation: fadeInUp 0.6s ease both;
        }
        .senior-card:hover {
          transform: translateY(-4px);
          border-color: var(--gold);
          box-shadow: 0 8px 30px rgba(212,175,55,0.15);
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .senior-avatar {
          font-size: 3rem; margin-bottom: 0.75rem;
          display: block;
          width: 160px; height: 160px; margin: 0 auto 0.75rem; border-radius: 12px; overflow: hidden;
        }
        .avatar-initials {
          width: 160px; height: 160px; display: flex; align-items: center; justify-content: center;
          background: linear-gradient(180deg,#1a1a1a,#111);
          color: var(--gold); font-weight: 700; border-radius: 12px; font-family: 'Cinzel', serif; font-size: 2rem;
        }
        .senior-name {
          font-family: 'Cinzel', serif; font-size: 1.1rem;
          font-weight: 700; color: var(--text); letter-spacing: 0.05em;
          margin-bottom: 0.4rem;
        }
        .belt-badge {
          display: inline-block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.15em;
          color: var(--gold); padding: 0.2rem 0.6rem;
          border-radius: 2px; margin-bottom: 0.75rem;
          border: 1px solid currentColor;
        }
        .senior-msg {
          font-size: 0.9rem; color: var(--text-dim);
          font-style: italic; line-height: 1.5;
        }

        .senior-connections {
          margin-top: 0.8rem;
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
          justify-content: center;
        }
        
        .connection-link {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.08em;
          padding: 0.35rem 0.55rem;
          border: 1px solid rgba(212,175,55,0.28);
          border-radius: 999px;
          color: var(--gold);
          text-decoration: none;
          transition: all 0.2s;
          display: inline-block;
        }
        
        .connection-link:hover {
          background: rgba(212,175,55,0.1);
          border-color: var(--gold);
        }

        /* ── QR PAGE ── */
        .qr-page { padding: 2rem 1.5rem; }

        .qr-card {
          max-width: 420px; margin: 2rem auto;
          background: linear-gradient(135deg, #1a1000, #0f0f0f);
          border: 2px solid var(--gold);
          border-radius: 8px; padding: 2rem;
          text-align: center;
          box-shadow: 0 0 60px rgba(212,175,55,0.2);
        }
        .qr-card-header {
          font-family: 'Cinzel', serif; font-size: 0.7rem;
          letter-spacing: 0.15em; color: var(--gold);
          display: flex; justify-content: space-between;
          margin-bottom: 1.5rem;
        }
        .qr-wrapper {
          position: relative; display: inline-block;
          padding: 0.5rem;
          background: #0a0a0a;
          border: 1px solid rgba(212,175,55,0.3);
        }
        .qr-img { width: 200px; height: 200px; display: block; }
        .qr-glow {
          position: absolute; inset: 0;
          box-shadow: inset 0 0 30px rgba(212,175,55,0.1);
          pointer-events: none;
        }
        .qr-label {
          font-family: 'Cinzel', serif; font-size: 0.85rem;
          letter-spacing: 0.1em; color: var(--gold);
          margin: 1rem 0 0.5rem;
        }
        .qr-url {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.65rem; color: var(--text-dim);
          word-break: break-all; margin-bottom: 1rem;
        }
        .qr-actions {
          display: flex; gap: 0.75rem; justify-content: center;
          flex-wrap: wrap;
        }
        .qr-note {
          font-size: 0.8rem; color: var(--text-dim);
          margin-top: 1rem; font-style: italic;
        }

        .gold-btn {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.7rem; letter-spacing: 0.1em;
          padding: 0.5rem 1rem;
          background: var(--gold); color: var(--black);
          border: none; border-radius: 2px;
          cursor: pointer; text-decoration: none;
          font-weight: 700; display: inline-block;
          transition: all 0.2s;
        }
        .gold-btn:hover { background: var(--gold-light); transform: translateY(-1px); }
        .gold-btn.outline {
          background: transparent; color: var(--gold);
          border: 1px solid var(--gold);
        }
        .gold-btn.outline:hover { background: rgba(212,175,55,0.1); }

        .deploy-guide {
          max-width: 600px; margin: 2rem auto;
          padding: 1.5rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 4px;
        }
        .deploy-guide h3 {
          font-family: 'Cinzel', serif; font-size: 1rem;
          color: var(--gold); margin-bottom: 1rem; letter-spacing: 0.08em;
        }
        .deploy-guide ol {
          padding-left: 1.2rem; display: flex; flex-direction: column; gap: 0.6rem;
        }
        .deploy-guide li { font-size: 0.9rem; color: var(--text-dim); line-height: 1.5; }
        .deploy-guide code {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.75rem; color: var(--gold);
          background: rgba(212,175,55,0.1);
          padding: 0.1rem 0.4rem; border-radius: 2px;
        }

        /* ── FOOTER ── */
        .site-footer {
          text-align: center; padding: 2rem 1rem;
          border-top: 1px solid rgba(212,175,55,0.1);
        }
        .footer-text {
          font-family: 'Crimson Pro', serif; font-style: italic;
          color: var(--text-dim); font-size: 0.9rem;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 600px) {
          .nav-tabs { gap: 0.15rem; }
          .nav-tab { font-size: 0.6rem; padding: 0.35rem 0.5rem; }
          .ctrl-title { display: none; }
          .header-logo-text { font-size: 0.7rem; }
          .seniors-grid { grid-template-columns: 1fr 1fr; gap: 0.75rem; }
          .senior-card { padding: 1rem; }
          .corner-frame { display: none; }
        }
        @media (max-width: 380px) {
          .seniors-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {!introPlayed && <IntroScreen onComplete={handleIntroComplete} />}

      <div className="app-wrapper">
        {/* Header */}
        <header className={`site-header ${navVisible ? "visible" : ""}`}>
          <div className="header-logo">
            <span className="header-logo-icon">🥋</span>
            <div>
              <span className="header-logo-text">IGIT Martial Arts</span>
              <span className="header-logo-sub">Senior Farewell 2025</span>
            </div>
          </div>
          <nav className="nav-tabs">
            {TABS.map((t) => (
              <button
                key={t.id}
                className={`nav-tab ${activeTab === t.id ? "active" : ""}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </header>

        {/* Pages */}
        {activeTab === "tribute" && (
          <VideoScreen visible={introPlayed} />
        )}
        {activeTab === "seniors" && <SeniorsPage />}
        {activeTab === "qr" && <QRPage />}

        {/* Footer */}
        <footer className="site-footer">
          <p className="footer-text">
            "The true spirit of martial arts lives in those who carry it forward."
          </p>
          <div className="deco-line" style={{ maxWidth: 300, margin: "0.75rem auto 0" }} />
        </footer>
      </div>
    </>
  );
}
