const productService = require('../services/productService');

async function obtenerProductos(req, res) {
  try {
    const productos = await productService.obtenerProductos();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function obtenerProductoPorId(req, res) {
  try {
    const producto = await productService.obtenerProductoPorId(req.params.id);

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function crearProducto(req, res) {
  try {
    const nuevoProducto = await productService.crearProducto(req.body);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function actualizarProducto(req, res) {
  try {
    const productoActualizado = await productService.actualizarProducto(
      req.params.id,
      req.body
    );

    if (!productoActualizado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(200).json(productoActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function eliminarProducto(req, res) {
  try {
    const productoEliminado = await productService.eliminarProducto(req.params.id);

    if (!productoEliminado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(200).json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};
