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
- [x] **Landing page unificada** — index.html ES la demo cinematográfica (demo.html eliminado, una sola URL: `/`)
- [x] **Sistema de diseño unificado** — Cormorant Garamond + DM Sans + dorado `#c8912b` aplicado a index + onboarding (referencia: demo.html)
- [x] **W2 Outreach Email actualizado** — link `?hotel=` apunta a `/?hotel=` (no más demo.html)
- [x] **demo.html** — página interactiva con storytelling, chat simulado por tipo de negocio, pricing
- [x] **Migración a Cloudflare Pages** — timeless-site.pages.dev (sin límites de bandwidth)
- [x] **Reporte Semanal Silencioso** — acumula métricas en "Weekly Reports" sin enviar email a Ana
- [x] **Guest Journey (Silent)** — detecta check-ins/checkouts, loga acciones pendientes sin enviar mensajes
- [x] **Fix Reporte Semanal** — corregido para leer sheet correcto donde Emma loguea conversaciones
- [x] **Sistema de marketing completo** — W1 Lead Hunter + W2 Outreach + W3 Follow-up + W4 Content Generator + CRM Google Sheet
- [x] **W1 embudo arreglado y verificado** (2026-06-14) — Place Details captura website+teléfono, scoring reescrito excluye cadenas; publicado + corrida de prueba OK. Antes mandaba 0 emails por no capturar website.
- [x] **City auto-rotation en W1** — Split Cities Code node rotando 6 ciudades por ISO week (sin repetir ciudad la misma semana)
- [x] **W2 + W3 activados** — enviando cold emails y follow-ups automáticamente
- [x] **Email sequences actualizadas** — textos de W2 y W3 revisados de docs/business/Timeless_Outreach_Sequence.docx
- [x] **Mateo Reply Handler activo** (`L1Cd7ZGaJkIVJn85`) — Gmail trigger team@timelessai.pro, clasifica replies con OpenAI, speech por categoría (INFO/PRECIO/TIEMPO/CONFIANZA/DEMO/YA_TIENE/LLAMADA/COMPRA/NEGATIVO/GENERICO), alerta Telegram
- [x] **Fix NEGATIVO speech** — categorizaba mal; lógica de clasificación corregida
- [x] **Calendly configurado** — "Demo Timeless — 15 min", Lun–Vie 18–22 + Sáb 9–13 CET, link https://calendly.com/team-timelessai/30min
- [x] **LLAMADA speech con link real** — Mateo Reply Handler envía el link de Calendly automáticamente cuando prospect pide llamada
- [x] **Google Workspace + team@timelessai.pro** — Gmail activo, SPF/DKIM/DMARC configurados en timelessai.pro
- [x] **Documentación completa** — status.md, strategy.md, infrastructure.md, clients.md actualizados

## Próximas prioridades concretas (mayo 2026)
1. **Terminar rotación de keys** — ✅ W1 y W2 ya usan credenciales (`OpenAI W1W2` Header Auth + `Hunter W2` Query Auth), keys hardcodeadas removidas, OpenAI verificado con corrida de prueba. PENDIENTE: a) auditar si Mateo/W3/W4 usan la misma key OpenAI hardcodeada (`sk-...lKIA`) y migrarlos igual; b) recién ahí borrar la key vieja "Authorization" en platform.openai.com
2. **Monitorear primera corrida real del lunes** — embudo W1→W2 verificado por código y credenciales; confirmar que salgan emails con dominios reales (era el bloqueo de "0 enviados")
3. **Instagram business** — LinkedIn de Matías ya live; falta Instagram (ver strategy.md)
4. **Recontactar Ana** — con evidencia de Emma acumulada en Weekly Reports
5. **W3 senderName encoding** — "Mat?as ? Timeless" tiene caracteres corruptos, corregir UTF-8
5. **W2 campo apertura** — GPT genera apertura pero no se usa en el email; limpiar o integrar
6. **Ingestar horarios corregidos** — check-in/out de Sun Life desactualizados en KB de Emma
7. **Descripciones en workflows n8n** — Bot Demo, Panel API, Reporte Semanal para n8n-instance MCP
8. **Mover API keys a n8n Variables** — OpenAI, Hunter.io, Google Maps están hardcodeados en nodos

