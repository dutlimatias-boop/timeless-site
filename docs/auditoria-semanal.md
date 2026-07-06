# Auditoría Semanal — Timeless
**Fecha:** 2026-07-06
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
| Hotel Patagonia - Bot Demo (Claude test) | `BBbqvxenIswa5Sta` | A/B vs GPT listo. Target original: 1/jun. **5 semanas de deuda.** |
| Hotel Patagonia - RAG Rerank (sub-workflow) | `wU8MTEcUENyqA1Hj` | Sub-workflow conectado al Bot Demo. Originalmente bloqueado por cupo — cupo reseteó el 1/jun, sin excusa para no testar. |
| Suite AI Sales Agent ×4 | múltiples | Reemplazada por Mateo. Monitor/Daily Digest/Cleanup/Demo Generator: `active: false` según docs (ver inconsistencia en Notas). |
| Demos legacy | — | Restaurante, Beauty, Clínica, Inmobiliaria — desactivados, conservar como referencia. |

---

## ⚠️ Alertas conocidas

### 🔴 Críticas

1. **Content Generator Parte A fallando en silencio — sin contenido orgánico por semanas.**
   Error de schema "Contenido" los viernes 10am. LinkedIn de Matías está live pero no recibe posts generados. Canal de adquisición de menor costo variable que tenemos, efectivamente apagado.

2. **Demo Generator inactivo = funnel sin cierre automático.**
   W1/W2/W3/Mateo generan oportunidades que no cierran solas. Sin Demo Generator activo, cada prospecto interesado depende de intervención manual de Matías. No escala.

3. **Secretos hardcodeados — riesgo abierto.**
   OpenAI key activa `sk-...b2wA` + Supabase `service_role` en texto plano en Code Tool de los 5 Bot Demos (nodos desactivados, no borrados). `.json` en `.gitignore` — sin filtración pública confirmada. Migrar a credenciales n8n es el camino correcto; NO rotar de emergencia (rompería Emma en producción y todos los demos).

4. **Backups desfasados — riesgo de pérdida total.**
   Lead Hunter, Outreach Email, Content Generator y Mateo Reply Handler editados el 14/6 y no están exportados a `n8n-workflows/` en el repo. Borrado en n8n Cloud = sin recovery.

5. **A/B test Patagonia sin ejecutar — 5 semanas de deuda.**
   Reset de ejecuciones ocurrió el 1/jun. Los workflows GPT (`fxrIKIn65oZ4o2RN`) y Claude (`BBbqvxenIswa5Sta`) están listos, credenciales configuradas. Sin este test no hay dato para decidir migración de modelo cuando entren nuevos clientes.

### 🟡 Menores

6. **W3 senderName corrupto.** "Mat?as ? Timeless" — encoding UTF-8 roto. Daña credibilidad en cada toque automático diario.

7. **Key OpenAI `sk-...lKIA` pendiente de borrar.** Nada la usa desde migración del 16/6. Verificar "Last used" en platform.openai.com y revocar.

8. **Bug Guest Journey Silent — nodo IF.** Expresión `={{ .Action }}` debe ser `={{ $json.Action }}`. Pendiente OK del usuario (workflow de cliente).

9. **KB de Emma con horarios incorrectos.** Check-in/out desactualizados en Supabase — Emma responde mal a huéspedes reales. Fix de 5 min vía webhook de ingesta.

10. **LinkedIn Access Token expira cada 60 días.** Faltan `LINKEDIN_ACCESS_TOKEN` + `LINKEDIN_PERSON_ID` en n8n Variables. Sin esto, Parte B de Content Generator no puede auto-publicar.

11. **12 webhooks sin autenticación.** Panel API ×6, onboarding, status, baja, ingesta. Riesgo bajo pero superficie abierta.

12. **`radar-2026-06` ausente.** `radar-2026-05.md` anunciaba "próxima edición: fines de junio". Ya pasó — el radar no existe en el repo.

13. **Instagram business sin crear.** Perfil pendiente desde mayo. Según strategy.md era prioridad "esta semana". El canal visual más relevante para captar dueños de hoteles/restaurantes/beauty sigue sin existir.

---

## 🔴 Bloqueos activos

| Bloqueo | Impacto | Resolución |
|---------|---------|------------|
| Ana no disponible | Sun Life pausado, KB desactualizada, OneDrive sin activar | Recontactar con evidencia acumulada en "Weekly Reports" |
| OneDrive sin autorizar | Dashboard con demo data, Guest Journey sin mensajes reales | Ana hace OAuth2 en n8n → activar `Emma — Bot Demo (OneDrive)` |
| Sin WhatsApp del hotel | Emma solo atiende por web | Ana da número cuando retome |
| Check-in/out desactualizado en KB | Emma responde horarios incorrectos a huéspedes reales | Ingestar texto corregido vía webhook Supabase (5 min, sin Ana) |
| Demo Generator inactivo | Funnel sin cierre automático | Resolver conflicto AI Sales Agent Monitor → activar y testear Demo Generator |
| A/B test Patagonia sin ejecutar | Sin datos para decisión de modelo | Activar `BBbqvxenIswa5Sta`, correr 5 preguntas, documentar en `patagonia-sandbox-experiments.md` |

---

## 🎯 Top 3 acciones urgentes esta semana

