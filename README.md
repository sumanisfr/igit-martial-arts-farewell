# 🥋 IGIT Martial Arts — Senior Farewell Tribute

A beautiful, responsive tribute website for graduating martial arts seniors. Built with **vanilla HTML, CSS, and JavaScript** — zero dependencies, easy to deploy.

## ✨ Features

- 🎬 **Video Tribute** - Google Drive embedded video
- 🥋 **Senior Showcase** - 10 seniors with photos, bios, and social links
- 🔲 **QR Code** - Shareable QR code for easy access
- 📱 **Fully Responsive** - Works on mobile, tablet, desktop
- ✨ **Animated** - Beautiful intro screen and transitions
- 🚀 **Zero Dependencies** - Pure HTML/CSS/JS, no build tools needed

## 📁 Project Structure

```
.
├── index.html              # Main HTML
├── styles.css              # All styling
├── script.js               # Pure JavaScript
├── public/avatars/         # Senior photos
│   ├── biswa.png
│   ├── anisha.png
│   ├── shilpi.png
│   └── ... (all seniors)
├── .github/workflows/      # GitHub Pages automation
└── Seniors.mp4            # Optional: Local video
```

## 🚀 Quick Start (Local Testing)

Simply open `index.html` in your browser, or use a local server:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx http-server
```

Visit `http://localhost:8000`

## 📦 Adding Senior Photos

Place photos in `public/avatars/` with **lowercase names**:

```
public/avatars/
├── biswa.png
├── anisha.png
├── trupti.png
├── bajarangi.png
├── sudip.png
├── amlan.png
├── ayasi.png
├── shilpi.png
├── ankita.png
└── sujata.png
```

**Supported formats:** `.png`, `.jpg`

The app auto-detects and displays images. Missing images show initials as fallback.

## 🌐 Deploy to GitHub Pages

### Step 1: Enable GitHub Pages

1. Go to **Settings** → **Pages**
2. Select **Deploy from a branch**
3. Choose **main** branch → Save

### Step 2: Push to GitHub

```bash
git add -A
git commit -m "deploy: IGIT Farewell Tribute"
git push origin main
```

The automated workflow deploys instantly!

### Step 3: Live Site

Your site will be at:

```
https://sumanisfr.github.io/igit-martial-arts-farewell/
```

## ✏️ Customization

### Update Seniors Data

Edit `script.js` - find `const SENIORS`:

```javascript
const SENIORS = [
  {
    name: "Senior Name",
    belt: "Black Belt",
    emoji: "🥋",
    msg: "Quote or message",
    connections: [
      { label: "Instagram", url: "https://instagram.com/..." },
      { label: "LinkedIn", url: "https://linkedin.com/in/..." }
    ]
  },
  // ... more seniors
];
```

**Available belts:**

- `"Black Belt"` (highest)
- `"Brown Belt"`
- `"Green Belt"`
- `"Blue Belt"`
- `"Purple Belt"`

### Update Video (Google Drive)

In `script.js`, change the Drive folder ID:

```javascript
const DRIVE_FOLDER_ID = "your-google-drive-folder-id";
```

To get your folder ID:

1. Open Google Drive folder
2. Copy URL: `https://drive.google.com/drive/folders/FOLDER_ID_HERE`
3. Replace in code

**Make sure:** Folder is shared with "Anyone with the link" as Viewer

### Change Colors & Styling

Edit `styles.css` - CSS variables in `:root`:

```css
:root {
  --gold: #d4af37;        /* Main color */
  --red: #8b0000;         /* Accent color */
  --black: #0a0a0a;       /* Background */
  /* ... more variables */
}
```

### Modify Typography

Google Fonts are loaded in `styles.css`:

- **Cinzel** - Headers (elegant serif)
- **Crimson Pro** - Body text (readable serif)
- **Share Tech Mono** - Buttons (technical look)

## 📱 Responsive Design

- **Mobile** (<380px): Single column
- **Tablet** (380-600px): Two columns
- **Desktop** (>600px): Auto-fill grid

All animations and transitions are optimized for smooth performance.

## 🔒 Privacy & Sharing

- QR Code redirects to your site
- All photos stored locally in `public/avatars/`
- Google Drive link requires sharing permissions
- No external trackers or analytics

## 🆘 Troubleshooting

