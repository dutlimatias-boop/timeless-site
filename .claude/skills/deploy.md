---
name: deploy
description: Push changes to GitHub and verify Netlify auto-deploy
---

# Deploy to Production

## Steps
1. Confirm changes are in the correct files for the target client
2. Push to `main` branch of https://github.com/dutlimatias-boop/timeless-site
3. Netlify auto-deploy triggers immediately on push
4. Verify at https://chic-begonia-1708bb.netlify.app

## Notes
- Auto-deploy is ON — every push to `main` goes live immediately
- No build step — files are served as static HTML/JS/CSS
- Widget JS files (`[client]-widget.js`) are loaded via Google Tag Manager on client sites, so GTM cache may delay widget updates
