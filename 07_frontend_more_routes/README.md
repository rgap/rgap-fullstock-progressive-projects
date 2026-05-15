# Step 07 — More Routes

## Descripción

Se expandió el router para declarar todas las rutas de la aplicación como stubs mínimos.

- Se crearon los componentes de ruta: `Login`, `Signup`, `Category`, `Product`, `Cart`, `Checkout`, `OrderConfirmation`.
- Cada componente es un placeholder con un único `<h1>` — sin lógica todavía.
- Se actualizó `src/router.tsx` para registrar todas las rutas con sus paths definitivos.

Las rutas declaradas:

| Path                          | Componente         |
|-------------------------------|--------------------|
| `/`                           | Home               |
| `/:category`                  | Category           |
| `/products/:id`               | Product            |
| `/cart`                       | Cart               |
| `/checkout`                   | Checkout           |
| `/order-confirmation/:orderId`| OrderConfirmation  |
| `/login`                      | Login              |
| `/signup`                     | Signup             |
| `*`                           | NotFound           |
