---
name: new-client
description: Step-by-step checklist for onboarding a new Timeless client
---

# New Client Onboarding

Follow these steps in order. Each step depends on the previous.

## Checklist

- [ ] 1. Create knowledge base `.txt` with all business info (hours, services, FAQ, policies)
- [ ] 2. Ingest to Supabase: POST to ingest webhook with new `client_id`
- [ ] 3. Duplicate 3 n8n workflows from existing client:
  - **Bot Demo** — main chat, AI agent, logs to Google Sheets
  - **Panel API** — reads Google Sheets, returns data for panel
  - **Reporte Semanal** — weekly email summary
- [ ] 4. Create Google Sheet for the client and connect it to Panel API workflow
- [ ] 5. Add client entry to `CLIENTS` config in `panel.html`
- [ ] 6. Create branded HTML files:
  - `panel-[client].html`
  - `chat-[client].html`
  - `dashboard-[client].html`
- [ ] 7. Create `[client]-widget.js` and configure Google Tag Manager on client's site
- [ ] 8. Push to GitHub → Netlify auto-deploys (site: https://chic-begonia-1708bb.netlify.app)

## Naming convention
Use a short, lowercase slug for `client_id` (e.g. `sunlife`, `bellahotel`).
Use the same slug consistently across n8n, Supabase, Google Sheets, and file names.
