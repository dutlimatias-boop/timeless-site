# Auditoría Semanal — Timeless
**Fecha:** 2026-07-20
**Generado por:** Agente de auditoría automático

---

## ✅ Workflows activos (según docs)

### Marketing y ventas (sistema Mateo)
| Workflow | ID | Trigger | Propósito |
|----------|----|---------|-----------|
| Timeless — Lead Hunter | `uhtAIR0uKDxPzVXn` | Lunes 8am | Google Maps → Place Details (website+tel) → AI scoring ≥7 → CRM. City rotation ISO week. Verificado 2026-06-14. |
| Timeless — Outreach Email | `RJArwDBVO9X9GbAp` | Martes 10am | Lee `Tiene web?` del CRM → Hunter.io → cold email desde matiidutlii@gmail.com con link `/?hotel=` |
| Timeless — Follow-up Bot | `DG1KRnNlMewrbZW9` | Diario 9am | Secuencia 4 toques (día 1, 5, 12, 30) a prospectos sin respuesta. ⚠️ senderName corrupto ("Mat?as ? Timeless"). |
| Timeless — Mateo Reply Handler | `L1Cd7ZGaJkIVJn85` | Gmail trigger (team@timelessai.pro) | Clasifica reply con OpenAI → speech por categoría → alerta Telegram. Link Calendly en LLAMADA. |
| Timeless — Content Generator | `LnDGBsIJStSGp0os` | Vie 10am + Diario 11am | Posts LinkedIn/Instagram (Parte A) + auto-publica aprobados (Parte B). ⚠️ Parte A fallando por schema "Contenido". |
| Timeless — Unsubscribe (Baja) | `Rl85GmT7EnStTyIY` | POST webhook | Suprime contacto de futuros envíos. Wired a `baja.html`. |

### Plataforma (compartidos)
| Workflow | ID | Trigger | Propósito |
|----------|----|---------|-----------|
| Timeless — Onboarding v2 | `WySJmWJPvWbFUwXx` | POST /onboarding-hotel | Form 6 verticales → ingest KB → smoke test → email bienvenida. Migrado a `OpenAI W1W2` el 16/6. End-to-end verde. |
| Timeless — Status Endpoint | `JF7LKuT4TGO6x4Fo` | GET /onboarding-status | Polling de estado por job_id |
| Timeless — Ingesta de documentos | `61BW87IVFtBdLEdU` | POST /ingest-document | Ingestión RAG genérica a Supabase |
| Timeless — Error Notification | `XnfBtmWah9W0TXfj` | Error trigger | Cableado en 7 workflows de plataforma/marketing. Onboarding v2 excluido intencionalmente. |
| Timeless — Supabase Keep-Alive | `oYbxM2pPG195VPB8` | Cron diario 6am | Query trivial a `documents` para evitar auto-pause del free tier. Creado 2026-06-16. |

### Sun Life Beach Hotel
| Workflow | ID | Propósito |
|----------|----|-----------|
| Sunlife — Bot Demo | `6tGhMpKls5NbFgCF` | Emma activa en sunlifebeachhotel.com vía widget. Logs a Google Sheets. |
| Sunlife — Panel API | `2v2fI1emw91k5Hh3` | API que alimenta el dashboard de Ana |
| Sunlife — Reporte Semanal Silencioso | `JoNrXeN1GgvRGQeJ` | Acumula métricas en "Weekly Reports" sin email. Fix typo publicado 2026-06-16. |
| Sunlife — Guest Journey (Silent) | `EuW7N0FwaIrb0sS7` | Detecta check-ins/checkouts, loga en "Guest Journey Log". ⚠️ Bug IF `Has Actions` pendiente fix manual. |

### Sandbox Patagonia
| Workflow | ID | Propósito |
|----------|----|-----------|
| Hotel Patagonia - Bot Demo | `fxrIKIn65oZ4o2RN` | Bot GPT-4o-mini con reranking Cohere activo |
| Panel - Hotel Patagonia API | — | Demo panel del sandbox |

---

## ⏸️ Workflows pausados/inactivos

| Workflow | ID | Motivo |
|----------|----|--------|
| Sunlife — Reporte Semanal (con email) | `lEzgYNVXVP7m9HkG` | Pausado — Ana no disponible. Silencioso corre en su lugar. |
| Emma — Bot Demo (OneDrive) | `Cy3Rlw7xDRFvm7mh` | Pendiente OAuth2 de Ana para su Excel en OneDrive. |
| Hotel Patagonia - Bot Demo (Claude test) | `BBbqvxenIswa5Sta` | A/B vs GPT listo. Target original: 1/jun. **7 semanas de deuda.** |
| Hotel Patagonia - RAG Rerank (sub-workflow) | `wU8MTEcUENyqA1Hj` | Conectado al Bot Demo GPT. Sin testeo post-reseteo de ejecuciones. |
| Suite AI Sales Agent ×4 | múltiples | Reemplazada por Mateo. Monitor/Daily Digest/Cleanup/Demo Generator: `active: false` según docs más recientes. Ver Nota 1. |
| Demos legacy | — | Restaurante, Beauty, Clínica, Inmobiliaria — desactivados, conservar como referencia. |

