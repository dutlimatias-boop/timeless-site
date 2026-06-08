# Auditoría Semanal — Timeless
**Fecha:** 2026-06-08
**Generado por:** Agente de auditoría automático

---

## ✅ Workflows activos (según docs)

### Plataforma
| Workflow | Trigger | Propósito |
|----------|---------|-----------|
| Timeless — Lead Hunter | Lunes 8am | Google Maps → scoring OpenAI (≥7) → CRM. City rotation ISO week (6 ciudades). |
| Timeless — Outreach Email | Martes 10am | Hunter.io → cold email personalizado con link `/?hotel=` |
| Timeless — Follow-up Bot | Diario 9am | Secuencia 4 toques (día 1, 5, 12, 30) a prospectos sin respuesta |
| Timeless — Mateo Reply Handler | Gmail event (team@timelessai.pro) | Clasifica reply → speech por categoría → alerta Telegram. Link Calendly en LLAMADA. |
| Timeless — AI Sales Agent (Monitor) | **Cada 5 min** | ⚠️ VER ALERTAS — en conflicto con Mateo, revienta el cupo de ejecuciones |
| Timeless — AI Sales Agent (Daily Digest) | Schedule | Digest diario de actividad de ventas |
| Timeless — AI Sales Agent (Cleanup) | Schedule | Limpieza de datos del agente |
| Timeless — Onboarding v2 | POST /onboarding-hotel | Ingest KB → smoke test → email bienvenida al cliente |
| Timeless — Status Endpoint | GET /onboarding-status | Polling de estado de onboarding (4s desde el form) |
| Timeless — Ingesta de documentos | POST /ingest-document | Ingest RAG genérica a Supabase |
| Timeless — Error Notification | Error trigger | Alertas de errores del sistema |

### Sun Life Beach Hotel
| Workflow | Propósito |
|----------|-----------|
| Sunlife — Bot Demo | Emma activa en sunlifebeachhotel.com vía widget |
| Sunlife — Panel API | API que alimenta el dashboard de Ana |
| Sunlife — Reporte Semanal Silencioso | Acumula métricas en "Weekly Reports" sin molestar a Ana |
| Sunlife — Guest Journey (Silent) | Detecta check-ins/outs, loga en "Guest Journey Log" sin disparar mensajes |

### Sandbox Patagonia
| Workflow | Propósito |
|----------|-----------|
| Hotel Patagonia - Bot Demo | Bot GPT + reranking Cohere — listo para testear (quota reseteó 1/jun) |
| Panel - Hotel Patagonia API | Demo panel del sandbox |

---

## ⏸️ Workflows pausados/inactivos

| Workflow | Motivo documentado |
|----------|--------------------|
| Timeless — Content Generator | Perfiles LinkedIn personal e Instagram business sin crear — no tiene destino donde publicar |
| Timeless — AI Sales Agent (Demo Generator) | Listo para activar; bloqueado por conflicto con Monitor — hueco crítico en el funnel |
| Sunlife — Reporte Semanal (con email a Ana) | Pausado — Ana no disponible; el Silencioso acumula mientras tanto |
| Emma — Bot Demo (OneDrive) | Pendiente OAuth2 de Ana para autorizar OneDrive |
| Hotel Patagonia - Bot Demo (Claude test) | Inactivo — A/B vs GPT listo pero pendiente de ejecutar desde el 1/jun |
| Hotel Patagonia - RAG Rerank (sub-workflow) | Inactivo — se activa junto con el A/B test |

---

## ⚠️ Alertas conocidas

### 🔴 Críticas

1. **AI Sales Agent Monitor revienta el plan n8n.**
   Corre cada 5 min = ~8.640 ejec/mes. Plan Starter: 2.500/mes. En mayo llegó a 2.500/2.500.
   **Acción:** apagar el Monitor o reemplazar su trigger cron por evento (Gmail/webhook). Sistema híbrido Mateo-first documentado — implementar.

