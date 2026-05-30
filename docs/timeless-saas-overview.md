# Timeless — Cómo funciona la SaaS (de punta a punta)

**Última actualización:** 2026-05-30
**Para:** Matías (referencia interna, pitch, onboarding de equipo)

---

## Qué es Timeless

Timeless es una SaaS de automatización con IA para hoteles boutique, restaurantes, clínicas y negocios chicos (4–30 unidades). Le da a cada cliente un **asistente virtual con su nombre y personalidad** que atiende consultas 24/7, captura leads, y le manda un reporte semanal al dueño. Todo sobre una infraestructura compartida — el cliente no ve ninguno de los sistemas detrás.

**Precio:** desde $79/mes + setup fee $200–500 único.
**Stack:** n8n · Supabase (pgvector) · OpenAI · Google Sheets · Cloudflare/Netlify · GitHub

---

## El viaje completo: de stranger a cliente activo

```
Stranger → Ve la demo → Completa el onboarding → Recibe su bot → Se convierte en cliente
```

### PASO 1 — Descubrimiento
El prospecto llega por:
- Cold email automatizado (W2 Outreach, martes 10am)
- LinkedIn/Instagram (manual por ahora)
- Referidos

El mail lo lleva a la **landing page** (`timeless-site.pages.dev`) que ES la demo: storytelling cinematográfico + chat en vivo con un bot de ejemplo (Sofía del Hotel Patagonia).

---

### PASO 2 — Captación automatizada (Lead Hunter → Outreach)

**W1 — Lead Hunter** (lunes 8am, automático):
1. Consulta Google Maps buscando hoteles boutique en una ciudad (rotación de 6 ciudades por semana ISO)
2. OpenAI puntúa cada prospecto (score de 1–10 según reviews, tamaño, presencia digital)
3. Solo los que sacan ≥7 van al CRM (Google Sheet "Timeless — CRM Maestro", pestaña Prospectos)

**W2 — Outreach Email** (martes 10am, automático):
1. Lee los prospectos nuevos del CRM
2. Hunter.io busca el email del dueño
3. OpenAI genera el asunto personalizado
4. Gmail manda el cold email con link `/?hotel=NombreHotel` (abre la demo con el contexto del hotel)

**W3 — Follow-up Bot** (diario 9am, automático):
- Secuencia de 4 toques automáticos a los que no respondieron: día 1, 5, 12, 30

---

### PASO 3 — Manejo de respuestas (Mateo + Sales Agent)

Cuando un prospecto responde al email:

**Mateo Reply Handler** (trigger Gmail, inmediato):
- Detecta el reply en `team@timelessai.pro`
- OpenAI clasifica la intención: QUIERE_DEMO / PRECIO / CONFIANZA / NEGATIVO / etc.
- Te manda un speech personalizado por Telegram para que respondas vos
- Maneja el link de Calendly automáticamente cuando piden una llamada

**AI Sales Agent Monitor** (en revisión — ver nota abajo):
- Corre cada 5 minutos, responde automáticamente por categoría
- ⚠️ Actualmente en conflicto con Mateo — se está unificando en un sistema híbrido

**🔧 Sistema híbrido planeado (próxima mejora):**
Mateo como único receptor → clasifica → si es QUIERE_DEMO dispara el Demo Generator automáticamente → te alerta por Telegram del resultado. Mateo maneja todo por evento (no por cron), Salesforce Agent se apaga.

---

### PASO 4 — Generación de demo personalizada

**AI Sales Agent (Demo Generator)** — inactivo, en preparación:

Cuando el prospecto confirma querer una demo, se dispara automáticamente:
1. Webhook recibe datos del prospecto (nombre del hotel, web, email)
2. Lee datos del CRM
3. Scrapea el sitio web del hotel
4. GPT sintetiza el contexto del negocio
5. Claude genera la **Knowledge Base personalizada** con info del hotel
6. La ingesta a Supabase (RAG listo)
7. Genera el **dashboard HTML** personalizado con colores y nombre del hotel
8. Lo pushea a GitHub → Cloudflare lo deploya en ~30 segundos
9. Espera el deploy
10. Manda un email al prospecto con su demo lista (bot + dashboard)
11. Actualiza el CRM con el link de la demo

**Resultado:** el prospecto recibe, en minutos, un bot con su nombre, conocimiento de su negocio, y un dashboard funcional. Sin intervención manual.

---

### PASO 5 — Demo y cierre

El prospecto interactúa con su propio bot personalizado. Si quiere seguir:
- Agenda una llamada vía Calendly (link automático en el speech de Mateo)
- Completa el formulario de onboarding oficial

---

### PASO 6 — Onboarding oficial (automático)

**Timeless — Onboarding v2** (`onboarding.html` → webhook):
1. Prospecto completa el form multi-step (6 tipos de negocio: hotel, clínica, beauty, restaurante, inmobiliaria, otro)
2. n8n recibe el payload
3. Ingesta la Knowledge Base a Supabase con `client_id` único
4. Smoke test del bot (pregunta de prueba → verifica respuesta)
5. Email de bienvenida al cliente con link al chat y panel
6. El status se actualiza en tiempo real en el form (polling cada 4s)

**Post-onboarding manual (hoy):**
- Duplicar workflows de n8n (Bot + Panel API + Reporte Semanal)
- Crear Google Sheet de conversaciones
- Crear páginas branded (`panel-[client].html`, `chat-[client].html`)
- Pushear a GitHub → deploy automático

> 🔧 Objetivo: automatizar estos pasos post-onboarding (están en roadmap).

---

### PASO 7 — Servicio en producción (valor continuo)

