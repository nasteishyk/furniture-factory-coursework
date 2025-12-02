"use client";

import styles from "./ProductGrid.module.css";
import ProductCard from "../ProductCard/ProductCard";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image_url: string;
}

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className={`${styles.grid} section`}>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
