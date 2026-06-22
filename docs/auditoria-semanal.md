# Auditoría Semanal — Timeless
**Fecha:** 2026-06-22
**Generado por:** Agente de auditoría automático

---

## ✅ Workflows activos (según docs)

### Plataforma / Marketing
| Workflow | ID | Trigger | Propósito |
|----------|----|---------|-----------|
| Timeless — Lead Hunter | `uhtAIR0uKDxPzVXn` | Lunes 8am | Google Maps → Place Details (website+tel) → AI scoring ≥7 → CRM. City rotation ISO week. Verificado 2026-06-14. |
| Timeless — Outreach Email | `RJArwDBVO9X9GbAp` | Martes 10am | Lee `Tiene web?` del CRM → Hunter.io → cold email desde matiidutlii@gmail.com con link `/?hotel=` |
| Timeless — Follow-up Bot | `DG1KRnNlMewrbZW9` | Diario 9am | Secuencia 4 toques (día 1, 5, 12, 30) a prospectos sin respuesta. ⚠️ senderName corrupto. |
| Timeless — Mateo Reply Handler | `L1Cd7ZGaJkIVJn85` | Gmail trigger (team@timelessai.pro) | Clasifica reply con OpenAI → speech por categoría → alerta Telegram. Link Calendly en LLAMADA. |
| Timeless — Content Generator | `LnDGBsIJStSGp0os` | Vie 10am + Diario 11am | Posts LinkedIn/Instagram (Parte A) + auto-publica aprobados (Parte B). ⚠️ Parte A fallando por schema. |
| Timeless — Unsubscribe (Baja) | `Rl85GmT7EnStTyIY` | POST webhook | Suprime contacto de futuros envíos. Wired a `baja.html`. |
| Timeless — Onboarding v2 | `WySJmWJPvWbFUwXx` | POST /onboarding-hotel | Form 6 verticales → ingest KB → smoke test → email bienvenida. Migrado a `OpenAI W1W2` el 16/6. |
| Timeless — Status Endpoint | `JF7LKuT4TGO6x4Fo` | GET /onboarding-status | Polling de estado por job_id |
| Timeless — Ingesta de documentos | `61BW87IVFtBdLEdU` | POST /ingest-document | Ingestión RAG genérica a Supabase |
| Timeless — Error Notification | `XnfBtmWah9W0TXfj` | Error trigger | Alertas en 7 workflows plataforma/marketing (cableado 2026-06-14). Onboarding v2 excluido — intencional. |
| Timeless — Supabase Keep-Alive | `oYbxM2pPG195VPB8` | Cron diario 6am | Query trivial a `documents` para evitar auto-pause del free tier (creado 2026-06-16). |

### Sun Life Beach Hotel
| Workflow | ID | Propósito |
|----------|----|-----------|
| Sunlife — Bot Demo | `6tGhMpKls5NbFgCF` | Emma activa en sunlifebeachhotel.com vía widget. Logs a Google Sheets. |
| Sunlife — Panel API | `2v2fI1emw91k5Hh3` | API que alimenta el dashboard de Ana |
| Sunlife — Reporte Semanal Silencioso | `JoNrXeN1GgvRGQeJ` | Acumula métricas en "Weekly Reports" sin email. Fix typo `rows = .all()` aplicado 2026-06-16. |
| Sunlife — Guest Journey (Silent) | `EuW7N0FwaIrb0sS7` | Detecta check-ins/checkouts, loga en "Guest Journey Log". ⚠️ Bug IF `Has Actions` pendiente. |

### Sandbox Patagonia
| Workflow | ID | Propósito |
|----------|----|-----------|
| Hotel Patagonia - Bot Demo | `fxrIKIn65oZ4o2RN` | Bot GPT-4o-mini con reranking Cohere (`buscar_info_hotel`) — activo, sin testear post-fix |
| Panel - Hotel Patagonia API | — | Demo panel del sandbox |

