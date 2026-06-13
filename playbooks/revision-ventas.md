# Playbook — Revisión del Sistema de Ventas

**Objetivo:** auditar todo lo que ocurre *después* de que un prospecto responde — clasificación de replies, speeches, agendado de demos, conversión a cliente y handoff a onboarding. Atemporal: evalúa el estado actual del funnel de cierre.

**Modo de ejecución:** solo lectura. No enviar mensajes ni modificar speeches/Calendly sin OK de Matías.

**Formato de salida:** por etapa del funnel → estado (✓/⚠/✗) · evidencia · fricción detectada · acción. Más métricas de conversión y leaks del funnel al final.

---

## 1. Mateo Reply Handler (corazón del funnel)
- [ ] ¿Activo? Gmail trigger sobre team@timelessai.pro disparando ante replies.
- [ ] Clasificación de intención: revisar que las categorías cubran los casos reales (INFO/PRECIO/TIEMPO/CONFIANZA/DEMO/YA_TIENE/LLAMADA/COMPRA/NEGATIVO/GENERICO).
- [ ] Probar la lógica con ejemplos: ¿clasifica bien un "no me interesa" como NEGATIVO? (bug histórico a vigilar).
- [ ] Cada categoría tiene un speech: ¿están actualizados, sin errores de encoding, alineados a `strategy.md`?
- [ ] Speech LLAMADA: ¿incluye el link real de Calendly?
- [ ] Speech PRECIO: ¿coincide con el pricing vigente (LATAM vs Europa)?
- [ ] Alerta Telegram: ¿llega al chat ID correcto cuando entra un reply caliente (COMPRA/LLAMADA)?

## 2. Calendly — agendado de demos
- [ ] Evento "Demo Timeless" activo, duración correcta, disponibilidad coherente con la zona horaria de Matías (CET).
- [ ] El link público funciona y lleva al evento correcto (ojo: el slug puede no coincidir con el nombre del evento).
- [ ] ¿El link de Calendly aparece efectivamente en el/los speeches que lo necesitan?
- [ ] Integración con calendario real para no doble-bookear.

## 3. CRM — Pipeline de ventas
- [ ] Pestaña Pipeline: ¿refleja el estado real de los prospectos que avanzaron?
- [ ] **Gap conocido:** Mateo clasifica replies pero NO actualiza la columna Estado automáticamente → verificar si sigue siendo manual y cuánto se pierde por eso.
- [ ] ¿Hay prospectos "calientes" (pidieron demo/precio) que quedaron sin seguimiento?
- [ ] Trazabilidad: de un prospecto se puede seguir el camino Prospectos → reply → demo → cliente.

## 4. Conversión a cliente y onboarding
- [ ] Flujo de onboarding self-service (`onboarding.html` → webhook → ingest → smoke test → email): ¿funciona end-to-end?
- [ ] Probar mentalmente/realmente un job de prueba: ¿los 4 pasos (received/ingestion/smoketest/email) pasan a `done`?
- [ ] **Gap conocido:** falta pago automático (Stripe) y onboarding 100% automático post-pago → registrar como leak del funnel, no como bug.
- [ ] Pasos manuales post-onboarding (duplicar 3 workflows, crear páginas branded, configurar widget): ¿están documentados y son repetibles?
- [ ] Tiempo desde "sí, quiero" hasta "Emma respondiendo": ¿cumple la promesa de <24h?

## 5. Mensajes de venta y objeciones
- [ ] Los speeches responden a las objeciones reales (precio, confianza, tiempo, "ya tengo algo").
- [ ] Coherencia con `strategy.md`: ángulos de venta (pérdida, organización, agotamiento, horario) y tagline.
- [ ] Argumento de ROI por vertical presente y con números correctos.
- [ ] "Lo que NO decir" respetado en los speeches (no stack técnico, no "chatbot", no prometer integraciones inexistentes).

## 6. Material de soporte a la venta
- [ ] One-pager / deck comercial existente y actualizado con pricing vigente.
- [ ] Demo cinematográfica (`index.html`) y demos por vertical funcionando como herramienta de venta.
- [ ] Case study / evidencia: ¿hay métricas reales de Emma para mostrar prueba social? (depende de datos acumulados).

## 7. Salud técnica del funnel de cierre
- [ ] Errores recientes en Mateo Reply Handler o en el onboarding workflow.
- [ ] Credenciales Gmail team@ y Calendly válidas y sin expirar.
- [ ] Onboarding status endpoint respondiendo (polling no roto).

---

## Métricas de conversión a reportar (lo que esté disponible)
```
Replies recibidos                → ___
Clasificados como interés real   → ___
Demos agendadas (Calendly)       → ___
Demos realizadas                 → ___
Clientes cerrados                → ___
Tiempo medio reply → demo        → ___
Tiempo medio cierre → Emma live  → ___
```

## Entregable del playbook
1. Mapa del funnel con el estado de cada etapa y dónde se pierden prospectos (leaks).
2. Métricas de conversión disponibles.
3. Top 3 acciones para subir conversión (priorizando cerrar leaks por encima de traer más volumen).
