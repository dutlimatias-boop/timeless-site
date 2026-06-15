# Auditoría Semanal — Timeless
**Fecha:** 2026-06-15
**Generado por:** Agente de auditoría automático

---

## ✅ Workflows activos (según docs)

### Plataforma / Marketing
| Workflow | Trigger | Propósito |
|----------|---------|-----------|
| Timeless — Lead Hunter | Lunes 8am | Google Maps → Place Details (captura website+tel) → AI scoring excluye cadenas (≥7 al CRM). City rotation ISO week. Embudo arreglado y verificado 2026-06-14. |
| Timeless — Outreach Email | Martes 10am | Lee CRM (`Tiene web?`) → Hunter.io → cold email desde matiidutlii@gmail.com con link `/?hotel=` |
| Timeless — Follow-up Bot | Diario 9am | Secuencia 4 toques (día 1, 5, 12, 30) a prospectos sin respuesta |
| Timeless — Mateo Reply Handler | Gmail trigger (team@timelessai.pro) | Clasifica reply con OpenAI → speech por categoría → alerta Telegram. Link Calendly en speech LLAMADA. |
| Timeless — Content Generator | Viernes 10am + Diario 11am | Genera posts LinkedIn/Instagram (Parte A) + auto-publica aprobados (Parte B). LinkedIn de Matías live. |
| Timeless — Onboarding v2 | POST /onboarding-hotel | Form multi-step 6 verticales → ingest KB → smoke test → email bienvenida |
| Timeless — Status Endpoint | GET /onboarding-status | Polling estado de onboarding por job_id |
| Timeless — Ingesta de documentos | POST /ingest-document | Ingestión RAG genérica a Supabase |
| Timeless — Error Notification | Error trigger | Alertas de errores en 7 workflows (plataforma/marketing). Cableado 2026-06-14. |
| Timeless — Unsubscribe (Baja) | POST webhook | Suprime contacto de futuros envíos. Wired a `baja.html`. |

### Sun Life Beach Hotel
| Workflow | Propósito |
|----------|-----------|
| Sunlife — Bot Demo | Emma activa en sunlifebeachhotel.com vía widget. Logs a Google Sheets. |
| Sunlife — Panel API | API que alimenta el dashboard de Ana |
| Sunlife — Reporte Semanal Silencioso | Acumula métricas en pestaña "Weekly Reports" sin email a Ana |
| Sunlife — Guest Journey (Silent) | Detecta check-ins/checkouts, loga en "Guest Journey Log" sin disparar mensajes |

### Sandbox Patagonia
| Workflow | Propósito |
|----------|-----------|
| Hotel Patagonia - Bot Demo | Bot GPT-4o-mini con reranking Cohere conectado como tool `buscar_info_hotel` |
| Panel - Hotel Patagonia API | Demo panel del sandbox |

---

## ⏸️ Workflows pausados/inactivos

| Workflow | Motivo documentado |
|----------|--------------------|
| Sunlife — Reporte Semanal (con email) | Pausado — Ana no disponible. El Silencioso acumula métricas en su lugar. |
| Emma — Bot Demo (OneDrive) | Pendiente OAuth2 de Ana para autorizar el OneDrive del hotel |
| Timeless — AI Sales Agent (Demo Generator) | Inactivo — listo para activar. Sin esto el funnel de ventas no cierra automáticamente. |
| Timeless — AI Sales Agent (Monitor) | ⚠️ **Estado contradictorio entre docs** — ver sección Notas. Si está activo, consume ~8.640 ejec/mes. |
| Timeless — AI Sales Agent (Daily Digest) | Suite Sales Agent legacy reemplazada por Mateo — `active: false` según `status.md` |
| Timeless — AI Sales Agent (Cleanup) | Suite Sales Agent legacy — `active: false` según `status.md` |
| Hotel Patagonia - Bot Demo (Claude test) | Inactivo — A/B vs GPT listo pero no ejecutado desde el 1/jun (2 semanas de deuda) |
| Hotel Patagonia - RAG Rerank (sub-workflow) | Creado y conectado al Bot Demo. Bloqueado por cupo de ejecuciones de mayo; debería estar disponible ya. |
| Demos legacy | Restaurante, Beauty, Clínica, Inmobiliaria — desactivados. Conservar como referencia. |

---

## ⚠️ Alertas conocidas

### 🔴 Críticas

1. **A/B test Patagonia sin ejecutar — 2 semanas de deuda.**
   El reseteo del cupo fue el 1 de junio. A 15/06 hay cupo disponible. Ambos workflows (GPT `fxrIKIn65oZ4o2RN` y Claude `BBbqvxenIswa5Sta`) están listos. Sin este test no hay dato para decidir si migrar a Claude cuando entren nuevos clientes.

2. **Demo Generator inactivo = funnel de ventas roto en el paso decisivo.**
   Cuando un prospecto dice "quiero una demo", no pasa nada automático. El cierre es 100% manual. Escalar el outreach (W1/W2/W3 activos) sin resolver esto genera oportunidades que se pierden.

