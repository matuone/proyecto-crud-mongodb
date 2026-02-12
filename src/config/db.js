const mongoose = require('mongoose');

function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('Falta la variable MONGODB_URI en el archivo .env');
    process.exit(1);
  }

  mongoose
    .connect(uri)
    .then(function () {
      console.log('Conectado a MongoDB✅');
    })
    .catch(function (error) {
      console.error('Error al conectar a MongoDB⛔:', error.message);
      process.exit(1);
    });
}

module.exports = connectDB;