> Criterio: adquisición sobre producto. El cuello de botella es conseguir clientes, no mejorar el producto.

### 1. 🔴 Corregir Content Generator Parte A (schema "Contenido")
**Impacto directo en adquisición.** Sin posts generados, no hay presencia orgánica en LinkedIn/Instagram. Es el único canal que genera inbound sin costo variable por acción, y lleva varias semanas apagado de facto.
**Acción:** abrir workflow `LnDGBsIJStSGp0os` en n8n → identificar el nodo Parte A que falla → corregir el schema que espera OpenAI → testear con corrida manual → exportar `.json` actualizado al repo.

### 2. 🔴 Corregir W3 senderName encoding (UTF-8)
**Impacto en credibilidad del pipeline activo.** Cada follow-up sale con "Mat?as ? Timeless" — un prospecto que lo recibe ve un sistema roto. El daño se acumula en el pipeline diariamente.
**Acción:** en workflow `DG1KRnNlMewrbZW9`, localizar nodo que construye el senderName → reemplazar con string ASCII (`Matias de Timeless`) o forzar encoding UTF-8. Testear con corrida manual.

### 3. 🟡 Ejecutar A/B test Patagonia (5 semanas de deuda)
**Impacto estratégico.** Lleva 5 semanas de retraso con los workflows listos. La decisión de stack de modelo para nuevos clientes está bloqueada por no haber ejecutado esto.
**Acción:** activar `Hotel Patagonia - Bot Demo (Claude test)` (`BBbqvxenIswa5Sta`), mandar las mismas 5 preguntas a ambos bots, registrar resultado en `docs/patagonia-sandbox-experiments.md`. Si Claude gana → habilitar prompt caching en Anthropic Console.

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
| Contenido orgánico | ⚠️ Roto | LinkedIn de Matías live. Content Generator Parte A fallando → sin nuevos posts hace semanas. |
| Instagram business | ❌ Sin crear | Perfil pendiente desde mayo. Prioridad según strategy.md. |
| Agendado de demos | ✅ Activo | Calendly "Demo Timeless — 15 min". Lun–Vie 18–22 + Sáb 9–13 CET. |

---

## 🧪 Sandbox Patagonia

| Experimento | Workflow ID | Estado |
|-------------|-------------|--------|
| Bot GPT-4o-mini + reranking Cohere | `fxrIKIn65oZ4o2RN` | ✅ Activo |
| Bot Claude (claude-sonnet-4-6) + reranking | `BBbqvxenIswa5Sta` | ⏸ Inactivo — **5 semanas de deuda** (target: 1/jun) |
| Sub-workflow RAG Rerank (Cohere rerank-v3.5) | `wU8MTEcUENyqA1Hj` | Conectado al Bot Demo, sin secrets hardcodeados ✅ |

**A/B pendiente — 5 semanas de deuda:**
- Mismo reranking (top 4 de 20 candidatos), mismo prompt, mismo `client_id: 'Hotel_Patagonia'`
- Variables a comparar: modelo (`gpt-4o-mini` vs `claude-sonnet-4-6`), costo/token, latencia, respeto JSON estricto
- Preguntas sugeridas: precios, mascotas, check-in, cancelación, actividades (set de 5 del doc original)
- Si Claude gana → habilitar prompt caching (créditos USD 10 disponibles, ahorro ~90% tokens cacheados)

**Credenciales listas:** `anthropicApi` `3NLGSIOWRqFxCJ0D` ✅ · `cohereApi` `wh0wx6aRSMiZYnsw` ✅

---

## 📝 Notas — Inconsistencias detectadas entre docs

1. **AI Sales Agent — estado contradictorio (carryover sin resolver).**
   `timeless-saas-overview.md` (2026-05-30): Monitor `⚠️ Activo EN REVISIÓN`, Daily Digest y Cleanup `✅ Activo`.
   `status.md` e `infrastructure.md` (post 2026-06-14): los 4 workflows de la suite están `active: false`, reemplazados por Mateo.
   Estado real irresoluble desde docs. **Requiere verificación directa en n8n.** Si Monitor está activo: ~8.640 ejec/mes contra límite de 2.500 = cupo reventado.

2. **Pricing inconsistente entre docs (carryover).**
   `timeless-saas-overview.md`: "$79/mes + setup $200–500". `strategy.md`: "$49 LATAM / $99 Europa" (lanzamiento).
   `strategy.md` es la fuente correcta. `timeless-saas-overview.md` necesita actualización.

3. **A/B test sin update en `patagonia-sandbox-experiments.md`.**
   El doc marca "a correr el 1 de junio". Hoy es 6 de julio — 5 semanas sin update. No hay registro de ejecución ni resultado.

4. **`radar-2026-06` ausente.**
   `radar-2026-05.md` anunciaba "próxima edición: fines de junio". Fines de junio ya pasó — el doc no existe en el repo.

5. **`W2 campo apertura` sin resolver.**
   GPT genera una apertura personalizada pero no se usa en el email. Tokens desperdiciados en cada corrida.

6. **Backups de 4 workflows editados el 14/6 siguen sin commitear.**
   `n8n-workflows/` en el repo tiene solo 5 `.json` — Lead Hunter, Outreach, Content Generator y Mateo no están. Persiste desde la auditoría anterior.