3. **AI Sales Agent Monitor — estado incierto.**
   Si está activo corre cada 5 min = ~8.640 ejec/mes contra un plan de 2.500/mes. En mayo llegó a 2.500/2.500. Verificar en n8n si `active: true`. Si lo está, apagarlo ya.

4. **Secretos hardcodeados — riesgo abierto desde mayo.**
   OpenAI key activa `sk-...b2wA` + Supabase `service_role` en texto plano en nodos Code Tool (deshabilitados pero no borrados) y en archivos `n8n-workflows/*.json`. Los `.json` están en `.gitignore` — no hay filtración pública confirmada. El camino correcto es migrar a credenciales n8n (no rotar de emergencia — rota el service_role y rompe Emma en producción).

5. **Backups de workflows críticos desactualizados.**
   Lead Hunter, Outreach, Content Generator y Mateo Reply Handler fueron editados el 14/6 y NO están exportados a `n8n-workflows/` en el repo. Un borrado en n8n Cloud = pérdida sin recovery.

### 🟡 Menores

6. **Key OpenAI `sk-...lKIA` pendiente de borrar.** `roadmap.md` la marca como prioritaria desde el 14/6. Verificar columna "Last used" en platform.openai.com para confirmar que no se usa, luego revocar.

7. **W3 senderName corrupto.** "Mat?as ? Timeless" en emails de follow-up — encoding UTF-8 roto. Daña percepción profesional.

8. **W2 campo `apertura` sin usar.** GPT genera apertura personalizada que el template de email descarta. Se paga por tokens que no generan valor.

9. **KB de Emma con horarios incorrectos.** Check-in/out desactualizados en Supabase — Emma responde mal a huéspedes reales en sunlifebeachhotel.com. Fix: 5 minutos via webhook de ingesta.

10. **Content Generator pendiente Instagram + token LinkedIn.** LinkedIn de Matías live pero falta `LINKEDIN_ACCESS_TOKEN` + `LINKEDIN_PERSON_ID` en variables n8n. Token caduca cada 60 días — agregar reminder al calendario.

11. **12 webhooks sin autenticación.** Panel API ×6, onboarding, status, baja, ingesta — cualquier llamada puede leer datos de guest o disparar ingestiones.

---

## 🔴 Bloqueos activos

| Bloqueo | Impacto | Resolución |
|---------|---------|------------|
| Ana no disponible | Sun Life pausado, KB desactualizada, OneDrive sin activar | Recontactar con evidencia de Emma acumulada en "Weekly Reports" |
| OneDrive sin autorizar | Dashboard con demo data, Guest Journey loga sin enviar mensajes reales | Ana completa OAuth2 en n8n → activar `Emma — Bot Demo (OneDrive)` |
| Sin WhatsApp del hotel | Sin canal WhatsApp para Emma | Ana da número cuando retome |
| Check-in/out desactualizado en KB | Emma responde horarios incorrectos a huéspedes reales | Ingestar texto corregido vía webhook Supabase (5 min — solo Matías) |
| Demo Generator inactivo | Funnel sin cierre automático | Apagar/reemplazar Monitor → activar Demo Generator |
| A/B test Patagonia sin ejecutar | Sin datos para decidir migración a Claude | Correr las 5 preguntas de prueba esta semana |

---

## 🎯 Top 3 acciones urgentes esta semana

**Prioridad: adquisición primero.**

### 1. 🔴 Monitorear primera corrida real del embudo W1→W2 (lunes 16/6)
El embudo está reparado y verificado por código (14/6) pero aún no hay confirmación de una corrida real con emails enviados a dominios reales (el bloqueo anterior era W1 no capturando website, causando 0 emails enviados). Revisar el CRM el lunes/martes: ¿aparecen prospectos nuevos con columna `Tiene web?` completa? ¿W2 enviò emails con dominios reales? Esta corrida confirma o niega que el sistema funciona de punta a punta.

### 2. 🔴 Correr el A/B test Patagonia (2 semanas de deuda)
Activar `Hotel Patagonia - Bot Demo (Claude test)` en n8n. Mandar las mismas 5 preguntas a ambos bots (GPT y Claude). Registrar calidad, costo y latencia en `docs/patagonia-sandbox-experiments.md`. Si Claude gana: habilitar prompt caching (-90% en costo de tokens) y actualizar el roadmap. Sin datos, la decisión de migrar o no queda bloqueada indefinidamente.

### 3. 🟡 Exportar los 4 workflows editados el 14/6 al repo
Lead Hunter, Outreach Email, Content Generator y Mateo Reply Handler no tienen backup en `n8n-workflows/`. En n8n → cada workflow → Export → descargar JSON → `git add` + commit. Sin este backup, un error en n8n Cloud o un borrado accidental tiene pérdida total sin recovery.

