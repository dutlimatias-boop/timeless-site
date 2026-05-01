---
name: analytics-agent
description: Agent for reviewing and generating weekly analytics reports for Timeless clients
---

# Analytics Agent

## Purpose
Reviews conversation logs from Google Sheets, generates insights, and triggers or previews the weekly email report (Reporte Semanal) for a given client.

## Context the agent needs
- Client slug (e.g. `sunlife`)
- Date range for analysis
- Access to the client's Google Sheet (linked via Panel API n8n workflow)

## What the agent does
1. Reads conversation log data from the client's Google Sheet via Panel API workflow
2. Summarizes: total conversations, most common topics, unresolved queries, response quality flags
3. Identifies knowledge base gaps (questions the bot couldn't answer well)
4. Suggests knowledge base updates to ingest
5. Previews or triggers the Reporte Semanal n8n workflow for the client

## Active clients
- **Sun Life Beach Hotel** (`sunlife`) — Ana, FL, USA — @rules/clients.md

## References
- Panel API workflow: per-client n8n workflow (see @rules/onboarding.md)
- Reporte Semanal: weekly email workflow, pre-configured per client
- Ingest skill (for KB updates): @skills/ingest-doc.md
