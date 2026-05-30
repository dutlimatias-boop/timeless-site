# 🧪 Sandbox Hotel Patagonia — Experimentos (Timeless)

**Workflow:** `Hotel Patagonia - Bot Demo` (id `fxrIKIn65oZ4o2RN`) — sandbox de plataforma, se toca libre.
**Estado actual del Bot Demo (auditado 2026-05-30):**
- Modelo: `gpt-4o-mini` (nodo OpenAI Chat Model)
- Memoria: Simple Memory (buffer window)
- RAG: dentro del **Code Tool** → embedding `text-embedding-3-small` → Supabase RPC `match_documents` (`match_count: 3`, `match_threshold: 0.3`, `filter_client_id: 'Hotel_Patagonia'`)
- Output: JSON estricto (intención/estado/datos de reserva) parseado por "Code in JavaScript"
- Side-effects: log a Google Sheet "Timeless - Hotels Base demo" + Telegram lead caliente + secuencia de follow-up por Gmail

---

## 🚨 BLOQUEO DE SEGURIDAD (resolver antes que nada)

El Code Tool tiene **secretos hardcodeados en texto plano**:
- OpenAI API key (`sk-proj-...`)
- **Supabase `service_role` secret** (`sb_secret_...`) → acceso TOTAL a la DB

**Acción requerida (manual, solo Matías puede):**
1. **Rotar la key de OpenAI** en platform.openai.com → API keys → revoke + create.
2. **Rotar el secret de Supabase** en Supabase → Project Settings → API → roll service_role. (⚠️ esto afecta a TODOS los workflows que usan ese secret — Sun Life incluido. Coordinar.)
3. Guardar las nuevas keys en **n8n → Settings → Variables** (`OPENAI_API_KEY`, `SUPABASE_SECRET`) en vez de hardcodearlas.
4. En el Code Tool, leer de `$vars.OPENAI_API_KEY` y `$vars.SUPABASE_SECRET`.

> Nota: rotar el service_role de Supabase toca infraestructura compartida con Sun Life (Emma de Ana lee del mismo Supabase). No es "solo sandbox". Coordinar antes de rotar.

---

## Tarea A — Reranking con Cohere (Code Tool v2)

**Objetivo:** subir precisión de retrieval ~70%→90% sin cambiar embeddings ni LLM.
**Cómo:** recuperar 20 candidatos de Supabase, rerankear con Cohere `rerank-v3.5`, quedarse con top 4.
**Prerrequisito:** API key de Cohere (free tier: dashboard.cohere.com → API Keys).

> ⚠️ **NO usar `$vars`** — Variables es Enterprise, no está en el plan actual. Para el sandbox: pegar las keys inline (igual que hoy). La limpieza a credenciales Header Auth va en el Tramo 5 de seguridad. Abajo va con placeholders — los valores reales de OpenAI/Supabase ya están en el workflow, solo hay que **agregar la línea de Cohere**.

### Code Tool v2 (reemplaza el jsCode actual)

```javascript
const query = $json.input;

// Keys inline (sandbox). Mover a Header Auth credentials en Tramo 5.
const OPENAI_KEY   = 'sk-proj-...';        // el que ya está en el workflow
const SUPABASE_KEY = 'sb_secret_...';      // el que ya está en el workflow
const COHERE_KEY   = 'PEGAR_TRIAL_KEY_COHERE';

// 1. Embedding de la consulta
const embeddingResponse = await helpers.httpRequest({
  method: 'POST',
  url: 'https://api.openai.com/v1/embeddings',
  headers: {
    'Authorization': `Bearer ${OPENAI_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ model: 'text-embedding-3-small', input: query })
});
const queryEmbedding = embeddingResponse.data[0].embedding;

// 2. Retrieval amplio: 20 candidatos (antes 3)
const searchResponse = await helpers.httpRequest({
  method: 'POST',
  url: 'https://mueljmpduxhhdyryyckl.supabase.co/rest/v1/rpc/match_documents',
  headers: {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query_embedding: queryEmbedding,
    match_threshold: 0.2,      // más permisivo: el reranker filtra después
    match_count: 20,
    filter_client_id: 'Hotel_Patagonia'
  })
});

if (!searchResponse || searchResponse.length === 0) {
  return 'No encontre informacion relevante.';
}

const docs = searchResponse.map(r => r.content);

