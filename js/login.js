import ConnectTo from './connectTo.js';
const serv = new ConnectTo();

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const usuario = document.getElementById("username").value.trim();
  const contrasenia = document.getElementById("password").value.trim();

  if (!usuario || !contrasenia) {
    alert('Por favor rellene los campos');
    return;
  }

  try {
    const response = await fetch('http://'+ serv.ip +':3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, contrasenia })
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || 'Error en el login');

    localStorage.setItem("userActive", JSON.stringify(data));
    //console.log(localStorage.getItem("userActive"));
    //await new Promise(r => setTimeout(r, 600));

    window.location.href = './../html/index.html';

  } catch (error) {
    alert(error.message);

    //document.getElementById('loginForm').reset();
  }
});