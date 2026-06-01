# Auditoría Semanal — Timeless
**Fecha:** 2026-06-01
**Generado por:** Agente de auditoría automático

---

## ✅ Workflows activos (según docs)

### Plataforma
| Workflow | Trigger | Propósito |
|----------|---------|-----------|
| Timeless — Lead Hunter | Lunes 8am | Google Maps → scoring OpenAI (≥7) → CRM. City rotation ISO week (6 ciudades). |
| Timeless — Outreach Email | Martes 10am | Hunter.io → cold email personalizado con link `/?hotel=` |
| Timeless — Follow-up Bot | Diario 9am | Secuencia 4 toques (día 1, 5, 12, 30) a prospectos sin respuesta |
| Timeless — Mateo Reply Handler | Gmail event (team@) | Clasifica reply → speech por categoría → alerta Telegram |
| Timeless — Onboarding v2 | POST webhook | Ingest KB → smoke test → email bienvenida |
| Timeless — Status Endpoint | GET webhook | Polling de estado de onboarding (cada 4s desde el form) |
| Timeless — Ingesta de documentos | POST webhook | Ingest RAG genérica a Supabase |
| Timeless — Error Notification | Error trigger | Alertas de errores del sistema |
| Timeless — AI Sales Agent (Daily Digest) | Schedule | Digest diario de actividad de ventas |
| Timeless — AI Sales Agent (Cleanup) | Schedule | Limpieza de datos del agente |
| Timeless — AI Sales Agent (Monitor) | **Cada 5 min** | ⚠️ VER ALERTAS — en conflicto con Mateo, consume cupo masivamente |

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
| Hotel Patagonia - Bot Demo | Bot con reranking Cohere conectado — bloqueado hasta hoy (quota) |
| Panel - Hotel Patagonia API | Demo panel del sandbox |

---

## ⏸️ Workflows pausados/inactivos

| Workflow | Motivo documentado |
|----------|--------------------|
| Timeless — Content Generator | Perfiles LinkedIn personal e Instagram business aún sin crear |
| Timeless — AI Sales Agent (Demo Generator) | Listo para activar y testear — sin este no hay demo automática |
| Sunlife — Reporte Semanal (con email) | Pausado — Ana no disponible; el Silencioso cubre la acumulación |
| Emma — Bot Demo (OneDrive) | Pendiente OAuth2 de Ana para autorizar OneDrive |
| Hotel Patagonia - Bot Demo (Claude test) | Inactivo — listo para A/B vs GPT. Activar hoy (quota reseteó) |
| Hotel Patagonia - RAG Rerank | Sub-workflow del reranking — activar junto al anterior |

---

## ⚠️ Alertas conocidas

### 🔴 Críticas

1. **AI Sales Agent Monitor va a reventar el plan n8n.**
   Corre cada 5 minutos = ~8.640 ejecuciones/mes. El plan Starter cubre 2.500.
   Con marketing activo + bots ya se estaba al límite en mayo.
   **Acción:** reemplazar trigger cron por evento (Gmail/webhook) o apagarlo hasta tener el sistema híbrido listo.

2. **Secretos hardcodeados en el Code Tool del sandbox Patagonia.**
   OpenAI API key (`sk-proj-...`) y Supabase `service_role` secret (`sb_secret_...`) en texto plano.
   La clave de Supabase tiene acceso TOTAL a la DB — incluye datos de Sun Life/Emma.
   **Acción (solo Matías, manual):** rotar ambas keys → mover a credenciales n8n (Header Auth). Coordinar rotación de Supabase porque afecta a todos los workflows de cliente.

3. **A/B test Patagonia desbloqueado hoy.**
   Quota de mayo (2.500/2.500) reseteó el 1 de junio. Ambos workflows (`fxrIKIn65oZ4o2RN` GPT + `BBbqvxenIswa5Sta` Claude) están listos para testear. Si no se ejecuta hoy se pierde el día.

### 🟡 Menores

4. **W3 senderName corrompido.** El nombre del remitente llega como "Mat?as ? Timeless" — encoding UTF-8 roto. Afecta percepción del cold email.

5. **W2 campo `apertura` sin usar.** GPT genera apertura personalizada pero el template del email no la incorpora. Se genera, se paga, se descarta.

6. **Precios desactualizados en `timeless-saas-overview.md`.** Dice "$79/mes + setup fee $200-500" pero la estrategia actual es $49/mes LATAM · $99/mes Europa (lanzamiento), subiendo a $79/$149 después de los primeros 3 clientes.

7. **API keys de marketing hardcodeadas en nodos n8n.** OpenAI, Hunter.io y Google Maps están en texto plano en los workflows de marketing (no solo en el sandbox). Mover a n8n Variables.

---

## 🔴 Bloqueos activos