**Bot del cliente** (activo 24/7):
- Huésped escribe en el chat del sitio web
- n8n recibe el mensaje via webhook
- OpenAI embeds la consulta → búsqueda de similitud en Supabase (RAG)
- Los chunks más relevantes se mandan como contexto al LLM
- El bot responde en el idioma del huésped, con la personalidad del negocio
- La conversación se loguea en Google Sheets del cliente

**Reporte Semanal** (automático, lunes 8am):
- Cuenta conversaciones de la semana
- Extrae intenciones más frecuentes
- Cuenta leads capturados
- Manda email de resumen al dueño

**Panel de gestión** (`panel-[client].html`):
- Tabla con todas las conversaciones
- Filtros por estado/intención
- Vista en tiempo real

**Dashboard** (`dashboard-[client].html`):
- Tab "My Day": calendario interactivo con tareas/huéspedes del día
- Tab "Weekly Summary": métricas, gráfico de mensajes, preguntas frecuentes

---

## Mapa de workflows n8n activos (producción)

### 🔵 Plataforma (compartidos, todos los clientes)
| Workflow | Trigger | Estado |
|----------|---------|--------|
| Timeless — Lead Hunter | Lunes 8am | ✅ Activo |
| Timeless — Outreach Email | Martes 10am | ✅ Activo |
| Timeless — Follow-up Bot | Diario 9am | ✅ Activo |
| Timeless — Mateo Reply Handler | Gmail event | ✅ Activo |
| Timeless — Content Generator | Viernes 10am | ✅ Activo (pendiente perfiles RRSS) |
| Timeless — Onboarding v2 | POST webhook | ✅ Activo |
| Timeless — Status Endpoint | GET webhook | ✅ Activo |
| Timeless — Ingesta de documentos | POST webhook | ✅ Activo |
| Timeless — Error Notification | Error trigger | ✅ Activo |
| Timeless — AI Sales Agent (Monitor) | Cada 5 min | ⚠️ Activo — EN REVISIÓN (conflicto con Mateo, cron costoso) |
| Timeless — AI Sales Agent (Daily Digest) | Schedule | ✅ Activo |
| Timeless — AI Sales Agent (Cleanup) | Schedule | ✅ Activo |
| Timeless — AI Sales Agent (Demo Generator) | Webhook | ⏸ Inactivo — listo para activar y testear |

### 🟢 Sun Life Beach Hotel (cliente activo, pausado)
| Workflow | Estado | Nota |
|----------|--------|------|
| Sunlife — Bot Demo | ✅ Activo | Emma responde en sunlifebeachhotel.com |
| Sunlife — Panel API | ✅ Activo | Dashboard de Ana |
| Sunlife — Reporte Semanal | ⏸ Pausado | Pausado — Ana no disponible; el silencioso sigue acumulando |
| Sunlife — Reporte Semanal Silencioso | ✅ Activo | Acumula métricas sin molestar a Ana |
| Sunlife — Guest Journey (Silent) | ✅ Activo | Detecta check-ins/outs, loga sin disparar |
| Emma — Bot Demo (OneDrive) | ⏸ Inactivo | Pendiente OAuth2 de Ana |

### 🧪 Sandbox / Demo (Patagonia — plataforma, se toca libre)
| Workflow | Estado | Nota |
|----------|--------|------|
| Hotel Patagonia - Bot Demo | ✅ Activo | Con reranking Cohere — a testear 1 jun |
| Hotel Patagonia - Bot Demo (Claude test) | ⏸ Inactivo | A/B vs GPT — a testear 1 jun |
| Hotel Patagonia - RAG Rerank | ⏸ Inactivo | Sub-workflow del reranking |
| Panel - Hotel Patagonia API | ✅ Activo | Demo panel |

### ⚫ Demos legacy (desactivados — no borrar)
Restaurante, Beauty, Clínica, Inmobiliaria bots, reportes y panels — desactivados, quedan como referencia.

---

## Consumo de ejecuciones (referencia)

| Workflow | Frecuencia | Ejec/mes aprox |
|----------|-----------|----------------|
| AI Sales Agent Monitor | Cada 5 min | ~8.640 ⚠️ |
| Follow-up Bot | Diario | ~30 |
| Lead Hunter | Semanal | ~4 |
| Outreach Email | Semanal | ~4 |
| Emma respuestas | Por evento | Variable |
| Mateo Reply Handler | Por evento | Variable |
| **TOTAL estimado** | | **>9.000/mes** |

> Plan actual: 2.500/mes. **El Monitor solo ya lo revienta.** Hay que cambiar su trigger a evento o subir de plan antes de soltar los agentes.

---

## Pendientes críticos antes de soltar los agentes

1. 🔴 **Apagar/reemplazar AI Sales Agent Monitor** (cron cada 5 min → trigger por evento)
2. 🔴 **Activar y testear Demo Generator** — sin esto no hay demo automática
3. 🟡 **Verificar que Mateo no se pise con Monitor** durante la transición
4. 🟡 **Stripe o link de cobro** — para cuando alguien quiera pagar
5. 🟡 **A/B test Patagonia** (1 junio) — validar reranking + Claude

---

## Infraestructura

| Servicio | Uso | Costo |
|---------|-----|-------|
| n8n Cloud | Todos los workflows | $20/mes |
| Supabase | Vector DB (pgvector) | Free tier |
| OpenAI | Embeddings + chat | Pay per use |
| Anthropic | Claude (sandbox) | $10 créditos |
| Cohere | Reranking | Free tier |
| Cloudflare Pages | Hosting primario | Gratis |
| Netlify | Legacy (Emma de Ana) | Gratis |
| GitHub | Repo | Gratis |
| Google Workspace | team@timelessai.pro | ~$6/mes |
| Hunter.io | Emails de prospectos | Free tier |
| Calendly | Demos | Free tier |