// 3. Rerank con Cohere → top 4
let topChunks;
try {
  const rerank = await helpers.httpRequest({
    method: 'POST',
    url: 'https://api.cohere.com/v2/rerank',
    headers: {
      'Authorization': `Bearer ${COHERE_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'rerank-v3.5',
      query: query,
      documents: docs,
      top_n: 4
    })
  });
  topChunks = rerank.results.map(r => docs[r.index]);
} catch (e) {
  // Fallback: si Cohere falla, usar los primeros 3 del vector search
  topChunks = docs.slice(0, 3);
}

return topChunks.join('\n\n') || 'No encontre informacion relevante.';
```

### Cómo medir (antes/después)
- Set de ~15 preguntas reales de huésped (precios, mascotas, check-in, actividades, cancelación).
- Correr contra el bot con/sin rerank, comparar si la respuesta cita el chunk correcto.
- Métrica simple: % de respuestas con info correcta. Objetivo: subir de ~70% a >85%.

---

## Tarea B — Migrar el LLM a Claude

**Objetivo:** comparar calidad + costo de Claude vs `gpt-4o-mini` en el sandbox.
**Prerrequisito:** credencial de Anthropic configurada en n8n (usar key de `KEY antrophic.txt`).

### Pasos
1. n8n → Credentials → New → "Anthropic API" → pegar la key.
2. En el Bot Demo, agregar nodo **Anthropic Chat Model** (`@n8n/n8n-nodes-langchain.lmChatAnthropic`).
3. Modelo sugerido para comparar: empezar con **`claude-sonnet-4-6`** (sweet spot precio/calidad), no Opus (más caro para un bot de FAQ).
4. Conectar al AI Agent en `ai_languageModel` (reemplazando OpenAI Chat Model — **desconectar, no borrar**, para poder volver).
5. Verificar que sigue devolviendo el **JSON estricto** del system prompt (Claude lo hace bien, pero testear 5 casos).
6. Comparar: calidad de respuesta + tokens/costo + latencia.

### Recomendación de método
**No migrar in-place de una.** Mejor: duplicar el workflow como `Hotel Patagonia - Bot Demo (Claude test)` y cambiar solo el modelo ahí. Así corre A/B real sin romper el sandbox que ya funciona. Cuando Claude gane, recién ahí se promueve.

> ⚠️ Esto es para el SANDBOX. La migración del bot de un cliente real (Emma de Ana, que corre sobre GPT) solo se hace con OK explícito del cliente.

---

## Estado de prerrequisitos

| Tarea | Prerrequisito | ¿Lo tenemos? |
|-------|---------------|--------------|
| Rotar secretos | Acceso a OpenAI + Supabase dashboards | ✅ (Matías) — acción manual pendiente |
| Reranking | API key de Cohere (free tier) | ✅ credencial `Cohere account` creada |
| Migrar a Claude | Credencial Anthropic **tipo nativo** en n8n | ⏳ existe "Anthropic API Key" pero es Header Auth; el nodo Claude necesita tipo `anthropicApi` |

---

## 📌 Estado del build de Reranking (2026-05-30)

**HECHO:**
- Sub-workflow **`Hotel Patagonia - RAG Rerank`** (id `wU8MTEcUENyqA1Hj`) creado:
  - Trigger (input `query`) → HTTP OpenAI Embed → HTTP Supabase (match_count 20) → Code Normalize → HTTP Cohere Rerank (top 4) → Code Format
  - Usa credenciales: `openAiApi` (5OjPRZqi40gZQvVY), `supabaseApi` (tZTIbL4BYH0f8Hdd), `cohereApi` (wh0wx6aRSMiZYnsw) — **sin keys hardcodeadas**
- Conectado al **Bot Demo** (`fxrIKIn65oZ4o2RN`) como tool `buscar_info_hotel` (toolWorkflow v2.2)
- Code Tool viejo **desactivado** (revertible)

**BLOQUEADO — sin testear:**
- 🔴 Cuenta n8n Cloud llegó a **2.500/2.500 ejecuciones de mayo**. Plan Starter ($20).
- Resetea **1 de junio**. Apenas haya ejecuciones → testear el bot por chat e inspeccionar la ejecución del sub-workflow.
- Verificar especialmente: que la credencial **supabaseApi** inyecte bien el auth en el HTTP Request (si falla, usar Header Auth genérico), y que Cohere devuelva `results[].index`.

**Aprendido:**
- n8n corre **v2.21.8** (ya es 2.x). Tacha el pendiente "verificar n8n 2.0".
- Cupo de 2.500 ejec/mes es ajustado con marketing + bots. Revisar consumo por workflow al resetear; evaluar plan si entran clientes.

**Pendiente Claude (Tarea B):** crear credencial nativa `Anthropic API` (no Header Auth) antes de armar la versión Claude.
