# Playbook — Revisión de Infraestructura, Costos y Salud

**Objetivo:** controlar que la infra esté sana, los costos bajo control, los datos respaldados y nada por romperse silenciosamente (cuotas agotadas, tokens vencidos, ejecuciones fallidas). Atemporal.

**Modo de ejecución:** auditoría + actualización con OK sobre docs/config de plataforma. No rotar claves ni borrar recursos sin OK.

**Formato de salida:** por servicio → estado (✓/⚠/✗) · consumo/costo · riesgo · acción. Severidades 🔴/🟡/🟢.

---

## 1. n8n (motor de automatización)
- [ ] Plan vigente y costo mensual. ¿Estamos cerca de límites de ejecución?
- [ ] Ejecuciones fallidas recientes en TODOS los workflows (no solo marketing/ventas).
- [ ] Workflow "Error Notification" activo y avisando ante fallos.
- [ ] Versión de n8n vs. features esperadas (Publish/Save, MCP instance, AI Agent node).
- [ ] Workflows huérfanos/duplicados consumiendo recursos.

## 2. APIs externas — cuotas y costos
- [ ] **OpenAI:** gasto del período, modelos en uso, ¿cerca de algún cap?
- [ ] **Google Maps / Places:** consumo de W1, dentro de cuota gratuita/presupuesto.
- [ ] **Hunter.io:** créditos restantes (limita W2).
- [ ] Cualquier otra API de pago: revisar dashboard de facturación.
- [ ] ¿Algún costo creciendo de forma anómala? (loop, retry infinito, abuso).

## 3. Tokens y credenciales por expirar
- [ ] **LinkedIn access token** (expira ~60 días) — fecha de vencimiento y plan de refresh.
- [ ] OAuth de Gmail (matiidutlii@ y team@), Google Sheets, OneDrive de clientes — ¿siguen válidos?
- [ ] Telegram bot token, Calendly, Cloudflare/Netlify deploy — vigentes.
- [ ] Mapa de "qué se rompe si este token expira" para los críticos.

## 4. Hosting y deploy
- [ ] Cloudflare Pages (primario): último deploy OK, sin errores de build.
- [ ] Netlify (legacy): activo — NO desactivar (widget de Emma apunta ahí).
- [ ] Ambos apuntan al repo/branch correcto, auto-deploy ON.
- [ ] Dominio timelessai.pro: DNS, SPF/DKIM/DMARC vigentes (cruce con seguridad/marketing).
- [ ] Uptime del sitio y de los webhooks (¿responden?).

## 5. Datos y backups
- [ ] **Workflows n8n:** ¿hay export/backup reciente fuera de n8n? (los `.json` del repo, ¿están al día?).
- [ ] **Google Sheets internos** (conversaciones, CRM, weekly reports): ¿respaldados? ¿riesgo de borrado accidental?
- [ ] **Supabase:** plan, uso de almacenamiento, ¿backups habilitados?
- [ ] Punto único de fallo: si se pierde una cuenta de Google, ¿qué se cae?

## 6. MCP y herramientas internas
- [ ] n8n-mcp y n8n-instance conectados y funcionando.
- [ ] Descripciones en workflows clave para discovery del MCP instance (pendiente histórico).

---

## Acciones que este playbook PUEDE aplicar (con OK)
- Actualizar `infrastructure.md`/`status.md` si la realidad cambió.
- Proponer (no ejecutar sin OK) rotación de tokens, exports de backup, ajuste de planes.

## Entregable
1. Tabla servicio · estado · costo · riesgo.
2. 🔴 "Por romperse pronto" (tokens/cuotas) con fecha estimada.
3. Costo mensual total estimado de la infra + oportunidades de ahorro.
