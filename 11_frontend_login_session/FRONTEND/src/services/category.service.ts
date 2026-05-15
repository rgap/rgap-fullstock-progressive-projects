import { Category } from "@/models/category.model";

const categories: Category[] = [
  {
    id: 1,
    title: "Polos",
    slug: "polos",
    imgSrc: "/images/polos.jpg",
    alt: "Hombre luciendo polo azul",
    description:
      "Polos exclusivos con diseños que todo desarrollador querrá lucir. Ideales para llevar el código a donde vayas.",
    createdAt: "2025-10-14T01:53:10.703Z",
    updatedAt: "2025-10-14T01:53:10.703Z",
  },
  {
    id: 2,
    title: "Tazas",
    slug: "tazas",
    imgSrc: "/images/tazas.jpg",
    alt: "Tazas con diseño de código",
    description:
      "Tazas que combinan perfectamente con tu café matutino y tu pasión por la programación.",
    createdAt: "2025-10-14T01:53:10.703Z",
    updatedAt: "2025-10-14T01:53:10.703Z",
  },
  {
    id: 3,
    title: "Stickers",
    slug: "stickers",
    imgSrc: "/images/stickers.jpg",
    alt: "Stickers de desarrollo web",
    description:
      "Personaliza tu espacio de trabajo con nuestros stickers únicos y muestra tu amor por el desarrollo web.",
    createdAt: "2025-10-14T01:53:10.703Z",
    updatedAt: "2025-10-14T01:53:10.703Z",
  },
];

export function getAllCategories(): Promise<Category[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(categories);
    }, 500);
  });
}

export function getCategoryBySlug(slug: string): Promise<Category | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const category = categories.find((cat) => cat.slug === slug);
      resolve(category || null);
    }, 500);
  });
}
