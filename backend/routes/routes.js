const express = require('express');
const cors = require('cors');
const session = require('express-session');
const mysql = require('mysql2');
const dotenv = require('dotenv');
// const jwt = require('jsonwebtoken'); // Importar jsonwebtoken para generar el JWT

dotenv.config();

const app = express();
const router = express.Router();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  // Para manejar formularios

// Configuración de CORS
router.use(cors({
    origin: 'http://localhost:5173', // URL de tu aplicación Vite
    credentials: true, // Permite enviar cookies desde el frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Configuración de la sesión
router.use(session({
    secret: process.env.SESSION_SECRET, // Asegúrate de definir esto en tu archivo .env
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Usa 'true' si tienes HTTPS
}));

// Crear conexión a la base de datos
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        process.exit(1); // Detener la aplicación si no hay conexión a la base de datos
    }
    console.log('Conectado a la base de datos MySQL');
});

// Ruta para login y autenticación
// router.post('/api/login', (req, res) => {
//     const { username, password } = req.body;

//     console.log('Datos recibidos:', { username, password }); // Debug: Verificar los datos recibidos

//     if (!username || !password) {
//         return res.status(400).json({ status: 'error', message: 'Usuario y contraseña son requeridos' });
//     }

//     // Verifica las credenciales en la base de datos
//     db.query('SELECT * FROM User WHERE username = ? AND password = ?', [username, password], (error, results) => {
//         if (error) {
//             console.error('Error en la consulta:', error);
//             return res.status(500).json({ status: 'error', message: 'Error en la base de datos' });
//         }

//         if (results.length > 0) {
//             const user = results[0];

//             // Almacenar los datos del usuario en la sesión
//             req.session.userId = user.idUser;
//             req.session.userRole = user.user_role;

//             // Generar el JWT
//             const token = jwt.sign(
//                 { userId: user.idUser, username: user.username, role: user.user_role }, // Payload
//                 process.env.JWT_SECRET_KEY, // Clave secreta, debes definirla en tu archivo .env
//                 { expiresIn: '1h' } // El token expirará en 1 hora
//             );

//             // Respuesta con el JWT
//             return res.json({
//                 status: 'success',
//                 message: 'Inicio de sesión exitoso',
//                 role: user.user_role,
//                 token: token // Devolver el token al cliente
//             });
//         } else {
//             return res.status(401).json({ status: 'error', message: 'Credenciales incorrectas' });
//         }
//     });
// });

// OBTENER DATOS DE LA BASE DE DATOS

// Ruta para obtener las categorías de la tienda
router.get('/api/categories', (req, res) => {
    db.query('SELECT * FROM Category', (error, results) => {
        if (error) {
            console.error('Error en la consulta de categorías:', error);
            return res.status(500).json({ status: 'error', message: 'Error en la base de datos al obtener las categorías' });
        }

        // Responder con la lista de categorías
        return res.status(200).json({
            status: 'success',
            categories: results
        });
    });
});

// Ruta para obtener las direcciones de la tienda
router.get('/api/addresses', (req, res) => {
    db.query('SELECT * FROM Direction', (error, results) => {
        if (error) {
            console.error('Error en la consulta de direcciones:', error);
            return res.status(500).json({ status: 'error', message: 'Error en la base de datos al obtener las direcciones' });
        }

        // Responder con la lista de categorías
        return res.status(200).json({
            status: 'success',
            addresses: results
        });
    });
});

// Ruta para obtener los usuarios de la tienda
router.get('/api/users', (req, res) => {
    db.query('SELECT * FROM User', (error, results) => {
        if (error) {
            console.error('Error en la consulta de usuarios:', error);
            return res.status(500).json({ status: 'error', message: 'Error en la base de datos al obtener los usuarios' });
        }

        // Responder con la lista de categorías
        return res.status(200).json({
            status: 'success',
            users: results
        });
    });
});

// Ruta para obtener las tiendas
router.get('/api/stores', (req, res) => {
    db.query('SELECT * FROM Store', (error, results) => {
        if (error) {
            console.error('Error en la consulta de tiendas:', error);
            return res.status(500).json({ status: 'error', message: 'Error en la base de datos al obtener las tiendas' });
        }

        // Responder con la lista de categorías
        return res.status(200).json({
            status: 'success',
            stores: results
        });
    });
});

