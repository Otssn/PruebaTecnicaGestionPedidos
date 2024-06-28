require('dotenv').config();
const express = require('express');
const db = require('./config/db');
const cors = require('cors');
const product_route = require('./routes/product_route');
const login_route = require('./routes/login_route');
const order_route = require('./routes/order_route');

//Inicializacion node
const app = express();
app.use(cors());
app.use(express.json());

//Rutas
app.use('/api/product', product_route)
app.use('/login', login_route)
app.use('/api/order', order_route)

//Conexion a db
db.getConnection((err, connection) => {
    if(err){
        console.error('Error al ingresar a la base de datos:', err);
        process.exit(1);
    }else{
        console.log('Conexion exitosa');
        connection.release();

        //Inicio servidor
        const port = process.env.PORT_SERVER
        app.listen(port, () => {
            console.log(`Ejecutando servidor ${port}`);
        });
    }
});