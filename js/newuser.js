document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("name").value.trim();
    const usuario = document.getElementById("username").value.trim();
    const contrasenia = document.getElementById("password").value.trim();

    if (!usuario || !contrasenia || !nombre) {
        alert('Por favor rellene los campos');
        return;
    }

    if (contrasenia.length < 6) {
        alert('La contraseña debe contener almenos 6 caracteres');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, usuario, contrasenia })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Error en el registro');
        }

        alert('¡Registro exitoso! Redirigiendo...', 'success');
        setTimeout(() => {
            window.location.href = './../index.html';
        }, 2000);

    } catch (error) {
        alert(error.message, 'error');
        //console.error('Error:', error);
    }
});