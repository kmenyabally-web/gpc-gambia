# Pharmacy Council of The Gambia — Website Demo

## 🚀 Deploy to Vercel (5 minutes)

### Option A — Drag & Drop (Easiest)
1. Go to https://vercel.com and sign up free
2. Click **"Add New Project"**
3. Choose **"Import from folder"** or drag this entire folder
4. Vercel auto-detects Vite — click **Deploy**
5. Your live URL will be: `gpc-gambia.vercel.app`

### Option B — Vercel CLI
```bash
npm install -g vercel
cd gpc-gambia
npm install
vercel
```

## 🛠 Run Locally
```bash
npm install
npm run dev
```
Then open http://localhost:5173

## 📁 Project Structure
```
gpc-gambia/
├── index.html          # Entry point
├── vite.config.js      # Vite config
├── vercel.json         # Vercel routing
├── package.json
└── src/
    ├── main.jsx        # React entry
    └── App.jsx         # Full website
```

## 🌐 Custom Domain (after approval)
In Vercel dashboard → Project → Settings → Domains → Add `gpc.gm`
Then update DNS at your .gm registrar (Gcubed.gm or Cloud.GM).
