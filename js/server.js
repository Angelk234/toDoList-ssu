const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors()); // Permite que el navegador acceda a la API
app.use(express.json()); // Permite recibir JSON

// Configurar conexión a MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'angxd.com',
    database: 'webos'
});

// Conectar a la base de datos
connection.connect(error => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error);
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});

// Endpoint para obtener datos
app.get('/users', (req, res) => {
    connection.query('SELECT * FROM users', (error, results) => {
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.json(results);
    });
});

// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});

