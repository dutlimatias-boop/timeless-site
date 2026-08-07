# Playbooks de Revisión — Timeless

Guías **atemporales** para auditar los sistemas de Timeless. No contienen estado puntual ni fechas: describen *qué revisar* y *cómo*, de modo que sigan sirviendo aunque el proyecto evolucione.

## Cómo usar
Pedile a Claude Code, dentro del proyecto:

> "Corré el playbook de motor" (o comercial, mercado, sync)

Claude leerá el `.md` correspondiente, ejecutará cada paso (leyendo workflows, archivos, configs reales del momento) y devolverá un **informe con hallazgos, severidad y acciones recomendadas**. Donde detecte drift en docs/config **propias de Timeless**, propone la corrección y la aplica tras tu OK. Nunca modifica datos, workflows ni prompts de clientes.

## Los 4 playbooks

De 9 playbooks originales quedaron **4**: dos grandes que agrupan por *evidencia compartida* (recorren el mismo sistema una sola vez y le hacen todas las preguntas), y dos focalizados que quedan solos porque su evidencia no se comparte con nada.

| Playbook | Junta (antes) | La pregunta única | Cadencia |
|----------|---------------|-------------------|----------|
| 🔧 [**revision-motor.md**](revision-motor.md) | plataforma + infraestructura + seguridad | *¿El sistema funciona, aguanta y está protegido?* | Semanal (núcleo) |
| 📈 [**revision-comercial.md**](revision-comercial.md) | marketing + ventas + clientes + finanzas | *¿Entran leads, se convierten, se quedan y dejan plata?* | Quincenal |
| 🧭 [**revision-mercado.md**](revision-mercado.md) | *(sin cambios)* | *¿Seguimos bien parados vs. competidores?* | Trimestral |
| 🔄 [**sync-documentacion.md**](sync-documentacion.md) | *(sin cambios)* | *¿Los papeles dicen la verdad?* | Al final de cada revisión integral |

### Por qué se agruparon así
- **Motor** = un solo recorrido por n8n / Supabase / sitio / credenciales, con tres lentes por componente (¿funciona? / ¿aguanta y cuesta? / ¿está expuesto?). Antes, el aislamiento por `client_id`, los tokens/costos de API y la higiene de workflows estaban repetidos en 2–3 playbooks.
- **Comercial** = un solo recorrido por el CRM, siguiendo al prospecto de punta a punta: atraer → convertir → retener → rentar. El CRM era la columna vertebral de los cuatro playbooks originales.
- **Mercado** y **Sync** quedan solos: Mercado usa evidencia 100% externa (búsqueda web) y Sync es un paso meta que consume los hallazgos de los otros, por eso **corre último**.

### Orden para una revisión integral
`Motor → Comercial → Mercado → Sync`. Sync va al final porque su insumo es lo que las otras encontraron.

## Cómo funcionan (mejoras incorporadas)

**Dos carriles por check** — cada paso está etiquetado:
- 🤖 **Auto** — el agente lo verifica solo (repo + MCP de n8n si hay red). Corre sin fricción en cada pasada.
- 👤 **Manual** — necesita un dashboard externo (n8n Executions, Supabase, billing). El agente lo devuelve como lista corta "andá a mirar esto" con el lugar exacto.

> Se corre primero todo lo 🤖 y nunca se frena la corrida esperando acceso manual.

**Apertura con memoria (aging)** — cada playbook arranca leyendo la auditoría anterior (`docs/auditoria-semanal.md`) y marca cada hallazgo previo como **resuelto / abierto (N semanas) / nuevo**. Un hallazgo que reaparece por 3ª vez sube a 🔴 por antigüedad, aunque su severidad técnica sea menor. Esto cierra el gap real del sistema: **detectar bien pero no accionar.**

## Reglas que todo playbook respeta
- **Cliente vs. plataforma:** nunca modificar datos/workflows/prompts propiedad de un cliente (ver `CLAUDE.md`). Sobre lo de clientes la auditoría es **solo lectura**; sobre sandbox/templates/docs de Timeless puede proponer y aplicar cambios con tu OK.
- **Output siempre:** informe estructurado → hallazgo · evidencia · severidad (🔴/🟡/🟢) · acción recomendada. Nada se "arregla" sin confirmación.
- **Atemporal:** si un paso menciona un workflow o archivo, verificar que siga existiendo antes de evaluarlo — los nombres/IDs cambian.
- **Modo update con OK:** los playbooks que tocan docs proponen el diff y lo aplican solo tras tu confirmación.
