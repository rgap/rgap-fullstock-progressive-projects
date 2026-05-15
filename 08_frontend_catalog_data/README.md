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

### Filosofía de Trabajo: Enfoque "Frontend-First" y Contratos de Datos

---

#### El Problema: El Cuello de Botella Clásico

En proyectos de software donde un equipo construye el Frontend y otro construye el Backend, existe un problema cronológico frecuente y costoso: el Frontend depende de datos reales para mostrar pantallas, y esos datos reales solo los puede proveer el Backend. Si el Backend no está listo, el Frontend se queda bloqueado esperando.

Esto genera un desperdicio brutal de tiempo en proyectos profesionales y es una de las causas más comunes de retrasos en el lanzamiento de productos digitales.

---

#### La Solución: Frontend-First con Mock Data

La metodología **Frontend-First** (Desarrollo guiado por el Frontend) propone invertir el orden de trabajo. En lugar de esperar al Backend, el equipo Frontend:

1. **Analiza las necesidades de datos** directamente desde la interfaz de usuario (UI).
2. **Define los modelos** (interfaces TypeScript) que describen la forma exacta de esos datos.
3. **Crea datos simulados** (Mock Data) que cumplan esas interfaces.
4. **Construye toda la UI** conectada a esos datos simulados, como si fueran datos reales.
5. **Entrega los modelos al equipo Backend** como un Contrato formal.

Este enfoque convierte al Frontend en el autor del "contrato de datos" en lugar de ser un consumidor pasivo de las decisiones del Backend. Esta filosofía es también parte de lo que la industria llama **API-First Design** o **Contract-Driven Development**.

---

#### ¿Cómo se Definen los Campos de un Modelo?

Los modelos no se inventan al azar. Cada campo que aparece en una interfaz TypeScript existe porque fue **deducido metódicamente** a partir de cuatro fuentes de análisis bien definidas. A continuación se detalla cada una, aplicada específicamente a las entidades `Category` y `Product` de este proyecto.

---

##### Fuente 1 — Análisis Visual y de Componentes (UI/UX)

**Método:** Se examinan los wireframes, mockups en Figma o prototipos visuales. Por cada pantalla y componente, se pregunta: *"¿Qué texto, número o imagen necesita pintar este elemento HTML?"*. Cada respuesta se convierte directamente en un campo del modelo.

**Aplicado a `Category`:**

Observando la pantalla de inicio, existe una cuadrícula de tarjetas de categoría. Cada tarjeta renderiza:
- Un título como encabezado → **`title: string`**
- Una imagen de portada de la categoría → **`imgSrc: string`**
- Un texto corto descriptivo debajo del título → **`description: string`**

**Aplicado a `Product`:**

Observando la pantalla de detalle de un producto, el componente renderiza:
- El nombre del producto como `<h1>` → **`title: string`**
- Una foto grande del artículo → **`imgSrc: string`**
- El precio numérico formateado como moneda → **`price: number`**
- Un párrafo de descripción del artículo → **`description: string`**
- Una lista con viñetas de características técnicas o beneficios → **`features: string[]`** *(arreglo de strings, no un solo string)*

---

##### Fuente 2 — Análisis de Navegación, Rutas y Accesibilidad (SEO / a11y)

**Método:** Se analiza el mapa de rutas de la aplicación (`router.tsx`). Para cada ruta dinámica que necesita identificar a una entidad, se pregunta: *"¿Qué cadena o identificador irá en la URL?"*. Además, por cada imagen en la UI, se pregunta: *"¿Qué texto alternativo necesita para motores de búsqueda y lectores de pantalla?"*.

**Aplicado a `Category`:**

La ruta para la página de una categoría es `/:category`. El parámetro en la URL no debería ser el `id` numérico (ej. `/2`) porque:
- Es **ilegible para humanos**: un usuario no puede adivinar qué categoría es `/2`.
- Es **perjudicial para el SEO**: Google prefiere URLs descriptivas como `/polos` sobre `/1`.
- Es **frágil**: si el id cambia en la base de datos, todos los enlaces externos se rompen.

Por lo tanto, la entidad necesita un campo que sirva como identificador en la URL:
- **`slug: string`** → es el texto normalizado para URLs (sin espacios, sin acentos, en minúsculas). Ejemplo: la categoría "Tazas" tiene el slug `"tazas"`, haciendo la ruta `/tazas`.

Adicionalmente, la imagen de cada categoría necesita un texto alternativo para que:
- Los lectores de pantalla (usados por personas con discapacidad visual) describan la imagen en voz alta.
- Los crawlers de Google entiendan el contenido de la imagen y la indexen correctamente.

Por esto se añade:
- **`alt: string`** → descripción textual de la imagen. Ejemplo: `"Hombre luciendo polo azul"`.

**Aplicado a `Product`:**

La ruta del producto es `/products/:id`. A diferencia de las categorías, para los productos sí se usa el `id` numérico porque un producto individual tiene menor probabilidad de ser enlazado externamente (el usuario llega por la categoría, no directamente). Sin embargo, el `id` único sigue siendo indispensable para recuperar el producto correcto.

---

##### Fuente 3 — Análisis de Relaciones de Negocio (Domain Logic)

**Método:** Se modelan las reglas del negocio: *"¿Cómo se relacionan estas entidades entre sí?"*. En términos de base de datos relacionales, esto corresponde a la definición de **llaves foráneas** (Foreign Keys).

**Aplicado a `Product`:**

