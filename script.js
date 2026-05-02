// ─── Configuration ───────────────────────────────────────────────────────────
const SENIORS = [
  { name: "Biswa", belt: "Black Belt", emoji: "🥋", msg: "", connections: [{ label: "Instagram", url: "https://www.instagram.com/biswabhusanmohapatra531" }] },
  { name: "Anisha", belt: "Black Belt", emoji: "🥋", msg: "", connections: [{ label: "Instagram", url: "https://www.instagram.com/anishasutar_5005" }, { label: "LinkedIn", url: "https://www.linkedin.com/in/anisha-sutar-8a92b3345/" }] },
  { name: "Trupti", belt: "Black Belt", emoji: "🥋", msg: "", connections: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/trupti-das-163a1a265/" }] },
  { name: "Bajarangi", belt: "Brown Belt", emoji: "🟤", msg: "", connections: [{ label: "Instagram", url: "https://www.instagram.com/bajarangi_jena" }, { label: "LinkedIn", url: "https://www.linkedin.com/in/bajarangi-jena-907b7b2b8/" }] },
  { name: "Sudip", belt: "Green Belt", emoji: "🟢", msg: "", connections: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/sudip-mohanty30/" }, { label: "Instagram", url: "https://www.instagram.com/oye_its__sudip" }] },
  { name: "Amlan", belt: "Green Belt", emoji: "🟢", msg: "", connections: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/amlan-sourav-sahoo-235325332/" }, { label: "Instagram", url: "https://www.instagram.com/amlan.amlan.7121" }] },
  { name: "Ayasi", belt: "Green Belt", emoji: "🟢", msg: "", connections: [{ label: "Instagram", url: "https://www.instagram.com/_ayasi/" }] },
  { name: "Shilpi", belt: "Blue Belt", emoji: "🔵", msg: "", connections: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/shilpi-upadhyay-577135216/" }] },
  { name: "Ankita", belt: "Blue Belt", emoji: "🔵", msg: "", connections: [{ label: "Instagram", url: "https://www.instagram.com/ankita_sahu_27/" }] },
  { name: "Sujata", belt: "Blue Belt", emoji: "🔵", msg: "", connections: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/sujatapriyadarshinisahoo/" }, { label: "Instagram", url: "https://www.instagram.com/sing_with_us715" }] },
];

const BELT_ORDER = {
  "Black Belt": 0,
  "Brown Belt": 1,
  "Green Belt": 2,
  "Blue Belt": 3,
  "Purple Belt": 4,
};

const DRIVE_FOLDER_ID = "175-pA7_x_mWq6C8cUgLFUql0hx-tMAKb";

// ─── State ───────────────────────────────────────────────────────────────────
let state = {
  introPlayed: false,
  activeTab: "tribute",
  images: {},
};

// ─── QR Code Generator ─────────────────────────────────────────────────────
function generateQRDataURL(text) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}&bgcolor=0a0a0a&color=d4af37&format=png`;
}

// ─── Intro Screen ─────────────────────────────────────────────────────────
function initIntroScreen() {
  const intro = document.getElementById("intro-screen");
  const particlesContainer = intro.querySelector(".particles");

  // Create particles
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 8 + "s";
    particle.style.animationDuration = (6 + Math.random() * 8) + "s";
    particle.style.width = (2 + Math.random() * 3) + "px";
    particle.style.height = (2 + Math.random() * 3) + "px";
    particle.style.opacity = (0.3 + Math.random() * 0.5).toString();
    particlesContainer.appendChild(particle);
  }

  // Add visible class to content after delay
  setTimeout(() => {
    intro.querySelector(".intro-content").classList.add("visible");
  }, 800);

  // Fade out and show main app
  setTimeout(() => {
    state.introPlayed = true;
    intro.classList.add("fade-out");
    const appWrapper = document.getElementById("app-wrapper");
    appWrapper.style.display = "block";
    appWrapper.querySelector(".site-header").classList.add("visible");
    
    // Show tribute tab by default and auto-play video
    state.activeTab = "tribute";
    renderCurrentPage();
    
    // Auto-start video after a short delay
    setTimeout(() => {
      const overlay = document.querySelector(".video-overlay");
      if (overlay) {
        overlay.style.display = "none";
      }
      const iframe = document.querySelector(".video-iframe");
      if (iframe) {
        // Video auto-plays due to allow="autoplay" attribute
        iframe.style.opacity = "1";
      }
    }, 800);
    
    detectImages();
  }, 4000);
}

// ─── Tab Navigation ───────────────────────────────────────────────────────
function initTabs() {
  document.querySelectorAll(".nav-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".nav-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      state.activeTab = tab.dataset.tab;
      renderCurrentPage();
    });
  });
}

// ─── Video Screen ─────────────────────────────────────────────────────────
function renderVideoScreen() {
  return `
    <div class="video-screen visible">
      <div class="corner-frame top-left"></div>
      <div class="corner-frame top-right"></div>
      <div class="corner-frame bottom-left"></div>
      <div class="corner-frame bottom-right"></div>

      <div class="video-container">
        <div class="video-overlay" onclick="this.style.display='none'">
          <div class="overlay-content">
            <div class="play-pulse"></div>
            <div class="play-btn">▶</div>
            <p class="overlay-text">TAP TO PLAY TRIBUTE</p>
          </div>
        </div>
        <iframe src="https://drive.google.com/file/d/${DRIVE_FOLDER_ID}/preview" class="video-iframe" allow="autoplay; fullscreen" allowfullscreen title="IGIT Martial Arts Farewell Video"></iframe>
      </div>

      <div class="controls-bar">
        <button class="ctrl-btn" onclick="location.reload()">↺ Replay</button>
        <span class="ctrl-title">IGIT Martial Arts Farewell</span>
        <a href="https://drive.google.com/drive/folders/${DRIVE_FOLDER_ID}" target="_blank" rel="noreferrer" class="ctrl-btn">⛶ Full View</a>
      </div>

      <div class="honor-message">
        <span class="honor-text">"With respect, discipline, and gratitude — we honor your journey"</span>
      </div>
    </div>
  `;
}

// ─── Seniors Page ─────────────────────────────────────────────────────────
function getSortedSeniors() {
  return [...SENIORS].sort((a, b) => {
    const beltDelta = (BELT_ORDER[a.belt] ?? 99) - (BELT_ORDER[b.belt] ?? 99);
    if (beltDelta !== 0) return beltDelta;
    return a.name.localeCompare(b.name);
  });
}

function getBeltColor(belt) {
  const colors = {
    "Black Belt": "#1a1a1a",
    "Brown Belt": "#5C2E00",
    "Purple Belt": "#4B0082",
    "Blue Belt": "#0033AA",
    "Green Belt": "#006600",
  };
  return colors[belt] || "#333";
}

function renderSeniorsPage() {
  const sortedSeniors = getSortedSeniors();
  let html = `
    <div class="seniors-page">
      <div class="section-header">
        <div class="deco-line"></div>
        <h2 class="section-title">OUR CHAMPIONS</h2>
        <p class="section-sub">Honoring the warriors who walked this path, ordered by belt</p>
        <div class="deco-line"></div>
      </div>
      <div class="seniors-grid">
  `;

  sortedSeniors.forEach((senior, i) => {
    const img = state.images[senior.name];
    const initials = senior.name.split(" ").map(n => n[0]).slice(0, 2).join("");
    const beltColor = getBeltColor(senior.belt);

    html += `
      <div class="senior-card" style="animation-delay: ${i * 0.1}s">
        <div class="senior-avatar">
          ${img ? `<img src="${img}" alt="${senior.name}" onerror="this.style.display='none'">` : ''}
          ${!img ? `<div class="avatar-initials">${initials}</div>` : ''}
        </div>
        <h3 class="senior-name">${senior.name}</h3>
        <span class="belt-badge" style="background: ${beltColor}; border-color: ${beltColor};">${senior.belt}</span>
        <p class="senior-msg">"${senior.msg}"</p>
        ${senior.connections && senior.connections.length > 0 ? `
          <div class="senior-connections">
            ${senior.connections.map(link => `<a href="${link.url}" target="_blank" rel="noreferrer" class="connection-link">${link.label}</a>`).join('')}
          </div>
        ` : ''}
      </div>
    `;
  });

  html += `
      </div>
    </div>
  `;
  return html;
}

// ─── QR Page ──────────────────────────────────────────────────────────────
function renderQRPage() {
  const pageUrl = window.location.origin;
  const qrUrl = generateQRDataURL(pageUrl);
  return `
    <div class="qr-page">
      <div class="section-header">
        <div class="deco-line"></div>
        <h2 class="section-title">YOUR QR CODE</h2>
        <p class="section-sub">Print on ATM-style cards for each senior</p>
        <div class="deco-line"></div>
      </div>

      <div class="qr-card">
        <div class="qr-card-header">
          <span>🥋</span>
          <span>IGIT MARTIAL ARTS FAREWELL</span>
          <span>🥋</span>
        </div>
        <div class="qr-wrapper">
          <img src="${qrUrl}" alt="QR Code" class="qr-img">
          <div class="qr-glow"></div>
        </div>
        <p class="qr-label">Scan to Watch Your Tribute</p>
        <div class="qr-url">${pageUrl}</div>
        <div class="qr-actions">
          <a href="${qrUrl}" download="igit-farewell-qr.png" class="gold-btn">⬇ Download QR (PNG)</a>
          <button class="gold-btn outline" onclick="copyToClipboard('${pageUrl}')">⎘ Copy URL</button>
        </div>
        <p class="qr-note">💡 Update this URL once you deploy to production</p>
      </div>

      <div class="deploy-guide">
        <h3>🚀 Quick Deploy Guide</h3>
        <ol>
          <li><strong>GitHub Pages:</strong> Push to gh-pages branch</li>
          <li><strong>Vercel:</strong> <code>vercel deploy</code></li>
          <li><strong>Netlify:</strong> Drag dist/ folder to netlify.com</li>
          <li><strong>Custom domain:</strong> Add domain in hosting settings</li>
        </ol>
      </div>
    </div>
  `;
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("URL copied to clipboard!");
  });
}

// ─── Image Detection ──────────────────────────────────────────────────────
async function detectImages() {
  const sortedSeniors = getSortedSeniors();
  const newImages = {};

  for (const senior of sortedSeniors) {
    const base = `/avatars/${senior.name.toLowerCase()}`;

    // Try PNG
    try {
      const resPng = await fetch(`${base}.png`, { method: "HEAD" });
      if (resPng.ok) {
        newImages[senior.name] = `${base}.png`;
        continue;
      }
    } catch (e) {}

    // Try JPG
    try {
      const resJpg = await fetch(`${base}.jpg`, { method: "HEAD" });
      if (resJpg.ok) {
        newImages[senior.name] = `${base}.jpg`;
        continue;
      }
    } catch (e) {}
  }

  state.images = newImages;
  if (state.activeTab === "seniors") {
    renderCurrentPage();
  }
}

// ─── Render Page ──────────────────────────────────────────────────────────
function renderCurrentPage() {
  const container = document.getElementById("content-container");
  if (!container) return;

  let html = "";
  if (state.activeTab === "tribute") {
    html = renderVideoScreen();
  } else if (state.activeTab === "seniors") {
    html = renderSeniorsPage();
  } else if (state.activeTab === "qr") {
    html = renderQRPage();
  }

  container.innerHTML = html;
}

// ─── Initialize App ───────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initIntroScreen();
  initTabs();
  
  // Start detecting images after a short delay
  setTimeout(() => {
    detectImages();
  }, 1000);
});