*(El Demo Generator y el Monitor siguen en el backlog técnico — no son adquisición, pero el Monitor sí es un riesgo de infraestructura activo.)*

---

## 📊 Estado del funnel de ventas

```
[W1 Lead Hunter] ✅  →  [W2 Outreach Email] ✅  →  [W3 Follow-up] ✅
                                                         ↓
                                             [Mateo Reply Handler] ✅
                                                         ↓
                                          [Demo Generator] ⏸ HUECO CRÍTICO
                                                         ↓
                                             [Onboarding v2] ✅
```

| Etapa | Estado | Nota |
|-------|--------|------|
| Prospección (W1) | ✅ Embudo reparado | Primera corrida real pendiente: lunes 16/6 |
| Outreach (W2) | ✅ Activo | Lee `Tiene web?` del CRM — ya no adivina dominios |
| Follow-up (W3) | ✅ Activo | ⚠️ senderName corrupto — fix pendiente UTF-8 |
| Gestión replies (Mateo) | ✅ Activo | Speech por categoría + Calendly automático en LLAMADA |
| Demo automática | ⏸ Inactivo | Demo Generator sin activar — hueco más costoso del funnel |
| Landing/demo | ✅ Live | `/?hotel=NombreHotel` muestra demo contextualizada |
| Adquisición orgánica (W4) | 🟡 Parcial | LinkedIn de Matías live. Instagram y token LinkedIn pendientes. |
| Agendado de demos | ✅ Activo | Calendly — "Demo Timeless — 15 min". Lun–Vie 18–22 + Sáb 9–13 CET. |

---

## 🧪 Sandbox Patagonia

| Experimento | Workflow ID | Estado |
|-------------|-------------|--------|
| Bot GPT-4o-mini + reranking Cohere | `fxrIKIn65oZ4o2RN` | Activo — listo para testear |
| Bot Claude (claude-sonnet-4-6) + reranking | `BBbqvxenIswa5Sta` | Inactivo — activar para A/B |
| Sub-workflow RAG Rerank (Cohere) | `wU8MTEcUENyqA1Hj` | Conectado al Bot Demo. Debería tener cupo disponible post-1/jun. |

**A/B — 2 semanas de deuda (target original: 1/jun):**
- Variables: modelo (gpt-4o-mini vs claude-sonnet-4-6). Mismo reranking (Cohere rerank-v3.5, top 4 de 20 candidatos). Mismo prompt.
- Test: 5 preguntas reales de huésped (precios, mascotas, check-in, cancelación, actividades).
- Métricas: % respuestas correctas, costo/token, latencia, respeto del JSON estricto.
- Si Claude gana → habilitar prompt caching en Anthropic Console (radar 1.5: -90% tokens cacheados). Créditos disponibles: USD 10.

**Bloqueo de seguridad abierto (independiente del A/B):** Nodo Code Tool viejo (desactivado, no borrado) tiene OpenAI key + Supabase service_role en texto plano. Sub-workflow RAG Rerank usa credenciales n8n — la deuda es solo el nodo viejo. Rotar keys puede esperar la migración formal; no hacerlo de emergencia.

---

## 📝 Notas — Inconsistencias detectadas entre docs

1. **AI Sales Agent Monitor — estado contradictorio (carryover de semana anterior).**
   `timeless-saas-overview.md` (actualizado 2026-05-30): lo lista como `⚠️ Activo — EN REVISIÓN`.
   `status.md` (actualizado 2026-06-14): lo lista como `active: false` dentro de la "Suite AI Sales Agent inactiva".
   No es posible determinar el estado real desde los docs. **Requiere verificación directa en n8n.** Si está activo, es el riesgo de infraestructura más urgente (8.640 ejec/mes vs límite de 2.500).

2. **AI Sales Agent Daily Digest y Cleanup — misma inconsistencia.**
   `timeless-saas-overview.md`: `✅ Activo`. `status.md`: `active: false`. Verificar junto con el Monitor.

3. **Content Generator — estado resuelto respecto a auditoría anterior.**
   La semana pasada figuraba como inactivo/sin destino. `status.md` (2026-06-14) ahora lo lista como activo con LinkedIn de Matías live. El bloqueo parcial sigue: falta Instagram y el token de LinkedIn en variables n8n.

4. **Pricing inconsistente entre docs (carryover).**
   `timeless-saas-overview.md`: "$79/mes + setup $200–500".
   `strategy.md`: "$49 LATAM / $99 Europa" (lanzamiento), "$79/$149" (post-primeros-3-clientes).
   `strategy.md` es más reciente y detallado — es la fuente correcta. `timeless-saas-overview.md` debería actualizarse para evitar confusión en pitch.

5. **A/B test target date desactualizada en los docs.**
   `patagonia-sandbox-experiments.md` y `roadmap.md` marcan "correr el 1 de junio". Actualizar a "pendiente — ejecutar semana del 15/06" cuando se ejecute.