---

## ⚠️ Alertas conocidas

### 🔴 Críticas

1. **Content Generator Parte A fallando en silencio — sin contenido orgánico por >4 semanas.**
   Error de schema "Contenido" los viernes 10am. LinkedIn de Matías está live pero no recibe posts generados. Canal de adquisición con costo variable cero, efectivamente apagado desde junio.

2. **Demo Generator inactivo = funnel sin cierre automático.**
   W1/W2/W3/Mateo generan oportunidades que no cierran solas. Sin Demo Generator activo, cada prospecto interesado depende de intervención manual de Matías. No escala.

3. **Secretos hardcodeados — riesgo abierto.**
   OpenAI key activa `sk-...b2wA` + Supabase `service_role` en texto plano en Code Tool de los 5 Bot Demos (nodos desactivados, no borrados). `.json` en `.gitignore` — sin filtración pública confirmada. Migrar a credenciales n8n es el camino correcto; NO rotar de emergencia (rompería Emma en producción y todos los demos).

4. **Backups desfasados — riesgo de pérdida total.**
   Lead Hunter, Outreach Email, Content Generator y Mateo Reply Handler editados el 14/6 y no están exportados a `n8n-workflows/` en el repo. Borrado en n8n Cloud = sin recovery. Persiste por segunda auditoría consecutiva.

5. **A/B test Patagonia sin ejecutar — 7 semanas de deuda.**
   Reset de ejecuciones ocurrió el 1/jun. Los workflows GPT (`fxrIKIn65oZ4o2RN`) y Claude (`BBbqvxenIswa5Sta`) están listos, credenciales configuradas. Sin este test no hay dato para decidir migración de modelo cuando entren nuevos clientes.

### 🟡 Menores

6. **W3 senderName corrupto.** "Mat?as ? Timeless" — encoding UTF-8 roto. Daña credibilidad en cada toque automático diario.

7. **Key OpenAI `sk-...lKIA` pendiente de borrar.** Nada la usa desde migración del 16/6. Verificar "Last used" en platform.openai.com y revocar.

8. **Bug Guest Journey Silent — nodo IF.** Expresión `={{ .Action }}` debe ser `={{ $json.Action }}`. Pendiente OK del usuario (workflow de cliente).

9. **KB de Emma con horarios incorrectos.** Check-in/out desactualizados en Supabase — Emma responde mal a huéspedes reales. Fix de 5 min vía webhook de ingesta (no requiere a Ana).

10. **LinkedIn Access Token expira cada 60 días.** Faltan `LINKEDIN_ACCESS_TOKEN` + `LINKEDIN_PERSON_ID` en n8n Variables. Sin esto, Parte B de Content Generator no puede auto-publicar en LinkedIn.

11. **12 webhooks sin autenticación.** Panel API ×6, onboarding, status, baja, ingesta. Riesgo bajo pero superficie abierta.

12. **`radar-2026-06` ausente.** `radar-2026-05.md` anunciaba "próxima edición: fines de junio". Ya pasó — el radar no existe en el repo.

13. **Instagram business sin crear.** Perfil pendiente desde mayo. El canal visual más relevante para captar dueños de hoteles/restaurantes/beauty sigue sin existir.

---

## 🔴 Bloqueos activos

| Bloqueo | Impacto | Resolución |
|---------|---------|------------|
| Ana no disponible | Sun Life pausado, KB desactualizada, OneDrive sin activar | Recontactar con evidencia acumulada en "Weekly Reports" |
| OneDrive sin autorizar | Dashboard con demo data, Guest Journey sin mensajes reales | Ana hace OAuth2 en n8n → activar `Emma — Bot Demo (OneDrive)` |
| Sin WhatsApp del hotel | Emma solo atiende por web | Ana da número cuando retome |
| Check-in/out desactualizado en KB | Emma responde horarios incorrectos a huéspedes reales | Ingestar texto corregido vía webhook Supabase (sin necesitar a Ana) |
| Demo Generator inactivo | Funnel sin cierre automático | Testear flujo completo y activar |
| A/B test Patagonia sin ejecutar | Sin datos para decisión de modelo | Activar `BBbqvxenIswa5Sta`, correr 5 preguntas, documentar resultado |

---

## 🎯 Top 3 acciones urgentes esta semana

> Criterio: adquisición sobre producto. El cuello de botella es conseguir clientes, no mejorar el producto.

### 1. 🔴 Corregir Content Generator Parte A (schema "Contenido")
**Impacto directo en adquisición.** Sin posts generados, no hay presencia orgánica en LinkedIn/Instagram. Canal de costo variable cero, apagado de facto hace más de un mes. Cada semana que pasa es contenido de adquisición que no llega a futuros prospectos.
**Acción:** abrir workflow `LnDGBsIJStSGp0os` en n8n → identificar nodo de Parte A que falla por schema "Contenido" → corregir → testear con corrida manual → exportar `.json` actualizado al repo.

