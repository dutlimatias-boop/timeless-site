# Roadmap

## Platform
- [ ] Automatic client onboarding workflow
- [ ] Multi-language support (English + Spanish)
- [ ] Stripe payment integration
- [ ] Panel authentication (login per client)
- [ ] WhatsApp Business integration template
- [ ] Unified inbox: WhatsApp + web chat + email en un solo lugar (como Conduit)

## Per-client (build once, reuse)
- [ ] Bot checks availability from Google Sheets before responding
- [ ] Notify owner when booking request arrives (email or WhatsApp)
- [ ] SiteMinder API integration for real-time availability
- [ ] **Guest journey automation** — mensajes automáticos en 3 momentos clave:
  - Pre-arrival: 1 día antes del check-in ("Te esperamos mañana")
  - Check-in day: bienvenida con info útil (WiFi, parking, horarios)
  - Post-stay: 2 días después del checkout (pedir review en Google/TripAdvisor)
- [ ] Agregar campo `guest_email` y `guest_phone` a Google Sheets para habilitar guest journey
- [ ] Review request automation post-stay (Google Reviews / TripAdvisor)
- [ ] Migrate Bot Demo to n8n AI Agent node (memoria nativa, menos nodos, más robusto)
- [ ] Emma v2: calificación de leads proactiva (pregunta fechas/habitación/personas desde primer mensaje)
- [ ] Auto-register lead en Google Sheets desde primer mensaje de interés (sin intervención del owner)

## Completado (mayo 2026)
- [x] **demo.html** — página interactiva con storytelling, chat simulado por tipo de negocio, pricing
- [x] **Migración a Cloudflare Pages** — timeless-site.pages.dev (sin límites de bandwidth)
- [x] **Reporte Semanal Silencioso** — acumula métricas en "Weekly Reports" sin enviar email a Ana
- [x] **Guest Journey (Silent)** — detecta check-ins/checkouts, loga acciones pendientes sin enviar mensajes
- [x] **Fix Reporte Semanal** — corregido para leer sheet correcto donde Emma loguea conversaciones
- [x] **Documentación completa** — status.md, strategy.md, infrastructure.md, clients.md actualizados

## Próximas prioridades concretas (mayo 2026)
1. **Perfiles de adquisición** — LinkedIn personal + Instagram business (ver strategy.md)
2. **Recontactar Ana** — con evidencia de Emma acumulada en Weekly Reports
3. **Descripciones en workflows n8n** — Bot Demo, Panel API, Reporte Semanal necesitan descripción para n8n-instance MCP
4. **Ingestar horarios corregidos** — check-in/out de Sun Life desactualizados en KB de Emma
5. **Review request automation** — trigger post-checkout, email a Google Reviews / TripAdvisor

## Descubierto en investigación (mayo 2026)
Competidores directos: Conduit (líder, caro), HiJiffy (chat only), Asksuite (booking-focused), Akia (guest journey).
Nuestra ventaja: precio accesible para hoteles chicos (< 20 habitaciones) que no pueden pagar estas plataformas.
Diferenciadores a desarrollar: guest journey automation + unified inbox + auto-registro de leads.

El mercado hotelero está adoptando MCP como estándar para conectar PMS/channel managers a AI. Timeless está posicionado en el lugar correcto en el momento correcto — nuestra stack (n8n + MCP) es exactamente lo que el ecosistema está convergiendo hacia.
