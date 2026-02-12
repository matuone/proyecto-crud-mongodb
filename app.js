const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get('/', function (req, res) {
  res.status(200).json({ message: 'API funcionando' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log('Servidor escuchando en el puerto', PORT);
});
