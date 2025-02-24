const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // URL de tu aplicación Vite
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de la sesión
app.use(session({
    secret: process.env.SESSION_SECRET, // Asegúrate de definir esto en tu archivo .env
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Usa 'true' si tienes HTTPS
}));

// Crear conexión a la base de datos
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Ruta para login y autenticación
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Verifica las credenciales en la base de datos
    db.query('SELECT * FROM User WHERE username = ? AND password = ?', [username, password], (error, results) => {
        if (error) {
            return res.status(500).json({ status: 'error', message: 'Error en la base de datos' });
        }

        if (results.length > 0) {
            const user = results[0];

            // Almacenar los datos del usuario en la sesión
            req.session.userId = user.idUser;
            req.session.userRole = user.user_role;

            // Redirigir según el rol del usuario
            switch (user.user_role) {
                case 'admin':
                    return res.json({ message: 'Bienvenido al Dashboard de Admin' });
                case 'client':
                    return res.json({ message: 'Bienvenido al Dashboard de Cliente' });
                case 'Delivery_man':
                    return res.json({ message: 'Bienvenido al Dashboard de Repartidor' });
                case 'manager':
                    return res.json({ message: 'Bienvenido al Dashboard de Manager' });
                default:
                    return res.status(400).json({ message: 'Rol desconocido' });
            }
        } else {
            return res.status(401).json({ status: 'error', message: 'Credenciales incorrectas' });
        }
    });
});

// Middleware para verificar si el usuario está autenticado
function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        return next();
    }
    return res.status(401).json({ message: 'No autenticado' });
}

// Ruta de ejemplo que solo puede acceder el usuario autenticado
app.get('/api/dashboard', isAuthenticated, (req, res) => {
    const userRole = req.session.userRole;
    switch (userRole) {
        case 'admin':
            return res.json({ message: 'Dashboard Admin' });
        case 'client':
            return res.json({ message: 'Dashboard Cliente' });
        case 'Delivery_man':
            return res.json({ message: 'Dashboard Repartidor' });
        case 'manager':
            return res.json({ message: 'Dashboard Manager' });
        default:
            return res.status(400).json({ message: 'Rol no reconocido' });
    }
});

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.json({
        message: "Bienvenido al Backend de Delivery"
    });
});

// Manejo de errores
app.use((req, res, next) => {
    console.error("Ruta no encontrada", error.stack);
    res.status(504).json({
        status: "error",
        message: "Algo salió mal"
    });
});

// Puerto del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
