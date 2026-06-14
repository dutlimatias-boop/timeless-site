# PROMPT PARA CLAUDE CODE — Sistema de Marketing y Ventas Automatizado

## Contexto del proyecto

Timeless es un SaaS de AI para hoteles boutique. Tenemos un cliente activo (Sun Life Beach Hotel, Florida) con un bot llamado Emma que responde consultas 24/7. El stack es n8n + Supabase (pgvector) + OpenAI + Google Sheets + Netlify/Cloudflare Pages + GitHub.

**n8n instance:** https://matiasdutli22.app.n8n.cloud  
**Repo:** https://github.com/dutlimatias-boop/timeless-site  
**Demo:** https://timeless-site.pages.dev/demo.html  
**Onboarding:** https://timeless-site.pages.dev/onboarding.html  

Quiero construir un pipeline de marketing y ventas completamente automatizado. La ÚNICA tarea manual que hago yo es mantener conversaciones directas con leads interesados. Todo lo demás lo hace el sistema.

---

## Archivos de referencia ya creados

- `timeless-crm-master.xlsx` — estructura del Google Sheet CRM con 4 pestañas
- `timeless-workflows-n8n.docx` — especificación detallada de cada workflow
- `timeless-templates-ventas.docx` — templates de respuesta para ventas

Leer esos archivos antes de empezar.

---

## Tarea 1 — Modificar demo.html para soportar parámetro ?hotel=

**Archivo:** `demo.html` en el repo

**Qué hacer:**
Agregar lógica JavaScript que lea el parámetro `?hotel=` de la URL y si existe, lo muestre como "Emma para [Nombre Hotel]" en el hero de la página.

```javascript
// Al cargar la página
const params = new URLSearchParams(window.location.search);
const hotelName = params.get('hotel');
if (hotelName) {
  // Decodificar el nombre
  const decoded = decodeURIComponent(hotelName);
  // Mostrar "Emma para [Hotel Name]" en el hero
  // Cambiar el subtítulo o badge de la hero section
  // Ejemplo: "Tu recepcionista virtual para [Hotel Name]"
}
```

La URL de demo con hotel pre-cargado se verá así:  
`https://timeless-site.pages.dev/demo.html?hotel=Hotel%20Boutique%20Mendoza`

Buscar en demo.html el hero principal y agregar este comportamiento. Si hay un elemento con el nombre del negocio o el subtítulo del hero, ese es el que hay que modificar.

---

## Tarea 2 — Crear el Google Sheet CRM maestro

**Nombre del sheet:** `Timeless — CRM Maestro`

Crear el sheet con estas 4 pestañas y columnas exactas:

### Pestaña 1: Prospectos
Columnas:
`A: Nombre Hotel | B: Ciudad/País | C: Tipo negocio | D: # Habitaciones | E: Score Booking | F: Rating Google | G: Tiene web? | H: Instagram? | I: SCORE IA (1-10) | J: Estado | K: Email encontrado | L: Fuente email | M: Fecha añadido | N: Enviado? | O: Fecha envío | P: Respuesta? | Q: Notas | R: Asignado a`

Estados posibles columna J: `Nuevo | Contactado | Interesado | Sin email | Descartado | Pipeline`

### Pestaña 2: Pipeline
Columnas:
`A: Nombre Hotel | B: Contacto (nombre) | C: Email | D: WhatsApp | E: Etapa | F: Fecha primer contacto | G: Último contacto | H: Próximo paso | I: Fecha próximo paso | J: Plan de interés | K: MRR estimado ($) | L: Probabilidad cierre | M: Notas`

Etapas posibles columna E: `Demo agendada | Propuesta enviada | Negociando | Cerrado | Perdido`

### Pestaña 3: Clientes
Columnas:
`A: Nombre negocio | B: Dueño/Contacto | C: Email | D: WhatsApp | E: Plan | F: MRR ($) | G: Fecha inicio | H: Próx. renovación | I: Bot name | J: Chat URL | K: Panel URL | L: client_id Supabase | M: Sheet ID Google | N: Estado Emma | O: Tareas pendientes | P: Notas`

Cargar Sun Life Beach Hotel como primera fila:
- Nombre: Sun Life Beach Hotel
- Contacto: Analía (Ana)
- Email: ana@sunlifebeachhotel.com
- Plan: Starter
- MRR: 79
- Bot name: Emma
- Chat URL: https://chic-begonia-1708bb.netlify.app/chat-sunlife.html
- client_id: sunlife_beach_hotel
- Sheet ID: 1P4iarHax1XdZDlw-oioJ1sxIqY77Rm_ACe8hCm2bwyM
- Estado: Activa

