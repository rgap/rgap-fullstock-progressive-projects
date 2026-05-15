import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

import { type Category } from "@/models/category.model";
import { Product } from "@/models/product.model";
import { getCategoryBySlug } from "@/services/category.service";
import { getProductsByCategoryId } from "@/services/product.service";

export default function Category() {
  const { category: slug } = useParams<{ category: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    getCategoryBySlug(slug).then((foundCategory) => {
      setCategory(foundCategory);
      if (foundCategory) {
        getProductsByCategoryId(foundCategory.id).then((data) => {
          setProducts(data);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });
  }, [slug]);

  if (loading) return <p>Cargando productos...</p>;
  if (!category) return <p>Categoría no encontrada.</p>;

  return (
    <main>
      <h1>{category.title}</h1>
      <p>{category.description}</p>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.title}</Link>
            <p>S/ {(product.price / 100).toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
