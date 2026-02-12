const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

async function registrarUsuario(data) {
  const usuario = new User(data);
  return await usuario.save();
}

async function loginUsuario(email, contraseña) {
  const usuario = await User.findOne({ email });

  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }

  const contraseñaValida = await usuario.compararContraseña(contraseña);

  if (!contraseñaValida) {
    throw new Error('Contraseña incorrecta');
  }

  const token = jwt.sign(
    { id: usuario._id, email: usuario.email },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  return { usuario, token };
}

module.exports = {
  registrarUsuario,
  loginUsuario
};
