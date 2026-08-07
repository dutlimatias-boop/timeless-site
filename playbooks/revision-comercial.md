# Playbook — Revisión Comercial (Negocio)

**Junta y reemplaza a:** `revision-marketing.md` + `revision-ventas.md` + `revision-clientes.md` + `revision-finanzas.md`.

**Objetivo:** una sola pasada por el embudo comercial de punta a punta, siguiendo a un prospecto por todo el recorrido y viendo dónde se fuga y cuánto deja:

```
ATRAER          →   CONVERTIR        →   RETENER          →   RENTAR
(Marketing)         (Ventas)             (Clientes)           (Finanzas)
Google Maps →       Mateo clasifica →    Emma da valor →      MRR − costos
cold email →        Calendly →           evita churn →        = margen
follow-up →         onboarding →         upsell/referido      unit economics
prospecto en CRM    cliente en CRM
```

Los cuatro leen la **misma columna vertebral: el CRM** (Prospectos · Pipeline · Clientes) y los mismos workflows (W1–W4, Mateo). Por eso corren mejor juntos: se abre el CRM una vez y se le hacen las cuatro preguntas. Atemporal: corre sobre los conteos y clientes del momento.

**Modo de ejecución:** SOLO LECTURA sobre workflows, CRM y —crítico— sobre datos/KB/prompts/bot live de cada cliente (regla de `CLAUDE.md`). No pausar/activar workflows, no enviar emails, no ejecutar cobros, no modificar speeches/Calendly sin OK de Matías. Las actualizaciones son sobre docs de plataforma (`strategy.md`, `clients.md`, `status.md`).

**Formato de salida:** por etapa → estado (✓/⚠/✗) · evidencia · fricción/leak · acción. Más métricas de embudo end-to-end y snapshot financiero al final.

---

## Carriles y memoria

- 🤖 **Auto** — repo + CRM + workflows vía MCP de n8n (si hay red).
- 👤 **Manual** — dashboards externos (n8n Executions, deliverability, billing).
- 🤖 **Arranque con memoria:** leer `docs/auditoria-semanal.md` anterior y marcar cada hallazgo comercial como resuelto / abierto (N semanas) / nuevo. Recordá el criterio maestro: **el cuello de botella suele ser adquisición, no producto** — priorizar leaks del embudo por encima de traer más volumen.

---

## 1. ATRAER — Marketing (W1–W4 + CRM Prospectos)

- 👤 **W1 Lead Hunter**: ¿activo? última corrida (éxitos/errores). City rotation ISO week sin repetir, cubriendo mercados de `strategy.md`. Threshold ≥7 filtra bien. Cubre los 5 verticales sin sesgarse. Prospectos llegan a Prospectos sin duplicados. Consumo Maps dentro de cuota.
- 👤 **W2 Outreach**: ¿activo y enviando? Volumen semanal. Personalización (vertical + mercado + ROI, link `/?hotel=`). **Deliverability**: SPF/DKIM/DMARC OK, ¿caen en spam?, bounce rate. Encoding del senderName (vigilar "Mat?as" corrupto). Campo "apertura" de GPT: ¿se usa o quedó muerto? Opt-out presente.
- 👤 **W3 Follow-up**: secuencia 4 toques (días 1, 5, 12, 30) en los tiempos correctos. Detecta a quién ya respondió para NO seguir insistiendo. Textos distintos por toque. Encoding OK.
- 🤖/👤 **W4 Content Generator**: estado real (Parte A genera / Parte B publica). ¿Existen perfiles LinkedIn/Instagram? Si está inactivo, confirmar que es decisión consciente y no workflow roto.
- 🤖 **CRM**: pestañas Prospectos · Pipeline · Clientes · Contenido presentes y consistentes; `GOOGLE_SHEET_ID` correcto en n8n; sin filas corruptas ni duplicados entre Prospectos y Pipeline.
- 🤖 **Mensajería**: respeta "Lo que NO decir" (no n8n/Supabase, no "chatbot", arranca por el problema); pricing en emails coincide con el vigente; landing `index.html` con demo y CTA vivos.

## 2. CONVERTIR — Ventas (Mateo + Calendly + onboarding)

