# Step 13 — Signup with Auto-Login

## Descripción

El registro del paso anterior creaba el usuario pero lo dejaba en una pantalla de éxito estática, obligando al usuario a ir a `/login` manualmente. Este paso elimina ese paso extra: tras un registro exitoso, la sesión se establece automáticamente y el usuario es redirigido a `/`.

### Cambios respecto al paso anterior

Solo se modificaron **dos archivos**:

| Archivo | Cambio |
|---|---|
| `src/services/auth.service.ts` | `signup()` ahora llama a `setSessionCookie()` justo antes de resolver la promesa. La función ya tenía acceso a `setSessionCookie` porque existía en el mismo módulo. |
| `src/routes/signup/index.tsx` | Se eliminó el estado `done` y la pantalla de éxito. Ahora usa `useNavigate` para redirigir a `/` tras el registro. El componente quedó idéntico al de `login/index.tsx` en su estructura. |

### La diferencia clave en auth.service.ts

**Antes (paso 12):**
```ts
// Session is NOT set here yet — the user must log in manually.
resolve(newUser);
```

**Ahora (paso 13):**
```ts
// Auto-login: set the session cookie right after creating the user.
setSessionCookie({
  userId: newUser.id,
  expiresAt: Date.now() + SESSION_DURATION_MS,
});
resolve(newUser);
```

`setSessionCookie` ya existía como función privada dentro de `auth.service.ts` desde el paso 11. Simplemente se reutilizó aquí en `signup()` sin necesidad de exportarla ni de crear nada nuevo.

### Flujo completo ahora

```
Signup form
  → signup(email, password)
      → getUserByEmail()    [verifica que no exista]
      → saveUsers()         [persiste en localStorage]
      → setSessionCookie()  [auto-login]
  → navigate("/")
      → Root.useEffect → getCurrentUser() → User ✓
```

El usuario ve el navbar con su email inmediatamente al llegar a la home.
