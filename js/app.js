
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("../sw.js")
      .then((registration) => {
        console.log("Service Worker registrado con éxito:", registration);
      })
      .catch((error) => {
        console.log("Error al registrar el Service Worker:", error);
      });
  });
}
fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(data => {
        const userList = document.getElementById('user-list');
        data.forEach(user => {
            const li = document.createElement('li');
            const br = document.createElement('br');
            li.textContent = user.nombre; // Asegúrate de que 'name' es una columna en tu BD
            userList.appendChild(br);
            userList.appendChild(li);
        });
        console.log( data );
      })
    .catch(error => console.error('Error al obtener los usuarios1:', error));