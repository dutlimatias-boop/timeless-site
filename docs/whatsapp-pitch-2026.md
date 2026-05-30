# 📱 Timeless — Pitch de WhatsApp (2026)

**Uso:** argumentos de venta para el canal WhatsApp. Pegar en demos, deck, cold email y respuestas de Mateo.
**Basado en:** novedades WhatsApp Business API ene–mid 2026 (ver `docs/radar-2026-05.md`, Área 5).

---

## Las 2 armas nuevas

### 1. Co-Existence — "Emma y vos, en el mismo número"

Desde **enero 2026**, WhatsApp permite usar la **app manual** (WhatsApp Business App) y la **Cloud API** (automatización de Emma) **en el mismo número, al mismo tiempo**, con mensajes sincronizados en tiempo real. Antes había que elegir uno.

> **Por qué importa:** mata la objeción #1 de venta de WhatsApp — *"pero yo quiero seguir respondiendo manualmente a veces"*.

**Script de 3 líneas para demos:**
> "No tenés que elegir entre vos o el bot. Emma maneja el 80% de las consultas — disponibilidad, horarios, precios, ubicación — 24/7. Cuando querés meterte vos, abrís WhatsApp normal y respondés. Mismo número que ya usás. Sin migrar nada."

---

### 2. Meta-compliant by design — "Emma cumple las reglas, los bots genéricos no"

En 2026 **Meta endureció las reglas**: los bots de WhatsApp deben realizar **tareas de negocio concretas** (responder consultas, dar info de productos, tomar reservas). Los chats abiertos sin objetivo ya **no están permitidos**.

> **Por qué importa:** esto PERJUDICA a competidores con chatbots genéricos y FAVORECE a Timeless. Emma es RAG personalizado con objetivos claros — cumple por diseño.

**Para el sitio / deck:** badge **"Meta-compliant by design"**.
**Para el pitch:**
> "Emma no es un chatbot que charla por charlar — responde sobre TU negocio con objetivos concretos. Eso es exactamente lo que Meta ahora exige. Muchos bots genéricos van a quedar fuera de regla; Emma no."

---

## Stack técnico (cuando un cliente active WhatsApp)

```
Huésped → WhatsApp → Meta Cloud API → n8n webhook → Emma (RAG) → respuesta
```

- **Bridge recomendado:** Wati o AiSensy (~$30/mes, webhook nativo a n8n).
- **Modo:** Co-Existence activado → dueño responde manual cuando quiere.
- **Roadmap canal:** WhatsApp Flows para "consultar disponibilidad + dejar contacto" dentro del chat (compite con Asksuite).

> ⚠️ **Pendiente de Sun Life:** falta el número de WhatsApp del hotel (Ana lo da cuando retome). El camino ya está claro — esto es para vender el canal a prospectos nuevos.

---

## Dónde usar esto ya

| Canal | Acción |
|-------|--------|
| Landing (`index.html`) | Agregar sección/badge "Emma en tu WhatsApp — mismo número, Meta-compliant" |
| Deck de ventas | Slide de canales con las 2 armas |
| Mateo Reply Handler | Sumar a speech categoría INFO/DEMO el ángulo "mismo número que ya usás" |
| Cold email (W2) | Línea: "Emma atiende tu WhatsApp 24/7 sin que pierdas el control de tu número" |

---

## ⚙️ Pendiente técnico relacionado (no urgente)

- **BSUID** (mid-2026): WhatsApp dará un `Business Scoped User ID` permanente cuando el usuario oculte su número. Agregar campo `bsuid` al CRM y a la tabla de leads en Supabase desde ya, para no perder continuidad de conversaciones cuando llegue el cambio.
