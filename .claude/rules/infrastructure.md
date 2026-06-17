# Infrastructure

## n8n
- URL: https://matiasdutli22.app.n8n.cloud
- Plan: Paid ($20/month)
- Hosts all automation workflows

### Workflows de plataforma (compartidos)

| Workflow | Trigger | Propósito |
|----------|---------|-----------|
| Timeless — Onboarding v2 | POST /onboarding-hotel | Ingest KB → smoke test → email al cliente. Nodo embedding migrado de `Header Auth account` (key muerta `lKIA`) a `OpenAI W1W2` el 2026-06-16 |
| Timeless — Status Endpoint | GET /onboarding-status | Polling: devuelve estados desde Google Sheets |
| Timeless — Ingesta de documentos | POST /ingest-document | Ingestión RAG genérica en Supabase |
| Timeless — Supabase Keep-Alive (`oYbxM2pPG195VPB8`) | Cron diario 6am | Query trivial a `documents` para evitar el auto-pause del free tier de Supabase (creado 2026-06-16) |

### Workflows de marketing y ventas (mayo 2026)

| Workflow | ID | Trigger | Estado | Descripción |
|----------|----|---------|--------|-------------|
| Timeless — Lead Hunter | `uhtAIR0uKDxPzVXn` | Lunes 8am | ✓ Activo | Google Maps Text Search → **Place Details** (captura `website`+teléfono por `place_id`) → Enrich → OpenAI scoring (excluye cadenas, prioriza boutique <30 hab, no castiga pocas reseñas) → append a Prospectos (score ≥ 7). City auto-rotation (ISO week). Embudo arreglado, publicado y verificado 2026-06-14 ✅ |
| Timeless — Outreach Email | `RJArwDBVO9X9GbAp` | Martes 10am | ✓ Activo | Hunter.io → OpenAI subject → Gmail cold email con link `/?hotel=NombreHotel`. Copy canónico en `docs/outreach-sequence.md` (fuente original `docs/business/Timeless_Outreach_Sequence.docx`) |
| Timeless — Follow-up Bot | `DG1KRnNlMewrbZW9` | Diario 9am | ✓ Activo | Secuencia 4 toques (día 1, 5, 12, 30) a prospectos sin respuesta |
| Timeless — Content Generator | `LnDGBsIJStSGp0os` | Viernes 10am + Diario 11am | ✓ Activo | Genera posts LinkedIn/Instagram (Parte A) + auto-publica aprobados (Parte B) |
| Timeless — Mateo Reply Handler | `L1Cd7ZGaJkIVJn85` | Gmail trigger (team@timelessai.pro) | ✓ Activo | Detecta replies de prospectos → OpenAI clasifica intención → speech personalizado → alerta Telegram. LLAMADA speech incluye link Calendly real |
| Timeless — Unsubscribe (Baja) | `Rl85GmT7EnStTyIY` | POST /webhook (baja) | ✓ Activo | Baja de contacto desde `baja.html` → suprime de futuros envíos. Creado 2026-06-13 |

> **Suite "AI Sales Agent" (inactiva):** 4 workflows en n8n — `Timeless — AI Sales Agent (Monitor)` `jkLLOv6Jt0mZKdjA`, `(Demo Generator)` `VpZxwrRIURa1E4Sp`, `(Daily Digest)` `HsjDcX7eT01KIEJT`, `(Cleanup)` `y95oYaqhsugfu9VT`. Sistema de ventas previo (auto-genera demo por prospecto, monitorea Gmail, digest diario, limpia demos expiradas), reemplazado por el sistema Mateo. Todos `active: false`. Archivar o reactivar como bloque, no por partes.

### CRM Google Sheet (mayo 2026)
- **Nombre:** Timeless — CRM Maestro
- **Sheet ID:** configurar en `$env.GOOGLE_SHEET_ID` en n8n → Settings → Variables
- **Archivo fuente:** `docs/business/timeless-crm-master.xlsx` (importar a Google Sheets)
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

### Credenciales n8n configuradas
- `Google Sheets Timeless` — OAuth2 con matiidutlii@gmail.com ✅
- `Gmail Timeless` — OAuth2 con matiidutlii@gmail.com ✅
- `Gmail team@timelessai.pro` — OAuth2 con team@timelessai.pro ✅ (para Mateo Reply Handler)
- `LinkedIn Timeless` — OAuth2 para LinkedIn API ⏳ (pendiente crear perfiles)
- `Telegram Timeless` — Bot configurado, chat ID 1081637964 ✅

### Estado del sistema (actualizado 2026-05-30)
- ✅ CRM Google Sheet creado y Sheet ID configurado en n8n variables
- ✅ Variables de entorno configuradas (Google Maps, OpenAI, Hunter.io, Sheet ID)
- ✅ W1 activo y embudo arreglado (2026-06-14) — Place Details captura website+teléfono, scoring reescrito excluye cadenas. Publicado (activeVersion) + verificado con corrida de prueba
- ✅ Embudo W1→W2 coherente — W2 ("Extraer dominio") lee la columna `Tiene web?` del CRM y extrae el dominio para Hunter.io; con W1 escribiendo URLs reales, W2 ya no cae al fallback de adivinar el dominio. Falta solo la prueba viva (corrida del lunes)
- ✅ W1 activo — city rotation automática (ISO week)
- ✅ W2 activo — enviando cold emails desde matiidutlii@gmail.com
- ✅ W3 activo — follow-up secuencia 4 toques
- ✅ Mateo Reply Handler activo — Gmail trigger team@timelessai.pro
- ✅ W4 Content Generator activo — LinkedIn de Matías ya live
- ⏸ W4 pendiente — agregar LINKEDIN_ACCESS_TOKEN + LINKEDIN_PERSON_ID a variables (token expira cada 60 días)

### Workflows por cliente (duplicar para cada uno)

| Workflow | Trigger | Propósito |
|----------|---------|-----------|
| [client] — Bot Demo | POST /chat | Chat IA principal, logs a Google Sheets |
| [client] — Panel API | POST /[client]-data | Lee Google Sheets para el dashboard |
| [client] — Reporte Semanal | Cron | Email semanal al cliente |

## Calendly (agendado de demos)

- **Cuenta:** team@timelessai.pro
- **Evento:** "Demo Timeless — 15 min" — duración 15 min
- **Disponibilidad:** Lunes–Viernes 18:00–22:00 + Sábado 09:00–13:00 (CET — Central European Time)
- **Link público:** `https://calendly.com/team-timelessai/30min` (slug heredado de la creación inicial)
- **Integrado en:** speech LLAMADA del Mateo Reply Handler — se envía automáticamente cuando un prospecto pide hablar

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
- Project ref: `mueljmpduxhhdyryyckl` (nombre "Timeless", free tier, West EU Ireland)
- Table: `documents`
- ⚠️ **Free tier se auto-pausa a los ~7 días sin actividad** → da `NXDOMAIN` → tumba onboarding, Ingesta y el RAG de todos los bots (incl. Emma live). Resume desde el dashboard (data intacta, ~90 días de ventana). Mitigado con `Timeless — Supabase Keep-Alive`. Ver [[project_supabase_pause_risk]].

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
