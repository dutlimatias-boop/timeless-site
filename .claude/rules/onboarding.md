# Adding a New Client

## Self-service (automático)
El cliente completa el formulario en `onboarding.html` → n8n hace el resto automáticamente.

- **Formulario:** `timeless/onboarding.html` (multi-step, 6 tipos de negocio: hotel, clinica, beauty, restaurante, inmobiliaria, otro)
- **Webhook entrada:** `POST https://matiasdutli22.app.n8n.cloud/webhook/onboarding-hotel`
- **Status polling:** `GET https://matiasdutli22.app.n8n.cloud/webhook/onboarding-status?job_id=xxx`
- **Workflow n8n:** "Timeless — Onboarding v2 (con Verificación)" — spec completa en `docs/onboarding-workflow.md`
- **Estado del job:** Google Sheet `onboarding_status` (columnas: `job_id`, `received`, `ingestion`, `smoketest`, `email_sent`, `error_message`)

El workflow automático hace: ingest a Supabase con embeddings → smoke test al bot → email de bienvenida al cliente.

### Arquitectura interna de `onboarding.html`

**Globals clave:**
- `selectedType` — tipo de negocio activo; controla toda la UI dinámica
- `vocab` — objeto con labels, placeholders y amenities por tipo de negocio
- `LOOPS` — 4 pasos de verificación: `received`, `ingestion`, `smoketest`, `email`
- `lastSubmittedData` — payload cacheado para `retryVerification()`

**Flujo de submit:**
1. `handleSubmit()` genera un `job_id` único, llama `collectData()`, llama `runVerification()`
2. `runVerification()` hace POST al webhook → recibe `{ job_id }` de vuelta
3. `pollStep()` hace GET al status endpoint cada 4s por cada paso
4. Estados: `processing` → `running` en UI, `done` → `done`, `error` → `error`

**Probar localmente:**
```bash
python -m http.server 8080
# → http://localhost:8080/onboarding.html
```

## Pasos manuales post-onboarding (aún requeridos)
1. Duplicar 3 workflows en n8n: Bot Demo + Panel API + Reporte Semanal
2. Crear Google Sheet de logs de conversaciones y conectar al Panel API
3. Crear archivos branded: `panel-[client].html`, `chat-[client].html`, `dashboard-[client].html`
4. Crear `[client]-widget.js` y configurar GTM en el sitio del cliente
5. Push a GitHub → auto-deploy en Netlify

## Per-client n8n workflows (3 requeridos)
- **Bot Demo** — chat principal, AI agent, logs a Google Sheets
- **Panel API** — lee Google Sheets, devuelve datos para panel/dashboard
- **Reporte Semanal** — resumen semanal por email (template listo, configurar por cliente)
