# Workflow n8n: Onboarding de nuevo hotel

Crear este workflow en n8n con nombre: **"Timeless — Onboarding Hotel"**

---

## Nodo 1 — Webhook trigger

**Tipo:** `n8n-nodes-base.webhook`

| Campo | Valor |
|-------|-------|
| HTTP Method | POST |
| Path | `onboarding-hotel` |
| Response Mode | When last node finishes |
| Response Data | First entry JSON |

Recibe el cuerpo JSON del formulario `onboarding.html`. Campos disponibles en `$json`:
`hotel_name`, `email`, `website`, `address`, `rooms[]`, `check_in`, `check_out`, `check_in_out`, `amenities[]`, `amenities_other`, `cancellation_policy`, `other_policies`, `nearby_activities`, `faq[]`, `additional_info`

---

## Nodo 2 — Code: Generar client_id

**Tipo:** `n8n-nodes-base.code`  
**Language:** JavaScript  
**Conectar a:** Nodo 1

```javascript
const hotelName = $input.first().json.hotel_name || '';

const clientId = hotelName
  .toLowerCase()
  .normalize('NFD')
  .replace(/[̀-ͯ]/g, '')   // quitar tildes
  .replace(/[^a-z0-9]/g, '');        // solo letras y números

return [{
  json: {
    ...$input.first().json,
    client_id: clientId
  }
}];
```

**Ejemplo:** `"Bella Vista Hotel & Spa"` → `client_id: "bellavistahotelspa"`

---

## Nodo 3 — Code: Armar knowledge base

**Tipo:** `n8n-nodes-base.code`  
**Language:** JavaScript  
**Conectar a:** Nodo 2

```javascript
const d = $input.first().json;

let kb = `# ${d.hotel_name}\n\n`;

kb += `## Información General\n`;
kb += `Nombre: ${d.hotel_name}\n`;
kb += `Ubicación: ${d.address}\n`;
kb += `Sitio web: ${d.website}\n`;
if (d.check_in_out) kb += `${d.check_in_out}\n`;
kb += '\n';

if (d.rooms && d.rooms.length > 0) {
  kb += `## Habitaciones\n`;
  d.rooms.forEach(room => {
    if (!room.name) return;
    kb += `### ${room.name}\n`;
    if (room.description) kb += `${room.description}\n`;
    if (room.price_per_night) kb += `Precio por noche: $${room.price_per_night} USD\n`;
    if (room.max_guests) kb += `Capacidad máxima: ${room.max_guests} huéspedes\n`;
    kb += '\n';
  });
}

if (d.amenities && d.amenities.length > 0) {
  kb += `## Amenities\n`;
  const all = [...d.amenities];
  if (d.amenities_other) all.push(d.amenities_other);
  kb += all.join(', ') + '\n\n';
}

if (d.cancellation_policy) {
  kb += `## Política de Cancelación\n${d.cancellation_policy}\n\n`;
}

if (d.other_policies) {
  kb += `## Otras Políticas\n${d.other_policies}\n\n`;
}

if (d.nearby_activities) {
  kb += `## Actividades y Atracciones Cercanas\n${d.nearby_activities}\n\n`;
}

if (d.faq && d.faq.length > 0) {
  kb += `## Preguntas Frecuentes\n`;
  d.faq.forEach(item => {
    if (item.question) kb += `P: ${item.question}\nR: ${item.answer || ''}\n\n`;
  });
}

if (d.additional_info) {
  kb += `## Información Adicional\n${d.additional_info}\n`;
}

return [{
  json: {
    ...$input.first().json,
    knowledge_base_text: kb
  }
}];
```

---

## Nodo 4 — HTTP Request: Ingestar en Supabase

**Tipo:** `n8n-nodes-base.httpRequest`  
**Conectar a:** Nodo 3

| Campo | Valor |
|-------|-------|
| Method | POST |
| URL | `https://matiasdutli22.app.n8n.cloud/webhook/ingest-document` |
| Body Content Type | JSON |

**Body (JSON):**
```json
{
  "client_id": "{{ $json.client_id }}",
  "text": "{{ $json.knowledge_base_text }}"
}
```

---

## Nodo 5 — Code: Obtener archivos template de GitHub

**Tipo:** `n8n-nodes-base.code`  
**Language:** JavaScript  
**Conectar a:** Nodo 4  
**Requiere:** Crear una credencial de GitHub (Personal Access Token) en n8n con scope `repo`.

