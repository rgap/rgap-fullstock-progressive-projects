# Step 10 — Login (Credential Validation)

## Descripción

Se implementó la forma más básica de login: validar las credenciales del usuario y mostrar un resultado en pantalla. Sin sesiones, sin cookies, sin redireccionamiento.

El objetivo de este paso es únicamente establecer la cadena de datos mínima necesaria para autenticar a un usuario:

```
login form  →  auth.service.login()  →  user.service.getUserByEmail()  →  User model
```

### Archivos añadidos

**Modelo:**
- `src/models/user.model.ts` — Define la entidad `User`.

**Servicios:**
- `src/services/user.service.ts` — Un único dataset en memoria con un usuario demo y la función `getUserByEmail()`.
- `src/services/auth.service.ts` — Una única función `login()` que busca al usuario y valida la contraseña.

**Ruta:**
- `src/routes/login/index.tsx` — Formulario con email y contraseña. Si el login es exitoso, muestra un mensaje de bienvenida con el email. Si falla, muestra el error.

### Por qué no hay sesión todavía

En este paso el login funciona, pero la sesión no se persiste. Si el usuario navega a otra página, la aplicación olvida que está autenticado.

Eso es intencional. La persistencia de sesión (cookies, `getCurrentUser`, `logout`) es una capa adicional de complejidad que se añade en el paso siguiente.

### El dato demo

Por ahora no hay registro de usuarios. `user.service.ts` tiene un arreglo en memoria con un único usuario de prueba:

```
email: demo@fullstock.com
password: letmein
```
