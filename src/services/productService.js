const Product = require('../models/productModel');

function obtenerProductos() {
  return Product.find().populate('categoria');
}

function obtenerProductoPorId(id) {
  return Product.findById(id).populate('categoria');
}

function crearProducto(data) {
  const producto = new Product(data);
  return producto.save();
}

function actualizarProducto(id, data) {
  return Product.findByIdAndUpdate(id, data, { new: true }).populate('categoria');
}

function eliminarProducto(id) {
  return Product.findByIdAndDelete(id);
}

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};
