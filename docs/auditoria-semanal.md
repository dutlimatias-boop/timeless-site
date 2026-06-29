# Auditoría Semanal — Timeless
**Fecha:** 2026-06-29
**Generado por:** Agente de auditoría automático

---

## ✅ Workflows activos (según docs)

### Plataforma / Marketing
| Workflow | ID | Trigger | Propósito |
|----------|----|---------|-----------|
| Timeless — Lead Hunter | `uhtAIR0uKDxPzVXn` | Lunes 8am | Google Maps → Place Details (website+tel) → AI scoring ≥7 → CRM. City rotation ISO week. Verificado 2026-06-14. |
| Timeless — Outreach Email | `RJArwDBVO9X9GbAp` | Martes 10am | Lee `Tiene web?` del CRM → Hunter.io → cold email desde matiidutlii@gmail.com con link `/?hotel=` |
| Timeless — Follow-up Bot | `DG1KRnNlMewrbZW9` | Diario 9am | Secuencia 4 toques (día 1, 5, 12, 30) a prospectos sin respuesta. ⚠️ senderName corrupto ("Mat?as ? Timeless"). |
| Timeless — Mateo Reply Handler | `L1Cd7ZGaJkIVJn85` | Gmail trigger (team@timelessai.pro) | Clasifica reply con OpenAI → speech por categoría → alerta Telegram. Link Calendly en LLAMADA. |
| Timeless — Content Generator | `LnDGBsIJStSGp0os` | Vie 10am + Diario 11am | Posts LinkedIn/Instagram (Parte A) + auto-publica aprobados (Parte B). ⚠️ Parte A fallando por schema "Contenido". |
| Timeless — Unsubscribe (Baja) | `Rl85GmT7EnStTyIY` | POST webhook | Suprime contacto de futuros envíos. Wired a `baja.html`. |
| Timeless — Onboarding v2 | `WySJmWJPvWbFUwXx` | POST /onboarding-hotel | Form 6 verticales → ingest KB → smoke test → email bienvenida. Migrado a `OpenAI W1W2` el 16/6. End-to-end verde. |
| Timeless — Status Endpoint | `JF7LKuT4TGO6x4Fo` | GET /onboarding-status | Polling de estado por job_id |
| Timeless — Ingesta de documentos | `61BW87IVFtBdLEdU` | POST /ingest-document | Ingestión RAG genérica a Supabase |
| Timeless — Error Notification | `XnfBtmWah9W0TXfj` | Error trigger | Cableado en 7 workflows de plataforma/marketing. Onboarding v2 excluido — intencional. |
| Timeless — Supabase Keep-Alive | `oYbxM2pPG195VPB8` | Cron diario 6am | Query trivial a `documents` para evitar auto-pause del free tier. Creado 2026-06-16. |

### Sun Life Beach Hotel
| Workflow | ID | Propósito |
|----------|----|-----------|
| Sunlife — Bot Demo | `6tGhMpKls5NbFgCF` | Emma activa en sunlifebeachhotel.com vía widget. Logs a Google Sheets. |
| Sunlife — Panel API | `2v2fI1emw91k5Hh3` | API que alimenta el dashboard de Ana |
| Sunlife — Reporte Semanal Silencioso | `JoNrXeN1GgvRGQeJ` | Acumula métricas en "Weekly Reports" sin email. Fix typo publicado 2026-06-16. |
| Sunlife — Guest Journey (Silent) | `EuW7N0FwaIrb0sS7` | Detecta check-ins/checkouts, loga en "Guest Journey Log". ⚠️ Bug IF `Has Actions` pendiente fix. |

### Sandbox Patagonia
| Workflow | ID | Propósito |
|----------|----|-----------|
| Hotel Patagonia - Bot Demo | `fxrIKIn65oZ4o2RN` | Bot GPT-4o-mini con reranking Cohere (`buscar_info_hotel`) — activo |
| Panel - Hotel Patagonia API | — | Demo panel del sandbox |

---

## ⏸️ Workflows pausados/inactivos

| Workflow | ID | Motivo |
|----------|----|--------|
| Sunlife — Reporte Semanal (con email) | `lEzgYNVXVP7m9HkG` | Pausado — Ana no disponible. Silencioso corre en su lugar. |
| Emma — Bot Demo (OneDrive) | `Cy3Rlw7xDRFvm7mh` | Pendiente OAuth2 de Ana para su Excel en OneDrive. |
| Hotel Patagonia - Bot Demo (Claude test) | `BBbqvxenIswa5Sta` | A/B vs GPT listo. Target original: 1/jun. **4 semanas de deuda.** |
| Hotel Patagonia - RAG Rerank (sub-workflow) | `wU8MTEcUENyqA1Hj` | Sub-workflow conectado al Bot Demo. Bloqueado originalmente por cupo — cupo reseteado el 1/jun. |
| Suite AI Sales Agent ×4 | múltiples | Reemplazada por Mateo. Monitor/Daily Digest/Cleanup/Demo Generator: `active: false` según docs. |
| Demos legacy | — | Restaurante, Beauty, Clínica, Inmobiliaria — desactivados, conservar como referencia. |

