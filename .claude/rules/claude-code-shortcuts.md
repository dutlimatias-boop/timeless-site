# Claude Code — Shortcuts & Workflow Tips

Sugiere estos comandos en el momento justo, sin que el usuario los pida.

## Cuándo sugerir cada uno

| Situación | Sugerir |
|-----------|---------|
| Antes de cambios grandes o multi-archivo | `Shift+Tab+Tab` → Plan Mode: Claude explora el codebase y arma un plan antes de tocar código |
| El usuario cambia de tema o empieza tarea nueva | `/clear` → resetea el contexto para que Claude se enfoque solo en lo nuevo |
| Se menciona un archivo específico en el chat | `@nombre-archivo` → agrega el archivo al contexto directamente |
| El usuario busca algo que ya escribió antes | `Ctrl+R` → busca en historial de comandos interactivamente |
| Algo salió mal y quiere volver atrás | `Esc+Esc` → restaura código y/o conversación a un punto anterior |
| Tarea larga en buen camino, quiere que Claude avance solo | `Shift+Tab` → auto-accept mode: Claude edita archivos sin pedir confirmación |
| Usuario pregunta sobre una librería o doc externa | Claude puede buscar docs en tiempo real: "revisá la doc oficial de X" |

## Shortcuts rápidos

```
Shift+Tab+Tab   → Plan Mode (análisis + plan antes de codear)
Shift+Tab       → Auto-accept mode (Claude edita solo)
Ctrl+R          → Historial de comandos
Esc+Esc         → Rewind (volver a punto anterior)
@archivo.ts     → Agregar archivo al contexto
/clear          → Limpiar conversación (nuevo contexto limpio)
/compact        → Compactar historial largo sin perder contexto
```

## Regla de oro
Cuando termina una feature o bloque de trabajo → siempre sugerir `/clear` antes de empezar lo siguiente.
