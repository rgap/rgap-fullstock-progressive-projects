# Frontend

## Descripción

Se expandió la biblioteca de componentes UI agregando tres componentes nuevos (`Input`, `Label`, `Container`) y un componente compuesto (`InputField`), continuando el patrón establecido con `Button` en el paso anterior.

- Se agregó `Input` con su CSS Module: un campo de texto accesible con soporte para `forwardRef`.
- Se agregó `Label` usando `@radix-ui/react-label` para accesibilidad nativa con `htmlFor`.
- Se agregó `Container` para centrar y limitar el ancho del contenido con padding responsivo.
- Se agregó `InputField` como componente compuesto que combina `Label` + `Input`, generando el `id` automáticamente con `useId`.
- Se creó `src/components/ui/index.ts` como barrel file para exportar todos los componentes desde un único punto.
- Se actualizó `App.tsx` para usar `Container`, `InputField` y `Button` juntos.

## Comandos ejecutados

### 1. Instalación de dependencias del componente

```bash
npm install @radix-ui/react-label
```
