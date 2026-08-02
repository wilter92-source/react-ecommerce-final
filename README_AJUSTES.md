# Ajustes realizados — Urban Store

## Funcionalidad completada

- El catálogo obtiene los productos desde la colección `products` de Firestore.
- Las categorías consultan Firestore con `query()` y `where()`.
- El detalle obtiene un producto con `doc()` y `getDoc()` usando el ID automático del documento.
- Los componentes usan de forma consistente las propiedades `title` e `image`.
- El carrito conserva el ID real de Firestore para cada producto.
- Se incluyen estados de carga, errores, producto inexistente y categoría vacía.
- El cargador inicial usa `addDoc()`, por lo que Firestore genera IDs automáticos.

## Cargar los 12 productos

1. Antes de cargar, deja vacía la colección `products` para evitar duplicados.
2. Inicia el proyecto con `npm run dev`.
3. Abre `http://localhost:5173/cargar-productos`.
4. Pulsa **Cargar 12 productos** una sola vez.
5. Comprueba en Firestore que existan exactamente 12 documentos con IDs automáticos.
6. Regresa a la página principal y prueba catálogo, categorías, detalle y carrito.

> `addDoc()` crea documentos nuevos cada vez. No vuelvas a pulsar el botón después de completar la carga.

## Después de comprobar la carga

Puedes retirar la herramienta temporal eliminando:

- `src/components/ProductSeeder.jsx`
- El import de `ProductSeeder` en `src/App.jsx`
- La ruta `/cargar-productos` en `src/App.jsx`

El siguiente bloque pendiente es el checkout y la creación de órdenes en la colección `orders`.