---

## ⏸️ Workflows pausados/inactivos

| Workflow | ID | Motivo |
|----------|----|--------|
| Sunlife — Reporte Semanal (con email) | `lEzgYNVXVP7m9HkG` | Pausado — Ana no disponible. Silencioso corre en su lugar. |
| Emma — Bot Demo (OneDrive) | `Cy3Rlw7xDRFvm7mh` | Pendiente OAuth2 de Ana para su Excel en OneDrive. |
| Hotel Patagonia - Bot Demo (Claude test) | `BBbqvxenIswa5Sta` | A/B vs GPT listo. Debía activarse el 1/jun. **3 semanas de deuda.** |
| Hotel Patagonia - RAG Rerank (sub-workflow) | `wU8MTEcUENyqA1Hj` | Conectado al Bot Demo. Bloqueado por cupo agotado en mayo — reset ya ocurrió el 1/jun. |
| Suite AI Sales Agent ×4 | múltiples | Reemplazada por Mateo. Monitor/Daily Digest/Cleanup/Demo Generator: `active: false` según `status.md`. |
| Demos legacy | — | Restaurante, Beauty, Clínica, Inmobiliaria — desactivados, conservar como referencia. |

---

## ⚠️ Alertas conocidas

### 🔴 Críticas

1. **A/B test Patagonia sin ejecutar — 3 semanas de deuda.**
   El reset de ejecuciones fue el 1/jun. A 22/06 hay cupo disponible. Los workflows GPT (`fxrIKIn65oZ4o2RN`) y Claude (`BBbqvxenIswa5Sta`) están listos, credenciales configuradas. Sin este test no hay dato para decidir migración de modelo cuando entren nuevos clientes.

2. **Content Generator Parte A fallando en silencio.**
   Error de schema "Contenido" los viernes 10am. Sin posts generados en LinkedIn/Instagram desde que falló. Impacta directamente adquisición orgánica.

3. **Demo Generator inactivo = funnel sin cierre automático.**
   Cuando un prospecto dice "quiero demo", no pasa nada automático. El cierre es 100% manual. Con W1/W2/W3 activos, las oportunidades que genera el sistema no se convierten.

4. **Secretos hardcodeados — riesgo abierto.**
   OpenAI key activa `sk-...b2wA` + Supabase `service_role` en texto plano en Code Tool de los 5 Bot Demos (nodos desactivados, no borrados). Los `.json` están en `.gitignore` — no hay filtración pública. Migrar a credenciales n8n es el camino correcto (no rotar de emergencia: rota el service_role y rompe Emma en producción).

5. **Backups desfasados — riesgo de pérdida total.**
   Lead Hunter, Outreach Email, Content Generator y Mateo Reply Handler fueron editados el 14/6 y NO están exportados a `n8n-workflows/` en el repo. Un borrado en n8n Cloud = pérdida sin recovery.

### 🟡 Menores

6. **W3 senderName corrupto.** "Mat?as ? Timeless" en emails de follow-up — encoding UTF-8 roto. Daña credibilidad profesional en cada toque automático.

7. **Key OpenAI `sk-...lKIA` pendiente de borrar.** Nada la usa desde la migración del 16/6. Verificar "Last used" en platform.openai.com y revocar.

8. **Bug Guest Journey Silent — nodo IF.** Expresión `={{ .Action }}` debe ser `={{ $json.Action }}`. El workflow corre pero puede no evaluar acciones correctamente. Pendiente fix con OK del usuario (workflow de cliente).

9. **KB de Emma con horarios incorrectos.** Check-in/out desactualizados en Supabase — Emma responde mal a huéspedes reales en sunlifebeachhotel.com. Fix: 5 min via webhook de ingesta.

10. **Content Generator — token LinkedIn expira cada 60 días.** Faltan `LINKEDIN_ACCESS_TOKEN` + `LINKEDIN_PERSON_ID` en variables n8n. Agregar reminder al calendario.

