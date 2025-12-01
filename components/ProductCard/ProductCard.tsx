"use client";

import styles from "./ProductCard.module.css";
import { useCart } from "../../app/context/CartContext";

interface ProductProps {
  id: number;
  title: string;
  description: string;
  price: number;
  image_url: string;
}

export default function ProductCard({
  id,
  title,
  description,
  price,
  image_url,
}: ProductProps) {
  const { addToCart } = useCart();

  return (
    <div className={styles.card}>
      <img src={image_url} alt={title} className={styles.image} />
      <h3>{title}</h3>
      <p>{description}</p>
      <span>${price}</span>

      <button
        className={styles.btn}
        onClick={() =>
          addToCart({
            id,
            title,
            price,
            image_url,
            quantity: 1,
          })
        }
      >
        Add to cart
      </button>
    </div>
  );
}