**Images not showing?**

- Ensure photos are in `public/avatars/` with exact senior names (lowercase)
- Check browser console (F12) for errors
- Supported formats: `.png`, `.jpg`

**Video not playing?**

- Verify Google Drive folder is shared ("Anyone with the link")
- Check Drive folder ID in `script.js`
- Try opening the Drive link directly

**QR Code not working?**

- QR code URL auto-updates to your site location
- Update QR page URL after deploying

## 📚 Resources

- [Google Drive Embed](https://support.google.com/drive/answer/2881970)
- [QR Code API](https://www.qrserver.com/)
- [CSS Grid Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [GitHub Pages Docs](https://pages.github.com/)

## 📄 License

Open source. Use freely for personal projects.

---

**Made with ❤️ for IGIT Martial Arts Farewell Tribute 2025**

**Live:** <https://sumanisfr.github.io/igit-martial-arts-farewell/>

# 🥋 IGIT Martial Arts — Senior Farewell Tribute

A premium, emotional tribute website for IGIT Martial Arts seniors.
QR-scan activated, animated, fully responsive.

---

## 📁 Project Structure

```
igit-farewell/
├── index.html              # HTML entry
├── package.json            # Dependencies
├── vite.config.js          # Build config
├── vercel.json             # Vercel routing
├── netlify.toml            # Netlify routing
└── src/
    ├── main.jsx            # React entry
    └── App.jsx             # Full application
```

---

## 🚀 Deploy in 5 Minutes

### Option A — Vercel (Recommended)

```bash
# 1. Install dependencies
npm install

# 2. Install Vercel CLI
npm i -g vercel

# 3. Deploy
vercel

# 4. Follow prompts → your site goes live at:
# https://igit-martial-arts-farewell.vercel.app
```

### Option B — Netlify

```bash
# 1. Build
npm run build

# 2. Go to netlify.com → "Add new site" → "Deploy manually"
# 3. Drag the dist/ folder into the deploy zone
# Done! 🎉
```

### Option C — GitHub + Vercel (Auto-deploy)

```bash
git init
git add .
git commit -m "IGIT Farewell Tribute"
git remote add origin https://github.com/YOUR_USERNAME/igit-farewell.git
git push -u origin main
# Connect repo in vercel.com → auto-deploys on every push
```

---

## 🎥 Update the Video

Open `src/App.jsx` and find line ~150:

```js
const driveFolderId = "175-pA7_x_mWq6C8cUgLFUql0hx-tMAKb";
```

Replace the ID with your new Google Drive folder/file ID.

**To get a file ID from Drive:**

1. Open the video in Google Drive
2. Copy the URL: `https://drive.google.com/file/d/FILE_ID_HERE/view`
3. Paste the `FILE_ID_HERE` as `driveFolderId`

**Make sure the file is shared:**

- Right-click → Share → "Anyone with the link" → Viewer

---

## 🧑‍🎓 Update Senior Profiles

In `src/App.jsx`, find the `SENIORS` array (~line 200):

```js
const SENIORS = [
  { name: "Arjun Sharma", belt: "Black Belt", emoji: "🥋", msg: "..." },
  // Add more seniors here
];
```

Belt options: `"White Belt"`, `"Yellow Belt"`, `"Orange Belt"`, `"Green Belt"`, `"Blue Belt"`, `"Purple Belt"`, `"Brown Belt"`, `"Black Belt"`

---

## 🔲 QR Code

1. Go to the **QR Code** tab in the website
2. Download the QR PNG
3. Print on ATM-style cards (85mm × 54mm recommended)
4. After deploying, update the URL in `src/App.jsx`:

```js
const pageUrl = "https://YOUR-DEPLOYED-URL.vercel.app";
```

---

## 📱 Browser Compatibility

| Platform | Status |
|----------|--------|
| Android Chrome | ✅ |
| iPhone Safari | ✅ |
| Desktop Chrome/Firefox/Edge | ✅ |
| QR scan → auto-open | ✅ |

---

## 💡 Tips

- Google Drive video autoplay may require a manual tap on iOS (browser restriction)
- The fallback "Tap to Play" button always works
- For best video experience, upload to YouTube (unlisted) and use YouTube embed

---

Made with ❤️ for IGIT Martial Arts Seniors
