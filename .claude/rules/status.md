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
| `index.html` | `/` | Live |
| `demo.html` | `/demo.html` | Live — demo interactiva con chat simulado |
| `onboarding.html` | `/onboarding.html` | Live — form multi-step 6 tipos de negocio |
| `chat-sunlife.html` | `/chat-sunlife.html` | Live — Emma para Ana |
| `panel-sunlife.html` | `/panel-sunlife.html` | Live — panel para Ana |
| `dashboard-sunlife.html` | `/dashboard-sunlife.html` | Live — dashboard con demo data |

### Emma (Bot de Ana)
- **URL pública:** https://chic-begonia-1708bb.netlify.app/chat-sunlife.html
- **Instalada en:** sunlifebeachhotel.com ✓ (via widget)
- **Estado:** Activa, respondiendo consultas reales
- **Logs:** Google Sheet `1P4iarHax1XdZDlw-oioJ1sxIqY77Rm_ACe8hCm2bwyM` → pestaña "Conversations (Emma)"

---

## Workflows n8n activos

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
| Sunlife — Reporte Semanal | `lEzgYNVXVP7m9HkG` | ✓ Activo | Email lunes 8am (corregido — lee sheet correcto) |
| Sunlife — Reporte Semanal Silencioso | `JoNrXeN1GgvRGQeJ` | ✓ Activo | Guarda resumen en "Weekly Reports" sin email a Ana |
| Sunlife — Guest Journey (Silent) | `EuW7N0FwaIrb0sS7` | ✓ Activo | Detecta check-ins/checkouts, loga en "Guest Journey Log" sin enviar mensajes |
| Emma — Bot Demo (OneDrive) | `Cy3Rlw7xDRFvm7mh` | ⏸ Inactivo | Versión con Excel/OneDrive — pendiente credenciales OAuth de Ana |

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
