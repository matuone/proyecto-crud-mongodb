# 🛒 API RESTful CRUD MongoDB

Una API RESTful robusta y modular desarrollada con Node.js, Express y MongoDB. Implementa operaciones CRUD completas con autenticación JWT, separación de responsabilidades mediante una capa de servicios y buenas prácticas de seguridad.

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Características](#-características)
- [Esquema de la Base de Datos](#-esquema-de-la-base-de-datos)
- [Tecnologías](#-tecnologías)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Ejecución](#-ejecución)
- [Endpoints](#-endpoints)
- [Colección Bruno](#-colección-bruno)
- [Ejemplos de Uso](#-ejemplos-de-uso)

---

## 📝 Descripción

Esta API proporciona un sistema completo de gestión de productos y categorías con autenticación de usuarios. La arquitectura implementa el patrón de separación de responsabilidades, delegando toda la lógica de negocio a una capa de servicios dedicada, mientras que los controladores manejan únicamente las solicitudes HTTP.

**Características principales:**
- ✅ CRUD completo para Usuarios, Productos y Categorías
- 🔐 Autenticación con JWT
- 🔒 Contraseñas hasheadas con bcrypt
- 📦 Relaciones entre entidades (Producto → Categoría)
- 🏗️ Arquitectura modular y escalable
- 🛡️ Middleware de verificación de tokens
- 📊 MongoDB con Mongoose ODM

---

## ✨ Características

- **CRUD Completo**: Crear, Leer, Actualizar y Eliminar para todas las entidades
- **Autenticación JWT**: Protección de rutas sensibles con tokens
- **Seguridad**: Contraseñas encriptadas con bcrypt
- **Relaciones**: Productos vinculados a Categorías con populate
- **Separación de Responsabilidades**: Controllers, Services, Models y Routes separados
- **Manejo de Errores**: Try/catch y códigos HTTP apropiados
- **CORS Habilitado**: Comunicación segura entre dominios
- **Variables de Entorno**: Configuración sensible protegida con dotenv

---

## 📊 Esquema de la Base de Datos

### Colección: Users
```javascript
{
  _id: ObjectId,
  nombre: String (required),
  email: String (required, unique, lowercase),
  contraseña: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Colección: Categories
```javascript
{
  _id: ObjectId,
  nombre: String (required),
  descripcion: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

### Colección: Products
```javascript
{
  _id: ObjectId,
  nombre: String (required),
  descripcion: String (required),
  precio: Number (required, min: 0),
  stock: Number (required, min: 0),
  categoria: ObjectId (ref: Category, required),
  createdAt: Date,
  updatedAt: Date
}
```

**Relaciones:**
- Un Producto pertenece a una Categoría
- Una Categoría puede tener muchos Productos 

---

## 🛠️ Tecnologías

| Tecnología | Versión | Descripción |
|-----------|---------|-----------|
| **Node.js** | 20.x | Entorno de ejecución JavaScript |
| **Express** | ^4.x | Framework web minimalista |
| **MongoDB** | - | Base de datos NoSQL |
| **Mongoose** | ^8.x | ODM para MongoDB |
| **JWT** | ^9.x | Autenticación con tokens |
| **bcrypt** | ^5.x | Encriptación de contraseñas |
| **CORS** | ^2.x | Middleware CORS |
| **dotenv** | ^16.x | Variables de entorno |
| **nodemon** | ^3.x | Recarga automática en desarrollo |

---

## 📦 Instalación

### Prerrequisitos
- **Node.js** v20.x o superior
- **npm** o **yarn**
- **MongoDB** cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) o instalado localmente

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd proyecto-crud-mongodb
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno** (ver sección siguiente)

---

## ⚙️ Configuración

### Archivo .env

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# MongoDB
MONGODB_URI=mongodb+srv://<usuario>:<contraseña>@<cluster>/<bdname>?retryWrites=true&w=majority

# Puerto del servidor
PORT=5000

# Clave secreta para JWT
JWT_SECRET=tu_clave_secreta_super_segura_aqui
```

**Ejemplo de .env.example:**
```env
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster-crud-mongodb.hlnn1we.mongodb.net/proyectoCrud?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=supersecreto123
```

---

## 🚀 Ejecución

### Modo Desarrollo (con nodemon)
```bash
npm run dev
```

El servidor se iniciará en `http://localhost:5000`

### Modo Producción
```bash
npm start
```

---

## 📡 Endpoints

### 👥 Usuarios

#### Registrar Usuario
```http
POST /api/usuarios/register
```
**Parámetros (Body):**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "contraseña": "password123"
}
```
**Respuesta (201):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "contraseña": "$2b$10$...",
  "createdAt": "2024-02-12T10:30:00Z",
  "updatedAt": "2024-02-12T10:30:00Z"
}
```

#### Login de Usuario
```http
POST /api/usuarios/login
```
**Parámetros (Body):**
```json
{
  "email": "juan@example.com",
  "contraseña": "password123"
}
```
**Respuesta (200):**
```json
{
  "mensaje": "Login exitoso",
  "usuario": {
    "_id": "507f1f77bcf86cd799439011",
    "nombre": "Juan Pérez",
    "email": "juan@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 📂 Categorías

#### Obtener todas las Categorías
```http
GET /api/categorias
```
**Respuesta (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "nombre": "Electrónica",
    "descripcion": "Productos electrónicos",
    "createdAt": "2024-02-12T10:00:00Z",
    "updatedAt": "2024-02-12T10:00:00Z"
  }
]
```

#### Obtener Categoría por ID
```http
GET /api/categorias/:id
```
**Respuesta (200):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "nombre": "Electrónica",
  "descripcion": "Productos electrónicos",
  "createdAt": "2024-02-12T10:00:00Z",
  "updatedAt": "2024-02-12T10:00:00Z"
}
```

#### Crear Categoría *(Protegido)*
```http
POST /api/categorias
Authorization: Bearer <token>
```
**Parámetros (Body):**
```json
{
  "nombre": "Ropa",
  "descripcion": "Prendas de vestir"
}
```
**Respuesta (201):**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "nombre": "Ropa",
  "descripcion": "Prendas de vestir",
  "createdAt": "2024-02-12T10:30:00Z",
  "updatedAt": "2024-02-12T10:30:00Z"
}
```

#### Actualizar Categoría *(Protegido)*
```http
PUT /api/categorias/:id
Authorization: Bearer <token>
```
**Parámetros (Body):**
```json
{
  "nombre": "Ropa Premium",
  "descripcion": "Prendas de vestir premium"
}
```
**Respuesta (200):**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "nombre": "Ropa Premium",
  "descripcion": "Prendas de vestir premium",
  "createdAt": "2024-02-12T10:30:00Z",
  "updatedAt": "2024-02-12T11:00:00Z"
}
```

#### Eliminar Categoría *(Protegido)*
```http
DELETE /api/categorias/:id
Authorization: Bearer <token>
```
**Respuesta (200):**
```json
{
  "mensaje": "Categoría eliminada correctamente"
}
```

---

### 🛍️ Productos

#### Obtener todos los Productos
```http
GET /api/productos
```
**Respuesta (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439014",
    "nombre": "Laptop Dell",
    "descripcion": "Laptop de 15 pulgadas",
    "precio": 799.99,
    "stock": 10,
    "categoria": {
      "_id": "507f1f77bcf86cd799439012",
      "nombre": "Electrónica",
      "descripcion": "Productos electrónicos"
    },
    "createdAt": "2024-02-12T10:00:00Z",
    "updatedAt": "2024-02-12T10:00:00Z"
  }
]
```

#### Obtener Producto por ID
```http
GET /api/productos/:id
```
**Respuesta (200):**
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "nombre": "Laptop Dell",
  "descripcion": "Laptop de 15 pulgadas",
  "precio": 799.99,
  "stock": 10,
  "categoria": {
    "_id": "507f1f77bcf86cd799439012",
    "nombre": "Electrónica",
    "descripcion": "Productos electrónicos"
  },
  "createdAt": "2024-02-12T10:00:00Z",
  "updatedAt": "2024-02-12T10:00:00Z"
}
```

#### Crear Producto *(Protegido)*
```http
POST /api/productos
Authorization: Bearer <token>
```
**Parámetros (Body):**
```json
{
  "nombre": "iPhone 15",
  "descripcion": "Smartphone última generación",
  "precio": 999.99,
  "stock": 25,
  "categoria": "507f1f77bcf86cd799439012"
}
```
**Respuesta (201):**
```json
{
  "_id": "507f1f77bcf86cd799439015",
  "nombre": "iPhone 15",
  "descripcion": "Smartphone última generación",
  "precio": 999.99,
  "stock": 25,
  "categoria": "507f1f77bcf86cd799439012",
  "createdAt": "2024-02-12T10:30:00Z",
  "updatedAt": "2024-02-12T10:30:00Z"
}
```

#### Actualizar Producto *(Protegido)*
```http
PUT /api/productos/:id
Authorization: Bearer <token>
```
**Parámetros (Body):**
```json
{
  "nombre": "iPhone 15 Pro",
  "precio": 1099.99,
  "stock": 20
}
```
**Respuesta (200):**
```json
{
  "_id": "507f1f77bcf86cd799439015",
  "nombre": "iPhone 15 Pro",
  "descripcion": "Smartphone última generación",
  "precio": 1099.99,
  "stock": 20,
  "categoria": "507f1f77bcf86cd799439012",
  "createdAt": "2024-02-12T10:30:00Z",
  "updatedAt": "2024-02-12T11:00:00Z"
}
```

#### Eliminar Producto *(Protegido)*
```http
DELETE /api/productos/:id
Authorization: Bearer <token>
```
**Respuesta (200):**
```json
{
  "mensaje": "Producto eliminado correctamente"
}
```

---

## � Colección Bruno

Esta sección documenta todas las peticiones HTTP disponibles en la colección Bruno del proyecto. Incluye ejemplos completos con headers, body y variables.

### 👥 Usuarios

#### 1️⃣ POST - Registrar Usuario
```http
POST http://localhost:5000/api/usuarios/register
Content-Type: application/json
```
**Body:**
```json
{
  "nombre": "Matias",
  "email": "matias@example.com",
  "contraseña": "123456"
}
```

#### 2️⃣ POST - Login Usuario
```http
POST http://localhost:5000/api/usuarios/login
Content-Type: application/json
```
**Body:**
```json
{
  "email": "matias@example.com",
  "contraseña": "123456"
}
```

---

### 📂 Categorías

#### 3️⃣ GET - Obtener todas las categorías
```http
GET http://localhost:5000/api/categorias
```

#### 4️⃣ GET - Obtener categoría por ID
```http
GET http://localhost:5000/api/categorias/{{categoriaId}}
```

#### 5️⃣ POST - Crear categoría (JWT)
```http
POST http://localhost:5000/api/categorias
Content-Type: application/json
Authorization: Bearer {{token}}
```
**Body:**
```json
{
  "nombre": "Tecnología",
  "descripcion": "Productos electrónicos"
}
```

#### 6️⃣ PUT - Actualizar categoría (JWT)
```http
PUT http://localhost:5000/api/categorias/{{categoriaId}}
Content-Type: application/json
Authorization: Bearer {{token}}
```
**Body:**
```json
{
  "nombre": "Tecnología Avanzada",
  "descripcion": "Productos electrónicos y accesorios"
}
```

#### 7️⃣ DELETE - Eliminar categoría (JWT)
```http
DELETE http://localhost:5000/api/categorias/{{categoriaId}}
Authorization: Bearer {{token}}
```

---

### 🛍️ Productos

#### 8️⃣ GET - Obtener todos los productos
```http
GET http://localhost:5000/api/productos
```

#### 9️⃣ GET - Obtener producto por ID
```http
GET http://localhost:5000/api/productos/{{productoId}}
```

#### 🔟 POST - Crear producto (JWT)
```http
POST http://localhost:5000/api/productos
Content-Type: application/json
Authorization: Bearer {{token}}
```
**Body:**
```json
{
  "nombre": "Notebook Lenovo",
  "descripcion": "14 pulgadas, 8GB RAM",
  "precio": 350000,
  "stock": 10,
  "categoria": "{{categoriaId}}"
}
```

#### 1️⃣1️⃣ PUT - Actualizar producto (JWT)
```http
PUT http://localhost:5000/api/productos/{{productoId}}
Content-Type: application/json
Authorization: Bearer {{token}}
```
**Body:**
```json
{
  "precio": 360000,
  "stock": 8
}
```

#### 1️⃣2️⃣ DELETE - Eliminar producto (JWT)
```http
DELETE http://localhost:5000/api/productos/{{productoId}}
Authorization: Bearer {{token}}
```

**Variables utilizadas:**
- `{{token}}`: Token JWT obtenido del login
- `{{categoriaId}}`: ID de la categoría a consultar/modificar
- `{{productoId}}`: ID del producto a consultar/modificar

---

## �💡 Ejemplos de Uso

### Con cURL

#### 1. Registrar usuario
```bash
curl -X POST http://localhost:5000/api/usuarios/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "contraseña": "password123"
  }'
```

#### 2. Login
```bash
curl -X POST http://localhost:5000/api/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "contraseña": "password123"
  }'
