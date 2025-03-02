const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes/routes.js'); // Importa el archivo de rutas

dotenv.config(); // Carga las variables de entorno

const app = express();

// Middleware global
app.use(express.json()); // Para parsear JSON en las solicitudes
app.use(express.urlencoded({ extended: true })); // Para parsear datos de formularios

// Montar las rutas definidas en routes.js
app.use('/', routes);

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error('Error global:', err.stack);
    res.status(500).json({ status: 'error', message: 'Algo salió mal en el servidor' });
});

// Puerto del servidor
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});