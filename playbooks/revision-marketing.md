# Playbook — Revisión del Sistema de Marketing

**Objetivo:** verificar que el motor de adquisición (búsqueda de prospectos → cold email → follow-up → contenido) esté funcionando, midiendo salud técnica y efectividad. Atemporal: evalúa el estado actual de los workflows y el CRM, sin asumir conteos fijos.

**Modo de ejecución:** solo lectura sobre workflows y CRM. No pausar/activar workflows ni enviar emails sin OK de Matías.

**Formato de salida:** por componente → estado (✓/⚠/✗) · evidencia · qué falla · acción. Más, al final, métricas de embudo y recomendaciones priorizadas.

---

## 1. W1 — Lead Hunter (búsqueda de prospectos)
- [ ] ¿Está activo? ¿Cuándo corrió por última vez? Revisar ejecuciones recientes (éxitos/errores).
- [ ] City rotation (ISO week): ¿está rotando ciudades sin repetir? ¿Cubre los mercados de `strategy.md` (LATAM → España → Suiza)?
- [ ] Threshold de scoring (≥ 7): ¿sigue filtrando bien o trae demasiados/pocos prospectos?
- [ ] ¿Está cubriendo los 5 verticales (hoteles, restaurantes, beauty, clínicas, inmobiliarias) o se sesgó a uno?
- [ ] ¿Los prospectos llegan a la pestaña Prospectos del CRM sin duplicados?
- [ ] Consumo de Google Maps / Places API: ¿dentro de cuota? ¿costo razonable?

## 2. W2 — Outreach Email (cold email)
- [ ] ¿Está activo y enviando? Volumen aproximado por semana.
- [ ] Personalización: ¿el email usa vertical + mercado + ROI específico? ¿El link `/?hotel=Nombre` se arma bien?
- [ ] **Deliverability:** SPF/DKIM/DMARC del dominio remitente OK. ¿Los emails caen en spam? ¿Bounce rate?
- [ ] Reputación del remitente: ¿se está mandando desde matiidutlii@ o team@? ¿Volumen no dispara filtros?
- [ ] Encoding del senderName y cuerpo (revisar caracteres corruptos tipo "Mat?as" — problema conocido a vigilar).
- [ ] Campo "apertura" generado por GPT: ¿se usa o quedó muerto? Limpiar o integrar.
- [ ] Compliance: ¿incluye opt-out / forma de baja?

## 3. W3 — Follow-up Bot
- [ ] ¿Activo? Secuencia de 4 toques (días 1, 5, 12, 30) disparando en los tiempos correctos.
- [ ] ¿Detecta correctamente a quién ya respondió para NO seguir insistiendo? (riesgo de spamear a alguien que ya contestó).
- [ ] ¿Los textos de cada toque son distintos y aportan valor incremental?
- [ ] Encoding del remitente (mismo chequeo que W2).

## 4. W4 — Content Generator
- [ ] Estado (probablemente inactivo si no hay perfiles LinkedIn/Instagram). Confirmar bloqueo real.
- [ ] Parte A (genera posts) vs Parte B (auto-publica aprobados): ¿qué está listo y qué falta?
- [ ] ¿Existen ya los perfiles LinkedIn/Instagram? (bloqueante histórico de adquisición inbound).
- [ ] Si está inactivo: confirmar que es decisión consciente y no un workflow roto.

## 5. CRM — Google Sheet Maestro
- [ ] Pestañas presentes y consistentes: Prospectos · Pipeline · Clientes · Contenido.
- [ ] `GOOGLE_SHEET_ID` configurado en n8n Variables y apuntando al sheet correcto.
- [ ] Integridad: ¿hay filas corruptas, columnas desalineadas, duplicados entre Prospectos y Pipeline?
- [ ] ¿La columna de Estado se actualiza (manual o automático)? Gap conocido: replies clasificados por Mateo no actualizan Estado automáticamente.

## 6. Mensajería y marca
- [ ] Coherencia con `strategy.md`: ¿los emails respetan el "Lo que NO decir" (no mencionar n8n/Supabase, no decir "chatbot", arrancar por el problema)?
- [ ] Pricing en mensajes: ¿coincide con el pricing vigente (geographic pricing LATAM/Europa)?
- [ ] Landing `index.html`: ¿el link `?hotel=` y la demo cinematográfica funcionan? ¿CTA a Calendly/onboarding vivos?
- [ ] Sistema de diseño aplicado consistentemente (Cormorant Garamond + DM Sans + dorado #c8912b) en páginas públicas.

## 7. Salud técnica general
- [ ] Errores recientes en cualquier workflow de marketing (revisar Error Notification workflow / ejecuciones fallidas).
- [ ] API keys de marketing (Maps, OpenAI, Hunter) en Variables, no hardcodeadas (cruce con playbook de seguridad).
- [ ] Cuotas/costos de cada API dentro de lo esperado.

---

## Métricas de embudo a reportar (lo que esté disponible)
```
Prospectos nuevos (período)      → ___
Emails enviados (W2)             → ___
Tasa de apertura / respuesta     → ___
Follow-ups enviados (W3)         → ___
Replies recibidos                → ___
Posts generados / publicados     → ___
```

## Entregable del playbook
1. Tabla de estado por componente (W1–W4 + CRM + landing).
2. Métricas de embudo disponibles + cuellos de botella detectados.
3. Top 3 acciones para mejorar adquisición (recordar: el cuello real suele ser adquisición, no producto).
