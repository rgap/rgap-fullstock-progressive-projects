# Frontend

## Descripción

Los cambios realizados fueron únicamente:

- Creación del proyecto base con Vite.
- Instalación de dependencias necesarias para desarrollo.
- Ejecución del servidor local de desarrollo.


## Comandos ejecutados

### 1. Creación del proyecto con Vite

```bash
npm create vite@6.0.1 . -- --template react-ts
```

Este comando crea un proyecto base usando Vite con la plantilla de React y TypeScript.

### 2. Instalación de dependencias de desarrollo

```bash
npm install -D \
@eslint/js@9.15.0 \
@types/node@22.10.2 \
@types/react@18.3.12 \
@types/react-dom@18.3.1 \
@vitejs/plugin-react@4.3.4 \
eslint@9.15.0 \
eslint-plugin-import@2.31.0 \
eslint-plugin-react-hooks@5.0.0 \
eslint-plugin-react-refresh@0.4.14 \
globals@15.12.0 \
typescript@5.6.2 \
typescript-eslint@8.15.0 \
vite@6.0.1
```

### 3. Ejecución del servidor de desarrollo

```bash
npm run dev
```