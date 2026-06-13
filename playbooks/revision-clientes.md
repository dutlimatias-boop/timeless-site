# Playbook — Revisión de Clientes / Retención

**Objetivo:** asegurar que cada cliente activo recibe valor (Emma funciona bien), detectar señales de churn a tiempo y encontrar oportunidades de upsell. Cierra el gap de retención del modelo. Atemporal: corre sobre los clientes que existan en el momento.

**Modo de ejecución:** SOLO LECTURA sobre datos, KB, prompts y bot live de cada cliente — regla crítica de `CLAUDE.md`. Se puede leer logs y métricas; no se modifica nada del cliente sin su OK. Las actualizaciones de este playbook son sobre docs internos de Timeless (`clients.md`, `status.md`).

**Formato de salida:** por cliente → salud (🟢 sano / 🟡 en riesgo / 🔴 churn probable) · evidencia · acción recomendada (de Timeless, no del cliente).

---

## 0. Inventario
- [ ] Listar clientes activos (de `clients.md`) y confirmar que cada uno sigue activo en la realidad (bot respondiendo, workflows on).
- [ ] Estado de relación: activo / pausado / en riesgo / bloqueado. Anotar bloqueos vigentes.

## 1. Salud del servicio (por cliente)
- [ ] ¿Emma está respondiendo? Última conversación logueada — ¿hace cuánto?
- [ ] Volumen de conversaciones reciente vs. histórico: ¿cayó? (señal de menos uso = riesgo).
- [ ] Errores del bot del cliente en n8n (sin modificar — solo observar).
- [ ] KB del cliente: ¿hay info desactualizada que esté haciendo quedar mal a Emma? (reportar; corregir requiere OK del cliente).
- [ ] Canales activos vs. prometidos (web chat / WhatsApp / etc.).

## 2. Valor entregado (¿el cliente ve el ROI?)
- [ ] Reporte semanal: ¿se está enviando / acumulando? ¿Las métricas muestran valor (consultas atendidas 24/7, leads capturados)?
- [ ] ¿Hay evidencia concreta para mostrarle al cliente (conversaciones atendidas fuera de horario, preguntas frecuentes resueltas)?
- [ ] Para clientes pausados/bloqueados: ¿qué evidencia se acumuló que sirva para recontactar?

## 3. Señales de churn
- [ ] Caída de uso, silencio prolongado del dueño, no responde mensajes, bloqueos sin resolver hace mucho.
- [ ] Promesas pendientes de Timeless hacia el cliente que generan fricción (features prometidas, accesos sin configurar).
- [ ] Cobros/pagos al día (cruce con playbook de finanzas).

## 4. Oportunidades de upsell / expansión
- [ ] ¿El cliente podría sumar canal (WhatsApp), guest journey, review automation, multi-idioma?
- [ ] ¿Hay features del roadmap que encajan con su dolor actual?
- [ ] Referidos: ¿cliente contento que podría referir? (20% primer mes — ver strategy).

## 5. Acciones de retención sugeridas
- [ ] Por cada cliente en 🟡/🔴: una acción concreta de Timeless (mandar evidencia, agendar check-in, resolver bloqueo, proponer upgrade).
- [ ] Recontacto de clientes pausados con el ángulo correcto.

---

## Acciones que este playbook PUEDE aplicar (con OK)
- Actualizar estado del cliente en `clients.md` / `status.md`.
- Redactar (no enviar) mensajes de recontacto/check-in/upsell para que Matías los apruebe.
- NUNCA tocar KB, prompts, workflows o datos del cliente.

## Entregable
1. Semáforo de salud por cliente.
2. Clientes en riesgo + acción concreta de retención cada uno.
3. Oportunidades de upsell/referido detectadas.
