# Step 10 — Shopping Data Layer

## Descripción

Para finalizar la estructuración de nuestros datos base, añadimos la capa correspondiente a las compras (**Carrito** y **Órdenes/Checkout**). Con este paso completamos todos los modelos y servicios simulados que nuestra aplicación e-commerce necesita antes de comenzar a integrar los contextos de React (Context API).

- **Modelos:** Se definieron las interfaces `Cart` (con `CartItem`) y `Order` (con `ShippingInfo`).
- **Servicio de Carrito (`cart.service.ts`):** Gestiona el carrito temporal en el `localStorage`, permitiendo añadir, actualizar cantidades y calcular totales.
- **Servicio de Órdenes (`order.service.ts`):** Recibe datos del formulario de checkout, asocia la compra con un usuario (o crea uno invitado) y genera el objeto de la orden final.

### Archivos añadidos

**Modelos:**
- `src/models/cart.model.ts`
- `src/models/order.model.ts`

**Servicios:**
- `src/services/cart.service.ts`
- `src/services/order.service.ts`