### Pestaña 4: Contenido
Columnas:
`A: Semana | B: Plataforma | C: Tipo | D: Tema/Hook | E: Copy completo | F: CTA | G: Hashtags | H: Estado | I: Fecha aprobación | J: Fecha publicación | K: Notas`

Estados posibles columna H: `Borrador | Aprobado | Publicado ✓ | Rechazado`

**IMPORTANTE:** Compartir el sheet con permisos de edición a la cuenta de servicio que se usará en n8n, o configurar OAuth2.

---

## Tarea 3 — Workflow n8n: Lead Hunter (W1)

**Nombre en n8n:** `Timeless — Lead Hunter`  
**Trigger:** Schedule — todos los lunes a las 8:00am

### Nodos en orden:

**1. Schedule Trigger**
- Mode: Every Week
- Day of Week: Monday
- Hour: 8, Minute: 0

**2. Set Variables (Edit Fields)**
```json
{
  "ciudades": ["Mendoza, Argentina", "Cartagena, Colombia", "Montevideo, Uruguay", "Santiago, Chile", "Miami, Florida", "Buenos Aires, Argentina"],
  "categoria": "boutique hotel",
  "score_minimo": 7
}
```

**3. Split In Batches**
- Batch Size: 1
- Input field: ciudades

**4. HTTP Request — Google Maps Places API**
- URL: `https://maps.googleapis.com/maps/api/place/textsearch/json`
- Method: GET
- Query Parameters:
  - `query`: `{{ $json.categoria }} in {{ $json.currentItem }}`
  - `key`: `{{ $env.GOOGLE_MAPS_API_KEY }}`
  - `language`: `es`
  - `type`: `lodging`

**5. Split Out — separar resultados**
- Field To Split Out: `results`
- Include Other Fields: false

**6. HTTP Request — OpenAI scoring**
- URL: `https://api.openai.com/v1/chat/completions`
- Method: POST
- Headers: `Authorization: Bearer {{ $env.OPENAI_API_KEY }}`
- Body (JSON):
```json
{
  "model": "gpt-4o-mini",
  "temperature": 0.3,
  "max_tokens": 150,
  "messages": [
    {
      "role": "system",
      "content": "Sos un experto en ventas B2B para hoteles boutique. Tu tarea es evaluar si un hotel es buen candidato para comprar un software de recepcionista virtual IA ($79-149/mes). El software ideal para: hoteles boutique de 4-30 habitaciones con volumen de consultas digitales, buena presencia online y dueños que gestionan personalmente."
    },
    {
      "role": "user",
      "content": "Hotel: {{ $json.name }}\nRating Google: {{ $json.rating }} / 5\nNúmero de reseñas: {{ $json.user_ratings_total }}\nDirección: {{ $json.formatted_address }}\nTiene web propia: {{ $json.website ? 'Sí' : 'No' }}\n\nDame un score del 1 al 10 y una razón en 1 oración. Responde SOLO en JSON válido: {\"score\": 8, \"razon\": \"Hotel boutique activo con muchas reseñas\"}"
    }
  ]
}
```

**7. Code Node — Parse response**
```javascript
const content = $input.first().json.choices[0].message.content;
const parsed = JSON.parse(content.trim());
const hotel = $input.first().json; // datos originales del hotel
return [{
  json: {
    nombre: hotel.name || '',
    direccion: hotel.formatted_address || '',
    rating: hotel.rating || 0,
    resenas: hotel.user_ratings_total || 0,
    web: hotel.website || '',
    place_id: hotel.place_id || '',
    score_ia: parsed.score,
    razon_ia: parsed.razon
  }
}];
```

**8. IF — Filtrar por score**
- Condition: `{{ $json.score_ia }}` >= 7

**9. Google Sheets — Append Row** (rama TRUE del IF)
- Operation: Append or Update Row
- Sheet: Prospectos
- Columns to match: (ninguno — siempre append)
- Data:
  - A (Nombre Hotel): `{{ $json.nombre }}`
  - C (Tipo): `Hotel`
  - F (Rating Google): `{{ $json.rating }}`
  - I (SCORE IA): `{{ $json.score_ia }}`
  - J (Estado): `Nuevo`
  - L (Fuente email): `Google Maps Auto`
  - M (Fecha añadido): `{{ new Date().toLocaleDateString('es-AR') }}`
  - N (Enviado?): `No`
  - P (Respuesta?): `No`
  - Q (Notas): `{{ $json.razon_ia }}`

