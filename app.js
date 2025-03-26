

const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',    // Host de tu base de datos
  user: 'root',      // Usuario de la base de datos
  password: 'angxd.com', // Contraseña del usuario
  database: 'webos' // Nombre de la base de datos
});

connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos:', error);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

const sqlQuery = 'SELECT * FROM users;';

connection.query(sqlQuery, (error, results) => {
  if (error) {
    console.error('Error al ejecutar la consulta:', error);
    return;
  }
  console.log('Resultados de la consulta:', results);
});

connection.end();