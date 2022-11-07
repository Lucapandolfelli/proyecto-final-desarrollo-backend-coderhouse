# Proyecto final de 'Desarrollo Backend'
Proyecto final del curso de 'Desarrollo Backend' de Coderhouse. 

## Novedades
Se aplicaron todas las funcionalidades pedidas en la tercer entrega del proyecto. La persistencia de los datos se decidió mantenerla en _MongoDB_, igualmente se sigue teniendo la configuración del patrón __DAO__ con los otros 3 métodos de persistencia. Se modularizó parcialmente la estructura de la __API__ desarrollada, separando los _controladores_ de las _rutas_ (aún faltaria separar en _servicios_ también).

Se realizaron algunas mejoras a la entrega, por ejemplo, al modelo del __User__ se le agregó un campo llamado _cartId_, para de esta forma relacionar un carrito con un usuario y facilitar el proceso de mostrar el carrito con _ejs_. Además, se cambió el endpoint _POST: '/api/:id/products'_ para que quede de la siguiente forma: _POST: '/api/:id/products/:id_prod'_. De esta forma, nos aseguramos que solamente se pueden agregar al carrito productos existentes dentro de la colecction __Products__. 

## Dependencias

- bcrypt
- compression
- cookie-parser
- dotenv
- ejs
- express
- express-session
- mongoose
- multer
- nodemailer
- passport y passport-local
- twilio
- winston
