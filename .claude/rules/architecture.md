# Architecture

## Bot flow
1. Guest sends a message
2. n8n workflow receives it via webhook
3. Message is embedded with OpenAI → similarity search in Supabase
4. Relevant chunks returned → sent to GPT as context
5. GPT generates response → sent back to guest

## RAG knowledge base
- Stored in Supabase with pgvector
- Each client isolated by `client_id` field
- Table: `documents` — fields: `id`, `content`, `embedding`, `client_id`, `metadata`
- Ingest webhook: `POST https://matiasdutli22.app.n8n.cloud/webhook/ingest-document`
- Body: `{ "client_id": "client_name", "text": "..." }`
- Ingestion workflow: "Timeless — Ingesta de documentos"