```javascript
const GITHUB_TOKEN = 'ghp_TU_TOKEN_AQUI'; // usar n8n Credentials en producción
const REPO = 'dutlimatias-boop/timeless-site';
const BASE_URL = `https://api.github.com/repos/${REPO}/contents`;

const files = [
  'panel-sunlife.html',
  'chat-sunlife.html',
  'dashboard-sunlife.html',
  'emma-widget.js'
];

const results = [];

for (const filename of files) {
  const res = await fetch(`${BASE_URL}/${filename}`, {
    headers: {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  });
  const data = await res.json();
  results.push({
    originalName: filename,
    content: Buffer.from(data.content, 'base64').toString('utf8'),
    sha: data.sha
  });
}

return [{
  json: {
    ...$input.first().json,
    templateFiles: results
  }
}];
```

> **Nota:** Para usar credenciales de n8n correctamente, creá una credencial tipo "HTTP Header Auth" con el token y referenciarla. El código de arriba usa fetch directo como simplificación — en producción, usá el nodo HTTP Request con credenciales.

---

## Nodo 6 — Code: Generar archivos del nuevo cliente

**Tipo:** `n8n-nodes-base.code`  
**Language:** JavaScript  
**Conectar a:** Nodo 5

```javascript
const d = $input.first().json;
const clientId = d.client_id;
const hotelName = d.hotel_name;
const templateFiles = d.templateFiles;

const newFiles = templateFiles.map(file => {
  // Reemplazar todas las referencias a sunlife y Sun Life Beach Hotel
  let newContent = file.content
    .replace(/sunlife_beach_hotel/gi, clientId)
    .replace(/sunlife/gi, clientId)
    .replace(/Sun Life Beach Hotel/gi, hotelName)
    .replace(/Sun Life/gi, hotelName)
    .replace(/emma/gi, 'asistente')  // nombre genérico hasta que se configure
    .replace(/Emma/g, 'Asistente');

  // Nuevo nombre del archivo
  const newName = file.originalName
    .replace('sunlife', clientId)
    .replace('emma-widget', `${clientId}-widget`);

  return {
    originalName: file.originalName,
    newName,
    content: Buffer.from(newContent).toString('base64')
  };
});

return [{
  json: {
    ...d,
    newFiles
  }
}];
```

---

## Nodo 7 — Loop + HTTP Request: Pushear archivos a GitHub

**Opción A (recomendada): usar un nodo Loop Over Items + HTTP Request**

1. Agregar nodo **Split In Batches** (o Loop Over Items) conectado a Nodo 6
   - Input field: `newFiles`
   - Batch size: 1

2. Dentro del loop, agregar un **HTTP Request** con:

| Campo | Valor |
|-------|-------|
| Method | PUT |
| URL | `https://api.github.com/repos/dutlimatias-boop/timeless-site/contents/{{ $json.newName }}` |
| Authentication | Header Auth (credencial de GitHub) |
| Body Content Type | JSON |

**Body:**
```json
{
  "message": "Add {{ $json.newName }} for new client {{ $json.client_id }}",
  "content": "{{ $json.content }}"
}
```

> Netlify auto-despliega al detectar el push. Los 4 archivos quedan disponibles en `https://chic-begonia-1708bb.netlify.app/` en pocos minutos.

---

## Nodo 8 — Send Email: Bienvenida al cliente

**Tipo:** `n8n-nodes-base.emailSend` (o Gmail node si usás Gmail)  
**Conectar a:** después del loop del Nodo 7

| Campo | Valor |
|-------|-------|
| To | `{{ $json.email }}` |
| Subject | `Tu asistente para {{ $json.hotel_name }} está casi listo 🎉` |
| Email Format | HTML |

**Body HTML:**
```html
<div style="font-family: Inter, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a18;">
  <div style="background: #0a0a0a; padding: 24px 32px;">
    <span style="font-size: 1.1rem; font-weight: 800; color: #f8f6f2; letter-spacing: -0.02em;">
      Timeless<span style="color: #c8f060;">.</span>
    </span>
  </div>
  <div style="padding: 32px; background: #ffffff; border: 1px solid #e5e0d8;">
    <h2 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 16px;">
      ¡Hola! Tu asistente para {{ $json.hotel_name }} ya está configurado.
    </h2>
    <p style="color: #4a5040; margin-bottom: 24px; line-height: 1.7;">
      En las próximas horas estará completamente activo. 
      Estos son tus accesos:
    </p>

    <div style="background: #f5f0e8; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
      <p style="margin: 0 0 8px; font-size: 0.85rem; font-weight: 600; color: #0e7c7b;">
        Panel de gestión
      </p>
      <a href="https://chic-begonia-1708bb.netlify.app/panel-{{ $json.client_id }}.html"
         style="color: #0e7c7b; font-size: 0.875rem;">
        https://chic-begonia-1708bb.netlify.app/panel-{{ $json.client_id }}.html
      </a>
    </div>

    <p style="font-size: 0.85rem; font-weight: 600; color: #1a1a18; margin-bottom: 8px;">
      Instalación del widget en tu sitio web
    </p>
    <p style="color: #4a5040; font-size: 0.825rem; margin-bottom: 12px; line-height: 1.6;">
      Agregá este código a tu sitio web via Google Tag Manager o en el &lt;head&gt; de tu HTML:
    </p>
    <pre style="background: #0a0a0a; color: #c8f060; padding: 16px; border-radius: 6px; font-size: 0.775rem; overflow-x: auto; white-space: pre-wrap;">&lt;script src="https://chic-begonia-1708bb.netlify.app/{{ $json.client_id }}-widget.js" defer&gt;&lt;/script&gt;</pre>

    <p style="color: #7a8070; font-size: 0.8rem; margin-top: 24px; line-height: 1.6;">
      Si tenés alguna pregunta, respondé este email.<br>
      — Equipo Timeless
    </p>
  </div>
</div>
```

---

## Nodo 9 — Send Email: Notificación interna a Matías

**Tipo:** `n8n-nodes-base.emailSend`  
**Conectar a:** Nodo 8 (paralelo o después)

| Campo | Valor |
|-------|-------|
| To | `matiidutlii@gmail.com` |
| Subject | `Nuevo cliente: {{ $json.hotel_name }}` |
| Email Format | HTML |

**Body HTML:**
```html
<div style="font-family: Inter, sans-serif; max-width: 480px; color: #1a1a18;">
  <h2 style="font-size: 1.1rem;">🏨 Nuevo cliente registrado</h2>
  <table style="margin-top: 16px; border-collapse: collapse; width: 100%;">
    <tr><td style="padding: 6px 0; font-size: 0.85rem; color: #555; width: 140px;">Hotel</td>
        <td style="padding: 6px 0; font-size: 0.85rem; font-weight: 600;">{{ $json.hotel_name }}</td></tr>
    <tr><td style="padding: 6px 0; font-size: 0.85rem; color: #555;">client_id</td>
        <td style="padding: 6px 0; font-size: 0.85rem; font-family: monospace;">{{ $json.client_id }}</td></tr>
    <tr><td style="padding: 6px 0; font-size: 0.85rem; color: #555;">Email</td>
        <td style="padding: 6px 0; font-size: 0.85rem;">{{ $json.email }}</td></tr>
    <tr><td style="padding: 6px 0; font-size: 0.85rem; color: #555;">Web</td>
        <td style="padding: 6px 0; font-size: 0.85rem;">{{ $json.website }}</td></tr>
    <tr><td style="padding: 6px 0; font-size: 0.85rem; color: #555;">Panel</td>
        <td style="padding: 6px 0; font-size: 0.85rem;">
          <a href="https://chic-begonia-1708bb.netlify.app/panel-{{ $json.client_id }}.html">
            Ver panel →
          </a>
        </td></tr>
  </table>

  <div style="margin-top: 24px; background: #fef9ef; border: 1px solid #f0d9a0; border-radius: 8px; padding: 16px;">
    <p style="font-weight: 600; font-size: 0.85rem; margin-bottom: 8px;">⚠️ Pasos manuales pendientes:</p>
    <ol style="font-size: 0.825rem; color: #4a3a10; padding-left: 18px; line-height: 1.8;">
      <li>Duplicar 3 workflows en n8n: Bot Demo, Panel API, Reporte Semanal</li>
      <li>Crear Google Sheet para logs de conversaciones</li>
    </ol>
  </div>
</div>
```

---

## Resumen de conexiones

```
Webhook → Code(client_id) → Code(knowledge_base) → HTTP(ingest)
       → Code(get templates) → Code(generate files)
       → Loop { HTTP(push to GitHub) }
       → Email(cliente) → Email(Matías)
```

## Variables de entorno / credenciales requeridas en n8n

| Credencial | Uso |
|-----------|-----|
| GitHub Personal Access Token | Leer y escribir archivos en el repo (scope: `repo`) |
| Gmail / SMTP | Envío de emails (Nodos 8 y 9) |

Para crear el token de GitHub: `github.com → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token → scope: repo`
