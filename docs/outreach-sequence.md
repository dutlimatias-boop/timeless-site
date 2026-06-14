# Timeless — Secuencia de Outreach (v2, lista para vender)

> Fuente canónica del copy de adquisición. Reemplaza a `Timeless_Outreach_Sequence.docx`.
> Mapea a los workflows: **W2 Outreach Email** (Email 1) · **W3 Follow-up** (Emails 2–5) · **Mateo Reply Handler** (speeches).
> Última revisión: 2026-06-13.

---

## Decisiones aplicadas en esta versión

| Tema | Decisión | Impacto en el copy |
|------|----------|--------------------|
| **Precio** | Geográfico: `€99/mes` Europa · `US$49/mes` LATAM | Token `{{precio_mes}}` — W1 ya conoce el mercado por ciudad |
| **Setup** | Sin costo para los primeros hoteles (oferta de lanzamiento) | Se usa como palanca, no como fricción |
| **Remitente** | Firma **Matías**, desde **team@timelessai.pro** | Identidad unificada en toda la secuencia |
| **Links demo** | Por industria: `timelessai.pro/demo/hotels` | Token `{{link_demo}}` |
| **Dato 60%** | Se mantiene (hay fuente — citar al activar) | Email 4 |

### Correcciones de copy vs. el doc original
1. **Email 1**: apertura específica y verificable (no "excelentes reseñas" genérico).
2. **Precio parametrizado** — fuera el "$79" hardcodeado.
3. **El número duro (40+) se reserva para Email 3** — no se repite en cada email.
4. **"menos que una noche en tu hotel"** → reframe ROI seguro para ambos mercados (queda como A/B, no fijo).
5. **Identidad coherente** — Matías en toda la firma.
6. **Unsubscribe real** en el pie de todos los emails (RGPD + deliverability).
7. **Email 1**: un solo link, texto plano, sin imágenes (entregabilidad en frío).

---

## Variables dinámicas (n8n)

| Token | Origen | Fallback |
|-------|--------|----------|
| `{{nombre_hotel}}` | Google Maps (W1) | — (obligatorio) |
| `{{nombre}}` | Contacto si existe | omitir el saludo con nombre → "Hola," |
| `{{precio_mes}}` | Mercado del prospecto | LATAM `US$49` · Europa `€99` |
| `{{link_demo}}` | Industria | `timelessai.pro/demo/hotels` · `/restaurants` · `/clinics` · `/beauty` · `/realestate` |
| `{{link_calendly}}` | Fijo | `calendly.com/team-timelessai` |
| `{{apertura_personalizada}}` | GPT con datos scrapeados (ver Email 1) | línea genérica de respaldo |
| `{{link_baja}}` | Página de baja | `timelessai.pro/baja.html?e={{email}}`. Registra la baja vía webhook n8n `/unsubscribe` |

**Tono:** ustedeo por defecto. Si el prospecto tutea, Mateo se adapta.

---

## Sequence Overview

| # | Asunto | Propósito | Timing | CTA | Condición |
|---|--------|-----------|--------|-----|-----------|
| 1 | `{{nombre_hotel}} — consultas fuera de horario` | Generar curiosidad, ofrecer demo | Día 0 (W2) | Ver demo | Todos los prospectos score ≥ 7 |
| 2 | `Una cosa que hace Emma distinto` | Ángulo nuevo: captura de leads | Día 1 | Ver demo | Sin respuesta a E1 |
| 3 | `40 consultas en 7 días — caso real` | Prueba social dura + pedir 15 min | Día 5 | Agendar | Sin respuesta a E1–E2 |
| 4 | `Lo que pierden los hoteles sin respuesta nocturna` | Urgencia de industria + Calendly | Día 12 | Calendly | Sin respuesta a E1–E3 |
| 5 | `Cerrando el loop — Timeless` | Cierre suave, puerta abierta | Día 30 | Responder | Sin respuesta a E1–E4 |

**Exit:** cualquier respuesta entrante → sale de la secuencia y pasa a **Mateo Reply Handler**.

---

## EMAIL 1 — Cold Outreach (Día 0)

**Lógica:** un solo CTA (ver la demo). No pedir llamada. Apertura **específica y verificable** generada por GPT con datos reales del hotel (no elogio genérico). Texto plano, un solo link.