**10. Wait**
- Amount: 2
- Unit: Seconds

---

## Tarea 4 — Workflow n8n: Outreach Email (W2)

**Nombre en n8n:** `Timeless — Outreach Email`  
**Trigger:** Schedule — todos los martes a las 10:00am

### Nodos en orden:

**1. Schedule Trigger**
- Mode: Every Week, Day: Tuesday, Hour: 10

**2. Google Sheets — Get Rows**
- Operation: Get Rows
- Sheet: Prospectos
- Filters: Estado = "Nuevo" AND Enviado? = "No"

**3. IF — Hay prospectos?**
- Condition: `{{ $json.length }}` > 0
- Si FALSE: Stop and Error (o NoOp)

**4. HTTP Request — Hunter.io domain search**
- URL: `https://api.hunter.io/v2/domain-search`
- Method: GET
- Params:
  - `domain`: extraer de columna G (web del hotel) — usar Code node para parsear el dominio
  - `api_key`: `{{ $env.HUNTER_API_KEY }}`
  - `limit`: 1

**5. IF — Email encontrado?**
- Condition: `{{ $json.data.emails.length }}` > 0
- Si FALSE: actualizar Sheet con Estado = "Sin email" y continuar con siguiente

**6. HTTP Request — OpenAI personalizar email**
- URL: `https://api.openai.com/v1/chat/completions`
- Method: POST
- Body:
```json
{
  "model": "gpt-4o-mini",
  "temperature": 0.7,
  "max_tokens": 200,
  "messages": [
    {
      "role": "user", 
      "content": "Escribí un asunto de email y un primer párrafo de apertura para contactar a este hotel boutique. Soná como un emprendedor joven que encontró su hotel en Google Maps. NO corporativo. Sé directo, menciona el rating o algo específico.\n\nHotel: {{ $json.nombre }}, Rating: {{ $json.rating }}/5, Ciudad: {{ $json.ciudad }}, Razón IA: {{ $json.razon_ia }}\n\nResponde SOLO JSON: {\"subject\": \"...\", \"apertura\": \"...\"}. Subject máx 60 chars, apertura máx 2 oraciones."
    }
  ]
}
```

**7. Code Node — Armar email**
```javascript
const aiResponse = JSON.parse($input.all()[0].json.choices[0].message.content);
const hotel = $input.all()[0].json;
const hotelEncoded = encodeURIComponent(hotel.nombre);

return [{
  json: {
    subject: aiResponse.subject,
    body: `${aiResponse.apertura}

Construí Emma, una recepcionista virtual que responde mensajes de huéspedes en menos de 3 segundos — a cualquier hora, en el idioma del huésped.

Te armé una preview de cómo quedaría Emma para tu hotel:
👉 https://timeless-site.pages.dev/demo.html?hotel=${hotelEncoded}

Setup en menos de 24 horas. Sin IT. Sin contrato. Desde $79/mes.

¿Tiene 15 minutos esta semana para una demo rápida?

Saludos,
Matías
Timeless — AI para hoteles boutique
matiidutlii@gmail.com`,
    to_email: hotel.email_encontrado,
    hotel_nombre: hotel.nombre
  }
}];
```

**8. Gmail — Send Email**
- To: `{{ $json.to_email }}`
- Subject: `{{ $json.subject }}`
- Body (HTML): `{{ $json.body }}` (convertir saltos de línea a `<br>`)
- From Name: Matías · Timeless

**9. Google Sheets — Update Row**
- Sheet: Prospectos
- Actualizar: Enviado? = "Sí", Fecha envío = hoy, Email encontrado = email, Estado = "Contactado"

---

## Tarea 5 — Workflow n8n: Follow-up Bot (W3)

**Nombre en n8n:** `Timeless — Follow-up Bot`  
**Trigger:** Schedule — todos los días a las 9:00am

### Nodos en orden:

**1. Schedule Trigger**
- Mode: Every Day, Hour: 9

**2. Google Sheets — Get Rows**
- Sheet: Prospectos
- Filtrar: Enviado? = "Sí" AND Respuesta? = "No" AND Estado != "Descartado" AND Estado != "Pipeline"

