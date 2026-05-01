# Infrastructure

## n8n
- URL: https://matiasdutli22.app.n8n.cloud
- Plan: Paid ($20/month)
- Hosts all automation workflows

### Workflows de plataforma (compartidos)

| Workflow | Trigger | Propósito |
|----------|---------|-----------|
| Timeless — Onboarding v2 | POST /onboarding-hotel | Ingest KB → smoke test → email al cliente |
| Timeless — Status Endpoint | GET /onboarding-status | Polling: devuelve estados desde Google Sheets |
| Timeless — Ingesta de documentos | POST /ingest-document | Ingestión RAG genérica en Supabase |

### Workflows por cliente (duplicar para cada uno)

| Workflow | Trigger | Propósito |
|----------|---------|-----------|
| [client] — Bot Demo | POST /chat | Chat IA principal, logs a Google Sheets |
| [client] — Panel API | POST /[client]-data | Lee Google Sheets para el dashboard |
| [client] — Reporte Semanal | Cron | Email semanal al cliente |

## Supabase
- Role: vector storage (pgvector)
- Table: `documents`

## Netlify
- Site: https://chic-begonia-1708bb.netlify.app
- Repo: https://github.com/dutlimatias-boop/timeless-site
- Auto-deploy ON: push to main → deploys immediately
