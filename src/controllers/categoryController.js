const categoryService = require('../services/categoryService');

async function obtenerCategorias(req, res) {
  try {
    const categorias = await categoryService.obtenerCategorias();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function obtenerCategoriaPorId(req, res) {
  try {
    const categoria = await categoryService.obtenerCategoriaPorId(req.params.id);

    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    res.status(200).json(categoria);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function crearCategoria(req, res) {
  try {
    const nuevaCategoria = await categoryService.crearCategoria(req.body);
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function actualizarCategoria(req, res) {
  try {
    const categoriaActualizada = await categoryService.actualizarCategoria(
      req.params.id,
      req.body
    );

    if (!categoriaActualizada) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    res.status(200).json(categoriaActualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function eliminarCategoria(req, res) {
  try {
    const categoriaEliminada = await categoryService.eliminarCategoria(req.params.id);

    if (!categoriaEliminada) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    res.status(200).json({ mensaje: 'Categoría eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  obtenerCategorias,
  obtenerCategoriaPorId,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria
};
