# ✅ Pre-Launch Checklist — Timeless
**Última actualización:** 2026-05-31
**Estado:** En preparación — NO listo para soltar agentes

> Este documento enumera TODO lo que debe funcionar antes de activar el outreach masivo.
> Ordenado por bloque. Cada ítem tiene su estado real (no el optimista).

---

## BLOQUE 1 — IDENTIDAD Y PRESENCIA (quién sos)

| # | Ítem | Estado | Prioridad |
|---|------|--------|-----------|
| 1.1 | **Perfil LinkedIn personal** (Matías como fundador de Timeless) | ❌ No existe | 🔴 Crítico |
| 1.2 | **Perfil Instagram business** (@timeless.ai o similar) | ❌ No existe | 🔴 Crítico |
| 1.3 | **Company page LinkedIn** de Timeless | ✅ Existe | — |
| 1.4 | **Landing page** (timeless-site.pages.dev) | ✅ Lista y funcionando | — |
| 1.5 | **Demo del bot** (Hotel Patagonia / Sofía) visible y funcionando | ✅ Funciona | — |
| 1.6 | **Calendly** configurado (Demo 15 min, Lun-Vie 18-22 + Sáb 9-13) | ✅ Configurado | — |
| 1.7 | **Dominio timelessai.pro** con email team@ activo | ✅ Funciona | — |

**Bloqueadores del bloque:** 1.1 y 1.2 — sin LinkedIn personal no hay prueba de quién está detrás del producto.

---

## BLOQUE 2 — MÁQUINA DE CAPTACIÓN (encontrar prospectos)

| # | Ítem | Estado | Prioridad |
|---|------|--------|-----------|
| 2.1 | **W1 Lead Hunter** corre automáticamente por cron (lunes) | ❌ Nunca corrió por cron | 🔴 Crítico |
| 2.2 | **W1 scoring** filtra correctamente (excluye cadenas internacionales) | ❌ Le dio score 8 al Four Seasons | 🔴 Crítico |
| 2.3 | **W1 ciudades** cubren el mercado boutique LATAM real | ❌ Lista incompleta (falta Mendoza, Bariloche, Medellín, etc.) | 🟡 Importante |
| 2.4 | **CRM Prospectos** tiene leads reales y válidos | ❌ Solo 2 filas (1 test + 1 incorrecto) | 🔴 Crítico |
| 2.5 | **API key OpenAI** en W1 es segura (no hardcodeada) | ❌ Hardcodeada en el nodo | 🟡 Importante |

**Bloqueadores del bloque:** 2.1, 2.2 y 2.4 — sin prospectos reales en el CRM no hay nada que contactar.

---

## BLOQUE 3 — MÁQUINA DE OUTREACH (contactar prospectos)

| # | Ítem | Estado | Prioridad |
|---|------|--------|-----------|
| 3.1 | **W2 Outreach Email** corrió al menos una vez exitosamente | ❌ 0 ejecuciones en toda su historia | 🔴 Crítico |
| 3.2 | **W2** lee correctamente el CRM y manda emails personalizados | ❓ Sin testear | 🔴 Crítico |
| 3.3 | **W2** usa el link `/?hotel=NombreHotel` correctamente | ❓ Sin verificar | 🟡 Importante |
| 3.4 | **W3 Follow-up Bot** corrió al menos una vez exitosamente | ❓ Sin verificar historial | 🟡 Importante |
| 3.5 | **Dominio `matiidutlii@gmail.com`** no está en listas de spam | ❓ Desconocido | 🟡 Importante |
| 3.6 | **Cupo de ejecuciones n8n** alcanza para correr W1+W2+W3 semanalmente | ❌ Monitor se comía todo el cupo (ya apagado, pero verificar post-reset) | 🟡 Importante |

**Bloqueadores del bloque:** 3.1 y 3.2 — W2 nunca funcionó. Hay que testearlo antes de soltar.

---

## BLOQUE 4 — MANEJO DE RESPUESTAS (convertir interés en demo)

| # | Ítem | Estado | Prioridad |
|---|------|--------|-----------|
| 4.1 | **Mateo Reply Handler** clasifica respuestas y alerta por Telegram | ✅ Activo y funcionando | — |
| 4.2 | **Mateo** actualiza el CRM automáticamente con el estado del prospecto | ❌ Clasifica pero NO actualiza el CRM | 🟡 Importante |
| 4.3 | **AI Sales Agent Monitor** apagado o reemplazado (conflicto con Mateo) | ⚠️ Activo — EN CONFLICTO con Mateo | 🔴 Crítico |
| 4.4 | **Un solo sistema** maneja las respuestas (no dos peleando) | ❌ Dos sistemas activos simultáneamente | 🔴 Crítico |
| 4.5 | Speech de Mateo incluye el link de Calendly para demos | ✅ Incluido | — |

**Bloqueadores del bloque:** 4.3 y 4.4 — dos sistemas procesando la misma respuesta puede mandar emails duplicados o contradictorios a un prospecto real.

---

## BLOQUE 5 — DEMO PERSONALIZADA (el momento de cierre)

| # | Ítem | Estado | Prioridad |
|---|------|--------|-----------|
| 5.1 | **Demo Generator** (AI Sales Agent) activo y testeado | ❌ Inactivo, nunca testeado | 🔴 Crítico |
| 5.2 | Demo Generator scrapea el sitio del prospecto correctamente | ❓ Sin testear | 🔴 Crítico |
| 5.3 | Demo Generator genera KB y la ingesta a Supabase | ❓ Sin testear | 🔴 Crítico |
| 5.4 | Demo Generator genera dashboard HTML y lo pushea a GitHub | ❓ Sin testear | 🔴 Crítico |
| 5.5 | Demo Generator manda el email con el link personalizado | ❓ Sin testear | 🔴 Crítico |
| 5.6 | **Demo manual** como fallback si el Generator falla | ✅ Posible (Patagonia como demo genérica) | — |