**3. Code Node — Calcular días**
```javascript
const items = $input.all();
return items.map(item => {
  const fechaEnvio = new Date(item.json['Fecha envío']);
  const hoy = new Date();
  const dias = Math.floor((hoy - fechaEnvio) / (1000 * 60 * 60 * 24));
  return {
    json: {
      ...item.json,
      dias_desde_envio: dias
    }
  };
});
```

**4. Switch — Qué toque corresponde**
- Condition 1: dias_desde_envio == 1 → Output "toque1"
- Condition 2: dias_desde_envio == 5 → Output "toque2"  
- Condition 3: dias_desde_envio == 12 → Output "toque3"
- Condition 4: dias_desde_envio == 30 → Output "toque4"
- Fallback: NoOp

**5a. Gmail — Toque 1 (día 1)**
```
Subject: ¿Llegó bien el demo de Emma para {{ $json['Nombre Hotel'] }}?

Hola, solo quería confirmar que hayas podido ver el demo.
La URL es https://timeless-site.pages.dev/demo.html?hotel={{ $json['Nombre Hotel'] | url_encode }}

¿Qué te pareció?

Saludos,
Matías
```

**5b. Gmail — Toque 2 (día 5)**
```
Subject: Así usó Emma el Sun Life Beach Hotel (Florida)

Hola,

Quería compartirte un caso real: en Sun Life Beach Hotel (Englewood, Florida), Emma atendió más de 40 consultas en su primera semana — la mayoría fuera del horario de oficina.

Ana, la dueña, me dijo que lo mejor fue dejar de perder reservas de madrugada.

Tiempo de respuesta promedio: menos de 3 segundos.
Costo: $79/mes — menos de una noche en su propio hotel.

¿Le parece si hacemos una demo rápida de 15 minutos?

Saludos,
Matías
```

**5c. Gmail — Toque 3 (día 12)**
```
Subject: ¿Tiene 10 minutos esta semana?

Hola,

Entiendo que tiene mil cosas. Solo esto: si Emma le genera una sola reserva extra este mes, ya se paga sola.

¿Le viene bien una llamada de 10 minutos para verla en acción con los datos de {{ $json['Nombre Hotel'] }} específicamente?

Saludos,
Matías · Timeless
```

**5d. Gmail — Toque 4 (día 30)**
```
Subject: Emma sigue respondiendo — ¿su hotel también?

Hola,

Hace un mes le escribí sobre Emma. Desde entonces atendió cientos de consultas en hoteles boutique que sí se animaron.

Solo escribo para cerrar el loop: si en algún momento quiere charlar, aquí estoy. Si prefiere no recibir más emails, me avisa y lo entiendo.

Saludos,
Matías · Timeless · matiidutlii@gmail.com
```

**6. Google Sheets — Update Row**
- Actualizar: columna "Notas" agregando fecha y toque enviado

---

## Tarea 6 — Workflow n8n: Generador de Contenido (W4)

**Nombre en n8n:** `Timeless — Content Generator`

### Parte A — Generación semanal
**Trigger:** Schedule — todos los viernes a las 10:00am

**1. Google Sheets — Get Rows** (leer métricas de Prospectos y Clientes)

**2. Code Node — Preparar contexto**
```javascript
const prospectos = $input.all();
const nuevosEstaSemana = prospectos.filter(p => {
  const fecha = new Date(p.json['Fecha añadido']);
  const diasAtras = (new Date() - fecha) / (1000 * 60 * 60 * 24);
  return diasAtras <= 7;
}).length;

return [{
  json: {
    nuevos_prospectos_semana: nuevosEstaSemana,
    total_prospectos: prospectos.length,
    contexto: `Semana del ${new Date().toLocaleDateString('es-AR')}. Nuevos prospectos esta semana: ${nuevosEstaSemana}. Total en pipeline: ${prospectos.length}.`
  }
}];
```