11. **12 webhooks sin autenticación.** Panel API ×6, onboarding, status, baja, ingesta. Riesgo bajo pero superficie abierta.

12. **radar-2026-06 no existe aún.** El radar de mayo anunció "próxima edición: fines de junio". Ya es 22/jun — generar la próxima edición del radar de mercado.

---

## 🔴 Bloqueos activos

| Bloqueo | Impacto | Resolución |
|---------|---------|------------|
| Ana no disponible | Sun Life pausado, KB desactualizada, OneDrive sin activar | Recontactar con evidencia de Emma acumulada en "Weekly Reports" |
| OneDrive sin autorizar | Dashboard con demo data, Guest Journey sin mensajes reales | Ana hace OAuth2 en n8n → activar `Emma — Bot Demo (OneDrive)` |
| Sin WhatsApp del hotel | Emma solo atiende por web | Ana da número cuando retome |
| Check-in/out desactualizado en KB | Emma responde horarios incorrectos | Ingestar texto corregido vía webhook Supabase (5 min) |
| Demo Generator inactivo | Funnel sin cierre automático de demos | Verificar estado AI Sales Agent Monitor → apagarlo → activar Demo Generator |
| A/B test Patagonia sin ejecutar | Sin datos para decidir migración a Claude | Activar `BBbqvxenIswa5Sta`, correr 5 preguntas, documentar resultado |

---

## 🎯 Top 3 acciones urgentes esta semana

> Criterio: prioridad a adquisición sobre producto.

### 1. 🔴 Corregir Content Generator Parte A (schema "Contenido")
**Impacto directo en adquisición.** El agente de contenido no genera posts para LinkedIn/Instagram desde que falló. Sin contenido orgánico = sin presencia = menos inbound. Es el canal de menor costo de adquisición que tenemos.
**Acción:** revisar el nodo que falla en Parte A del workflow `LnDGBsIJStSGp0os`, corregir el schema de output que espera GPT, testear con una corrida manual.

### 2. 🔴 Corregir W3 senderName encoding (UTF-8)
**Impacto en credibilidad de la secuencia activa.** Cada follow-up sale con "Mat?as ? Timeless" — un prospecto que lo recibe ve un sistema roto. Con W3 corriendo diariamente, el daño se acumula en cada prospecto del pipeline.
**Acción:** en el nodo del Follow-up Bot (`DG1KRnNlMewrbZW9`) donde se construye el senderName, asegurar encoding UTF-8 correcto o usar string ASCII.

### 3. 🟡 Ejecutar el A/B test Patagonia (3 semanas de deuda)
**Impacto estratégico.** La decisión de migrar o no a Claude depende de este test. Tiene 3 semanas de retraso. Los workflows están listos y el cupo de ejecuciones se reseteó el 1/jun.
**Acción:** activar `Hotel Patagonia - Bot Demo (Claude test)` (`BBbqvxenIswa5Sta`), mandar las mismas 5 preguntas a ambos bots, registrar resultado en `docs/patagonia-sandbox-experiments.md`. Si Claude gana, habilitar prompt caching en Anthropic Console (radar 1.5).

---

## 📊 Estado del funnel de ventas

```
[W1 Lead Hunter] ✅  →  [W2 Outreach Email] ✅  →  [W3 Follow-up] ✅ ⚠️UTF-8
                                                          ↓
                                              [Mateo Reply Handler] ✅
                                                          ↓
                                           [Demo Generator] ⏸ HUECO
                                                          ↓
                                              [Onboarding v2] ✅
```