**Bloqueadores del bloque:** Todo el Demo Generator está sin testear. Sin esto, la demo es solo "mirá el Hotel Patagonia" — funciona para vender pero no escala.

---

## BLOQUE 6 — ONBOARDING (convertir demo en cliente)

| # | Ítem | Estado | Prioridad |
|---|------|--------|-----------|
| 6.1 | **Formulario onboarding** (`onboarding.html`) funciona end-to-end | ✅ Funciona | — |
| 6.2 | **Timeless Onboarding v2** ingest KB + smoke test + email bienvenida | ✅ Activo | — |
| 6.3 | **Pasos post-onboarding** (duplicar workflows, crear páginas) documentados | ✅ Documentado | — |
| 6.4 | **Pasos post-onboarding** automatizados | ❌ Son manuales (1-2 horas de trabajo por cliente) | 🟡 Importante |

**Bloqueadores del bloque:** ninguno que impida vender. Los pasos manuales son manejables para los primeros 3-5 clientes.

---

## BLOQUE 7 — COBRO (convertir cliente en MRR)

| # | Ítem | Estado | Prioridad |
|---|------|--------|-----------|
| 7.1 | **Stripe** o link de pago online | ❌ No existe | 🟡 Importante |
| 7.2 | **Alternativa de cobro manual** (transferencia, PayPal) | ✅ Posible | — |
| 7.3 | **Precio definido y comunicado** ($79/$149/$299) | ✅ Definido | — |

**Bloqueadores del bloque:** ninguno que impida la primera venta (cobro manual funciona al principio).

---

## BLOQUE 8 — CONTENIDO Y SOCIAL (inbound y prueba social)

| # | Ítem | Estado | Prioridad |
|---|------|--------|-----------|
| 8.1 | **LinkedIn personal** — 3 posts iniciales publicados | ❌ Perfil no existe | 🔴 Crítico |
| 8.2 | **Instagram business** — 2 reels del bot publicados | ❌ Perfil no existe | 🟡 Importante |
| 8.3 | **W4 Content Generator** activo y publicando | ❌ Inactivo (espera perfiles RRSS) | 🟡 Importante |
| 8.4 | **Case study de Sun Life** (aunque sea parcial) | ❌ No documentado | 🟡 Importante |

---

## BLOQUE 9 — SEGURIDAD (antes de escalar)

| # | Ítem | Estado | Prioridad |
|---|------|--------|-----------|
| 9.1 | **OpenAI API key** en W1 movida a credencial (no hardcodeada) | ❌ Hardcodeada | 🟡 Importante |
| 9.2 | **OpenAI + Supabase keys** en Bot Patagonia movidas a credenciales | ❌ Hardcodeadas | 🟡 Importante |
| 9.3 | **Rotación de secret service_role** de Supabase | ⏳ Pendiente coordinar | 🟡 Importante |

---

## RESUMEN EJECUTIVO

### ✅ Listo (no tocar)
- Landing page + demo del bot (Patagonia)
- Calendly + email team@timelessai.pro
- Company page LinkedIn
- Onboarding form + workflow
- Mateo Reply Handler (clasificación)
- Emma de Ana (Sun Life, en pausa)

### 🔴 Bloqueadores críticos (sin esto NO se puede vender bien)
1. **LinkedIn personal** — no existe. Es la prueba social mínima.
2. **W1 scoring** — filtra mal (acepta cadenas internacionales).
3. **W2** — nunca corrió. Hay que testear antes de soltar.
4. **Conflicto Mateo vs Monitor** — dos sistemas respondiendo a prospectos.
5. **CRM vacío** — sin prospectos reales no hay nada que contactar.

### 🟡 Importantes (resolver en las primeras semanas)
- Demo Generator testeado y activado
- Ciudades W1 expandidas a LATAM boutique
- Mateo actualiza el CRM automáticamente
- Stripe para cobro online
- Instagram + W4 Content Generator
- Keys de seguridad movidas a credenciales

### 🟢 Puede esperar (escala, no venta)
- Onboarding 100% automatizado (post-onboarding manual OK para primeros clientes)
- Guest Memory Layer (Claude Managed Agents)
- Voice AI
- Integración PMS (Mews, SiteMinder API)

---

## Orden de ejecución recomendado

```
SEMANA 1 (antes del 1 junio — sin ejecuciones):
  → Crear LinkedIn personal con 3 posts iniciales [VOS]
  → Arreglar W1: scoring + ciudades [YO]
  → Apagar AI Sales Agent Monitor [YO]
  → Arreglar Mateo para que actualice CRM [YO]

1 JUNIO (reset de ejecuciones):
  → Testear W2 end-to-end (1 email real de prueba)
  → Correr W1 manualmente → poblar CRM con 20+ prospectos reales
  → A/B test Patagonia (Claude vs GPT + reranking)

SEMANA 2:
  → Testear Demo Generator de punta a punta
  → Si funciona: activarlo y conectarlo a Mateo
  → Si no: definir fallback (demo manual hasta que funcione)
  → Verificar W3 historial de ejecuciones

SEMANA 3:
  → Soltar W1+W2+W3+Mateo con confianza
  → Publicar en LinkedIn los primeros 3 posts
  → Primer sprint de demos reales
```