2. **Secretos hardcodeados en Code Tool viejo del sandbox Patagonia.**
   OpenAI API key (`sk-proj-...`) y Supabase `service_role` secret en texto plano en el nodo desactivado.
   El service_role tiene acceso TOTAL a la DB — incluye datos de Sun Life y Emma.
   **Acción (solo Matías, manual):** rotar ambas keys → configurar como credenciales n8n. Coordinar rotación de Supabase con todos los workflows (Sun Life incluido).

3. **A/B test Patagonia con una semana de deuda.**
   Quota reseteó el 1/jun pero el test no se corrió aún (hoy es 08/jun). Workflows GPT (`fxrIKIn65oZ4o2RN`) y Claude (`BBbqvxenIswa5Sta`) listos. Cada día sin ejecutarlo es cupo desperdiciado del mes.

4. **Demo Generator inactivo = funnel de ventas roto.**
   Cuando un prospecto dice "quiero una demo", no pasa nada automático. El cierre es 100% manual. Sin resolver esto, escalar el outreach no tiene sentido.

### 🟡 Menores

5. **W3 senderName corrompido.** "Mat?as ? Timeless" en emails de follow-up — encoding UTF-8 roto. Daña percepción del cold email.

6. **W2 campo `apertura` sin usar.** GPT genera apertura personalizada, el template del email no la usa. Se genera, se paga, se descarta.

7. **API keys de marketing hardcodeadas en nodos n8n.** OpenAI, Hunter.io y Google Maps en texto plano en workflows de marketing (además del sandbox). Mover a n8n Variables.

8. **KB de Emma con horarios incorrectos.** Check-in/out desactualizados — Emma responde mal a huéspedes reales en sunlifebeachhotel.com.

---

## 🔴 Bloqueos activos

| Bloqueo | Impacto | Resolución |
|---------|---------|------------|
| Ana no disponible (temas personales) | Sun Life pausado, no se puede conectar datos reales, KB desactualizada | Recontactar con evidencia de Emma (Weekly Reports acumulados) |
| OneDrive sin autorizar (Ana) | Dashboard con demo data, Guest Journey sin disparar mensajes reales | Ana completa OAuth2 en n8n → activar `Emma — Bot Demo (OneDrive)` |
| Sin WhatsApp del hotel | Sin canal WhatsApp para Emma | Ana da número cuando retome |
| Sin perfiles sociales (LinkedIn + Instagram) | W4 Content Generator completamente inactivo, sin adquisición orgánica | Crear perfiles esta semana — bloqueante para el canal orgánico |
| Demo Generator inactivo | Funnel de ventas roto en el paso demo | Resolver conflicto con Monitor → activar y testear |
| A/B test sin ejecutar (desde 1/jun) | Sin datos para validar reranking + Claude en sandbox | Correr hoy mismo — semana de retraso |

---

## 🎯 Top 3 acciones urgentes esta semana

**Prioridad: adquisición sobre producto.**

### 1. 🔴 Crear perfiles LinkedIn personal + Instagram business
Es el bloqueo de adquisición orgánica más costoso. W4 Content Generator está listo y genera contenido cada semana — solo falta el destino. LinkedIn personal de Matías es el canal de mayor ROI para B2B LATAM/España. Crear perfiles y conectar W4 desbloquea un canal completo sin código adicional.

### 2. 🔴 Apagar AI Sales Agent Monitor + activar Demo Generator
El Monitor consume ~288 ejec/día innecesariamente y bloquea el margen para activar el Demo Generator. Sin Demo Generator el funnel de ventas tiene un hueco: cuando un prospecto pide una demo, no pasa nada automático. Apagar el Monitor (o cambiar su trigger a evento), luego activar y testear el Demo Generator con un caso real o simulado.

