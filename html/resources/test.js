

document.getElementById('loginForm').addEventListener('submit', function () {
  event.preventDefault(); // Evita que el formulario se envíe

  const user = document.getElementById("username").value.trim();
  const contrasenia = document.getElementById("password").value.trim();

  // Validar que los campos no estén vacíos
  if (!user || !contrasenia) {
    alert('Por favor rellene los campos');
    return;
  }

  fetch('http://localhost:3000/loging')
    .then(response => response.json())
    .then(data => {
        data.forEach(log => {
            if (log.contrasenia === contrasenia && log.usuario === user) {
              console.log(log.contrasenia);
              console.log(log.usuario);
              window.location.href = '../index.html';
              return;
            }
        });
        alert("Creenciales incorrectas");
        document.getElementById('loginForm').reset();
      })
    .catch(error => console.error('Error al obtener los usuarios1:', error));

  
  document.getElementById('loginForm').reset();
});