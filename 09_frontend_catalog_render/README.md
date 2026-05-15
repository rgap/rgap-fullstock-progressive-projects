# Step 09 — Catalog Render

## Descripción

Con los servicios y modelos del catálogo ya definidos en el paso anterior, ahora los conectamos a la UI por primera vez. Las tres rutas del catálogo dejan de ser **stubs** vacíos y pasan a renderizar datos reales provenientes de los servicios simulados.

> Un "stub" es una parte del código que existe solo como placeholder temporal.

Este paso introduce el patrón fundamental de React para cargar datos asíncronos en un componente:
- **`useState`** para almacenar los datos y el estado de carga.
- **`useEffect`** para lanzar la petición al servicio al montar el componente.
- **`useParams`** de React Router para leer los parámetros dinámicos de la URL (`slug`, `id`).

### Archivos modificados

| Archivo | Cambio |
|---|---|
| `src/routes/home/index.tsx` | Llama a `getAllCategories()` y renderiza la lista de categorías con enlaces a cada una. |
| `src/routes/category/index.tsx` | Lee el `slug` de la URL, llama a `getCategoryBySlug()` y luego a `getProductsByCategoryId()`, renderiza los productos. |
| `src/routes/product/index.tsx` | Lee el `id` de la URL, llama a `getProductById()`, renderiza título, imagen, precio, descripción y características. |

### El patrón: useEffect + useState para datos asíncronos

Cada ruta sigue exactamente el mismo esquema de tres pasos:

```tsx
// 1. Estado para los datos y el estado de carga
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);

// 2. Efecto que se ejecuta al montar el componente
useEffect(() => {
  service().then((result) => {
    setData(result);
    setLoading(false);
  });
}, []);

// 3. Render condicional: primero carga, luego datos
if (loading) return <p>Cargando...</p>;
return <div>{/* renderizar data */}</div>;
```

Este patrón es exactamente el mismo que se usaría con una API real. Cuando el backend esté listo, solo cambia la función `service()` internamente — el componente no necesita modificarse.

## Secuencia de renderizado

```text
1. Render inicial
   Home()
   categories = []
   loading = true
   retorna: <p>Cargando categorías...</p>

2. Commit
   React coloca ese <p> en el DOM real.

3. Paint
   El navegador muestra: "Cargando categorías..."

4. Effect
   React ejecuta useEffect().
   Se llama a getAllCategories().

5. Cuando la promesa se resuelve
   setCategories(data)
   setLoading(false)

6. Nuevo render
   Home()
   categories = datos recibidos
   loading = false
   retorna el <main> con la lista de categorías.

7. Nuevo commit
   React actualiza el DOM real.

8. Nuevo paint
   El navegador muestra la página con las categorías.
```

## The type import

This

```ts
import { type Category } from "@/models/category.model";
```

means:

> “I am importing `Category` only as a TypeScript type, not as a real JavaScript value.”

But:

```ts
import { Category } from "@/models/category.model";
```

means:

> “I am importing `Category` as a normal module import, possibly as something that exists at runtime.”

TypeScript’s official docs say type-only imports are erased from the emitted JavaScript, meaning they do not exist at runtime. They are only for type checking. ([typescriptlang.org][1])

Example:

```ts
import { type Category } from "@/models/category.model";

const categories: Category[] = [
  { id: 1, title: "Polos" },
  { id: 2, title: "Pantalones" },
];
```

Here, `Category` is only used to describe the shape of the data. It is not a real variable, function, class, or object used when the app runs.

So this is better:

```ts
import { type Category } from "@/models/category.model";
```

or even more common:

```ts
import type { Category } from "@/models/category.model";
```

Both mean: “type only.”

The normal import:

```ts
import { Category } from "@/models/category.model";
```

is needed when `Category` exists at runtime, for example if it is a class, enum, function, or constant:

```ts
import { Category } from "@/models/category.model";

const category = new Category();
```

In that case, you **cannot** use:

```ts
import { type Category } from "@/models/category.model";
```

because `type Category` cannot be used as a runtime value. TypeScript’s docs also mention this difference with classes: a class has both a runtime value and a design-time type, so a type-only import cannot be used where JavaScript needs the real class. ([typescriptlang.org][1])

For this case, if `Category` is like this:

```ts
export interface Category {
  id: number;
  title: string;
}
```

then use:

```ts
import { type Category } from "@/models/category.model";
```

or:

```ts
import type { Category } from "@/models/category.model";
```
