# Step 12 — Signup (User Creation)

## Descripción

Se implementó el registro de nuevos usuarios. Este paso introduce la **persistencia de usuarios** en `localStorage` y la función `signup()` que los crea. El registro no inicia sesión automáticamente — al terminar, se muestra un mensaje de éxito con un enlace para ir al login manualmente.

### Archivos modificados

| Archivo | Cambio |
|---|---|
| `src/services/user.service.ts` | Se añadieron `getUsers()` y `saveUsers()` para leer y escribir el arreglo de usuarios en `localStorage`. `getUserByEmail()` y `getUserById()` ahora usan `getUsers()` en lugar del arreglo en memoria. |
| `src/services/auth.service.ts` | Se añadió `signup()`. Verifica que el correo no esté registrado, crea el usuario y lo guarda via `saveUsers()`. **No establece sesión.** |
| `src/routes/signup/index.tsx` | Nuevo formulario de registro. Tras el éxito muestra "¡Cuenta creada!" con un `<Link>` a `/login`. |

### Por qué los usuarios ahora viven en localStorage

En el paso anterior, `user.service.ts` tenía un arreglo en memoria:

```ts
const users: User[] = [
  { id: 1, email: "demo@fullstock.com", ... }
];
```

Ese arreglo desaparece al refrescar la página. Para que los usuarios registrados persistan entre sesiones, ahora se usa `localStorage`:

```ts
export function getUsers(): User[] {
  const raw = localStorage.getItem("users");
  return raw ? JSON.parse(raw) : [];
}

export function saveUsers(users: User[]): void {
  localStorage.setItem("users", JSON.stringify(users));
}
```

### Por qué signup no inicia sesión todavía

La firma del contrato de `signup()` en este paso es deliberadamente simple: crea el usuario y retorna. No establece ninguna cookie. Esto obliga al usuario a ir a `/login` después de registrarse.

Es la versión más mínima del flujo de registro y es suficiente para demostrar que:
1. El usuario se crea y persiste en `localStorage`.
2. El mismo usuario puede iniciar sesión en `/login` inmediatamente después.

El paso siguiente (13) añadirá el auto-login (setear la cookie en el mismo `signup()`), eliminando ese paso manual.
