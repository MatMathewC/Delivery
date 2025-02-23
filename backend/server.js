const mysql = require( 'mysql2' )
const express = require( 'express' )
const cors = require( 'cors' )
const dotenv = require( 'dotenv' )
dotenv.config();
const routes = require( './routes/routes' );

const app = express();

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))




// Ruta de ejemplo del backend para que acceda al frontend
/* app.get('/api/test', (req, res) =>{
    const items = [
        { id:1, nombre:"Mateo", apellidp:"Merchan"},
        { id:2, nombre:"Juan", apellidp:"Perez"},
        { id:3, nombre:"Pepe", apellidp:"Grillo"},
        { id:4, nombre:"Alicia", apellidp:"Paredes"}
    ]
    res.json(items)
}) */

app.use('/api', routes)
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
        message: "Algo salio mal"
    });  
});




const PORT = process.env.PORT || 3000;
app.listen (PORT, () =>{
    console.log(`Servidor ejecutandose en el puerto ${PORT}`)
})