**3. HTTP Request — OpenAI LinkedIn**
```json
{
  "model": "gpt-4o-mini",
  "temperature": 0.8,
  "max_tokens": 400,
  "messages": [{
    "role": "user",
    "content": "Sos el community manager de Timeless, startup de AI para hoteles boutique latinoamericanos. Generá un post de LinkedIn para esta semana.\n\nTono: emprendedor directo, sin corporate speak, como alguien que está construyendo algo en público.\nFormato: hook en primera línea (sin emojis al inicio), 3-4 párrafos cortos, CTA final.\nMáximo 150 palabras.\nContexto: {{ $json.contexto }}\n\nTemas a rotar (elegí uno): dato de industria hotelera / behind the scenes / caso de uso concreto / pregunta al audience / aprendizaje de esta semana.\n\nResponde SOLO JSON: {\"hook\": \"...\", \"body\": \"...\", \"cta\": \"...\", \"hashtags\": [\"hotelería\", \"IA\", \"automatización\"]}"
  }]
}
```

**4. HTTP Request — OpenAI Instagram**
```json
{
  "model": "gpt-4o-mini", 
  "temperature": 0.8,
  "max_tokens": 200,
  "messages": [{
    "role": "user",
    "content": "Caption para Instagram de Timeless, startup de AI para hoteles boutique. Máximo 80 palabras. Emojis estratégicos (2-3 máximo). CTA: 'Link en bio'. Basado en el mismo tema del post de LinkedIn pero adaptado para Instagram.\n\nContexto: {{ $json.contexto }}\n\nResponde SOLO JSON: {\"caption\": \"...\", \"hashtags\": \"#hotelería #IA #recepcionistavirtual\"}"
  }]
}
```

**5. Google Sheets — Append 2 filas** en pestaña Contenido
- Fila 1: LinkedIn post — Estado = "Borrador"
- Fila 2: Instagram caption — Estado = "Borrador"

### Parte B — Publicación automática
**Trigger:** Schedule — todos los días a las 11:00am

**1. Google Sheets — Get Rows**
- Filtrar: Estado = "Aprobado" AND Fecha publicación vacía

**2. IF — Hay contenido?**

**3. HTTP Request — LinkedIn API**
- URL: `https://api.linkedin.com/v2/ugcPosts`
- Method: POST
- Auth: LinkedIn OAuth2
- Body: ver documentación LinkedIn para postear como persona (author = urn:li:person:{ID})

**4. Gmail — Enviar Instagram a Matías**
```
Subject: 📱 Instagram listo para publicar — {{ $json.Semana }}
Body: {{ $json['Copy completo'] }}
Hashtags: {{ $json.Hashtags }}
```

**5. Google Sheets — Update**
- Fecha publicación = hoy, Estado = "Publicado ✓"

---

## Variables de entorno a configurar en n8n

Ir a n8n Settings → Environment Variables y agregar:

```
GOOGLE_MAPS_API_KEY=tu_key_aquí
OPENAI_API_KEY=tu_key_aquí
HUNTER_API_KEY=tu_key_aquí
GOOGLE_SHEET_ID=ID_del_sheet_maestro
```

## Credenciales a crear en n8n (Settings → Credentials)

1. **Google Sheets OAuth2** — para leer/escribir el CRM
2. **Gmail OAuth2** — para enviar emails (cuenta: matiidutlii@gmail.com)
3. **LinkedIn OAuth2** — para publicar posts
4. **OpenAI API** — key de platform.openai.com

---

## Orden de implementación sugerido

1. Crear el Google Sheet con las 4 pestañas (Tarea 2)
2. Modificar demo.html para soporte de ?hotel= (Tarea 1)
3. Configurar credenciales en n8n
4. Construir y activar W1 — Lead Hunter (Tarea 3)
5. Construir y activar W2 — Outreach Email (Tarea 4)
6. Construir y activar W3 — Follow-up Bot (Tarea 5)
7. Construir y activar W4 — Content Generator (Tarea 6)
8. Push demo.html a GitHub → auto-deploy a Cloudflare Pages

---

## Notas importantes

- El sheet de CRM es NUEVO y separado del sheet de conversaciones de Sun Life (que es `1P4iarHax1XdZDlw-oioJ1sxIqY77Rm_ACe8hCm2bwyM`)
- Para el demo.html: buscar el elemento del hero que muestra el nombre del negocio o el subtítulo y modificarlo para que cuando exista el parámetro ?hotel= se personalice
- Los workflows de n8n se pueden construir con el MCP n8n-mcp que ya está configurado en este proyecto
- Todos los workflows deben tener Error Notification conectado al workflow `Timeless — Error Notification` (ID: `XnfBtmWah9W0TXfj`)
- Activar primero W1 y W2, validar que funcionen, luego agregar W3 y W4

