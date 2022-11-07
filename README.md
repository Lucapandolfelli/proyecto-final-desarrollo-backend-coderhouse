# Proyecto final de 'Desarrollo Backend'
Proyecto final del curso de 'Desarrollo Backend' de Coderhouse. 

## Novedades
Se aplicaron todas las funcionalidades pedidas en la tercer entrega del proyecto.

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