Un producto no existe de forma aislada. La lógica del negocio dice que cada producto pertenece exactamente a una categoría (un polo pertenece a "Polos", una taza pertenece a "Tazas"). Esta relación **muchos-a-uno** (muchos productos → una categoría) se representa con una clave foránea:

- **`categoryId: number`** → almacena el `id` de la categoría a la que pertenece el producto.

Este campo es el que permite, en `product.service.ts`, filtrar todos los productos de una categoría con una sola operación:

```ts
products.filter((product) => product.categoryId === categoryId)
```

Sin el campo `categoryId`, sería imposible saber qué productos mostrar en la página de la categoría "Polos" sin inspeccionar el título de cada producto (lo cual sería frágil e incorrecto).

---

##### Fuente 4 — Requisitos Técnicos de Infraestructura (Database Standards)

**Método:** Independientemente del negocio o de la UI, toda entidad que se almacena en una base de datos profesional debe incluir un conjunto estándar de metadatos técnicos. Estos campos son universales y no dependen del dominio del problema.

Los campos técnicos estándar son:

| Campo | Tipo | Propósito |
|---|---|---|
| `id` | `number` | **Clave Primaria**. Identificador único e irrepetible de cada registro. Permite localizar, actualizar o eliminar cualquier entidad de forma inequívoca, incluso si dos productos tienen el mismo título. |
| `createdAt` | `string` | **Marca de Tiempo de Creación**. Registra el instante exacto (en formato ISO 8601) en que la entidad fue creada por primera vez. Útil para ordenar por "más recientes" o auditar cuándo se añadió un producto. |
| `updatedAt` | `string` | **Marca de Tiempo de Actualización**. Registra la última vez que cualquier campo de la entidad fue modificado. Fundamental para sistemas de caché, sincronización de datos y auditoría de cambios (ej. "¿cuándo se actualizó el precio de este producto?"). |

Estos tres campos existen en prácticamente cualquier ORM moderno (Prisma, Sequelize, TypeORM, ActiveRecord, Hibernate), en la mayoría de frameworks de base de datos, y son parte del estándar de facto de la industria. El Backend los generará y administrará automáticamente; el Frontend solo los consume.

---

#### Trazabilidad: De la UI al Modelo

La siguiente tabla consolida todo el análisis anterior y muestra exactamente de qué fuente proviene cada campo de cada modelo:

**`Category`:**

| Campo | Tipo | Fuente de Deducción |
|---|---|---|
| `id` | `number` | Infraestructura (Clave Primaria) |
| `title` | `string` | Análisis Visual (encabezado de la tarjeta) |
| `slug` | `string` | Análisis de Rutas (parámetro en la URL `/:category`) |
| `imgSrc` | `string` | Análisis Visual (imagen de portada de la categoría) |
| `alt` | `string` | Análisis de Accesibilidad y SEO (texto alternativo de imagen) |
| `description` | `string` | Análisis Visual (texto descriptivo en la tarjeta) |
| `createdAt` | `string` | Infraestructura (Timestamp de auditoría) |
| `updatedAt` | `string` | Infraestructura (Timestamp de auditoría) |

**`Product`:**

| Campo | Tipo | Fuente de Deducción |
|---|---|---|
| `id` | `number` | Infraestructura + Rutas (Clave Primaria, parámetro en `/products/:id`) |
| `title` | `string` | Análisis Visual (`<h1>` en la página de detalle) |
| `imgSrc` | `string` | Análisis Visual (foto del artículo) |
| `price` | `number` | Análisis Visual (precio formateado como moneda) |
| `description` | `string` | Análisis Visual (párrafo descriptivo) |
| `features` | `string[]` | Análisis Visual (lista de viñetas de características) |
| `categoryId` | `number` | Relaciones de Negocio (llave foránea → `Category.id`) |
| `createdAt` | `string` | Infraestructura (Timestamp de auditoría) |
| `updatedAt` | `string` | Infraestructura (Timestamp de auditoría) |

---

#### El Contrato de Datos y la Integración con el Backend

Una vez que los modelos están definidos y los mocks funcionan, toda esta estructura de datos se formaliza como un **Contrato** que se entrega al equipo Backend.

El contrato tiene dos componentes:

1. **Las Interfaces TypeScript** (`src/models/`): describen la forma exacta de los objetos JSON que debe devolver la API.
2. **Los Mock Data** (`src/services/`): son ejemplos concretos y completos de cómo lucen esos objetos en la práctica, funcionando como una especificación ejecutable.

El mensaje al Backend es claro y no negociable: *"Construye la API para que devuelva exactamente esta estructura. Nuestras pantallas ya están construidas y testeadas asumiendo este formato. Si cambias la forma del JSON sin coordinación, la UI se rompe."*

**Beneficios del desarrollo en paralelo:**

- **Sin bloqueos:** El Frontend no espera al Backend. Avanza al 100% usando los servicios simulados.
- **Backend orientado por el contrato:** El Backend no improvisa; sabe exactamente qué tablas crear, qué campos necesitan sus endpoints y qué tipo de dato devolver para cada campo.
- **Integración predecible:** Cuando el Backend termina y expone los endpoints reales, el Frontend únicamente reemplaza las funciones con `setTimeout` por llamadas con `fetch` o `axios`. Dado que el Backend cumplió el contrato, la UI no requiere ningún otro cambio. La integración es mecánica, no creativa.
- **Detección temprana de inconsistencias:** Si durante el desarrollo el Backend propone cambiar el nombre de un campo (ej. `imgSrc` por `imageUrl`), TypeScript lanzará errores de tipo en todo el Frontend de inmediato, forzando una conversación y una decisión explícita antes de que el error llegue a producción.
