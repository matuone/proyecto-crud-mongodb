const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

const categoryRoutes = require('./src/routes/categoryRoutes');
const productRoutes = require('./src/routes/productRoutes');
const userRoutes = require('./src/routes/userRoutes');

app.use('/api/categorias', categoryRoutes);
app.use('/api/productos', productRoutes);
app.use('/api/usuarios', userRoutes);

app.get('/', function (req, res) {
  res.status(200).json({ mensaje: 'API funcionando correctamente' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log('Servidor escuchando en el puerto', PORT);
});
