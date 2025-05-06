const { default: connectTo } = require('./connectTo');

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const serv = new connectTo();

app.use(cors()); // Permite que el navegador acceda a la API
app.use(express.json()); // Permite recibir JSON

// Configurar conexión a MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'angxd.com',
  database: 'todolist'
});

// Conexion a la base de datos
connection.connect(error => {
  if (error) {
    console.error('Error al conectar a la base de datos:', error);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

// solicitudes
//
//
//

//usuarios
//en desuso
app.get('/users', (req, res) => {
  connection.query('SELECT nombre FROM users', (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.json(results);
  });
});

//login
app.post('/login', (req, res) => {
  const { usuario, contrasenia } = req.body;

  if (!usuario || !contrasenia) {
    return res.status(400).json({ error: 'Usuario y contraseña requeridos' });
  }

  connection.query(
    'SELECT * FROM users WHERE usuario = BINARY ? AND contrasenia = BINARY ?',
    [usuario, contrasenia],
    (error, results) => {
      if (error) return res.status(500).json({ error: error.message });

      if (results.length === 0) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      const user = results[0];
      delete user.contrasenia;

      res.json({
        success: true,
        message: 'Login exitoso',
        user
      });
    }
  );
});

// new user
app.post('/register', async (req, res) => {
  const { nombre, usuario, contrasenia } = req.body;

  // Validación básica
  if (!nombre || !usuario || !contrasenia) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
    // Verificar si el usuario ya existe
    const [existing] = await connection.promise().query(
      'SELECT * FROM users WHERE usuario = ?',
      [usuario]
    );

    if (existing.length > 0) {
      return res.status(409).json({ error: 'Usuario ya existente' });
    }

    // Insertar nuevo usuario
    const [result] = await connection.promise().query(
      'INSERT INTO users (nombre, usuario, contrasenia) VALUES (?, ?, ?)',
      [nombre, usuario, contrasenia]
    );

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      userId: result.insertId
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// charge lists 
app.post('/tasks', (req, res) => {
  const { id_u } = req.body;
  connection.query(
    'SELECT * FROM listado WHERE id_user = ?',
    [id_u],
    (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }
      res.json(results);
    });
});

app.post('/eraseLogic', (req, res) => {
  const { id_t } = req.body;
  connection.query(
    'UPDATE listado SET erase_logic = true WHERE id_t = ?',
    [id_t],
    (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }
      res.json(results);
    });
});

app.post('/done', (req, res) => {
  const { id_t, done } = req.body;
  connection.query(
    'UPDATE listado SET done = ? WHERE id_t = ?',
    [done, id_t],
    (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }
      res.json(results);
    });
});

app.post('/newTask', (req, res) => {
  const { task, id_u } = req.body;
  connection.query(
    'INSERT INTO listado (tarea, done, erase_logic, id_user) VALUES (?, false, false, ?)',
    [task, id_u],
    (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }
      res.json(results);
    });
});

// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://'+ serv.ip +':3000');
});

