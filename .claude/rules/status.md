# Estado Actual — Timeless (actualizado mayo 2026)

## ¿Dónde estamos parados?

Timeless tiene un cliente activo (Sun Life Beach Hotel), infraestructura completa de plataforma, y una demo interactiva lista para adquisición. El foco actual es conseguir nuevos clientes sin depender de Ana.

---

## Lo que está LIVE hoy

### Hosting
| URL | Descripción | Plataforma |
|-----|-------------|------------|
| `timeless-site.pages.dev` | Sitio principal — **primario** | Cloudflare Pages |
| `chic-begonia-1708bb.netlify.app` | Legacy — NO desactivar (Emma de Ana apunta acá) | Netlify |

### Páginas deployadas
| Archivo | URL | Estado |
|---------|-----|--------|
| `index.html` | `/` | Live — landing page principal (ES LA DEMO cinematográfica) |
| `onboarding.html` | `/onboarding.html` | Live — form multi-step 6 tipos de negocio |
| `chat-sunlife.html` | `/chat-sunlife.html` | Live — Emma para Ana |
| `panel-sunlife.html` | `/panel-sunlife.html` | Live — panel para Ana |
| `dashboard-sunlife.html` | `/dashboard-sunlife.html` | Live — dashboard con demo data |

> `demo.html` eliminado (2026-05-17) — su contenido pasó a ser `index.html`. Links con `?hotel=` apuntan a `/?hotel=`.

### Emma (Bot de Ana)
- **URL pública:** https://chic-begonia-1708bb.netlify.app/chat-sunlife.html
- **Instalada en:** sunlifebeachhotel.com ✓ (via widget)
- **Estado:** Activa, respondiendo consultas reales
- **Logs:** Google Sheet `1P4iarHax1XdZDlw-oioJ1sxIqY77Rm_ACe8hCm2bwyM` → pestaña "Conversations (Emma)"

---

## Workflows n8n activos

### Marketing y ventas (sistema Mateo)
| Workflow | ID | Estado | Descripción |
|----------|----|--------|-------------|
| Timeless — Lead Hunter | `uhtAIR0uKDxPzVXn` | ✓ Activo | Google Maps → Place Details (captura website+tel) → AI scoring (excluye cadenas) → CRM. City rotation (ISO week). Embudo arreglado, publicado y verificado con corrida de prueba 2026-06-14 ✅ |
| Timeless — Outreach Email | `RJArwDBVO9X9GbAp` | ✓ Activo | Hunter.io → cold email personalizado desde matiidutlii@gmail.com |
| Timeless — Follow-up Bot | `DG1KRnNlMewrbZW9` | ✓ Activo | Secuencia 4 toques a prospectos sin respuesta |
| Timeless — Mateo Reply Handler | `L1Cd7ZGaJkIVJn85` | ✓ Activo | Gmail trigger team@timelessai.pro → clasifica reply → speech → Telegram |
| Timeless — Content Generator | `LnDGBsIJStSGp0os` | ✓ Activo | Posts LinkedIn/Instagram (Parte A) + auto-publica aprobados (Parte B) |
| Timeless — Unsubscribe (Baja) | `Rl85GmT7EnStTyIY` | ✓ Activo | Webhook de baja → suprime contacto. Wired a `baja.html` (creado 2026-06-13) |

> **Suite "AI Sales Agent" (inactiva):** existen en n8n 4 workflows `Timeless — AI Sales Agent (Monitor / Demo Generator / Daily Digest / Cleanup)` — un sistema de ventas anterior, reemplazado por el sistema Mateo. Todos `active: false`. Conservar como referencia o archivar.

### Plataforma (todos los clientes)
| Workflow | ID | Estado | Descripción |
|----------|----|--------|-------------|
| Timeless — Onboarding v2 | `WySJmWJPvWbFUwXx` | ✓ Activo | Form → ingest KB → smoke test → email |
| Timeless — Status Endpoint | `JF7LKuT4TGO6x4Fo` | ✓ Activo | Polling de estado de onboarding |
| Timeless — Ingesta de documentos | `61BW87IVFtBdLEdU` | ✓ Activo | Ingest RAG a Supabase |
| Timeless — Error Notification | `XnfBtmWah9W0TXfj` | ✓ Activo | Alertas de errores |

