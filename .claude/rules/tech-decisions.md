# Tech Decisions

- **No iframe for chat** — n8n blocks iframe embedding; use `@n8n/chat` SDK via CDN instead
- **Widget injection** — loaded via Google Tag Manager on client sites
- **CSS** — plain CSS with Inter font, no framework
- **Client data store** — Google Sheets per client (simple, accessible for non-technical clients)
