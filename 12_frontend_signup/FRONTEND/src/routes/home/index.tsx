import { useEffect, useState } from "react";
import { Link } from "react-router";

import { Category } from "@/models/category.model";
import { getAllCategories } from "@/services/category.service";

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllCategories().then((data) => {
      setCategories(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Cargando categorías...</p>;

  return (
    <main>
      <h1>Bienvenido a Full Stock</h1>
      <p>La tienda de productos para desarrolladores web.</p>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Link to={`/${category.slug}`}>{category.title}</Link>
            <p>{category.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
