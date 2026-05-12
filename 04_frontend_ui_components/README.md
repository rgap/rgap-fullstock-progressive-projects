# Frontend

## Descripción

Se integró un único componente base (`Button`) para demostrar la creación y uso de componentes reutilizables, sin agregar librerías enteras de componentes de golpe.

- Se copió el componente Button y sus estilos (`styles.module.css`) a la carpeta `src/components/ui/button`.
- Se importó y renderizó el componente dentro de `App.tsx` para probar su funcionamiento.

## Comandos ejecutados

### 1. Instalación de dependencias del componente

```bash
npm install clsx @radix-ui/react-slot
```

Solo slot porque no hay button en radix-ui
