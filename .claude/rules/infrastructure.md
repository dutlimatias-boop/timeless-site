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

### Workflows de marketing y ventas (mayo 2026)

| Workflow | ID | Trigger | Estado | Descripción |
|----------|----|---------|--------|-------------|
| Timeless — Lead Hunter | `uhtAIR0uKDxPzVXn` | Lunes 8am | ⏸ Inactivo | Google Maps → OpenAI scoring → append a Prospectos (score ≥ 7) |
| Timeless — Outreach Email | `RJArwDBVO9X9GbAp` | Martes 10am | ⏸ Inactivo | Hunter.io → OpenAI subject → Gmail cold email con link ?hotel= |
| Timeless — Follow-up Bot | `DG1KRnNlMewrbZW9` | Diario 9am | ⏸ Inactivo | Secuencia 4 toques (día 1, 5, 12, 30) a prospectos sin respuesta |
| Timeless — Content Generator | `LnDGBsIJStSGp0os` | Viernes 10am + Diario 11am | ⏸ Inactivo | Genera posts LinkedIn/Instagram (Parte A) + auto-publica aprobados (Parte B) |

### CRM Google Sheet (mayo 2026)
- **Nombre:** Timeless — CRM Maestro
- **Sheet ID:** configurar en `$env.GOOGLE_SHEET_ID` en n8n → Settings → Variables
- **Archivo fuente:** `timeless-crm-master.xlsx` (importar a Google Sheets)
- **Pestañas:** Prospectos · Pipeline · Clientes · Contenido

### Variables de entorno requeridas (n8n → Settings → Variables)
```
GOOGLE_MAPS_API_KEY=<Google Cloud Console — Places API>
OPENAI_API_KEY=<platform.openai.com>
HUNTER_API_KEY=<hunter.io/api-keys>
GOOGLE_SHEET_ID=<ID del CRM Maestro — entre /d/ y /edit en la URL>
LINKEDIN_ACCESS_TOKEN=<LinkedIn API — expira cada 60 días>
LINKEDIN_PERSON_ID=<GET https://api.linkedin.com/v2/me → campo id>
```

### Credenciales n8n a configurar (Settings → Credentials)
- `Google Sheets Timeless` — OAuth2 con matiidutlii@gmail.com
- `Gmail Timeless` — OAuth2 con matiidutlii@gmail.com
- `LinkedIn Timeless` — OAuth2 para LinkedIn API

### Pasos para activar el sistema (en orden)
1. Importar `timeless-crm-master.xlsx` → Google Sheets → copiar Sheet ID
2. Configurar las 6 variables de entorno en n8n
3. Crear las 3 credenciales OAuth2 en n8n
4. Abrir cada workflow y asignar las credenciales correctas a cada nodo
5. Probar W1 manualmente (test trigger, 1 ciudad sola para ahorrar API credits)
6. Activar W1 → esperar lunes → verificar Prospectos tab
7. Activar W2 → verificar emails en Gmail Sent
8. Activar W3
9. Activar W4 → verificar Contenido tab cada viernes

### Workflows por cliente (duplicar para cada uno)

| Workflow | Trigger | Propósito |
|----------|---------|-----------|
| [client] — Bot Demo | POST /chat | Chat IA principal, logs a Google Sheets |
| [client] — Panel API | POST /[client]-data | Lee Google Sheets para el dashboard |
| [client] — Reporte Semanal | Cron | Email semanal al cliente |

## MCP Servers (configurados en Claude Code — scope: local, solo proyecto timeless)

| Server | Tipo | Propósito |
|--------|------|-----------|
| **n8n-mcp** | stdio (`npx n8n-mcp`) | Conocimiento de 1,650 nodos n8n — construir y deployar workflows con lenguaje natural |
| **n8n-instance** | HTTP (`https://matiasdutli22.app.n8n.cloud/mcp-server/http`) | Ejecutar workflows existentes como herramientas desde Claude Code |

### n8n-mcp
- Package: `czlonkowski/n8n-mcp` (20k stars)
- Env: `MCP_MODE=stdio`, `N8N_API_URL`, `N8N_API_KEY`
- Uso: "creá un workflow en n8n que..." → Claude lo construye directamente
- Config en: `C:\Users\user\.claude.json` bajo el proyecto timeless

### n8n-instance (Instance-level MCP)
- Requiere n8n v2.17.5 Preview
- Workflows expuestos como herramientas (activar en Settings → AI → MCP en n8n):
  - Sun Life — Bot Demo
  - Sun Life — Panel API
  - Sun Life — Reporte Semanal
- **Pendiente:** agregar descripciones a los 3 workflows en n8n editor para mejor discovery

## Supabase
- Role: vector storage (pgvector)
- Table: `documents`

## Cloudflare Pages (primario)
- Site: https://timeless-site.pages.dev
- Repo: https://github.com/dutlimatias-boop/timeless-site
- Auto-deploy ON: push to main → deploy en ~30 segundos
- Sin límites de bandwidth

## Netlify (legacy — NO desactivar)
- Site: https://chic-begonia-1708bb.netlify.app
- Repo: https://github.com/dutlimatias-boop/timeless-site
- Auto-deploy ON: push to main → deploys immediately
- **Mantener activo:** el widget de Emma en sunlifebeachhotel.com apunta a esta URL