### 2. 🔴 Corregir W3 senderName encoding (UTF-8)
**Impacto en credibilidad del pipeline activo.** Cada follow-up sale con "Mat?as ? Timeless" — un prospecto que lo recibe percibe un sistema roto. El daño se acumula en el pipeline diariamente. Fix de 5 minutos con impacto en cada corrida del cron diario.
**Acción:** en workflow `DG1KRnNlMewrbZW9`, localizar nodo que construye el senderName → reemplazar con string limpio (`Matias de Timeless`) o forzar encoding correcto. Testear con corrida manual.

### 3. 🟡 Exportar backups de los 4 workflows editados el 14/6
**Riesgo de pérdida total.** Lead Hunter, Outreach Email, Content Generator y Mateo Reply Handler no tienen copia en el repo desde sus ediciones de junio. Si n8n Cloud pierde esos workflows, no hay recovery. 10 minutos de trabajo para eliminar el riesgo.
**Acción:** desde n8n, exportar JSON de cada uno → guardar en `n8n-workflows/` → commit + push.

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
| Contenido orgánico | ⚠️ Roto | LinkedIn de Matías live. Content Generator Parte A fallando → sin nuevos posts hace >4 semanas. |
| Instagram business | ❌ Sin crear | Perfil pendiente desde mayo. Prioridad según strategy.md. |
| Agendado de demos | ✅ Activo | Calendly "Demo Timeless — 15 min". Lun–Vie 18–22 + Sáb 9–13 CET. |

---

## 🧪 Sandbox Patagonia

| Experimento | Workflow ID | Estado |
|-------------|-------------|--------|
| Bot GPT-4o-mini + reranking Cohere | `fxrIKIn65oZ4o2RN` | ✅ Activo |
| Bot Claude (claude-sonnet-4-6) + reranking | `BBbqvxenIswa5Sta` | ⏸ Inactivo — **7 semanas de deuda** (target original: 1/jun) |
| Sub-workflow RAG Rerank (Cohere rerank-v3.5) | `wU8MTEcUENyqA1Hj` | Conectado al Bot Demo, sin secrets hardcodeados ✅ |

**A/B pendiente — 7 semanas de deuda:**
- Mismo reranking (top 4 de 20 candidatos), mismo prompt, mismo `client_id: 'Hotel_Patagonia'`
- Variables a comparar: modelo (`gpt-4o-mini` vs `claude-sonnet-4-6`), costo/token, latencia, respeto JSON estricto
- Preguntas sugeridas: precios, mascotas, check-in, cancelación, actividades (set de 5 del doc original)
- Si Claude gana → habilitar prompt caching (créditos USD 10 disponibles, ahorro ~90% tokens cacheados)

**Credenciales listas:** `anthropicApi` `3NLGSIOWRqFxCJ0D` ✅ · `cohereApi` `wh0wx6aRSMiZYnsw` ✅

---

## 📝 Notas — Inconsistencias detectadas entre docs

1. **AI Sales Agent — estado contradictorio.**
   `timeless-saas-overview.md` (2026-05-30): Monitor `⚠️ Activo EN REVISIÓN`, Daily Digest y Cleanup `✅ Activo`.
   `status.md` e `infrastructure.md` (post 2026-06-14): los 4 workflows de la suite están `active: false`, reemplazados por Mateo.
   Estado real irresoluble desde docs. **Requiere verificación directa en n8n.** Si Monitor sigue activo: ~8.640 ejec/mes vs límite de 2.500 = cupo reventado y otros workflows fallando.

2. **Pricing inconsistente entre docs.**
   `timeless-saas-overview.md`: "$79/mes + setup $200–500". `strategy.md`: "$49 LATAM / $99 Europa" (lanzamiento).
   `strategy.md` es la fuente correcta. `timeless-saas-overview.md` necesita actualización.

3. **A/B test sin update en `patagonia-sandbox-experiments.md`.**
   El doc marca "a correr el 1 de junio". Hoy es 20 de julio — 7 semanas sin update. No hay registro de ejecución ni resultado. Persiste desde auditoría anterior.

4. **`radar-2026-06` ausente.**
   `radar-2026-05.md` anunciaba "próxima edición: fines de junio". El doc no existe en el repo. Persiste desde auditoría anterior.

5. **W2 campo apertura sin usar.**
   GPT genera una apertura personalizada pero no se integra en el email. Tokens desperdiciados en cada corrida.

6. **Backups de 4 workflows editados el 14/6 siguen sin commitear.**
   `n8n-workflows/` en el repo tiene solo 5 `.json` — Lead Hunter, Outreach, Content Generator y Mateo no están. Persiste por segunda auditoría consecutiva — riesgo creciente.
