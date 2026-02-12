const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const verifyToken = require('../middleware/verifyToken');

// Rutas públicas
router.get('/', categoryController.obtenerCategorias);
router.get('/:id', categoryController.obtenerCategoriaPorId);

// Rutas protegidas
router.post('/', verifyToken, categoryController.crearCategoria);
router.put('/:id', verifyToken, categoryController.actualizarCategoria);
router.delete('/:id', verifyToken, categoryController.eliminarCategoria);

module.exports = router;
