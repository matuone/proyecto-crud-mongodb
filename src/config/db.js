const mongoose = require('mongoose');

function connectDB() {
  // Usa MONGODB_URI si está definida, si no, usa MONGODB_LOCAL_URI
  const uri = process.env.MONGODB_URI || process.env.MONGODB_LOCAL_URI;

  if (!uri) {
    console.error('Falta la variable MONGODB_URI o MONGODB_LOCAL_URI en el archivo .env');
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
