# Frontend

## Descripción

Se introdujo el patrón **Context + Provider + custom hook** para gestionar el tema visual (claro / oscuro / sistema) de forma global, sin prop drilling.

- Se creó `src/contexts/theme.context.ts` con el tipo `Theme`, el `ThemeProviderContext` y el hook `useTheme`.
- Se creó `src/providers/theme-provider.tsx` que lee el tema desde `localStorage`, lo persiste al cambiarlo y aplica la clase `"light"` o `"dark"` al elemento `<html>`.
- Se actualizó `colors.css`: la variante oscura pasa de `@media (prefers-color-scheme: dark)` a `.dark :root { ... }`, para que el proveedor controle el tema en lugar del sistema operativo.
- Se actualizó `main.tsx` para envolver `<RouterProvider>` con `<ThemeProvider>`.
- Se actualizó `routes/root/index.tsx` para consumir `useTheme` y mostrar un botón de alternancia en el encabezado.

## Comandos ejecutados

No se instalaron dependencias nuevas.
