---
name: ingest-doc
description: Ingest a knowledge base document into Supabase for a specific client
---

# Ingest Document to RAG

Ingests text content into the Supabase vector DB for a given client.

## Endpoint
POST https://matiasdutli22.app.n8n.cloud/webhook/ingest-document

## Body
```json
{ "client_id": "client_name", "text": "..." }
```

## Steps
1. Confirm the `client_id` to use (must match existing client or new onboarding)
2. Read the `.txt` knowledge base file for the client
3. POST to the ingest webhook — n8n handles embedding via OpenAI and storage in Supabase
4. Verify ingestion by checking the `documents` table in Supabase filtered by `client_id`

## Notes
- Each chunk is stored with `client_id` so RAG results are always client-isolated
- Re-ingesting updates the knowledge base; old chunks are not automatically removed
- Workflow name in n8n: "Timeless — Ingesta de documentos"
