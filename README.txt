AIBL SALES – standalone PWA

1) BACKEND: open your leads Google Sheet > Extensions > Apps Script > paste Code.gs > Deploy > New deployment > Web app
   Execute as: Me | Who has access: ANYONE  > copy the Web app URL (ends with /exec).
   After any later change to Code.gs: Deploy > Manage deployments > Edit > New version.

2) FRONTEND: upload index.html, manifest.json, sw.js, icon-192.png, icon-512.png (same folder) to any HTTPS static host:
   Netlify (drag & drop the folder), Cloudflare Pages, GitHub Pages, Firebase Hosting, or your own cPanel site.

3) Open the hosted URL, paste the /exec URL on the Connect screen (or set DEFAULT_API at the top of the script in index.html), sign in.
   Default password for all accounts: aibl@123 (admin can change under Team).
   Android/Chrome: "Install app" button. iPhone/Safari: Share > Add to Home Screen.