```

#### 3. Crear categoría (con token)
```bash
curl -X POST http://localhost:5000/api/categorias \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token_aqui>" \
  -d '{
    "nombre": "Electrónica",
    "descripcion": "Productos electrónicos"
  }'
```

#### 4. Crear producto (con token)
```bash
curl -X POST http://localhost:5000/api/productos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token_aqui>" \
  -d '{
    "nombre": "Laptop Dell",
    "descripcion": "Laptop de 15 pulgadas",
    "precio": 799.99,
    "stock": 10,
    "categoria": "ID_CATEGORIA_AQUI"
  }'
```

#### 5. Obtener todos los productos
```bash
curl -X GET http://localhost:5000/api/productos
```

---

## 🗂️ Estructura del Proyecto

```
proyecto-crud-mongodb/
├── app.js                          # Punto de entrada
├── package.json                    # Dependencias
├── .env                           # Variables de entorno (no commitear)
├── .env.example                   # Ejemplo de configuración
├── README.md                      # Este archivo
└── src/
    ├── config/
    │   └── db.js                  # Conexión a MongoDB
    ├── models/
    │   ├── userModel.js           # Schema de Usuario
    │   ├── categoryModel.js       # Schema de Categoría
    │   └── productModel.js        # Schema de Producto
    ├── services/
    │   ├── userService.js         # Lógica de negocio - Usuarios
    │   ├── categoryService.js     # Lógica de negocio - Categorías
    │   └── productService.js      # Lógica de negocio - Productos
    ├── controllers/
    │   ├── userController.js      # Controlador - Usuarios
    │   ├── categoryController.js  # Controlador - Categorías
    │   └── productController.js   # Controlador - Productos
    ├── routes/
    │   ├── userRoutes.js          # Rutas - Usuarios
    │   ├── categoryRoutes.js      # Rutas - Categorías
    │   └── productRoutes.js       # Rutas - Productos
    └── middleware/
        └── verifyToken.js         # Middleware de verificación JWT
```

---

## 🔒 Seguridad

- **Contraseñas**: Hasheadas con bcrypt (10 rounds)
- **Autenticación**: JWT con expiración de 1 día
- **CORS**: Habilitado para comunicación segura
- **Variables sensibles**: Protegidas con dotenv
- **Validación**: Campos requeridos en modelos Mongoose

---

## 📝 Notas Importantes

- El token JWT debe incluirse en el header `Authorization` con formato `Bearer <token>`
- Las rutas de lectura (GET) son públicas
- Las rutas de escritura (POST, PUT, DELETE) requieren autenticación
- La contraseña se hashea automáticamente antes de guardar el usuario
- Los productos incluyen los datos completos de la categoría mediante populate

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo LICENSE para más detalles.

---

## 👨‍💻 Autor

Desarrollado como trabajo práctico de API RESTful con Node.js, Express y MongoDB.

---


