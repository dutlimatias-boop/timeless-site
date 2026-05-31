# Secuencia de emails — Post-demo
**Generado con:** marketing:email-sequence skill
**Uso:** Enviar manualmente (o via Mateo) después de cada demo de 15 min

---

## Resumen

| # | Asunto recomendado | Timing | Condición |
|---|-------------------|--------|-----------|
| Email 1 | "[Nombre del bot] lista para [Nombre del negocio]" | Día 0 — dentro de 2hs post-demo | Siempre |
| Email 2 | "¿Llegaste a verlo, [Nombre]?" | Día 3 | Solo si no hubo respuesta al Email 1 |
| Email 3 | "Lo dejo acá — por si en algún momento tiene sentido" | Día 7 | Solo si no hubo respuesta al Email 2 |

**Exit condition:** Cualquier respuesta del prospecto → sale de la secuencia → Mateo Reply Handler toma el hilo.

---

## Email 1 — Propuesta post-demo

**Asunto (elegir uno):**
- `[Nombre del bot] lista para [Nombre del negocio] — propuesta`
- `Lo que armaríamos para vos — Timeless`
- `Tu asistente virtual en 24hs — acá está todo`

**Preview text:** `Lista en menos de 24 horas. Sin contrato.`

**Body:**
```
Hola [Nombre],

Gracias por el tiempo de hoy. Me gustó conocer [Nombre del negocio] y entender cómo trabajás.

Esto es lo que armaríamos para vos:

→ [Nombre del bot] — tu asistente virtual 24/7
Entrenada con toda la información de [Nombre del negocio]: [servicios, precios, políticas, preguntas frecuentes]. Responde al instante, a cualquier hora, en el idioma de tu cliente.

→ Panel de gestión
Todas las conversaciones en un solo lugar. Ves quién consultó, qué preguntó y qué intención tenía.

→ Reporte semanal
Cada lunes recibís un resumen de lo que [Nombre del bot] atendió esa semana — sin que tengas que hacer nada.

💰 $[49/99]/mes · Sin contrato · Cancelable cuando quieras
⚡ Lista en menos de 24 horas desde que me confirmás
🎁 Esta semana el setup es gratis

Para empezar solo necesito que me pases la info básica de [Nombre del negocio] — te toma 10 minutos completar el formulario.

¿Seguimos?

→ Agendá 15 min para cualquier duda: [CALENDLY_LINK]
→ O respondé este email directamente

Matías
Timeless AI · team@timelessai.pro
```

---

## Email 2 — Seguimiento (Día 3)

**Asunto (elegir uno):**
- `¿Llegaste a verlo, [Nombre]?`
- `Una pregunta rápida sobre [Nombre del negocio]`
- `Solo quería saber si quedó alguna duda`

**Preview text:** `Te hago una pregunta directa.`

**Body:**
```
Hola [Nombre],

Te escribo por si no llegaste a ver el email del otro día.

Una pregunta directa: ¿cuántos mensajes recibió [Nombre del negocio] esta semana que no pudiste responder a tiempo?

Uno solo que haya derivado en un turno/reserva perdido ya cubre varios meses de [Nombre del bot].

Si quedó alguna duda — el precio, cómo funciona exactamente, qué pasa si el bot no sabe algo — respondé este email y te cuento en 5 minutos.

Matías
```

---

## Email 3 — Cierre suave (Día 7)

**Asunto (elegir uno):**
- `Último mensaje de mi parte, [Nombre]`
- `Lo dejo acá — por si en algún momento tiene sentido`
- `Sin presión — pero quería dejarte esto`

**Preview text:** `Si el momento no es ahora, no hay problema.`

**Body:**
```
Hola [Nombre],

Este es mi último mensaje. No quiero insistir si no es el momento.

Solo te digo esto: los mensajes sin respuesta, las consultas a deshora, el tiempo que perdés respondiendo siempre lo mismo — eso no desaparece solo.

Cuando sientas que es el momento, acá estoy.

La propuesta sigue en pie: $[49/99]/mes, sin contrato, [Nombre del bot] lista en 24hs.

→ [ONBOARDING_LINK]

Suerte con [Nombre del negocio].

Matías
Timeless AI
```

---

## Flujo completo

```
Demo completada
      ↓
Email 1 (Día 0 — dentro de 2hs)
      ↓
¿Respondió? → SÍ → EXIT → Mateo Reply Handler toma el hilo
      ↓ NO
Email 2 (Día 3)
      ↓
¿Respondió? → SÍ → EXIT → Mateo Reply Handler toma el hilo
      ↓ NO
Email 3 (Día 7)
      ↓
FIN → Prospecto queda en CRM como "frío"
    → W3 Follow-up Bot continúa con su secuencia de 4 toques
```

---

## Campos a personalizar (fill-in-the-blank)

| Campo | Ejemplo |
|-------|---------|
| `[Nombre]` | Ana, Carlos, Diego |
| `[Nombre del negocio]` | Hotel Boutique Mar, Clínica Estética Zen |
| `[Nombre del bot]` | Emma, Valentina, Sofía |
| `[servicios, precios, políticas...]` | adaptar al vertical |
| `[49/99]` | 49 para LATAM, 99 para Europa |
| `[CALENDLY_LINK]` | https://calendly.com/team-timelessai/30min |
| `[ONBOARDING_LINK]` | https://timeless-site.pages.dev/onboarding.html |

---

## Benchmarks esperados (lead nurture B2B)

| Métrica | Benchmark | Objetivo Timeless |
|---------|-----------|-------------------|
| Open rate Email 1 | 45-60% | >60% (acaban de tener demo) |
| Open rate Email 2-3 | 20-30% | >30% |
| CTR Email 1 | 10-15% | >15% |
| Conversión secuencia | 10-20% | >15% |

---

## A/B tests recomendados

1. **Email 1 — Asunto:** "Lo que armaríamos para vos" vs "[Nombre del bot] lista en 24hs"
2. **Email 2 — Apertura:** pregunta directa (actual) vs dato de industria ("El 60% elige el primero que responde...")
3. **Email 3 — Longitud:** versión actual (3 párrafos) vs versión ultra-corta (2 líneas + link)