- 👤 **Mateo Reply Handler** (corazón del funnel): ¿activo? Gmail trigger en team@timelessai.pro. Categorías cubren los casos reales (INFO/PRECIO/TIEMPO/CONFIANZA/DEMO/YA_TIENE/LLAMADA/COMPRA/NEGATIVO/GENERICO). Probar que clasifica bien un "no me interesa" como NEGATIVO (bug histórico). Speeches actualizados, sin encoding roto, alineados a `strategy.md`. Speech LLAMADA con link real de Calendly. Speech PRECIO con pricing vigente. Alerta Telegram al chat ID correcto en replies calientes.
- 👤 **Calendly**: evento activo, duración y disponibilidad correctas (CET), link lleva al evento correcto (ojo slug ≠ nombre), integrado en los speeches que lo necesitan, sin doble-booking.
- 🤖 **Pipeline**: refleja el estado real de los que avanzaron. **Gap conocido:** Mateo clasifica pero NO actualiza la columna Estado automáticamente → ver si sigue manual y cuánto se pierde. Prospectos calientes sin seguimiento. Trazabilidad Prospectos → reply → demo → cliente.
- 👤 **Onboarding handoff**: job de prueba end-to-end (received/ingestion/smoketest/email → `done`). **Gap conocido:** falta pago automático (Stripe) → leak del funnel, no bug. Pasos manuales post-onboarding documentados y repetibles. Tiempo "sí, quiero" → "Emma respondiendo": ¿cumple <24h?
- 🤖 **Objeciones y material**: speeches responden a precio/confianza/tiempo/"ya tengo"; ROI por vertical con números correctos; one-pager/deck con pricing vigente; demo por vertical funcionando.

## 3. RETENER — Clientes (salud + churn + upsell) · SOLO LECTURA

- 👤 **Inventario**: listar clientes de `clients.md` y confirmar que cada uno sigue activo en la realidad (bot respondiendo, workflows on). Estado: activo / pausado / en riesgo / bloqueado + bloqueos vigentes.
- 👤 **Salud del servicio (por cliente)**: ¿Emma responde? última conversación logueada — ¿hace cuánto? Volumen reciente vs. histórico (caída = riesgo). Errores del bot en n8n (solo observar). KB desactualizada que haga quedar mal a Emma (reportar; corregir requiere OK del cliente). Canales activos vs. prometidos.
- 🤖/👤 **Valor entregado (ROI)**: reporte semanal enviándose/acumulando con métricas de valor (consultas 24/7, leads). Evidencia concreta para mostrarle al cliente. Para pausados/bloqueados: ¿qué evidencia se acumuló para recontactar?
- 👤 **Señales de churn**: caída de uso, silencio del dueño, bloqueos sin resolver hace mucho, promesas pendientes de Timeless, cobros al día.
- 🤖 **Upsell / expansión**: ¿suma canal (WhatsApp), guest journey, review automation, multi-idioma? Features del roadmap que encajan con su dolor. Referidos (20% primer mes).

## 4. RENTAR — Finanzas (unit economics)

- 👤 **Ingresos**: clientes de pago × precio = MRR. Cupos de setup gratis restantes. Pipeline cercano a cerrar → MRR potencial. Progreso vs. meta de `strategy.md`.
- 👤/🤖 **Costos**: inventario de fijos (n8n $20, Workspace, Cloudflare, Supabase, dominio, Hunter, Calendly) + variables (OpenAI, Maps, Hunter). *El detalle de consumo variable se toma de la §5 de Revisión de Motor — no re-medir acá, referenciar.*
- 👤 **Margen por cliente**: costo marginal de servir (su parte de OpenAI/infra) vs. precio. Margen bruto LATAM ($49→$79) vs Europa ($99→$149). Punto de equilibrio. CAC implícito vs. LTV.
- 🤖 **Salud del pricing**: geographic pricing sigue teniendo sentido vs. costos; setup gratis primeros 3 respetado; precio de lanzamiento aplicado a nuevos; pricing coherente entre `strategy.md`, emails y material (cruce con Sync-docs).
- 👤 **Riesgos financieros**: concentración en un solo cliente; costos variables fuera de control (loops/retries — cruce con Motor); runway sostenible con el MRR actual.

---

## Métricas de embudo end-to-end (lo que esté disponible)

```
ATRAER    Prospectos nuevos (período)   → ___
          Emails enviados (W2)          → ___
          Apertura / respuesta          → ___
CONVERTIR Replies recibidos             → ___
          Demos agendadas / realizadas  → ___
          Clientes cerrados             → ___
          Tiempo reply→demo / →Emma live→ ___
RETENER   Clientes activos / en riesgo  → ___
RENTAR    MRR · costo fijo · margen · break-even → ___
```

## Acciones que este playbook PUEDE aplicar (con OK)

- Actualizar estado de clientes en `clients.md` / `status.md` y pricing/metas en `strategy.md`.
- Redactar (no enviar) mensajes de recontacto/check-in/upsell y proponer ajustes de pricing/costos.
- **Nunca** tocar KB, prompts, workflows, datos o cobros de clientes; nunca enviar nada sin OK.

## Entregable

1. **Aging** de hallazgos comerciales previos.
2. **Mapa del embudo** con estado por etapa y dónde se fugan prospectos (leaks), priorizando cerrar leaks sobre traer volumen.
3. **Semáforo de salud por cliente** + acción de retención concreta para cada 🟡/🔴.
4. **Snapshot financiero**: MRR · costo fijo · margen · punto de equilibrio + salud del pricing.
5. **Lista 👤 "andá a mirar esto"** con el lugar exacto de cada métrica de dashboard pendiente.
