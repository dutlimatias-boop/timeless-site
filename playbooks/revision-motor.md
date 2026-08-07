# Playbook — Revisión de Motor (Sistema)

**Junta y reemplaza a:** `revision-plataforma.md` + `revision-infraestructura.md` + `revision-seguridad.md`.

**Objetivo:** una sola pasada por todo el stack técnico, mirando cada componente con tres lentes a la vez:
- **¿Funciona?** — el producto que el cliente experimenta (Emma, RAG, dashboards, onboarding).
- **¿Aguanta y cuánto cuesta?** — cuotas, costos, tokens por vencer, backups.
- **¿Está protegido?** — secretos, aislamiento entre clientes, superficie expuesta.

Se recorre cada objeto (workflow, Supabase, sitio, credencial) **una vez** y se le hacen las tres preguntas. Eso elimina la triple lectura que había cuando eran tres playbooks separados. Atemporal: evalúa el estado del momento, sin asumir qué clientes o workflows existen hoy.

**Modo de ejecución:** auditoría + actualización con OK sobre docs/config **de plataforma**. SOLO LECTURA sobre todo lo que sea propiedad de un cliente (KB live, prompts, datos de huéspedes, bot en producción). Sobre sandbox (Hotel Patagonia) y templates de plataforma se puede testear y proponer cambios. **No rotar claves ni borrar recursos sin OK.**

**Formato de salida:** por componente → estado (✓/⚠/✗) · lente (producto/infra/seguridad) · evidencia (`archivo:línea` o workflow) · qué falla · acción. Severidades 🔴 crítico · 🟡 medio · 🟢 mejora.

---

## Carriles: quién corre cada paso

Cada check está etiquetado para que la corrida no quede a medias:
- 🤖 **Auto** — el agente lo verifica solo leyendo el repo, o vía los MCP de n8n (`n8n-mcp` / `n8n-instance`) si hay red. Corre en cada pasada sin fricción.
- 👤 **Manual** — necesita un dashboard externo (n8n Executions, Supabase, billing de APIs). El agente lo lista como "andá a mirar esto" con el link/lugar exacto.

> Regla de eficiencia: correr primero **todo lo 🤖**, y devolver lo 👤 como una lista corta y accionable al final. Nunca frenar la corrida esperando acceso manual.

---

## 0. Arranque con memoria (aging de hallazgos)

- 🤖 Leer la **auditoría anterior** (`docs/auditoria-semanal.md`) antes de empezar.
- 🤖 Por cada hallazgo previo, marcar: **resuelto** / **sigue abierto (N semanas)** / **nuevo**. Un hallazgo que reaparece por 3ª vez se marca 🔴 por *antigüedad*, aunque su severidad técnica sea 🟡 — la deuda que no se acciona es el riesgo real.
- 🤖 Arrancar el informe con esa tabla de aging. Cierra el gap "detectamos pero no accionamos".

---

## 1. Bot y RAG (lente: producto)

- 👤 Chat demo del sandbox Patagonia (NO el bot live de un cliente): ¿responde, sin errores de webhook, con latencia razonable?
- 👤 Sobre el sandbox: 5–10 preguntas típicas por vertical → evaluar precisión, tono, alucinaciones, y que respete el "Lo que NO decir" (no revela stack, no inventa integraciones).
- 👤 Casos límite: pregunta fuera de KB, idioma mixto ES/EN, mensaje vacío, prompt-injection básico.
- 🤖 **Aislamiento por `client_id`** (lente seguridad, chequeado acá para no duplicar): confirmar que toda query a Supabase filtra por `client_id` y que ningún workflow (Onboarding, Ingesta) mezcla KB de distintos clientes.
- 🤖 KB desactualizada: detectar info vieja conocida (ej. horarios check-in/out de un cliente) — reportar para re-ingestar. La corrección de datos de un cliente requiere su OK.
- 👤 ¿Loguea cada conversación a la Google Sheet correspondiente?
- 🟢 Roadmap validable en sandbox: reranking (Cohere), HNSW en tablas nuevas, migración a AI Agent node.

## 2. Workflows n8n (lentes: producto + infra + seguridad)

Recorrer el inventario de workflows una vez y evaluar los tres ángulos:
- 👤 Los workflows base por cliente (Bot Demo · Panel API · Reporte Semanal) existen y están sanos para cada cliente activo.
- 👤 Ejecuciones recientes: tasa de error, ejecuciones colgadas, timeouts (TODOS los workflows, no solo marketing).
- 👤 **Cuota de ejecuciones**: consumo del mes vs. límite del plan. 🔴 si un cron frecuente (ej. un Monitor cada 5 min ≈ 8.640/mes) amenaza reventar el cupo y tumbar el resto en silencio.
- 🤖/👤 Higiene: workflows duplicados / `-copy` / `-fixed` activos por error que podrían disparar acciones dobles; workflows que deberían estar inactivos y corren (o viceversa).
- 👤 **Error Notification** activo y cableado a los workflows críticos. Anotar cuáles quedaron sin cablear (intencional vs. olvido).
- 🤖 Credenciales de terceros hardcodeadas en nodos de workflows exportados (Telegram token, chat ID, etc.).

## 3. Datos, backups y secretos (lente: seguridad + infra)

