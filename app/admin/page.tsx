"use client";

import { useState, useEffect } from "react";
import css from "./page.module.css";

interface Product {
  id: number;
  name: string;
  price: number;
  category_id: number;
}
 
export default function AdminPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("1");

  // ==== FETCH PRODUCTS ====
  const fetchProducts = async () => {
    const res = await fetch("/api/admin/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ==== ADD PRODUCT ====
  const addProduct = async () => {
    if (!name || !price) return;

    await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price: Number(price),
        category_id: Number(categoryId),
      }),
    });

    setName("");
    setPrice("");
    fetchProducts();
  };

  // ==== DELETE PRODUCT ====
  const deleteProduct = async (id: number) => {
    await fetch(`/api/admin/products?id=${id}`, {
      method: "DELETE",
    });

    fetchProducts();
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>Admin Panel</h2>

      {/* ADD PRODUCT */}
      <div className={css.addProduct}>
        <input
          className={css.input}
          placeholder="Назва товару"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className={css.input}
          placeholder="Ціна"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
        />

        <select
          className={css.input}
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="1">Chairs</option>
          <option value="2">Desks</option>
          <option value="3">Sofas</option>
        </select>

        <button className={css.button} onClick={addProduct}>
          Додати
        </button>
      </div>

      {/* TABLE */}
      <table className={css.table}>
        <thead>
          <tr className={css.tr}>
            <th className={css.th}>ID</th>
            <th className={css.th}>Назва</th>
            <th className={css.th}>Ціна</th>
            <th className={css.th}>Категорія</th>
            <th className={css.th}>Дія</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id} className={css.tr}>
              <td className={css.td}>{p.id}</td>
              <td className={css.td}>{p.name}</td>
              <td className={css.td}>{p.price} грн</td>
              <td className={css.td}>
                {p.category_id === 1
                  ? "Chairs"
                  : p.category_id === 2
                  ? "Desks"
                  : "Sofas"}
              </td>
              <td className={css.td}>
                <button
                  className={css.deleteBtn}
                  onClick={() => deleteProduct(p.id)}
                >
                  Видалити
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