**Asunto (A/B):**
- A: `{{nombre_hotel}} — consultas fuera de horario`
- B: `Una pregunta sobre {{nombre_hotel}}`

**Preview text:** `Lo que pasa con los mensajes que llegan de madrugada.`

**Cuerpo:**
```
Hola {{nombre}},

{{apertura_personalizada}}

La mayoría de los hoteles boutique pierden reservas entre las 10pm
y las 8am, cuando no hay nadie respondiendo mensajes. El huésped
que no recibe respuesta rápido, reserva en otro lado.

En Sun Life Beach Hotel (Florida) montamos a Emma para resolver
justo eso: una recepcionista virtual que responde en menos de
3 segundos, a cualquier hora, en el idioma del huésped.

Armé una demo con el nombre de {{nombre_hotel}} para que la vea
en contexto real — sin registro, sin llamada:

{{link_demo}}

Saludos,
Matías
Timeless AI · team@timelessai.pro

Si no es para usted, {{link_baja}} y no le escribo más.
```

**Nota CODE — `{{apertura_personalizada}}` (GPT):** una sola frase, observación concreta y verificable del hotel scrapeada de Google Maps. Ejemplos del tipo de salida esperada:
- "Vi que {{nombre_hotel}} maneja reservas directas desde su web además de las OTAs — ahí es donde más se nota una respuesta lenta."
- "Con {{n_habitaciones}} habitaciones y reservas en temporada alta, cada consulta sin responder pesa."
- "Vi que responden los mensajes de Google con mucho cuidado — justamente por eso esto les puede servir."

Prohibido: "tienen excelentes reseñas", "su hermoso hotel", o cualquier elogio aplicable a cualquier hotel.

---

## EMAIL 2 — Toque 1 (Día 1)

**Lógica:** no es "seguimiento del seguimiento". Aporta una pieza de valor nueva (captura de leads) que cambia el ángulo.

**Asunto (A/B):**
- A: `Una cosa que hace Emma distinto`
- B: `Los leads que {{nombre_hotel}} no está viendo`

**Preview text:** `No solo responde — también captura.`

**Cuerpo:**
```
Hola {{nombre}},

Por si no llegó a ver la demo, le agrego algo que no mencioné antes:

Emma no solo responde preguntas. Captura el nombre, el email y el
tipo de consulta de cada persona que escribe — y se lo manda en un
reporte semanal.

Para un hotel de su tamaño, eso son contactos calificados que hoy
probablemente se pierden apenas termina la conversación.

La demo sigue acá:
{{link_demo}}

Saludos,
Matías — Timeless AI

¿No le interesa? {{link_baja}}.
```

---

## EMAIL 3 — Toque 2 (Día 5)  ★ el más fuerte

**Lógica:** prueba social concreta con números reales. Asunto corto = más apertura en mobile. Primer email que pide llamada (ya hay contexto).

**Asunto (A/B):**
- A: `40 consultas en 7 días — caso real`
- B: `Lo que pasó en Sun Life la primera semana`

**Preview text:** `Un hotel real, números reales.`

**Cuerpo:**
```
Hola {{nombre}},

Un caso real para que tenga contexto:

Sun Life Beach Hotel (Englewood, Florida) activó a Emma hace unas
semanas. En los primeros 7 días atendió 40+ consultas, la mayoría
entre las 10pm y las 8am.

Ana, la dueña, dice que lo más valioso fue dejar de perder reservas
de madrugada.

Tiempo de respuesta: menos de 3 segundos.
Inversión: {{precio_mes}} — y el setup se lo dejo sin costo por ser
de los primeros hoteles que sumamos en su zona.

¿Tiene 15 minutos esta semana para verlo con los datos de
{{nombre_hotel}} específicamente?

Saludos,
Matías — Timeless AI

Si prefiere que no insista, {{link_baja}}.
```

> **A/B opcional (línea de ROI):** en lugar de la inversión a secas, testear:
> "Con que entre **una** reserva extra por mes, ya se pagó solo."
> (Evita comparaciones de precio que se vuelven en contra en hoteles de ticket alto.)

---

## EMAIL 4 — Toque 3 (Día 12)

**Lógica:** ángulo de industria. Dato que da contexto y urgencia sin presionar. El asunto apunta al dolor, no a la acción. CTA directo a Calendly.

