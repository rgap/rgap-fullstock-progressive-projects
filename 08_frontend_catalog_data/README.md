# Step 08 — Catalog Data Layer

## Descripción

Se implementó la capa de datos para el **Catálogo** (Productos y Categorías). Este paso refleja un flujo de trabajo realista donde primero definimos los modelos (interfaces TypeScript) basándonos en cómo lucirán nuestros datos, y luego creamos el dataset en formato JSON (mock data) junto con los servicios simulados (`services`) para interactuar con él.

- **Modelos:** Se definieron las interfaces `Category` y `Product` para tipar estrictamente nuestro catálogo.
- **Servicios:** Se crearon `category.service.ts` y `product.service.ts` que contienen nuestros arreglos de datos en memoria y funciones asíncronas con retrasos artificiales (`setTimeout`) para simular llamadas reales a una API backend.
- **Configuración:** Se actualizó `tsconfig.app.json` y `vite.config.ts` para habilitar el alias de importación `@/*`, facilitando el acceso a los modelos desde los servicios.

### Archivos añadidos

**Modelos:**
- `src/models/category.model.ts`
- `src/models/product.model.ts`

**Servicios (y Mock Data):**
- `src/services/category.service.ts`
- `src/services/product.service.ts`
