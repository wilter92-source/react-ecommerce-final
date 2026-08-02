# Urban Store — estado funcional

El proyecto incluye:

- Catálogo y categorías desde Firestore.
- Detalle por ID de Firestore.
- Carrito con cantidades acumuladas, botones +/−, eliminación y total.
- Validación de stock en detalle, carrito y checkout.
- Checkout con validación de datos y confirmación de correo.
- Creación de órdenes en la colección `orders`.
- Descuento de stock mediante una transacción de Firestore.
- Confirmación final con ID de orden.

## Lo único que debes revisar en Firebase

1. La colección `products` debe tener exactamente los 12 productos, cada uno con `title`, `description`, `stock`, `price`, `category` e `image`.
2. Las reglas deben permitir temporalmente lectura y escritura durante la evaluación.
3. No necesitas crear manualmente la colección `orders`; se crea al completar la primera compra.
4. Prueba una compra y verifica que:
   - aparezca un documento en `orders`;
   - el stock de los productos comprados disminuya;
   - se muestre el ID de la orden.

No ejecutes nuevamente `/cargar-productos` si ya existen los 12 productos, porque generará duplicados.
