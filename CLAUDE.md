# Timeless — Project Context

## What is Timeless
Timeless is an AI automation SaaS for hotels, restaurants, clinics, and small businesses. It provides a virtual assistant (named per client) that handles guest/customer communications 24/7, plus a management dashboard and weekly analytics reports.

**Built by:** Matías Dutli (Zurich) and partner  
**Stack:** n8n (automation), Supabase (vector DB + RAG), OpenAI (embeddings + chat), Google Sheets (data store), Netlify (hosting), GitHub (repo)

---

## Architecture

### How the bot works
1. Guest sends a message
2. n8n workflow receives it via webhook
3. Message is embedded with OpenAI → similarity search in Supabase
4. Relevant chunks returned → sent to GPT as context
5. GPT generates response → sent back to guest

### Knowledge base (RAG)
- Stored in Supabase with pgvector
- Each client has a `client_id` field to isolate their data
- Ingested via n8n workflow "Timeless — Ingesta de documentos"
- Webhook: `POST https://matiasdutli22.app.n8n.cloud/webhook/ingest-document`
- Body: `{ "client_id": "client_name", "text": "..." }`

### Data storage
- Google Sheets per client — conversation logs, lead data
- Fields: nombre, fecha_checkin, fecha_checkout, tipo_habitacion, cantidad_personas, ocasion_especial, canal, timestamp

---

## Current Client: Sun Life Beach Hotel

### Hotel info
- **Name:** Sun Life Beach Hotel
- **Owner:** Analía (Ana)
- **Location:** 1225 S McCall Rd, Englewood, FL 34223
- **Email:** ana@sunlifebeachhotel.com
- **Phone:** 813-447-1111
- **Rooms:** 8 units total
- **Systems:** SiteMinder (channel manager), GoDaddy (website)

### Client ID
```
sunlife_beach_hotel
```

### Bot (Emma)
- **Name:** Emma — Virtual Front Desk
- **Public chat URL:** https://chic-begonia-1708bb.netlify.app/chat-sunlife.html
- **n8n chat webhook:** https://matiasdutli22.app.n8n.cloud/webhook/7927dcd1-6b79-4a42-9661-22e85347a85f/chat
- **Panel URL:** https://chic-begonia-1708bb.netlify.app/panel-sunlife.html
- **Dashboard URL:** https://chic-begonia-1708bb.netlify.app/dashboard-sunlife.html

### Google Sheets
- **Sheet ID:** 1UqCJbqBSNQCOPUecEp_K3C8Hbu4DtcKQO5ZptHiZ0Ks
- **Name:** Timeless - Sun Life Beach Hotel

### n8n Workflows
- **Bot Demo:** Main chat workflow for Emma
- **Panel API:** `POST https://matiasdutli22.app.n8n.cloud/webhook/sunlife-data` — returns guest data for panel
- **Ingesta de documentos:** Ingest knowledge base chunks into Supabase
- **Reporte Semanal:** Weekly summary email (to be configured)

### Knowledge base file
```
C:\Users\user\Downloads\sunlife_beach_hotel.txt
```

---

## Deployed Files (Netlify)

**Site:** https://chic-begonia-1708bb.netlify.app  
**Repo:** https://github.com/dutlimatias-boop/timeless-site  
**Auto-deploy:** ON (pushes to main deploy automatically)

| File | Description |
|------|-------------|
| `index.html` | Landing page |
| `panel.html` | Multi-client panel (param: ?client=sunlife) |
| `panel-sunlife.html` | Branded panel for Ana |
| `chat-sunlife.html` | Branded chat page with Emma embed |
| `dashboard-sunlife.html` | Full management dashboard with interactive calendar |

---

## Dashboard (dashboard-sunlife.html)

Two tabs:
1. **My Day** — Interactive calendar (click any day) → shows tasks, guests, room status for that day
2. **Weekly Summary** — Metrics, message chart, most asked questions

Currently uses hardcoded demo data. Next step: connect to Ana's Google Sheets for real data.

---

## Pending Tasks

### Immediate (waiting on Ana)
- [ ] Ana's Google Sheets access (she organizes one sheet per room)
- [ ] GoDaddy access — install Emma on her website
- [ ] WhatsApp number for the hotel
- [ ] SiteMinder plan details — check if API access is available

### To build next
- [ ] Emma qualifies leads (asks dates, room type, guests) before deriving to SiteMinder
- [ ] Auto-register every interested guest in Google Sheets from first message
- [ ] Notify Ana when a guest is ready to book (WhatsApp or email)
- [ ] Connect dashboard to Ana's real Google Sheets data
- [ ] Update prices in SiteMinder and GoDaddy from one place
- [ ] Install Emma widget on sunlifebeachhotel.com (GoDaddy)
- [ ] Weekly report workflow configured and active

### Future / roadmap
- [ ] SiteMinder API integration for real-time availability
- [ ] WhatsApp Business integration
- [ ] Panel authentication (login for Ana)
- [ ] Stripe payment integration
- [ ] Automatic client onboarding workflow
- [ ] Multi-language support (English + Spanish)

---

## How to add a new client

1. Create knowledge base `.txt` file with all business info
2. Ingest to Supabase with new `client_id`
3. Duplicate n8n workflows (Bot Demo + Panel API + Reporte Semanal)
4. Create Google Sheet and connect to Panel API workflow
5. Add client to `CLIENTS` config in `panel.html`
6. Create branded `panel-[client].html` and `chat-[client].html`
7. Push to GitHub → auto-deploys to Netlify

---

## n8n Instance
- **URL:** https://matiasdutli22.app.n8n.cloud
- **Plan:** Paid ($20/month)

## Supabase
- Used for vector storage (pgvector)
- Table: `documents` with fields: `id`, `content`, `embedding`, `client_id`, `metadata`

## Tech decisions
- **No iframe for chat** — n8n blocks iframe embedding. Use `@n8n/chat` SDK via CDN instead.
- **CSS framework** — none, plain CSS with Inter font
- **Color palette (Sun Life theme):** bg `#f5f0e8`, card `#fdf9f4`, teal `#0e7c7b`, gold `#b8720a`
