# Active Clients

| Client | Local folder | client_id | Notes |
|--------|-------------|-----------|-------|
| Sun Life Beach Hotel | `C:\Users\user\Desktop\Proyectos\Sunlife` | `sunlife_beach_hotel` | First client — Ana (FL, USA). **PAUSADO** — Ana no disponible por temas personales. |

## ⚠️ Aclaración clave: cliente vs. plataforma vs. demo

- **Intocable = solo lo que es propiedad real de un cliente.** Para Sun Life: los datos de Ana, su KB live, el bot Emma que responde en sunlifebeachhotel.com. No se modifican sin ella.
- **El trabajo de Timeless ES Timeless.** Plataforma, templates, workflows propios, marketing, onboarding — se trabajan con total libertad. NO aplicar la regla "intocable" a todo lo que diga "hotel".
- **Hotel Patagonia = workflow DEMO/sandbox de Timeless.** Es nuestro entorno para construir y testear features (reranking, migración de modelo, nuevos flujos) ANTES de llevarlas a un cliente real. Se toca libremente — no es un cliente.

## Sun Life — n8n Workflows

| Workflow | ID | Estado | Descripción |
|----------|----|--------|-------------|
| Sunlife — Bot Demo | `6tGhMpKls5NbFgCF` | ✓ Activo | Chat principal de Emma — webhook + RAG + logs a Sheets |
| Sunlife — Panel API | `2v2fI1emw91k5Hh3` | ✓ Activo | Lee Google Sheets → JSON para el dashboard |
| Sunlife — Reporte Semanal | `lEzgYNVXVP7m9HkG` | ⏸ Inactivo | Email lunes 8am a Ana — apagado mientras Ana está pausada (corre el Silencioso) |
| Sunlife — Reporte Semanal Silencioso | `JoNrXeN1GgvRGQeJ` | ✓ Activo | Guarda resumen en "Weekly Reports" sin email |
| Sunlife — Guest Journey (Silent) | `EuW7N0FwaIrb0sS7` | ✓ Activo | Detecta check-ins/checkouts, loga acciones pendientes |
| Emma — Bot Demo (OneDrive) | `Cy3Rlw7xDRFvm7mh` | ⏸ Inactivo | Versión Excel/OneDrive — pendiente OAuth2 de Ana |

## Sun Life — Google Sheets

- **Sheet interno (Timeless):** `1P4iarHax1XdZDlw-oioJ1sxIqY77Rm_ACe8hCm2bwyM`
  - Pestaña "Conversations (Emma)" — logs de Emma
  - Pestaña "Weekly Reports" — reportes silenciosos
  - Pestaña "Guest Journey Log" — acciones pendientes de guest journey
  - Pestaña "Reservations" — placeholder para datos de reservas
- **Excel local (copia):** `C:\Users\user\Desktop\Proyectos\Sunlife\SunLife_Reservas.xlsx`
  - Copia estática — archivo vivo está en OneDrive de Ana

## Sun Life — URLs

| Página | URL |
|--------|-----|
| Chat Emma (live) | https://chic-begonia-1708bb.netlify.app/chat-sunlife.html |
| Panel Ana | https://chic-begonia-1708bb.netlify.app/panel-sunlife.html |
| Dashboard | https://chic-begonia-1708bb.netlify.app/dashboard-sunlife.html |
| Emma en sitio de Ana | https://sunlifebeachhotel.com (via widget instalado) |

## Sun Life — bloqueos actuales

| Bloqueo | Impacto | Resolución |
|---------|---------|------------|
| Ana no disponible | No se puede conectar datos reales | Recontactar con evidencia de Emma (conversaciones acumuladas) |
| OneDrive sin autorizar | Dashboard con demo data, Guest Journey sin disparar | Ana hace OAuth en n8n → activar `Emma — Bot Demo (OneDrive)` |
| Sin WhatsApp del hotel | Sin canal WhatsApp para Emma | Ana da número cuando retome |
| Check-in/out desactualizado en KB | Emma responde horarios incorrectos | Ingestar texto corregido via webhook Supabase |

**Regla:** No avanzar con nuevas implementaciones de Sun Life hasta restablecer contacto con Ana.
