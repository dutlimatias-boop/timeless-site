# Playbook — Revisión de Finanzas / Unit Economics

**Objetivo:** entender la salud económica de Timeless — ingresos (MRR), costos, margen por cliente y si el pricing tiene sentido. Atemporal: corre sobre los números del momento. Es la foto que dice si el negocio se sostiene.

**Modo de ejecución:** auditoría + actualización con OK sobre docs de plataforma (pricing en `strategy.md`). No ejecuta cobros ni mueve dinero — solo analiza.

**Formato de salida:** números clave → valor actual · tendencia · implicancia. Más recomendaciones de pricing/costo.

---

## 1. Ingresos
- [ ] Clientes de pago activos × precio = MRR actual.
- [ ] Clientes en setup gratis (primeros 3) vs. de pago — ¿cuántos cupos gratis quedan?
- [ ] Pipeline cercano a cerrar (de la pestaña Pipeline del CRM) → MRR potencial próximo.
- [ ] Progreso vs. meta de `strategy.md` (3 clientes activos → 5 de pago → MRR objetivo).

## 2. Costos fijos mensuales
- [ ] Inventario de costos recurrentes: n8n ($20), Google Workspace, Cloudflare, Supabase, dominio, Hunter.io, OpenAI (variable), Maps (variable), Calendly, otros.
- [ ] Total de costo fijo mensual.
- [ ] Costos variables que escalan con volumen (OpenAI, Maps, Hunter) — ¿proyección si suben los clientes?

## 3. Margen por cliente (unit economics)
- [ ] Costo marginal de servir un cliente (su parte de OpenAI/infra) vs. precio que paga.
- [ ] Margen bruto por cliente en LATAM ($49→$79) vs Europa ($99→$149).
- [ ] Punto de equilibrio: ¿cuántos clientes para cubrir costos fijos?
- [ ] CAC implícito: costo de adquisición (APIs de outreach + tiempo) vs. LTV estimado.

## 4. Salud del pricing
- [ ] Geographic pricing (LATAM vs Europa): ¿sigue teniendo sentido vs. costos reales?
- [ ] Setup gratis primeros 3: ¿se está respetando? ¿cuándo activar el precio de setup?
- [ ] Precio de lanzamiento que sube tras los primeros 3: ¿se está aplicando a los nuevos?
- [ ] Coherencia del pricing entre `strategy.md`, emails y material de venta (cruce con sync-docs).

## 5. Riesgos financieros
- [ ] Concentración: ¿demasiada dependencia de un solo cliente?
- [ ] Costos variables fuera de control (loops de API, retries) — cruce con infra.
- [ ] Runway: ¿los costos fijos son sostenibles con el MRR actual?

---

## Acciones que este playbook PUEDE aplicar (con OK)
- Actualizar tabla de pricing/metas en `strategy.md` si cambió.
- Proponer ajustes de precio o de plan de costos (no ejecuta cobros ni cambios de plan sin OK).

## Entregable
1. Snapshot: MRR · costo fijo mensual · margen · punto de equilibrio.
2. Salud del pricing y recomendaciones.
3. Riesgos financieros 🔴 si los hay.