| Etapa | Estado | Nota |
|-------|--------|------|
| Prospección (W1) | ✅ Activo | Embudo reparado 2026-06-14. Corridas semanales en curso. |
| Outreach (W2) | ✅ Activo | Lee dominio real desde CRM, no adivina. |
| Follow-up (W3) | ✅ Activo | ⚠️ senderName "Mat?as ? Timeless" — UTF-8 roto |
| Gestión replies (Mateo) | ✅ Activo | Speech por categoría + Calendly automático en LLAMADA |
| Demo automática | ⏸ Inactivo | Demo Generator apagado — hueco más costoso del funnel |
| Landing/demo | ✅ Live | `/?hotel=NombreHotel` muestra demo contextualizada |
| Contenido orgánico | ⚠️ Parcial | LinkedIn de Matías live. Parte A fallando → sin nuevos posts. |
| Agendado de demos | ✅ Activo | Calendly "Demo Timeless — 15 min". Lun–Vie 18–22 + Sáb 9–13 CET. |

---

## 🧪 Sandbox Patagonia

| Experimento | Workflow ID | Estado |
|-------------|-------------|--------|
| Bot GPT-4o-mini + reranking Cohere | `fxrIKIn65oZ4o2RN` | ✅ Activo — cupo disponible post-1/jun |
| Bot Claude (claude-sonnet-4-6) + reranking | `BBbqvxenIswa5Sta` | ⏸ Inactivo — activar para A/B |
| Sub-workflow RAG Rerank (Cohere rerank-v3.5) | `wU8MTEcUENyqA1Hj` | Conectado al Bot Demo, sin keys hardcodeadas ✅ |

**A/B pendiente — 3 semanas de deuda (target original: 1/jun):**
- Mismo reranking (top 4 de 20 candidatos), mismo prompt, mismo `client_id: 'Hotel_Patagonia'`
- Variables a comparar: modelo (`gpt-4o-mini` vs `claude-sonnet-4-6`), costo/token, latencia, respeto JSON estricto
- Preguntas sugeridas: precios, mascotas, check-in, cancelación, actividades (set de 5-15)
- Si Claude gana → habilitar prompt caching en Anthropic Console (créditos USD 10 disponibles) → ~90% de ahorro en tokens cacheados

**Credenciales listas:** `anthropicApi` `3NLGSIOWRqFxCJ0D` ✅ · `cohereApi` `wh0wx6aRSMiZYnsw` ✅ · sub-workflow sin secrets hardcodeados ✅

---

## 📝 Notas — Inconsistencias detectadas entre docs

1. **AI Sales Agent — estado contradictorio (carryover desde semana anterior, sin resolver).**
   `timeless-saas-overview.md` (2026-05-30): Monitor `⚠️ Activo EN REVISIÓN`, Daily Digest y Cleanup `✅ Activo`.
   `status.md` e `infrastructure.md` (2026-06-14+): los 4 workflows de la suite están `active: false`, reemplazados por Mateo.
   No se puede determinar el estado real desde los docs. **Requiere verificación directa en n8n.** Si Monitor está activo: ~8.640 ejec/mes contra límite de 2.500 = techo reventado.

2. **Pricing inconsistente entre docs (carryover).**
   `timeless-saas-overview.md`: "$79/mes + setup $200–500". `strategy.md`: "$49 LATAM / $99 Europa" (lanzamiento).
   `strategy.md` es la fuente correcta. Actualizar `timeless-saas-overview.md` para evitar confusión en pitch.

3. **A/B test sin update en `patagonia-sandbox-experiments.md`.**
   El doc marca "a correr el 1 de junio". Hoy es 22 de junio y no hay registro de ejecución ni resultado. O no se corrió (acción pendiente urgente) o se corrió sin documentar (gap en docs).

4. **`radar-2026-06` ausente.**
   `radar-2026-05.md` anunciaba "próxima edición: fines de junio". Ya es 22/jun — el doc no existe en el repo.

5. **Supabase Keep-Alive creado el 16/6 no está reflejado en `patagonia-sandbox-experiments.md`.**
   El doc de sandbox menciona el riesgo de auto-pause del free tier pero no sabe que ya hay mitigación activa. Drift temporal menor — no crítico.