- 🤖 **Secretos en el repo**: grep por `sk-`, `AIza`, `sb_secret_`, `Bearer `, `OPENAI`, `HUNTER`, `MAPS`, `LINKEDIN`, `TELEGRAM`, `api_key`, `password`, `secret`.
- 🤖 Revisar los `.json` de `n8n-workflows/` — los exports suelen llevar claves embebidas. Confirmar que estén en `.gitignore` si las contienen.
- 🤖 Historial git: secretos commiteados y luego "borrados" (siguen en el historial) — `git log -p` sobre archivos sensibles.
- 🤖 `.gitignore`: ¿excluye `.env`, credenciales, exports con secretos, `*-copy.json`?
- 🤖 Archivos sueltos en root (xlsx, docx, imágenes, `-copy.json`): ¿contienen datos de clientes o credenciales que no deberían versionarse?
- 🤖 **PII de huéspedes** (nombres, emails, teléfonos, reservas) commiteada en el repo → 🔴.
- 🤖/👤 **Backups al día**: comparar los `.json` en `n8n-workflows/` contra los workflows reales. Marcar cuáles fueron editados en n8n y NO están exportados al repo (riesgo de pérdida total).
- 👤 Supabase: plan, uso de almacenamiento, ¿backups habilitados?

## 4. Superficie expuesta (lente: seguridad)

- 🤖 Listar todos los webhooks n8n públicos (chat, panel-data ×N, ingest-document, onboarding-hotel, onboarding-status, baja).
- 🤖 Por cada uno: ¿tiene autenticación / token en la URL, o es endpoint abierto? `ingest-document` y `onboarding-hotel` aceptan POST arbitrario → ¿un tercero puede inyectar basura a Supabase o disparar onboardings falsos?
- 🤖 `panel-data` y endpoints que devuelven datos: ¿filtran por cliente o devuelven todo a quien pregunte?
- 🤖 URLs de paneles/dashboards adivinables sin login (auth pendiente en roadmap) → registrar como **riesgo conocido y aceptado**, no re-reportar como nuevo cada vez.
- 🤖 Sitio estático y `*-widget.js`: ¿algún JS expone keys del lado cliente? ¿El `@n8n/chat` SDK apunta solo a los webhooks esperados? ¿CORS del widget?
- 🟢 Headers de seguridad del sitio (CSP, HSTS) — mejora, no bloqueante.

## 5. Cuotas, costos y tokens por vencer (lente: infra)

- 👤 **n8n**: plan vigente y costo; versión vs. features esperadas (AI Agent node, MCP instance).
- 👤 **OpenAI / Maps / Hunter**: gasto del período, ¿cerca de algún cap? ¿algún costo creciendo raro (loop, retry infinito)?
- 👤 **Tokens con expiración**: LinkedIn (~60 días), OAuth de Gmail (matiidutlii@ y team@), Google Sheets, OneDrive de clientes, Telegram, Calendly. Armar el mapa "qué se rompe si este token expira" para los críticos.
- 👤 2FA en cuentas críticas (GitHub, Google, Cloudflare, n8n).

## 6. Sitio, dashboards y onboarding técnico (lente: producto + infra)

- 🤖 `index.html` (demo cinematográfica): estructura sana, CTAs presentes, link `?hotel=` arma demo personalizada; sistema de diseño consistente (Cormorant Garamond + DM Sans + dorado #c8912b).
- 🤖 `panel-*.html` / `dashboard-*.html`: consumen el Panel API correcto; branding por cliente correcto (no mezclar tema Sun Life con el de plataforma). Marcar cuáles siguen con **demo data hardcodeada** vs. datos reales.
- 👤 Onboarding self-service: correr un job de prueba en `onboarding.html` → los 4 pasos (received/ingestion/smoketest/email) llegan a `done`; los 6 verticales cargan su `vocab`; `retryVerification()` anda; webhook y status endpoint responden.
- 👤 Deploy: push a main → Cloudflare Pages live; Netlify legacy intacto (widget de Emma apunta ahí); ambos al branch correcto, auto-deploy ON.

---

## Cumplimiento (lente: seguridad) — revisar en cada corrida

- 🤖 Cold emails (W2/W3) con opt-out / baja (CAN-SPAM / GDPR). Retención: ¿se borran datos de quien pidió baja?
- 🟡 PII en Google Sheets y Supabase: ¿base legal / política de privacidad publicada? (relevante para clientes en Europa).

## Acciones que este playbook PUEDE aplicar (con OK)

- Fixes en templates de plataforma, páginas públicas, sandbox Patagonia.
- Proponer re-ingesta de KB desactualizada (ejecuta solo con OK; si es de un cliente, requiere su autorización).
- Actualizar `infrastructure.md` / `status.md` si la realidad cambió.
- **Nunca** rotar/borrar claves ni tocar workflows, datos o prompts de clientes.

## Entregable

1. **Tabla de aging** (hallazgos de la auditoría anterior: resueltos / abiertos N semanas / nuevos).
2. **Tabla de salud por componente** con las tres lentes.
3. **Bugs 🔴** que rompen demo/venta o exponen datos (prioridad máxima).
4. **Lista 👤 "andá a mirar esto"** — los checks de dashboard pendientes, con el lugar exacto.
5. **Riesgos conocidos y aceptados** (ej. paneles sin auth) para no re-reportarlos como nuevos.
