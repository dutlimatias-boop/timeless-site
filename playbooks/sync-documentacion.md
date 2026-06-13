# Playbook — Sincronización de Documentación

**Objetivo:** mantener la documentación interna alineada con la realidad. Detecta drift entre lo que dicen los docs (`.claude/rules/*`, `CLAUDE.md`, `MEMORY.md`, `docs/*`) y lo que de verdad existe (workflows, IDs, archivos, estados, URLs) — y **actualiza los docs** donde estén desactualizados. Atemporal por diseño.

**Modo de ejecución:** auditoría + actualización con OK. Este es el playbook que *más* genera updates. Solo modifica documentación de Timeless — nunca workflows, datos o config de clientes.

**Formato de salida:** tabla de drift → afirmación en doc · realidad observada · archivo:línea · corrección propuesta. Al final, aplicar las correcciones aprobadas.

---

## 1. Workflows n8n — docs vs. realidad
- [ ] Listar workflows reales en n8n (nombre, ID, activo/inactivo).
- [ ] Comparar contra las tablas de `status.md`, `clients.md`, `infrastructure.md`:
  - ¿Algún workflow listado que ya no existe?
  - ¿Algún workflow real no documentado?
  - ¿IDs correctos? ¿Estado activo/inactivo coincide?
- [ ] Proponer correcciones a las tablas.

## 2. URLs, endpoints y recursos
- [ ] Webhooks documentados ↔ webhooks reales.
- [ ] URLs de páginas (Cloudflare/Netlify) responden y son las que figuran.
- [ ] Sheet IDs, Supabase tables, Calendly link, repos — verificar que existan y coincidan.
- [ ] Variables de entorno listadas en `infrastructure.md` ↔ las que realmente usa n8n.

## 3. Estado de tareas y roadmap
- [ ] `roadmap.md`: ítems marcados como completados que NO lo están (o viceversa).
- [ ] Bloqueos en `clients.md`/`status.md`: ¿siguen vigentes o ya se resolvieron?
- [ ] "Próximas prioridades" / "Pendientes": ¿siguen siendo relevantes?

## 4. Coherencia entre documentos
- [ ] Mismos datos repetidos en varios archivos (pricing, IDs, estados) — ¿coinciden entre sí?
- [ ] `CLAUDE.md` raíz vs `.claude/CLAUDE.md` + `rules/*`: ¿contradicciones? (ej. Sheets vs Excel/OneDrive de Ana).
- [ ] Pricing consistente entre `strategy.md`, emails (W2/W3) y material de venta.
- [ ] Fechas relativas convertidas a absolutas donde corresponda.

## 5. Memoria persistente (`MEMORY.md` + memory/)
- [ ] Cada entrada del índice apunta a un archivo que existe.
- [ ] Hechos en memory/ que ya no son ciertos → corregir o borrar.
- [ ] Duplicados entre memorias → consolidar (ver skill `consolidate-memory`).
- [ ] Algo importante que pasó y no está registrado → proponer nueva memoria.

## 6. Archivos sueltos en el repo
- [ ] Archivos en root sin lugar claro (docx, xlsx, imágenes, `-copy.json`, drafts) — ¿documentar dónde van, archivar o sumar a `.gitignore`?

---

## Acciones que este playbook PUEDE aplicar (con OK)
- Editar `.claude/rules/*`, `CLAUDE.md`, `MEMORY.md`, `docs/*` para reflejar la realidad.
- Crear/actualizar/borrar archivos de memoria.
- NUNCA modificar workflows, datos ni config de clientes (solo documentarlos correctamente).

## Entregable
1. Tabla de drift detectado (afirmación · realidad · archivo).
2. Diff de correcciones propuestas, aplicadas tras tu OK.
3. Lista de docs que quedaron verificados como correctos (para no re-auditarlos en vano).
