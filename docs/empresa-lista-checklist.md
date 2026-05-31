# 🏢 Empresa Lista — Checklist Completo
**Timeless AI | Última actualización:** 2026-05-31
**Propósito:** Todo lo que debe estar en orden ANTES de activar los agentes de ventas.
**Regla:** Cuando todos los 🔴 estén resueltos, se activan los agentes. Los 🟡 pueden ir en paralelo.

---

## ÁREA 1 — IDENTIDAD LEGAL Y CORPORATIVA

| # | Ítem | Estado | Prioridad | Responsable |
|---|------|--------|-----------|-------------|
| 1.1 | Nombre comercial / marca registrada o en uso | ✅ "Timeless" en uso | — | — |
| 1.2 | Entidad legal (autónomo, SRL, LLC, etc.) | ❓ Desconocido | 🟡 | Matías |
| 1.3 | Cuenta bancaria para recibir pagos del negocio | ❓ Desconocido | 🟡 | Matías |
| 1.4 | Domicilio fiscal / dirección de empresa | ❓ Desconocido | 🟡 | Matías |
| 1.5 | País de operación definido (Suiza/Argentina?) | ❓ No documentado | 🟡 | Matías |

> **Nota:** Para los primeros clientes no es bloqueante tener una SRL. Pero sí necesitás una forma legal de recibir pagos y emitir algún comprobante. Definilo según dónde estés operando (Suiza → factura como autónomo; Argentina → igual).

---

## ÁREA 2 — DOCUMENTOS LEGALES (mínimo viable)

| # | Ítem | Estado | Prioridad | Dónde debe estar |
|---|------|--------|-----------|-----------------|
| 2.1 | **Términos de Servicio** (ToS) en el sitio web | ❌ No existe | 🔴 | `/terms.html` o footer |
| 2.2 | **Política de Privacidad** (GDPR básico) en el sitio | ❌ No existe | 🔴 | `/privacy.html` o footer |
| 2.3 | **Contrato de servicio** template para clientes | ❌ No existe | 🔴 | Enviar al firmar |
| 2.4 | **Política de cancelación y reembolso** | ❌ No existe | 🔴 | En ToS o página de precios |
| 2.5 | **NDA** template (para casos donde el cliente lo pida) | ❌ No existe | 🟡 | Tener listo para enviar |

> **Por qué importa:** Si alguien completa el onboarding y te quiere pagar, ¿qué firma? Sin un contrato mínimo estás exponiendo a Timeless a problemas. Además, los ToS y la privacidad son requeridos legalmente si procesás datos de clientes (y lo hacés — conversaciones de huéspedes van a Google Sheets).

---

## ÁREA 3 — IDENTIDAD DE MARCA

| # | Ítem | Estado | Prioridad | Notas |
|---|------|--------|-----------|-------|
| 3.1 | Logo vectorial (SVG/PDF) | ✅ Existe en diseño | — | Usar el de `index.html` |
| 3.2 | Design system documentado | ✅ En `tech-decisions.md` | — | Cormorant + DM Sans + dorado |
| 3.3 | **Pitch deck** (presentación de ventas, 10-15 slides) | ❓ `timeless-templates-ventas.docx` existe pero sin verificar | 🔴 | Revisar y completar |
| 3.4 | **One-pager** de producto (1 página PDF para enviar por email) | ❌ No confirmado | 🔴 | Enviar tras primer contacto |
| 3.5 | **Demo video** corto (2-3 min, Loom) mostrando Emma en vivo | ❌ No existe | 🔴 | Subir a YouTube/Loom |
| 3.6 | **Firma de email profesional** para team@timelessai.pro | ❓ No verificada | 🟡 | Incluir nombre, cargo, link sitio |
| 3.7 | **Favicon** y meta tags en el sitio | ✅ Existe `manifest.json` | — | — |
| 3.8 | **OG image** para compartir en redes | ✅ `og-cover.png` existe | — | — |

---

## ÁREA 4 — PRESENCIA DIGITAL

| # | Ítem | Estado | Prioridad | URL / Handle |
|---|------|--------|-----------|-------------|
| 4.1 | **Landing page** pública | ✅ Live | — | timeless-site.pages.dev |
| 4.2 | **Dominio propio** (timelessai.pro o similar) | ✅ Existe | — | timelessai.pro |
| 4.3 | **LinkedIn company page** | ✅ Existe | — | linkedin.com/company/timelessai |
| 4.4 | **LinkedIn personal** (Matías como founder) | ❌ No existe | 🔴 | Crear ya |
| 4.5 | **Instagram business** (@timeless.ai o similar) | ❌ No existe | 🔴 | Crear ya |
| 4.6 | **WhatsApp Business** del negocio | ❌ No existe | 🟡 | Para cuando haya número |
| 4.7 | **Google Business Profile** | ❌ No existe | 🟢 | No urgente |
| 4.8 | **Página de precios** clara en el sitio | ❌ No hay `/pricing` o sección de precios | 🔴 | Agregar a `index.html` |
| 4.9 | **Testimonios / prueba social** en el sitio | ❌ No existe | 🟡 | Usar Sun Life cuando Ana vuelva |

