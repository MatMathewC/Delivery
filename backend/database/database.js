const mysql = require('mysql2');
require('dotenv').config();

// Crear la conexión con la base de datos
const mysqlPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// Convertir todas la consultas en procesos
const mysqlPromise = mysqlPool.promise();

// Exportamos el método mysqlpool par toda la estructura del backend
module.exports = mysqlPromise;

// Configuración para Postgress
// const { Pool } = require('pg');
// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'postgres',
//     password: 'postgres',
//     port: 5432,
//   });