const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const verifyToken = require('../middleware/verifyToken');

// Rutas públicas
router.get('/', productController.obtenerProductos);
router.get('/:id', productController.obtenerProductoPorId);

// Rutas protegidas
router.post('/', verifyToken, productController.crearProducto);
router.put('/:id', verifyToken, productController.actualizarProducto);
router.delete('/:id', verifyToken, productController.eliminarProducto);

module.exports = router;
