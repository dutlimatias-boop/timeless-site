# Playbook — Revisión de Seguridad de Timeless

**Objetivo:** detectar exposición de secretos, accesos mal configurados, fugas entre datos de clientes y superficie de ataque innecesaria. Atemporal: revisa el estado *actual* del repo y la infra, sin asumir un punto fijo en el tiempo.

**Modo de ejecución:** solo lectura. No rotar claves, no borrar, no modificar workflows de clientes. Producir informe; las acciones las decide Matías.

**Formato de salida:** por cada hallazgo → `[severidad] título` · evidencia (archivo:línea o workflow) · riesgo concreto · acción recomendada. Severidades: 🔴 crítico · 🟡 medio · 🟢 mejora.

---

## 1. Secretos en el repositorio
- [ ] Buscar API keys, tokens y credenciales hardcodeadas en el repo (patrones: `sk-`, `AIza`, `OPENAI`, `HUNTER`, `MAPS`, `LINKEDIN`, `TELEGRAM`, `Bearer `, `api_key`, `password`, `secret`).
- [ ] Revisar especialmente los `.json` de `n8n-workflows/` — los workflows exportados suelen llevar claves embebidas en nodos.
- [ ] Confirmar que las API keys vivan en **n8n → Settings → Variables** y no en nodos (ver pendiente histórico de mover OpenAI/Hunter/Maps a variables).
- [ ] Verificar `.gitignore`: ¿están excluidos `.env`, credenciales, exports con secretos, archivos `*-copy.json`?
- [ ] Revisar historial git por secretos commiteados y luego "borrados" (siguen en el historial). `git log -p` sobre archivos sensibles.
- [ ] Archivos sospechosos sueltos en el repo root (xlsx, docx, imágenes, `*-copy.json`) — ¿contienen datos de clientes o credenciales que no deberían estar versionados?

## 2. Aislamiento de datos entre clientes (regla crítica)
- [ ] Confirmar que cada cliente está aislado por `client_id` en Supabase (`documents.client_id`) y que ningún workflow consulta sin filtrar por `client_id`.
- [ ] Verificar que los workflows de plataforma (Onboarding, Ingesta) no mezclen KB de distintos clientes.
- [ ] Revisar que las Google Sheets internas de Timeless no expongan datos de un cliente a otro.
- [ ] Confirmar que no hay datos reales de clientes (PII de huéspedes: nombres, emails, teléfonos, reservas) commiteados en el repo.

## 3. Webhooks y endpoints expuestos
- [ ] Listar todos los webhooks n8n públicos (chat, panel-data, ingest-document, onboarding-hotel, onboarding-status).
- [ ] Por cada uno: ¿hay autenticación o al menos un token/secret en la URL? ¿O es un endpoint abierto?
- [ ] `ingest-document` y `onboarding-hotel` aceptan POST arbitrario → ¿puede un tercero inyectar basura a Supabase o disparar onboardings falsos? Evaluar rate-limit / token.
- [ ] `panel-data` / endpoints que devuelven datos → ¿filtran por cliente o devuelven todo a quien pregunte?
- [ ] Revisar si las URLs de paneles/dashboards (`panel-sunlife.html`, etc.) son adivinables y exponen datos sin login (falta de auth está en roadmap — registrarlo como riesgo conocido).

## 4. Credenciales y accesos de terceros
- [ ] Inventario de cuentas con acceso: Gmail (matiidutlii@ y team@), Google Workspace, Cloudflare, Netlify, GitHub, n8n, Supabase, Calendly, Telegram bot, Hunter.io, Google Cloud (Maps).
- [ ] ¿Hay 2FA habilitado en las cuentas críticas (GitHub, Google, Cloudflare, n8n)?
- [ ] Tokens con expiración (LinkedIn ~60 días): ¿hay riesgo de que expiren silenciosamente y rompan flujos? ¿Quedaron tokens viejos válidos?
- [ ] OAuth de clientes (ej. OneDrive/Sheets de Ana): confirmar que el alcance del permiso es el mínimo necesario.
- [ ] Telegram bot token y chat ID: ¿hardcodeados en algún workflow exportado del repo?

## 5. Dependencias y hosting
- [ ] Sitio estático (Cloudflare Pages + Netlify): ¿algún JS del sitio expone keys del lado cliente? (revisar `*.html`, `*-widget.js`).
- [ ] Widget de Emma embebido en sitios de clientes (vía GTM): ¿qué información manda y a qué dominio? ¿CORS configurado?
- [ ] Confirmar que el `@n8n/chat` SDK apunta solo a los webhooks esperados.
- [ ] Headers de seguridad del sitio (CSP, HSTS) — mejora, no bloqueante.

## 6. Cumplimiento y privacidad
- [ ] Datos de huéspedes (PII) almacenados en Google Sheets y Supabase: ¿hay base legal / política de privacidad publicada? (relevante para clientes en Europa — GDPR).
- [ ] ¿Los cold emails (W2/W3) cumplen con opt-out / CAN-SPAM / GDPR para outreach? Revisar que incluyan forma de baja.
- [ ] Retención: ¿se borran datos de prospectos/leads que pidieron baja?

## 7. Higiene operativa
- [ ] Workflows duplicados o `*-copy` / `*-fixed` que quedaron activos por error y podrían disparar acciones dobles.
- [ ] Workflows inactivos que aún tienen credenciales válidas (superficie innecesaria).
- [ ] Permisos del repo GitHub: colaboradores, deploy keys, secrets de Actions.

---

## Entregable del playbook
1. Tabla de hallazgos ordenada por severidad.
2. Top 3 acciones urgentes (si las hay) en lenguaje accionable.
3. Lista de "riesgos conocidos y aceptados" (ej. paneles sin auth) para no re-reportarlos como nuevos cada vez.