### 3. 🟡 Correr el A/B test Patagonia (ya lleva una semana de deuda)
GPT vs Claude con reranking Cohere. Ambos workflows listos desde el 1/jun sin ejecutar. Mandar 5 preguntas de prueba a ambos bots, documentar calidad/costo/latencia en patagonia-sandbox-experiments.md. Si Claude gana → habilitar prompt caching para -90% en costo de tokens.

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

- **W1:** Activo y testeado. 6 ciudades en rotación ISO. Prospects score ≥7 van al CRM.
- **W2:** Activo. Cold email desde matiidutlii@gmail.com. Problemas conocidos: campo `apertura` no se usa y senderName corrompido (UTF-8).
- **W3:** Activo. 4 toques automáticos a prospects sin respuesta.
- **Mateo:** Activo. Clasifica intenciones con OpenAI, speech por categoría, Calendly en LLAMADA. Sistema funcional.
- **Demo Generator:** ⏸ Inactivo — cuando alguien dice "quiero ver la demo", no pasa nada automático.
- **Adquisición orgánica:** nula — sin perfiles sociales, sin W4 generando contenido.

---

## 🧪 Sandbox Patagonia

**Estado al 2026-06-08:**

| Experimento | Workflow ID | Estado |
|-------------|-------------|--------|
| Bot GPT + reranking Cohere | `fxrIKIn65oZ4o2RN` | Activo — listo para testear |
| Bot Claude (claude-sonnet-4-6) + reranking | `BBbqvxenIswa5Sta` | Inactivo — activar para A/B |
| Sub-workflow RAG Rerank (Cohere) | `wU8MTEcUENyqA1Hj` | Inactivo — activar junto con los bots |

**A/B pendiente (con 1 semana de deuda):**
- Variables: modelo (gpt-4o-mini vs claude-sonnet-4-6). Mismo reranking, mismo prompt.
- Test: 5 preguntas reales de huésped (precios, mascotas, check-in, cancelación, actividades).
- Métricas: % respuestas correctas, costo por token, latencia, respeto del JSON estricto.
- Si Claude gana → habilitar prompt caching (radar 1.5: -90% en tokens cacheados).

**Bloqueo de seguridad abierto:** Code Tool viejo (desactivado pero no borrado) tiene OpenAI key + Supabase service_role en texto plano. El sub-workflow RAG Rerank nuevo usa credenciales n8n correctamente — la deuda aplica al nodo viejo. Rotar keys es independiente del A/B test pero es prioritario.

---

## 📝 Notas — Inconsistencias entre docs

1. **Content Generator: estado contradictorio entre archivos.**
   `timeless-saas-overview.md`: "✅ Activo (pendiente perfiles RRSS)".
   `status.md` e `infrastructure.md`: "⏸ Inactivo".
   Estado correcto: **inactivo** — el workflow puede existir en n8n pero sin destino (LinkedIn/Instagram) no produce output.

2. **Sunlife — Reporte Semanal: dos versiones confundidas.**
   `status.md`: lista solo "Sunlife — Reporte Semanal" como "✓ Activo" sin distinguir los dos workflows.
   `timeless-saas-overview.md`: marca el que tiene email como "⏸ Pausado".
   Estado correcto: el **con email a Ana** está pausado; el **Silencioso** está activo. `status.md` debería distinguirlos.

3. **Pricing desactualizado en `timeless-saas-overview.md`.**
   Dice "$79/mes + setup fee $200-500" como precio base genérico.
   `strategy.md` documenta el pricing real: $49 LATAM / $99 Europa en lanzamiento, $79/$149 post-primeros-3-clientes.
   Riesgo: confusión en un pitch si se cita el overview.

4. **A/B test marcado "a correr el 1 de junio" en los docs — ya pasó.**
   `patagonia-sandbox-experiments.md` y `roadmap.md` tienen esta fecha como target. Actualizar a "pendiente — ejecutar semana 08/06" para evitar confusión en futuras auditorías.