// CRUD PARA TIENDAS

// Ruta para agregar una nueva tienda
router.post('/api/addStore', (req, res) => {
    const {
        name, 
        description, 
        verificationState, 
        timeState, 
        openingTime, 
        closingTime, 
        ruc, 
        verificationProof, 
        storeCategory, 
        storeAddress, 
        storeUser
    } = req.body;

    // Verificar que todos los campos necesarios estén presentes
    if (!name || !description || !verificationState || !timeState || !ruc || !verificationProof || !storeCategory || !storeAddress || !storeUser) {
        return res.status(400).json({ status: 'error', message: 'Todos los campos son requeridos' });
    }

    // Formatear fechas de apertura y cierre, si es necesario
    const openingTimeFormatted = openingTime ? new Date(openingTime).toISOString().slice(0, 19).replace('T', ' ') : null;
    const closingTimeFormatted = closingTime ? new Date(closingTime).toISOString().slice(0, 19).replace('T', ' ') : null;

    // Fecha de registro (Fecha actual)
    const registrationDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

    // Consultar para insertar la tienda en la base de datos
    const query = `
        INSERT INTO Store (
            name, description, verification_state, time_state, registration_date, opening_time, closing_time, ruc, verification_proof,
            fk_idUser, fk_idDirection, fk_idCategory
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Ejecutar la consulta
    db.query(query, [
        name,
        description,
        verificationState,
        timeState,
        registrationDate,
        openingTimeFormatted,
        closingTimeFormatted,
        ruc,
        verificationProof,
        storeUser,  // Usuario responsable
        storeAddress,  // Dirección de la tienda
        storeCategory  // Categoría de la tienda
    ], (error, results) => {
        if (error) {
            console.error('Error en la consulta:', error);
            return res.status(500).json({ status: 'error', message: 'Error en la base de datos al agregar la tienda' });
        }

        // Responder al frontend indicando que la tienda fue agregada correctamente
        return res.status(201).json({
            status: 'success',
            message: 'Tienda registrada exitosamente',
            storeId: results.insertId // Devolver el ID de la tienda recién creada
        });
    });
});

// Ruta para añadir Producto
router.post('/api/addProduct', (req, res) => {
    console.log(req.body);
    const {
        product_code, 
        name, 
        description, 
        price, 
        stock, 
        atributos,  // Atributos (New, Recommended, Popular, None)
        disponibilidad, // Disponibilidad (1 o 0)
        fechaRegistro, 
        isVariant,  // Si es variante (1 o 0)
        category,    // ID de la categoría
        store,       // ID de la tienda
    } = req.body;

    // Verificar que todos los campos necesarios estén presentes
    if (!product_code || !name || !description || !price || !stock || !atributos || 
        !disponibilidad || !fechaRegistro || !isVariant || !category || !store) {
        return res.status(400).json({ status: 'error', message: 'Todos los campos son requeridos' });
    }

    // Validar si el precio y el stock son números válidos
    if (isNaN(price) || isNaN(stock)) {
        return res.status(400).json({ status: 'error', message: 'El precio y el stock deben ser números válidos' });
    }

    // Validar atributos (usando ENUM)
    const validAttributes = ['New', 'Recommended', 'Popular', 'None'];
    if (!validAttributes.includes(atributos)) {
        return res.status(400).json({ status: 'error', message: 'Atributo no válido' });
    }

    // Validar disponibilidad (1 o 0)
    if (disponibilidad !== '1' && disponibilidad !== '0') {
        return res.status(400).json({ status: 'error', message: 'Disponibilidad debe ser 1 o 0' });
    }

    // Validar si la fecha de registro tiene el formato correcto
    const registrationDate = new Date(fechaRegistro);
    if (isNaN(registrationDate)) {
        return res.status(400).json({ status: 'error', message: 'Fecha de registro inválida' });
    }

    // Convertir la fecha de registro a un formato adecuado para la base de datos
    const formattedDate = registrationDate.toISOString().slice(0, 19).replace('T', ' ');

    // Realizar la consulta SQL
    const query = `
        INSERT INTO Products (
            product_code, name, description, price, attributes, availability, registration_date, 
            is_variant, stock, fk_idCategory, fk_idStore
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Ejecutar la consulta
    db.query(query, [
        product_code, 
        name, 
        description, 
        price, 
        atributos, 
        disponibilidad, 
        formattedDate, 
        isVariant, 
        stock, 
        category,  // ID de la categoría
        store,     // ID de la tienda
    ], (error, results) => {
        if (error) {
            console.error('Error en la consulta:', error);
            return res.status(500).json({ status: 'error', message: 'Error en la base de datos al agregar el producto' });
        }

        // Responder al frontend indicando que el producto fue agregado correctamente
        return res.status(201).json({
            status: 'success',
            message: 'Producto registrado exitosamente',
            productId: results.insertId // Devolver el ID del producto recién creado
        });
    });
});


// Exportar el router
module.exports = router;






// Rutas para Dirección

router.get('/api/directions', (req, res) => {
    db.query('SELECT * FROM Direction', (error, results) => {
        if (error) {
            console.error('Error en la consulta de usuarios:', error);
            return res.status(500).json({ status: 'error', message: 'Error en la base de datos al obtener los usuarios' });
        }

        // Responder con la lista de categorías
        return res.status(200).json({
            status: 'success',
            data: results
        });
    });
});

// Obtener un registro individual
router.get('/direction/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [direction] = await db.query('SELECT * FROM Direction WHERE idDirection = ?', [id]);
        
        if (direction.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "No se encontró la dirección"
            });
        }
        res.json({
            status: "success",
            data: direction[0]
        });
    } catch (error) {
        console.log("Error en la conexión", error);
        res.status(500).json({
            message: "Error en la conexión",
            error: error
        });
    }
});

