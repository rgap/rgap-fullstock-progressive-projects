# Frontend

## Descripción

Se introdujo React Router para manejar la navegación entre páginas, reemplazando el `App.tsx` único por una estructura de rutas.

- Se instaló `react-router` y se configuró un `createBrowserRouter` en `src/router.tsx`.
- Se creó la ruta `Root` como layout compartido: encabezado con logo + `<Outlet />` + pie de página.
- Se creó la ruta `Home` con contenido estático de bienvenida.
- Se creó la ruta `NotFound` para manejar URLs inválidas (`path: "*"`).
- Se actualizó `main.tsx` para renderizar `<RouterProvider router={router} />` en lugar de `<App />`.
- Se eliminó `App.tsx` ya que la raíz de la UI ahora vive en `routes/root`.

## Comandos ejecutados

### 1. Instalación de React Router

```bash
npm install react-router
```
