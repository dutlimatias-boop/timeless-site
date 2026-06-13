# Playbook — Revisión de Plataforma / Producto

**Objetivo:** verificar que el producto que vende Timeless funciona: Emma responde bien, el RAG es preciso, los workflows n8n están sanos, los dashboards muestran datos correctos y el onboarding técnico corre end-to-end. Atemporal: evalúa el estado actual, sin asumir qué clientes o workflows existen hoy.

**Modo de ejecución:** auditoría + actualización con OK. Solo lectura sobre todo lo que sea propiedad de un cliente (KB live, prompts, datos de huéspedes, bot en producción de un cliente). Sobre el **demo/sandbox (Hotel Patagonia) y templates de plataforma** se puede testear y proponer cambios libremente.

**Formato de salida:** por componente → estado (✓/⚠/✗) · evidencia · qué falla · acción/fix propuesto. Severidades 🔴/🟡/🟢.

---

## 1. Calidad del bot (Emma / asistente)
- [ ] Probar el chat demo: ¿responde, sin errores de webhook, con latencia razonable?
- [ ] Sobre el sandbox Patagonia (NO el bot live de un cliente): correr 5–10 preguntas típicas por vertical y evaluar precisión, tono y alucinaciones.
- [ ] ¿El bot respeta su personalidad/nombre configurado y el "Lo que NO decir" (no revela stack, no inventa integraciones)?
- [ ] Manejo de casos límite: pregunta fuera de KB, idioma mixto (ES/EN), mensaje vacío, prompt injection básico.
- [ ] ¿Loguea correctamente cada conversación a la Google Sheet correspondiente?

## 2. RAG / Knowledge base
- [ ] Confirmar aislamiento por `client_id` en cada query a Supabase (cruce con playbook de seguridad).
- [ ] Calidad de recuperación: ¿los chunks devueltos son relevantes a la pregunta? (probar en sandbox).
- [ ] KB desactualizada: detectar info vieja (ej. horarios check-in/out) — reportar para re-ingestar (la corrección de un cliente requiere su OK).
- [ ] Estrategia de chunking/embeddings: ¿consistente entre clientes? ¿reranking activo o pendiente (Cohere free tier en roadmap)?
- [ ] Índice vectorial: ¿HNSW en tablas nuevas? (mejora de escala del roadmap).

## 3. Workflows n8n por cliente (template)
- [ ] Los 3 workflows base (Bot Demo · Panel API · Reporte Semanal) existen y están sanos para cada cliente activo.
- [ ] Revisar ejecuciones recientes: tasa de error, ejecuciones colgadas, timeouts.
- [ ] Workflows duplicados/`-copy`/`-fixed` activos por error que podrían disparar acciones dobles.
- [ ] Workflows que deberían estar inactivos pero están corriendo (o viceversa).
- [ ] Migración pendiente a AI Agent node (memoria nativa) — evaluar si conviene probar en sandbox.

## 4. Dashboards y paneles
- [ ] `panel-*.html` y `dashboard-*.html` cargan sin errores de consola y consumen el Panel API correcto.
- [ ] ¿Muestran datos reales o demo data? Marcar cuáles siguen hardcodeados.
- [ ] Calendario interactivo y métricas: ¿funcionan? ¿números coherentes?
- [ ] Branding por cliente correcto (no mezclar tema Sun Life con sistema de diseño de plataforma).

## 5. Onboarding técnico (self-service)
- [ ] Correr un job de prueba en `onboarding.html` → verificar los 4 pasos (received/ingestion/smoketest/email) llegan a `done`.
- [ ] Webhook de entrada y status endpoint respondiendo.
- [ ] Los 6 tipos de negocio cargan su `vocab` (labels/placeholders/amenities) correctamente.
- [ ] `retryVerification()` funciona ante fallo de un paso.
- [ ] Pasos manuales post-onboarding documentados y repetibles (duplicar workflows, páginas branded, widget).

## 6. Sitio público y widget
- [ ] `index.html` (demo cinematográfica): carga, CTAs vivos, link `?hotel=` arma demo personalizada.
- [ ] Sistema de diseño consistente (Cormorant Garamond + DM Sans + dorado #c8912b) en páginas de plataforma.
- [ ] Widget `@n8n/chat` embebido funciona y apunta al webhook correcto.
- [ ] Deploy: push a main → Cloudflare Pages live; Netlify legacy intacto (Emma de Ana apunta ahí).

---

## Acciones que este playbook PUEDE aplicar (con OK)
- Fixes en templates de plataforma, páginas públicas, sandbox Patagonia.
- Proponer re-ingesta de KB desactualizada (ejecuta solo con OK; si es de un cliente, requiere su autorización).

## Entregable
1. Tabla de salud por componente.
2. Bugs 🔴 que rompen demo/venta (prioridad máxima).
3. Mejoras de roadmap validables en sandbox antes de llevar a clientes.
