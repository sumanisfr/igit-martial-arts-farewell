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
