# n8n — Timeless Unsubscribe (webhook de baja)

Registra las bajas que llegan desde `baja.html` y deja la lista lista para suprimir en W2/W3.
Estado: **workflow CONSTRUIDO en n8n (inactivo)** — ID `Rl85GmT7EnStTyIY`. Validado ✓ (0 errores). Frontend `baja.html` live en ambos hosts.

## Para activarlo (3 pasos manuales)
1. **Crear la pestaña "Bajas"** en el CRM Maestro (headers fila 1: `Email` · `Fecha` · `Origen`).
2. En el nodo **"Registrar Baja"** → seleccionar la credencial **Google Sheets Timeless** (se creó sin credencial asignada).
3. Confirmar que `GOOGLE_SHEET_ID` está en n8n → Settings → Variables, y **activar** el workflow (toggle Active).
   - Probar: abrir `https://timeless-site.pages.dev/baja.html?e=prueba@test.com` → debe aparecer una fila en "Bajas".

## Qué hace
`baja.html` hace `POST` a este webhook con `{ email, source, ts }` → el workflow agrega una fila a la pestaña **"Bajas"** del CRM → responde 200.

## Prerequisitos (manual, 1 vez)
1. En el Google Sheet **CRM Maestro**, crear una pestaña nueva **`Bajas`** con estos encabezados en la fila 1:
   | Email | Fecha | Origen |
   |-------|-------|--------|
2. Tener la credencial **"Google Sheets Timeless"** (ya existe en n8n).

## Workflow (3 nodos)

### 1. Webhook (trigger)
- Type: `n8n-nodes-base.webhook`
- **HTTP Method:** `POST`
- **Path:** `unsubscribe`
- **Respond:** `Using Respond to Webhook node`
- URL pública resultante: `https://YOUR-N8N-INSTANCE/webhook/unsubscribe` (coincide con la constante `WEBHOOK` en `baja.html`)

### 2. Google Sheets — Append Row
- Type: `n8n-nodes-base.googleSheets` (v4)
- **Resource:** Sheet Within Document · **Operation:** Append Row
- **Document:** por ID → expresión `={{ $env.GOOGLE_SHEET_ID }}` (o seleccionar el CRM Maestro de la lista)
- **Sheet:** `Bajas`
- **Mapping:** Map Each Column Manually
  - `Email`  → `={{ $json.body.email }}`
  - `Fecha`  → `={{ $now.toFormat('dd/MM/yyyy HH:mm') }}`
  - `Origen` → `={{ $json.body.source || 'baja.html' }}`
- **Credential:** Google Sheets Timeless

### 3. Respond to Webhook
- Type: `n8n-nodes-base.respondToWebhook` (typeVersion 1.5)
- **Respond With:** `Text`
- **Response Body:** `OK`
- (CORS: si el navegador bloquea, agregar en el nodo Webhook → Options → Response Headers: `Access-Control-Allow-Origin: *`. La página igual confirma la baja al usuario aunque el POST falle, así que no es bloqueante.)

**Conexiones:** Webhook → Google Sheets → Respond to Webhook.

## Activación
- Guardar y **activar** el workflow (toggle Active).
- Probar: abrir `https://timeless-site.pages.dev/baja.html?e=prueba@test.com` → debe aparecer una fila en la pestaña "Bajas".

## Supresión en W2/W3 — HECHO ✅ (2026-06-14)
Implementado en ambos workflows live (incremental, sin tocar la lógica existente):
- **W2 (Outreach `RJArwDBVO9X9GbAp`):** nodo `Get Bajas` (lee pestaña "bajas") en paralelo al trigger + nodo `Filtrar bajas` (Code) insertado en la rama "sí" de "Email encontrado?", antes de OpenAI. Filtra por `_hunterEmail`/`to_email`.
- **W3 (Follow-up `DG1KRnNlMewrbZW9`):** mismo `Get Bajas` + `Filtrar bajas` insertado entre "Code - calcular días" y el "IF" (cubre los 4 toques de una). Filtra por columna `Email encontrado`.
- Ambos `Filtrar bajas` son **fail-open** (si no se puede leer la lista, no bloquean el envío) y con lista vacía son pass-through inofensivo.
- **Verificación:** estructura confirmada en ambos. La prueba runtime real ocurre en la próxima corrida programada (W3 diario 9am, W2 martes 10am) porque ejecutar manualmente dispararía envíos reales.

## Link de baja en emails — HECHO ✅ (2026-06-14)
W2 (Construir cuerpo) y W3 (Toques 1/2/3) ahora linkean a `https://timeless-site.pages.dev/baja.html?e={{email}}` (en vez del `mailto:?subject=BAJA` viejo). Esto **cierra el loop**: un prospecto que se da de baja desde el email ahora SÍ queda registrado en la pestaña "bajas", y la supresión lo filtra en la próxima corrida. Toque 4 (el último) mantiene opt-out blando "me avisa y listo".
Precio EU corregido de $79 → $99 en W3 Toque 2 (LATAM sigue $49), vía regex de "Ciudad / País".

## Pendiente (mejora opcional)
- Header `List-Unsubscribe` en los nodos Gmail (one-click unsubscribe nativo de Gmail/Outlook, mejora deliverability).
- **Discrepancia de timing:** W3 dispara los toques a los días **3/7/14/30**, pero el copy v2 (`docs/outreach-sequence.md`) dice **1/5/12/30**. Decisión estratégica pendiente — no se cambió.
- Email 4 (W3 Toque 3) usa el fallback genérico, no el dato "60%" que el usuario quería mantener. Cambio menor de wording si se quiere.