**Asunto (A/B):**
- A: `Lo que pierden los hoteles sin respuesta nocturna`
- B: `El 60% que no vuelve a escribir`

**Preview text:** `Un dato de hoteles boutique en España.`

**Cuerpo:**
```
Hola {{nombre}},

Un dato que encontramos revisando hoteles boutique:

El 60% de las consultas por WhatsApp y web llegan fuera del horario
de atención — y la mayoría no vuelve a escribir si no recibe
respuesta en menos de una hora.

Emma resuelve exactamente eso, y se instala en menos de 24 horas
sin que usted toque nada técnico.

¿Vale 10 minutos verlo en acción? Elija el horario que le quede:
{{link_calendly}}

Saludos,
Matías — Timeless AI

Para no recibir más: {{link_baja}}.
```

**Nota CODE:** citar la fuente del 60% en el footer interno o tener el dato a mano por si el prospecto pregunta. Si la fuente no aplica a un mercado, usar el fallback: *"La mayoría de las consultas en hoteles boutique llegan fuera del horario de atención."*

---

## EMAIL 5 — Toque 4 (Día 30)

**Lógica:** cierre suave, humano, sin presión. Deja la puerta abierta. El asunto es honesto — el prospecto sabe que es el último.

**Asunto (A/B):**
- A: `Cerrando el loop — Timeless`
- B: `Último mensaje, {{nombre}}`

**Preview text:** `Sin vueltas — la puerta queda abierta.`

**Cuerpo:**
```
Hola {{nombre}},

Hace un mes le escribí sobre Emma. No quiero seguir llenándole la
bandeja, así que este es el último.

Si en algún momento quiere ver cómo responde con los datos de
{{nombre_hotel}}, acá estoy — me responde este email y listo.

Y si no es para ustedes, sin problema. Le deseo una gran temporada.

Saludos,
Matías
Timeless AI · team@timelessai.pro

{{link_baja}}
```

---

## Speeches — Mateo Reply Handler

Respuestas rápidas según la categoría que clasifica Mateo. Ustedeo por defecto; adaptar si tutean.

| Categoría | Mensaje |
|-----------|---------|
| **INFO** | Timeless instala una recepcionista virtual en su hotel — responde en menos de 3 segundos, 24/7, en el idioma del huésped, y captura leads automáticamente. Ya la usamos en Sun Life Beach Hotel (Florida) con muy buenos resultados. ¿Le cuento cómo es el setup? |
| **PRECIO** | Los planes arrancan en {{precio_mes}} e incluyen el bot, panel de control, reportes semanales y soporte. El setup se lo dejo sin costo por ser de los primeros hoteles de su zona. ¿Le armo una propuesta con los números para {{nombre_hotel}}? |
| **TIEMPO** | Setup en menos de 24 horas. Usted no hace nada técnico, de eso me encargo yo. ¿Para cuándo le gustaría tenerlo activo? |
| **CONFIANZA** | Tenemos un hotel activo en Florida donde Emma atiende consultas reales todos los días. Le mando la demo armada con el nombre de su hotel para que lo vea en contexto real — sin llamada, sin compromiso. ¿Se la mando? |
| **DEMO** | Con gusto. Le armo la demo personalizada en menos de 24 horas — solo necesito el nombre del hotel y el tipo de habitaciones. ¿Me los pasa? |
| **YA_TIENE** | Entendido. ¿Puedo preguntarle qué usa actualmente? Lo digo porque a veces esas herramientas no cubren respuesta nocturna o captura de leads, y Emma complementa sin reemplazar lo que ya funciona. Si no es el caso, ningún problema — le deseo éxito. |
| **LLAMADA** | Perfecto. Le comparto el link para agendar en el horario que mejor le venga: {{link_calendly}} — disponibles lunes a viernes después de las 18hs y sábados a la mañana (hora Europa Central). |
| **COMPRA** | `// ESCALAR A MATÍAS POR TELEGRAM INMEDIATAMENTE` · `// No responder hasta instrucciones de Matías` · `// Alerta incluye: nombre del hotel, ciudad, industria y el mensaje exacto del prospecto` |
| **NEGATIVO** | (Sin respuesta saliente.) Acción: marcar **DESCARTADO** en el CRM y no volver a contactar. *Opcional cortés:* "Entendido, gracias por avisar. Si cambia de idea, acá estoy." |
| **GENERICO** | Gracias por responder. ¿Hay alguna duda puntual sobre cómo funciona Timeless — el precio, el setup, o cómo quedaría en su hotel específicamente? |

