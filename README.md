# Snooker Scoreboard — GitHub Pages

This is a ready-to-deploy package for your snooker scoreboard. It includes:
- `index.html` (your app)
- `manifest.webmanifest` (installable app metadata)
- `sw.js` (offline caching so it works without internet once loaded)
- Icons for the app (PWA)
- `404.html` and `.nojekyll` for smoother GitHub Pages behaviour

## Deploy on GitHub Pages (main branch)
1. Create a new GitHub repo (e.g., **snooker-scoreboard**).
2. Upload all files in this folder (drag & drop in GitHub web UI).
3. Go to **Settings → Pages**:
   - **Source**: Deploy from a branch
   - **Branch**: `main` (root)
4. Wait 1–2 minutes. Your site will be live at:
   `https://YOUR-USERNAME.github.io/REPO-NAME/`

## Add to Home Screen (as an app)
- Open the URL in Chrome or Edge on Android.
- Tap **⋮ → Add to Home screen**.
- Launch it from your home screen — it will open fullscreen.

## Notes
- **Local save**: Scores & names are stored in `localStorage` in the browser; hosting doesn't change that.
- **Offline**: After the first load, the service worker will serve cached files even when you're offline.
- **Reset**: Use the New Game button on the page to clear scores/history.
