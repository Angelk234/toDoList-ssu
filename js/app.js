
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('ServiceWorker registrado con éxito:', registration.scope);
      
      // Verificar actualizaciones
      registration.addEventListener('updatefound', () => {
        console.log('Nueva versión del Service Worker encontrada');
      });
      
    } catch (error) {
      console.error('Error registrando el Service Worker:', error);
    }
  });
}