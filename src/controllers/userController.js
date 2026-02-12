const userService = require('../services/userService');

async function registrarUsuario(req, res) {
  try {
    const usuario = await userService.registrarUsuario(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function loginUsuario(req, res) {
  try {
    const { email, contraseña } = req.body;

    const { usuario, token } = await userService.loginUsuario(email, contraseña);

    res.status(200).json({
      mensaje: 'Login exitoso',
      usuario,
      token
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  registrarUsuario,
  loginUsuario
};
