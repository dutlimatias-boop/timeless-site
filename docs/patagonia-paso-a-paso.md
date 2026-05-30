# ✅ Paso a paso — Experimentos sandbox Patagonia

Guía para Matías. Orden por dependencia. Cada paso dice **quién** lo hace y **qué entregar**.
Detalle técnico en `docs/patagonia-sandbox-experiments.md`.

---

## TRAMO 1 — Cohere (para el reranking) · ⏱️ ~5 min · lo hacés vos

1. Entrá a **https://dashboard.cohere.com/welcome/register** y creá cuenta (gratis, con tu Gmail).
2. Confirmá el email.
3. En el panel, andá a **"API Keys"** (menú izquierdo).
4. Vas a ver una **"Trial key"** (free) ya creada. Copiala.
5. **Pasámela** por acá (o guardala en n8n, ver Tramo 3) → con eso aplico el reranking.

> La Trial key de Cohere es gratis, alcanza de sobra para probar. Sin tarjeta.

---

## TRAMO 2 — Credencial Anthropic en n8n (para Claude) · ⏱️ ~3 min · lo hacés vos

1. Abrí tu key de Anthropic: está en el archivo `KEY antrophic.txt` (en la carpeta del proyecto).
   - Si no tenés una válida: sacá una en **https://console.anthropic.com/settings/keys** → "Create Key".
2. Entrá a n8n: **https://matiasdutli22.app.n8n.cloud**
3. Menú izquierdo → **Credentials** → botón **"Add credential"** (arriba a la derecha).
4. En el buscador escribí **"Anthropic"** → elegí **"Anthropic API"**.
5. Pegá la key en el campo **"API Key"**.
6. Ponele de nombre **`Anthropic Timeless`** → **Save**.
7. Avisame que está → con eso armo la versión Claude del bot.

---

## TRAMO 3 — Dónde guardar las keys (⚠️ NO usar Variables)

**Variables es feature Enterprise** — el plan actual ($20) no la tiene. La caja fuerte que SÍ está en todos los planes son las **Credentials** (tipo "Header Auth").

| Key | Dónde va | Plan |
|-----|----------|------|
| Anthropic (Claude) | Credencial "Anthropic API" (Tramo 2) | ✅ todos |
| Cohere | Rápido: hardcode en Code Tool (sandbox). Prolijo: credencial Header Auth | ✅ todos |
| OpenAI / Supabase | Hoy hardcodeadas → mover a credenciales Header Auth en Tramo 5 | ✅ todos |

**Para avanzar HOY:** como el sandbox ya tiene OpenAI + Supabase hardcodeadas, pegá la de Cohere igual en el Code Tool. No agrega riesgo nuevo. La limpieza completa (las 3 keys → Header Auth credentials) va en el Tramo 5 — **sin necesidad de Variables**.

---

## TRAMO 4 — Yo ejecuto (cuando tengas Tramo 1 y 2 listos)

- [ ] Aplico el **reranking** (Code Tool v2) en el sandbox → recupera 20, Cohere rerankea a 4.
- [ ] Duplico el workflow → **`Hotel Patagonia - Bot Demo (Claude test)`** con Claude Sonnet 4.6.
- [ ] Corro 5 preguntas de prueba en cada versión y te paso la comparación (calidad + costo + velocidad).
- [ ] Te recomiendo cuál dejar.

---

## TRAMO 5 — Seguridad (coordinado, esta semana) · ⏱️ ~10 min juntos

⚠️ Toca el Supabase que también usa Emma de Ana. Hacerlo en una sola sentada:

1. **Vos:** rotás la key de OpenAI (platform.openai.com → API keys → revoke + create).
2. **Vos:** rotás el secret de Supabase (Supabase → Project Settings → API → roll `service_role`).
3. **Vos:** ponés las nuevas en n8n Variables (Tramo 3).
4. **Yo:** actualizo TODOS los workflows que usan esas keys para leer de Variables — en el mismo momento, así nada se cae.
5. Probamos que Emma (Ana) y Patagonia sigan respondiendo. ✅

> No arranques este tramo solo: avisame y lo hacemos juntos para que Emma no se caiga.

---

## Resumen: qué necesito de vos para arrancar YA

1. 🔑 **Trial key de Cohere** (Tramo 1) → desbloquea reranking
2. 🔑 **Credencial Anthropic en n8n** (Tramo 2) → desbloquea Claude

Con esas dos, ejecuto el Tramo 4 entero.
