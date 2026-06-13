# Playbooks de Revisión — Timeless

Guías **atemporales** para auditar los sistemas de Timeless. No contienen estado puntual ni fechas: describen *qué revisar* y *cómo*, de modo que sigan sirviendo aunque el proyecto evolucione.

## Cómo usar
Pedile a Claude Code, dentro del proyecto:

> "Corré el playbook de seguridad" (o marketing, ventas, plataforma, etc.)

Claude leerá el `.md` correspondiente, ejecutará cada paso (leyendo workflows, archivos, configs reales del momento) y devolverá un **informe con hallazgos, severidad y acciones recomendadas**. Donde detecte drift en docs/config **propias de Timeless**, propone la corrección y la aplica tras tu OK. Nunca modifica datos, workflows ni prompts de clientes.

## Playbooks disponibles (en orden de importancia)

| # | Archivo | Qué revisa | Cadencia sugerida |
|---|---------|-----------|-------------------|
| 1 | [revision-plataforma.md](revision-plataforma.md) | Emma, RAG, workflows n8n, dashboards, onboarding técnico, sitio | Mensual + antes de demos importantes |
| 2 | [revision-infraestructura.md](revision-infraestructura.md) | Cuotas/costos API, tokens por expirar, backups, hosting, uptime | Mensual |
| 3 | [revision-clientes.md](revision-clientes.md) | Salud por cliente, ROI entregado, señales de churn, upsell | Quincenal |
| 4 | [sync-documentacion.md](sync-documentacion.md) | Drift entre docs (rules/CLAUDE.md/MEMORY.md) y la realidad → actualiza | Mensual + tras cambios grandes |
| 5 | [revision-seguridad.md](revision-seguridad.md) | Secretos, accesos, aislamiento por client_id, superficie expuesta | Mensual + tras cada cambio de infra |
| 6 | [revision-marketing.md](revision-marketing.md) | Workflows de adquisición (W1–W4), CRM, deliverability, mensajería | Quincenal |
| 7 | [revision-ventas.md](revision-ventas.md) | Funnel de respuesta, Mateo Reply Handler, Calendly, conversión, onboarding | Quincenal |
| 8 | [revision-mercado.md](revision-mercado.md) | Competidores, tendencias, posicionamiento → actualiza competitors/radar | Trimestral |
| 9 | [revision-finanzas.md](revision-finanzas.md) | MRR, costos, margen por cliente, salud del pricing | Mensual |

> El orden es de importancia general; la cadencia es independiente. Para una revisión integral periódica, correr 1→9 de corrido.

## Reglas que todo playbook respeta
- **Cliente vs. plataforma:** nunca modificar datos/workflows/prompts propiedad de un cliente (ver `CLAUDE.md`). Sobre lo de clientes la auditoría es **solo lectura**; sobre sandbox/templates/docs de Timeless puede proponer y aplicar cambios con tu OK.
- **Output siempre:** informe estructurado → hallazgo · evidencia · severidad (🔴/🟡/🟢) · acción recomendada. Nada se "arregla" sin confirmación.
- **Atemporal:** si un paso menciona un workflow o archivo, verificar que siga existiendo antes de evaluarlo — los nombres/IDs cambian.
- **Modo update con OK:** los playbooks que tocan docs (sync-documentación, mercado, finanzas, y los demás donde haya drift en archivos de Timeless) proponen el diff y lo aplican solo tras tu confirmación.