### Lógica de clasificación
`INFO` · `PRECIO` · `TIEMPO` · `CONFIANZA` · `DEMO` · `YA_TIENE` · `LLAMADA` · `COMPRA` (→ escalar) · `GENERICO` (→ clarificar) · `NEGATIVO` (→ DESCARTADO en CRM, no contactar)

---

## Flujo de la secuencia

```
[W1 score ≥ 7] --> Email 1 (Día 0)
                       |
                  ¿Responde? --Sí--> [EXIT → Mateo Reply Handler]
                       | No
                       v
                  Email 2 (Día 1)
                       |
                  ¿Responde? --Sí--> [EXIT → Mateo Reply Handler]
                       | No
                       v
                  Email 3 (Día 5)   ★ pide llamada
                       |
                  ¿Responde? --Sí--> [EXIT → Mateo Reply Handler]
                       | No
                       v
                  Email 4 (Día 12)  → Calendly
                       |
                  ¿Responde? --Sí--> [EXIT → Mateo Reply Handler]
                       | No
                       v
                  Email 5 (Día 30)  → cierre
                       |
                       v
                  [EXIT: secuencia completa, prospecto a "frío" en CRM]
```

**Suppression:** no enviar si el prospecto está marcado DESCARTADO, ya es cliente, o respondió en las últimas 48h.

---

## A/B tests recomendados (en orden de prioridad)

1. **Asunto Email 1** (A vs B) — es el que más mueve la tasa de apertura. Medir open rate a 48h.
2. **Email 1 con link vs. "¿se la mando?"** — testear si quitar el link sube deliverability/respuestas.
3. **Línea de ROI en Email 3** — inversión directa vs. "una reserva extra y se pagó solo".
4. **Hora de envío** — mañana temprano vs. media tarde (por zona horaria del mercado).

---

## Benchmarks objetivo (Lead Nurture en frío)

| Métrica | Rango esperado | Bandera roja |
|---------|----------------|--------------|
| Open rate | 25–40% | < 15% → problema de asunto o deliverability |
| Respuesta | 3–8% | < 2% → revisar segmentación/copy |
| Reuniones agendadas | 1–3% de los contactados | 0 tras 100 envíos → revisar todo |
| Unsubscribe | < 1% | > 2% → copy demasiado agresivo |
| Spam complaints | < 0.1% | > 0.3% → pausar y revisar dominio |

**Cadencia de revisión:** semanal el primer mes, después mensual.

---

## Pendientes antes de activar en volumen

- [ ] Migrar envío de W2 a **team@timelessai.pro** y verificar SPF/DKIM/DMARC con un test de deliverability (mail-tester o similar).
- [x] Página de baja **`baja.html`** branded creada y verificada. ✅
- [ ] Webhook n8n **`/unsubscribe`** que registra la baja en pestaña "Bajas" del CRM (spec en `n8n-workflows/unsubscribe-spec.md`).
- [ ] Filtro de supresión en W2/W3: no enviar a emails presentes en "Bajas".
- [ ] Header `List-Unsubscribe` en los nodos Gmail de W2/W3 (one-click unsubscribe, mejora deliverability).
- [x] Crear las páginas **`/demo/{industria}`** en el sitio (prerequisito de `{{link_demo}}`). ✅ Live en `timelessai.pro/demo/...`
- [ ] **(Opcional)** Conectar `timelessai.pro` como custom domain en Cloudflare Pages para links de marca. Hoy HTTPS no responde y el DNS está en Namecheap (no en Cloudflare). El email (`team@timelessai.pro`) ya funciona vía Google Workspace.
- [ ] Parametrizar **{{precio_mes}}** por mercado en los nodos de W2/W3.
- [ ] Verificar/citar la fuente del **60%** (Email 4).
- [ ] Mateo: implementar el marcado **DESCARTADO** en el CRM para `NEGATIVO`.
- [ ] Confirmar slug real de Calendly (`{{link_calendly}}`).
```
