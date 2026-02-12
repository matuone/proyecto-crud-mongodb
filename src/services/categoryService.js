const Category = require('../models/categoryModel');

function obtenerCategorias() {
  return Category.find();
}

function obtenerCategoriaPorId(id) {
  return Category.findById(id);
}

function crearCategoria(data) {
  const categoria = new Category(data);
  return categoria.save();
}

function actualizarCategoria(id, data) {
  return Category.findByIdAndUpdate(id, data, { new: true });
}

function eliminarCategoria(id) {
  return Category.findByIdAndDelete(id);
}

module.exports = {
  obtenerCategorias,
  obtenerCategoriaPorId,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria
};
