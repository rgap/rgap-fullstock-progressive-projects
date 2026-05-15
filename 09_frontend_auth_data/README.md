# Step 09 — Auth Data Layer

## Descripción

Continuando con nuestra construcción iterativa, en este paso añadimos la capa de datos para la **Autenticación y Usuarios**. Siguiendo la misma filosofía del catálogo, primero creamos los modelos que representan a un usuario, y luego implementamos los servicios que gestionan sus datos (en este caso, usando `localStorage` y `cookies` simuladas).

- **Modelos:** Se definió la interfaz `User` para tipar estrictamente a los usuarios.
- **Servicios de Usuario (`user.service.ts`):** Proporciona funciones para buscar y crear usuarios en el `localStorage` (simulando una base de datos).
- **Servicios de Autenticación (`auth.service.ts`):** Proporciona funciones de login, registro, logout y verificación de sesión simulada con cookies.

### Archivos añadidos

**Modelos:**
- `src/models/user.model.ts`

**Servicios:**
- `src/services/user.service.ts`
- `src/services/auth.service.ts`