### Sun Life Beach Hotel
| Workflow | ID | Estado | Descripción |
|----------|----|--------|-------------|
| Sunlife — Bot Demo | `6tGhMpKls5NbFgCF` | ✓ Activo | Chat principal de Emma |
| Sunlife — Panel API | `2v2fI1emw91k5Hh3` | ✓ Activo | API para el dashboard |
| Sunlife — Reporte Semanal | `lEzgYNVXVP7m9HkG` | ⏸ Inactivo | Email lunes 8am a Ana (apagado mientras Ana está pausada — corre el Silencioso en su lugar) |
| Sunlife — Reporte Semanal Silencioso | `JoNrXeN1GgvRGQeJ` | ✓ Activo | Guarda resumen en "Weekly Reports" sin email a Ana |
| Sunlife — Guest Journey (Silent) | `EuW7N0FwaIrb0sS7` | ✓ Activo | Detecta check-ins/checkouts, loga en "Guest Journey Log" sin enviar mensajes |
| Emma — Bot Demo (OneDrive) | `Cy3Rlw7xDRFvm7mh` | ⏸ Inactivo | Versión con Excel/OneDrive — pendiente credenciales OAuth de Ana |

---

## Salud de infraestructura (revisión 2026-06-14)
- ✅ 0 ejecuciones fallidas/crashed desde 2026-05-31. Sitios (timelessai.pro, pages.dev, netlify) + webhook de status responden 200.
- ✅ **Error Notification** cableado (2026-06-14) como "Error Workflow" en 7 de plataforma/marketing: Lead Hunter, Outreach, Follow-up, Content Generator, Mateo, Ingesta, Status Endpoint. **Onboarding v2** quedó sin cablear a propósito (estado intencional del usuario — no tocar). No se tocaron Sun Life ni los Bot Demos de cliente.
- 🟡 **Backups desfasados:** solo 5 `.json` commiteados en `n8n-workflows/`; los workflows editados el 14/6 (Lead Hunter, Outreach, Content Generator, Mateo) no están exportados al repo.
- 🟡 **Credenciales n8n:** 21 totales, ~14 sin uso en 90d, 2 huérfanas, 7 de OpenAI → consolidar (reduce confusión sobre cuál key borrar + superficie de ataque).
- 🟡 **Seguridad:** 12 webhooks sin autenticación (Panel API ×6, onboarding, status, baja, ingesta). Secrets hardcodeados en Bot Demos — ver roadmap prioridad #1.
- 💰 **Costo fijo conocido ~$28/mes** (n8n $20 + Google Workspace $7 + dominio ~$1.25). OpenAI / Hunter.io / Google Maps: usage-based, revisar dashboards de billing (no medibles vía API).

---

## Calendly
- **Evento:** "Demo Timeless — 15 min" — 15 minutos
- **Disponibilidad:** Lun–Vie 18:00–22:00 + Sáb 09:00–13:00 (CET)
- **Link:** https://calendly.com/team-timelessai/30min
- **Integrado en:** Mateo Reply Handler → speech LLAMADA

---

## Infraestructura técnica

### MCP Servers (Claude Code — scope local proyecto timeless)
| Server | Estado | Uso |
|--------|--------|-----|
| n8n-mcp | ✓ Conectado | Construir workflows con lenguaje natural |
| n8n-instance | ✓ Conectado | Ejecutar workflows existentes como tools |

### Google Sheets internos (Timeless, no de Ana)
- **Conversaciones + reportes Sun Life:** `1P4iarHax1XdZDlw-oioJ1sxIqY77Rm_ACe8hCm2bwyM`
  - Pestaña "Conversations (Emma)" — logs de Emma
  - Pestaña "Weekly Reports" — reportes semanales silenciosos
  - Pestaña "Guest Journey Log" — acciones pendientes de guest journey
  - Pestaña "Reservations" — placeholder para datos de Ana

### Datos de Ana (Sun Life)
- **Excel local (copia):** `C:\Users\user\Desktop\Proyectos\Sunlife\SunLife_Reservas.xlsx`
  - Hojas: Reservation Grid, Reservations, Conversations (Emma), How to Use
  - Es una copia estática — el archivo vivo está en su OneDrive
- **Excel live:** OneDrive de Ana — pendiente acceso OAuth2 en n8n

---

## Bloqueos activos

| Bloqueo | Impacto | Resolución |
|---------|---------|------------|
| Ana no disponible | No se puede conectar datos reales | Recontactar — ver mensaje en `clients.md` |
| OneDrive sin autorizar | Dashboard con demo data, Guest Journey sin disparar | Ana hace OAuth en n8n → activar `Emma — Bot Demo (OneDrive)` |
| Sin WhatsApp del hotel | Sin canal WhatsApp para Emma | Ana da número cuando retome |
| Check-in/out desactualizado en KB | Emma responde horarios incorrectos | Ingestar texto corregido via webhook Supabase |

---

## Repo GitHub
- **Repo:** `dutlimatias-boop/timeless-site`
- **Branch producción:** `main`
- **Auto-deploy:** Cloudflare Pages (push a main → deploy en ~30 segundos)
