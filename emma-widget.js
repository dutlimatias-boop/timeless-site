// Emma Chat Widget - Sun Life Beach Hotel
(function() {
  var style = document.createElement('style');
  style.innerHTML = [
    ':root{',
    '--chat--color-primary:#0e7c7b;',
    '--chat--color-primary-shade-50:#0a5f5e;',
    '--chat--color-primary-shade-100:#074d4c;',
    '--chat--color-secondary:#b8720a;',
    '--chat--color-background:#fdf9f4;',
    '--chat--toggle--background:#0e7c7b;',
    '--chat--toggle--hover--background:#0a5f5e;',
    '}'
  ].join('');
  document.head.appendChild(style);

  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';
  document.head.appendChild(link);

  var script = document.createElement('script');
  script.type = 'module';
  script.innerHTML = [
    'import{createChat}from"https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js";',
    'createChat({',
    'webhookUrl:"https://matiasdutli22.app.n8n.cloud/webhook/7927dcd1-6b79-4a42-9661-22e85347a85f/chat",',
    'mode:"window",',
    'initialMessages:[',
    '"Hi! I am Emma, your virtual assistant at Sun Life Beach Hotel.",',
    '"How can I help you today? Ask me about our rooms, rates or availability!"',
    ']',
    '});'
  ].join('');
  document.head.appendChild(script);
})();
