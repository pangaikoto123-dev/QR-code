QR-code

This repository was empty and has been prepared as a small static QR code generator site and configured for deployment to Vercel.

What I added
- index.html — a simple, client-side QR code generator using qrcodejs (CDN)
- vercel.json — Vercel configuration to serve the static index.html

Deploying to Vercel
1. Import repository on https://vercel.com/new and follow the UI (no build step required).
2. Or use the Vercel CLI:
   - Install: `npm i -g vercel`
   - From your cloned repo folder run: `vercel` and follow the prompts.

Next steps / options
- If you want a React/Next.js app (with server-side features, API routes, or nicer UX), tell me and I can scaffold a Next.js starter and update vercel.json accordingly.
- Add a LICENSE, CI, or custom domain in Vercel if needed.