## Descubierto en investigación (mayo 2026)
Competidores directos: Conduit (líder, caro), HiJiffy (chat only), Asksuite (booking-focused), Akia (guest journey).
Nuestra ventaja: precio accesible para hoteles chicos (< 20 habitaciones) que no pueden pagar estas plataformas.
Diferenciadores a desarrollar: guest journey automation + unified inbox + auto-registro de leads.

El mercado hotelero está adoptando MCP como estándar para conectar PMS/channel managers a AI. Timeless está posicionado en el lugar correcto en el momento correcto — nuestra stack (n8n + MCP) es exactamente lo que el ecosistema está convergiendo hacia.

## Radar de mercado — mayo 2026 (ver `docs/radar-2026-05.md`)

Investigación de tendencias filtrada por "¿sirve a Timeless HOY?". Regla de filtro: el cuello de botella real es **adquisición**, no producto. Lo que toca a Emma (bot live de Ana) va al backlog — no se tocan workflows de cliente.

### 🔴 Accionar ya (bajo riesgo, ataca adquisición)
- [ ] **Pitch de WhatsApp** — integrar Co-Existence ("mismo número") + badge "Meta-compliant by design" en landing, deck y speech de Mateo. Spec lista en `docs/whatsapp-pitch-2026.md`. Cero código.
- [ ] **Self-serve onboarding / trial PLG** — trial de 5 pasos sin llamada de ventas (crear cuenta → subir FAQ → personalizar nombre → copiar widget → ver Emma responder). Es lo que escala sin depender de Ana/Matías. (radar 6.1)
- [ ] **Reranking en el demo Hotel Patagonia** — Cohere Rerank free tier como 2da etapa sobre pgvector. Sube precisión ~70%→90%. Testear en el sandbox Patagonia, validar, recién después llevar a clientes. (radar 4.1)

### 🟡 Pronto (preparar / messaging)
- [ ] Campo `bsuid` en CRM + tabla de leads Supabase (WhatsApp BSUID llega mid-2026). (radar 5.2)
- [ ] HNSW index en tablas de embeddings nuevas (gratis, prepara escala). (radar 4.2)
- [ ] Verificar versión de nuestra instancia n8n vs 2.0 (Publish/Save → staging de flujos de cliente). (radar 3.1)
- [ ] Messaging "Google Sheets = puente universal, onboarding <24h sin API del PMS" como fortaleza vs PMS legacy. (radar 2.2)
- [ ] Monitorear MCP servers de PMS (Apaleo ya live en alpha; Mews/Cloudbeds es cuestión de tiempo). (radar 2.1, 2.3)
- [ ] Prototipar WhatsApp Flow "disponibilidad + dejar contacto" (compite con Asksuite). (radar 5.3)

### 🟢 Backlog "cuando haya 3-5 clientes activos" (build-ahead-of-demand)
- [ ] Migrar a Claude (Opus 4.8 / Sonnet 4.6) + prompt caching — **probar primero en el demo Hotel Patagonia.** Emma de Ana corre sobre OpenAI/GPT; ese cambio solo se aplica al bot live de un cliente con su OK. El sandbox se toca libre. (radar 1.1, 1.5)
- [ ] Guest Memory Layer con Claude Managed Agents Memory (memoria persistente de huéspedes). Requiere re-arquitectura fuera de n8n + volumen real para testear. (radar 1.2)
- [ ] HITL nativo en AI Agent node para acciones sensibles (cancelaciones, descuentos). Safety layer del pitch. (radar 3.2)
- [ ] Voice AI piloto con Vapi (~$0.05-0.10/min) — diferenciador de Conduit. (radar 5.5)

### Alerta competitiva
Conduit hace content marketing agresivo (artículo "7 Best AI Guest Communication Platforms 2026") apuntando a nuestras keywords, diferenciándose por Voice AI. No es nuestra pelea con 1 cliente pausado, pero confirma voz como próximo diferenciador natural.