// Crear un nuevo registro
router.post('/api/direction', async (req, res) => {
    try {
        const { main_address, secondary_address, reference, latitude, longitude } = req.body;

        if (!main_address || !secondary_address || !reference || latitude === undefined || longitude === undefined) {
            return res.status(400).json({
                status: "error",
                message: "Todos los campos son obligatorios"
            });
        }

        const [result] = await db.query(
            'INSERT INTO Direction (main_address, secondary_address, reference, latitude, longitude) VALUES (?, ?, ?, ?, ?)',
            [main_address, secondary_address, reference, latitude, longitude]
        );

        res.status(201).json({
            status: "success",
            message: "Dirección creada exitosamente",
            data: {
                idDirection: result.insertId,
                main_address,
                secondary_address,
                reference,
                latitude,
                longitude
            }
        });
    } catch (error) {
        console.error("Error al crear la dirección", error);
    }
});

// Actualizar un registro
router.put('/api/direction/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { main_address, secondary_address, reference, latitude, longitude } = req.body;

        if (!main_address || !secondary_address || !reference || latitude === undefined || longitude === undefined) {
            return res.status(400).json({
                status: "error",
                message: "Todos los campos son obligatorios"
            });
        }

        const [direction] = await db.query('SELECT * FROM Direction WHERE idDirection = ?', [id]);
        
        if (direction.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "No se encontró la dirección"
            });
        }

        await db.query(
            'UPDATE Direction SET main_address = ?, secondary_address = ?, reference = ?, latitude = ?, longitude = ? WHERE idDirection = ?',
            [main_address, secondary_address, reference, latitude, longitude, id]
        );

        res.json({
            status: "success",
            message: "Dirección actualizada exitosamente",
            data: {
                idDirection: id,
                main_address,
                secondary_address,
                reference,
                latitude,
                longitude
            }
        });
    } catch (error) {
        console.error("Error al actualizar la dirección:", error);
        res.status(500).json({
            status: "error",
            message: "Error al actualizar la dirección"
        });
    }
});

// Eliminar un registro
router.delete('/api/direction/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const [direction] = await db.query('SELECT * FROM Direction WHERE idDirection = ?', [id]);   
        if (direction.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "No se encontró la dirección"
            });
        }

        await db.query(
            'DELETE FROM Direction WHERE idDirection = ?', [id]
        );

        res.status(200).json({
            status: "success",
            message: "Dirección eliminada exitosamente"
        });
    } catch (error) {
        console.error("Error al eliminar la dirección", error);
    }
});


// Fin de Dirección