---

## ÁREA 5 — EMAIL Y COMUNICACIÓN

| # | Ítem | Estado | Prioridad | Notas |
|---|------|--------|-----------|-------|
| 5.1 | Email `team@timelessai.pro` activo | ✅ Activo | — | Google Workspace |
| 5.2 | SPF / DKIM / DMARC configurados | ✅ Configurado | — | Ya hecho |
| 5.3 | **Firma de email profesional** configurada | ❓ No verificada | 🟡 | Nombre, cargo, web, foto |
| 5.4 | **Template de propuesta comercial** por email | ❌ No existe | 🔴 | Para enviar tras la demo |
| 5.5 | **Template de bienvenida** para cliente nuevo | ✅ Parcial (onboarding v2 lo envía) | — | — |
| 5.6 | Email `matiidutlii@gmail.com` no está en listas de spam | ❓ No verificado | 🔴 | Verificar en mail-tester.com |

---

## ÁREA 6 — MATERIALES DE VENTAS

| # | Ítem | Estado | Prioridad | Notas |
|---|------|--------|-----------|-------|
| 6.1 | **Pitch deck** (10-15 slides) | ❓ Existe `.docx` sin verificar | 🔴 | Problema → Solución → Demo → Precios → CTA |
| 6.2 | **One-pager** (1 página, PDF o web) | ❌ No confirmado | 🔴 | Para enviar por email o LinkedIn |
| 6.3 | **Demo en vivo** del bot (Patagonia funciona) | ✅ Disponible | — | Chat live + dashboard |
| 6.4 | **Demo video** (screen recording 2-3 min) | ❌ No existe | 🔴 | La gente quiere ver antes de llamar |
| 6.5 | **Preguntas frecuentes** de ventas documentadas | ❌ No existe | 🟡 | "¿Funciona en español?" "¿Qué pasa si el bot no sabe?" |
| 6.6 | **Comparativa vs competidores** (Conduit, HiJiffy) | ✅ En `competitors.md` | — | Actualizar con precios reales |
| 6.7 | **Case study Sun Life** (aunque sea parcial) | ❌ No documentado | 🟡 | Usable cuando Ana vuelva |
| 6.8 | **Objeciones y respuestas** documentadas | ❌ No existe | 🟡 | "¿Y si comete errores?" "¿Qué pasa con mis datos?" |
| 6.9 | **Calendario Calendly** configurado | ✅ Activo | — | https://calendly.com/team-timelessai/30min |
| 6.10 | **Speech de Mateo** cubre todas las categorías clave | ✅ Activo | — | INFO/PRECIO/DEMO/LLAMADA/etc. |

---

## ÁREA 7 — FINANZAS Y COBRO

| # | Ítem | Estado | Prioridad | Notas |
|---|------|--------|-----------|-------|
| 7.1 | **Precios definidos** | ✅ $79/$149/$299 + setup $200-500 | — | — |
| 7.2 | **Stripe** o link de pago online | ❌ No existe | 🟡 | Cobro manual OK para primeros clientes |
| 7.3 | **Template de factura/recibo** | ❌ No existe | 🟡 | Para emitir al cliente |
| 7.4 | **Política de facturación** (mensual, anual, setup por separado) | ❌ No documentada | 🟡 | Definir antes de la primera venta |
| 7.5 | **Forma de cobro manual** (transferencia, PayPal, Wise) | ✅ Posible ahora | — | Suficiente para primeros clientes |

---

## ÁREA 8 — SEGURIDAD TÉCNICA

| # | Ítem | Estado | Prioridad | Notas |
|---|------|--------|-----------|-------|
| 8.1 | **OpenAI key** en W1 Lead Hunter no hardcodeada | ❌ Hardcodeada en nodo | 🔴 | Mover a credencial |
| 8.2 | **OpenAI + Supabase keys** en Bot Patagonia no hardcodeadas | ❌ Hardcodeadas | 🔴 | Mover a credenciales |
| 8.3 | **Google Maps API key** en W1 no hardcodeada | ❌ Hardcodeada | 🔴 | Mover a credencial |
| 8.4 | **Supabase service_role** rotado | ⏳ Pendiente coordinar con Sun Life | 🔴 | Coordinar para no romper Emma |
| 8.5 | **Archivos KEY*.txt** no subidos al repo | ✅ `.gitignore` arreglado hoy | — | — |
| 8.6 | **Datos de clientes** (conversaciones) aislados por `client_id` en Supabase | ✅ Implementado | — | — |
| 8.7 | **Google Sheets** de clientes con acceso restringido | ❓ No verificado | 🟡 | Verificar permisos del Sheet de Ana |

---