---

## ⚠️ Alertas conocidas

### 🔴 Críticas

1. **A/B test Patagonia sin ejecutar — 4 semanas de deuda.**
   Reset de ejecuciones ocurrió el 1/jun. A 29/06 hay cupo disponible. Los workflows GPT (`fxrIKIn65oZ4o2RN`) y Claude (`BBbqvxenIswa5Sta`) están listos, credenciales configuradas (`anthropicApi 3NLGSIOWRqFxCJ0D`, `cohereApi wh0wx6aRSMiZYnsw`). Sin este test no hay dato para decidir migración de modelo cuando entren nuevos clientes.

2. **Content Generator Parte A fallando en silencio — sin posts desde el fallo.**
   Error de schema "Contenido" los viernes 10am. Sin contenido orgánico en LinkedIn/Instagram. Canal de menor costo de adquisición que tenemos, y está apagado de facto.

3. **Demo Generator inactivo = funnel sin cierre automático.**
   Cuando un prospecto responde "quiero demo", el cierre es 100% manual. W1/W2/W3 generan oportunidades que se pierden sin conversión automatizada.

4. **Secretos hardcodeados — riesgo abierto.**
   OpenAI key activa `sk-...b2wA` + Supabase `service_role` en texto plano en Code Tool de los 5 Bot Demos (nodos desactivados, no borrados). `.json` en `.gitignore` — sin filtración pública confirmada. Migrar a credenciales n8n es el camino correcto; NO rotar de emergencia (rompería Emma en producción).

5. **Backups desfasados — riesgo de pérdida total.**
   Lead Hunter, Outreach Email, Content Generator y Mateo Reply Handler editados el 14/6 y no están exportados a `n8n-workflows/` en el repo. Borrado en n8n Cloud = sin recovery.

### 🟡 Menores

6. **W3 senderName corrupto.** "Mat?as ? Timeless" — encoding UTF-8 roto. Daña credibilidad en cada toque automático diario.

7. **Key OpenAI `sk-...lKIA` pendiente de borrar.** Nada la usa desde migración del 16/6. Verificar "Last used" en platform.openai.com y revocar.

8. **Bug Guest Journey Silent — nodo IF.** Expresión `={{ .Action }}` debe ser `={{ $json.Action }}`. Fix pendiente OK del usuario (workflow de cliente).

9. **KB de Emma con horarios incorrectos.** Check-in/out desactualizados en Supabase — Emma responde mal a huéspedes reales. Fix: 5 min vía webhook de ingesta.

10. **LinkedIn Access Token expira cada 60 días.** Faltan `LINKEDIN_ACCESS_TOKEN` + `LINKEDIN_PERSON_ID` en n8n Variables. Sin esto, Parte B de Content Generator no puede auto-publicar.

11. **12 webhooks sin autenticación.** Panel API ×6, onboarding, status, baja, ingesta. Riesgo bajo pero superficie abierta.

12. **radar-2026-06 ausente.** `radar-2026-05.md` anunciaba "próxima edición: fines de junio". Ya pasó fines de junio — el radar actualizado no existe en el repo.

---

## 🔴 Bloqueos activos

| Bloqueo | Impacto | Resolución |
|---------|---------|------------|
| Ana no disponible | Sun Life pausado, KB desactualizada, OneDrive sin activar | Recontactar con evidencia acumulada en "Weekly Reports" — llevan ya varias semanas de conversaciones |
| OneDrive sin autorizar | Dashboard con demo data, Guest Journey sin mensajes reales | Ana hace OAuth2 en n8n → activar `Emma — Bot Demo (OneDrive)` |
| Sin WhatsApp del hotel | Emma solo atiende por web | Ana da número cuando retome |
| Check-in/out desactualizado en KB | Emma responde horarios incorrectos a huéspedes reales | Ingestar texto corregido vía webhook Supabase (5 min) |
| Demo Generator inactivo | Funnel sin cierre automático | Verificar estado AI Sales Agent Monitor → apagarlo → activar y testear Demo Generator |
| A/B test Patagonia sin ejecutar | Sin datos para decisión de modelo | Activar `BBbqvxenIswa5Sta`, correr 5 preguntas, documentar resultado en `patagonia-sandbox-experiments.md` |

---

## 🎯 Top 3 acciones urgentes esta semana

> Criterio: adquisición sobre producto. El cuello de botella es conseguir clientes, no mejorar el producto.

### 1. 🔴 Corregir Content Generator Parte A (schema "Contenido")
**Impacto directo en adquisición.** Sin posts generados, no hay presencia orgánica en LinkedIn/Instagram. Canal de adquisición activo que está efectivamente apagado. Es el único canal que genera inbound sin costo variable por acción.
**Acción:** abrir workflow `LnDGBsIJStSGp0os` en n8n → identificar el nodo de Parte A que falla → corregir el schema que espera OpenAI → testear con corrida manual → exportar `.json` actualizado al repo.

