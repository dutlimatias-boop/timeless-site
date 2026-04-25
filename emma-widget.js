// Emma Chat Widget - Sun Life Beach Hotel
(function() {
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