## ÁREA 9 — DOCUMENTACIÓN INTERNA ALINEADA

| # | Ítem | Estado | Prioridad | Archivo |
|---|------|--------|-----------|---------|
| 9.1 | Estado actual de la SaaS documentado | ✅ Actualizado hoy | — | `docs/timeless-saas-overview.md` |
| 9.2 | Roadmap actualizado con prioridades reales | ✅ Actualizado | — | `.claude/rules/roadmap.md` |
| 9.3 | Estado de clientes documentado | ✅ Actualizado | — | `.claude/rules/clients.md` |
| 9.4 | Arquitectura técnica documentada | ✅ Existe | — | `.claude/rules/architecture.md` |
| 9.5 | Pre-launch checklist técnico | ✅ Creado hoy | — | `docs/pre-launch-checklist.md` |
| 9.6 | Auditoría semanal automática configurada | ✅ Activa (lunes 9am) | — | Routine `trig_01ScHuAUBGFv85tbBZRBEjaZ` |
| 9.7 | **Proceso de onboarding** de un cliente nuevo documentado | ✅ Existe | — | `.claude/rules/onboarding.md` |
| 9.8 | **Proceso de offboarding** (qué pasa si un cliente cancela) | ❌ No existe | 🟡 | Definir |

---

## ÁREA 10 — CONTENIDO Y SOCIAL MEDIA

| # | Ítem | Estado | Prioridad | Notas |
|---|------|--------|-----------|-------|
| 10.1 | **LinkedIn personal** creado y completo | ❌ No existe | 🔴 | Foto, bio, experiencia, Timeless como empresa actual |
| 10.2 | **3 posts iniciales LinkedIn** redactados y listos | ❌ No existen | 🔴 | Publicar el día 1 del perfil |
| 10.3 | **Instagram business** creado y completo | ❌ No existe | 🔴 | Bio + link a sitio + primeras stories |
| 10.4 | **2 reels iniciales** (screen recording de Emma) | ❌ No existen | 🔴 | Antes de activar |
| 10.5 | **W4 Content Generator** activo y publicando | ❌ Inactivo (espera RRSS) | 🟡 | Activar cuando 10.1 y 10.3 estén listos |
| 10.6 | **Hashtags y keywords** definidos para el nicho | ❌ No documentados | 🟡 | #hotelesboutique #IA #recepcionistavirtual |

---

## RESUMEN — Semáforo de empresa lista

### 🔴 BLOQUEADORES (sin esto no se activan los agentes)

**Legales / Docs:**
- [ ] Términos de Servicio en el sitio
- [ ] Política de Privacidad en el sitio
- [ ] Contrato de servicio template

**Presencia:**
- [ ] LinkedIn personal creado (con foto, bio, 3 posts)
- [ ] Instagram business creado (con bio, 2 reels)
- [ ] Página de precios en el sitio web

**Materiales de venta:**
- [ ] Pitch deck verificado y completo
- [ ] One-pager de producto listo para enviar
- [ ] Demo video (2-3 min, Loom)

**Ventas:**
- [ ] Propuesta comercial template
- [ ] Email de `matiidutlii@gmail.com` verificado anti-spam

**Seguridad:**
- [ ] Keys de OpenAI, Supabase, Google Maps sacadas del hardcode

### 🟡 IMPORTANTES (resolver en las primeras 2 semanas de ventas)

- [ ] Stripe para cobro online
- [ ] Template de factura
- [ ] Firma de email profesional
- [ ] Case study Sun Life (cuando Ana vuelva)
- [ ] Objeciones y respuestas documentadas
- [ ] W4 Content Generator activo
- [ ] Offboarding process definido
- [ ] Entidad legal / forma de recibir pagos formalmente

### 🟢 PUEDE ESPERAR

- [ ] Google Business Profile
- [ ] NDA template
- [ ] Testimonios en el sitio
- [ ] Stripe integrado al onboarding (cobro automático post-signup)

---

## Plan de ejecución

### Lo que puede hacer Claude Code
- Crear ToS y Privacy Policy básicos como páginas HTML (`/terms`, `/privacy`)
- Agregar sección de precios a `index.html`
- Redactar los 3 posts de LinkedIn listos para copiar/pegar
- Redactar scripts de los 2 reels de Instagram
- Redactar el contrato de servicio template (Word/PDF)
- Redactar la propuesta comercial template
- Arreglar las API keys hardcodeadas en n8n
- Completar/verificar el pitch deck

### Lo que necesita hacer Matías (acciones físicas)
- Crear perfil LinkedIn personal (subir foto, completar info)
- Crear perfil Instagram business
- Grabar el demo video (Loom, 2-3 min)
- Definir entidad legal / forma de cobro formal
- Verificar email en mail-tester.com
- Rotar secrets de Supabase y OpenAI (coordinado)

---

**Cuando todos los 🔴 estén tachados → se activan los agentes de ventas.**
