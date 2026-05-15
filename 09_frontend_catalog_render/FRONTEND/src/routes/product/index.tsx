import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { type Product } from "@/models/product.model";
import { getProductById } from "@/services/product.service";

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getProductById(Number(id)).then((data) => {
      setProduct(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p>Cargando producto...</p>;
  if (!product) return <p>Producto no encontrado.</p>;

  return (
    <main>
      <h1>{product.title}</h1>
      <img src={product.imgSrc} alt={product.title} width={300} />
      <p>S/ {(product.price / 100).toFixed(2)}</p>
      <p>{product.description}</p>
      <ul>
        {product.features.map((feature, i) => (
          <li key={i}>{feature}</li>
        ))}
      </ul>
    </main>
  );
}