| Bloqueo | Impacto | Resolución |
|---------|---------|------------|
| Ana no disponible (temas personales) | Sun Life pausado, no se puede conectar datos reales | Recontactar con evidencia de Emma (Weekly Reports acumulados) |
| OneDrive sin autorizar (Ana) | Dashboard con demo data, Guest Journey sin disparar mensajes | Ana completa OAuth2 en n8n → activar `Emma — Bot Demo (OneDrive)` |
| Sin WhatsApp del hotel | Sin canal WhatsApp para Emma | Ana da número cuando retome |
| Check-in/out desactualizados en KB | Emma responde horarios incorrectos a huéspedes reales | Ingestar texto corregido via webhook Supabase |
| Sin perfiles sociales (LinkedIn personal + Instagram) | W4 Content Generator inactivo, sin presencia orgánica | Crear esta semana — es bloqueante para el canal orgánico |
| Demo Generator inactivo | El funnel de ventas tiene un hueco: no hay demo automática | Activar y testear — requisito antes de escalar outreach |

---

## 🎯 Top 3 acciones urgentes esta semana

**Prioridad: adquisición sobre producto.**

### 1. 🔴 Correr el A/B test Patagonia hoy mismo
La quota de n8n reseteó el 1 de junio. Los workflows GPT y Claude están listos. Mandar las 5 preguntas de prueba a ambos bots y comparar calidad/costo/latencia. Si Claude gana → promover. Sin este test no hay datos para migrar la demo.

### 2. 🔴 Apagar AI Sales Agent Monitor (o reemplazar trigger)
Cada día que corre en cron consume ~288 ejecuciones gratuitas. Con clientes activos el plan ya no alcanza. Cambiar a trigger por evento (Gmail hook o webhook) o apagarlo hasta que el sistema híbrido Mateo-first esté listo. Esto desbloquea margen de ejecuciones para el resto del sistema.

### 3. 🔴 Crear perfiles sociales + activar W4 Content Generator
LinkedIn personal de Matías + Instagram business. Desbloquea el único canal de adquisición orgánica que todavía está apagado. W4 genera el contenido automáticamente (viernes 10am) — solo falta el destino.

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

- **W1:** Activo y testeado. Rota 6 ciudades por semana ISO. Prospects con score ≥7 entran al CRM.
- **W2:** Activo. Cold email desde matiidutlii@gmail.com. Problema: campo `apertura` no se usa y senderName corrompido (UTF-8).
- **W3:** Activo. 4 toques automáticos a prospects sin respuesta.
- **Mateo:** Activo. Clasifica intenciones con OpenAI, speech por categoría, Calendly integrado en speech LLAMADA. Sistema funcional.
- **Demo Generator:** ⏸ Inactivo — hueco en el funnel. Cuando alguien dice "quiero ver la demo", no pasa nada automático todavía.
- **Respuesta orgánica:** nula — sin perfiles sociales activos.

---

## 🧪 Sandbox Patagonia

**Estado al 2026-06-01 (quota reseteó hoy):**

| Experimento | Workflow ID | Estado |
|-------------|-------------|--------|
| Bot GPT + reranking Cohere | `fxrIKIn65oZ4o2RN` | Activo — listo para testear |
| Bot Claude + reranking Cohere | `BBbqvxenIswa5Sta` | Inactivo — activar para A/B |
| Sub-workflow RAG Rerank | `wU8MTEcUENyqA1Hj` | Inactivo — activar junto con los bots |

**A/B a correr hoy:**
- Mismo reranking sub-workflow para ambos, mismo system prompt.
- Variables: modelo (gpt-4o-mini vs claude-sonnet-4-6).
- Preguntas: ~5 casos reales de huésped (precios, mascotas, check-in, cancelación, actividades).
- Métricas: % respuestas correctas, costo por token, latencia.
- Si Claude gana → habilitar prompt caching (radar 1.5, -90% costo en tokens cacheados).

**Bloqueo de seguridad pendiente:** Keys hardcodeadas en la versión anterior del Code Tool (el sub-workflow nuevo ya usa credenciales n8n — este punto aplica al nodo viejo desactivado pero no borrado).

---

## 📝 Notas — Inconsistencias entre docs

1. **Content Generator: estado contradictorio.**
   `timeless-saas-overview.md` lo marca como "✅ Activo (pendiente perfiles RRSS)".
   `status.md` e `infrastructure.md` lo marcan como "⏸ Inactivo".
   **Resolución:** el workflow existe y está configurado, pero no corre porque los destinos (LinkedIn/Instagram) no están creados. Estado correcto: **inactivo**.

2. **Sunlife — Reporte Semanal: estado contradictorio.**
   `status.md` lo lista como "✓ Activo".
   `timeless-saas-overview.md` lo marca como "⏸ Pausado — Ana no disponible; el silencioso sigue acumulando".
   **Resolución:** el workflow con email a Ana está pausado (correcto según clients.md). El Silencioso sí corre. `status.md` debería distinguir entre los dos.

3. **Pricing desactualizado en `timeless-saas-overview.md`.**
   Dice "$79/mes" como precio base, pero `strategy.md` documenta el pricing real: $49 LATAM / $99 Europa en lanzamiento. Actualizar el overview para que no confunda en un pitch.