### 2. 🔴 Corregir W3 senderName encoding (UTF-8)
**Impacto en credibilidad del pipeline activo.** Cada follow-up sale con "Mat?as ? Timeless" — un prospecto que lo recibe ve un sistema roto. El daño se acumula en todo el pipeline diariamente y afecta el ratio de respuesta de W3.
**Acción:** en workflow `DG1KRnNlMewrbZW9`, localizar el nodo que construye el senderName, reemplazar con string ASCII (`Matias de Timeless`) o forzar encoding UTF-8 correcto. Testear con corrida manual.

### 3. 🟡 Ejecutar A/B test Patagonia (4 semanas de deuda)
**Impacto estratégico — no bloquea adquisición hoy pero la desbloquea más adelante.** La decisión de migrar a Claude o confirmar GPT como stack de producción depende de este test. Lleva 4 semanas de retraso con los workflows listos.
**Acción:** activar `Hotel Patagonia - Bot Demo (Claude test)` (`BBbqvxenIswa5Sta`), mandar las mismas 5 preguntas a ambos bots, registrar resultado en `docs/patagonia-sandbox-experiments.md`. Si Claude gana, habilitar prompt caching en Anthropic Console.

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
| Outreach (W2) | ✅ Activo | Lee dominio real desde CRM. |
| Follow-up (W3) | ✅ Activo | ⚠️ senderName "Mat?as ? Timeless" — UTF-8 roto |
| Gestión replies (Mateo) | ✅ Activo | Speech por categoría + Calendly automático en LLAMADA |
| Demo automática | ⏸ Inactivo | Demo Generator apagado — hueco más costoso del funnel |
| Landing/demo | ✅ Live | `/?hotel=NombreHotel` muestra demo contextualizada |
| Contenido orgánico | ⚠️ Roto | LinkedIn de Matías live. Parte A de Content Generator fallando → sin nuevos posts. |
| Agendado de demos | ✅ Activo | Calendly "Demo Timeless — 15 min". Lun–Vie 18–22 + Sáb 9–13 CET. |

---

## 🧪 Sandbox Patagonia

| Experimento | Workflow ID | Estado |
|-------------|-------------|--------|
| Bot GPT-4o-mini + reranking Cohere | `fxrIKIn65oZ4o2RN` | ✅ Activo |
| Bot Claude (claude-sonnet-4-6) + reranking | `BBbqvxenIswa5Sta` | ⏸ Inactivo — activar para A/B. **4 semanas de deuda.** |
| Sub-workflow RAG Rerank (Cohere rerank-v3.5) | `wU8MTEcUENyqA1Hj` | Conectado al Bot Demo, sin secrets hardcodeados ✅ |

**A/B pendiente — 4 semanas de deuda (target original: 1/jun):**
- Mismo reranking (top 4 de 20 candidatos), mismo prompt, mismo `client_id: 'Hotel_Patagonia'`
- Variables a comparar: modelo (`gpt-4o-mini` vs `claude-sonnet-4-6`), costo/token, latencia, respeto JSON estricto
- Preguntas sugeridas: precios, mascotas, check-in, cancelación, actividades (set de 5)
- Si Claude gana → habilitar prompt caching en Anthropic Console (créditos USD 10 disponibles) → ~90% ahorro en tokens cacheados

**Credenciales listas:** `anthropicApi` `3NLGSIOWRqFxCJ0D` ✅ · `cohereApi` `wh0wx6aRSMiZYnsw` ✅

---

## 📝 Notas — Inconsistencias detectadas entre docs

1. **AI Sales Agent — estado contradictorio (sin resolver desde semanas anteriores).**
   `timeless-saas-overview.md` (2026-05-30): Monitor `⚠️ Activo EN REVISIÓN`, Daily Digest y Cleanup `✅ Activo`.
   `status.md` e `infrastructure.md` (post 2026-06-14): los 4 workflows de la suite están `active: false`, reemplazados por Mateo.
   Estado real irresoluble desde docs. **Requiere verificación directa en n8n.** Si Monitor está activo: ~8.640 ejec/mes contra límite 2.500 = techo reventado y cupo de junio en riesgo.

2. **Pricing inconsistente entre docs (carryover).**
   `timeless-saas-overview.md`: "$79/mes + setup $200–500". `strategy.md`: "$49 LATAM / $99 Europa" (lanzamiento).
   `strategy.md` es la fuente correcta. Actualizar `timeless-saas-overview.md` para evitar confusión en pitch.

3. **A/B test sin update en `patagonia-sandbox-experiments.md`.**
   El doc marca "a correr el 1 de junio". Hoy es 29 de junio y no hay registro de ejecución ni resultado. Cuatro semanas sin update — requiere acción o nota explicando el retraso.

4. **`radar-2026-06` ausente.**
   `radar-2026-05.md` anunciaba "próxima edición: fines de junio". Fines de junio ya pasó — el doc no existe en el repo.

5. **`W2 campo apertura` sin resolver.**
   El roadmap menciona que GPT genera una apertura personalizada pero no se usa en el email. Es ruido en el workflow y tokens desperdiciados. Pequeño, pero acumulado en cada corrida.
