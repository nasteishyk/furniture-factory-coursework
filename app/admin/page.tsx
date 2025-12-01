"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import s from "./page.module.css";
import { Product } from "@/types/product";

export default function AdminPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/auth");
      return;
    }
    const parsed = JSON.parse(user);
    if (parsed.role !== "admin") {
      router.push("/");
    }
  }, [router]);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  const handleAdd = async () => {
    if (!title || !price) return;
    const res = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify({ title, price }),
    });
    const newProduct = await res.json();
    setProducts([...products, newProduct]);
    setTitle("");
    setPrice(0);
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setProducts(products.filter((p) => p.id !== id));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className={s.container}>
      <h1 className={s.title}>Admin dashboard</h1>

      <div className={s.addProduct}>
        <input
          className={s.input}
          placeholder="Product title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className={s.input}
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <button className={s.button} onClick={handleAdd}>
          Add Product
        </button>
      </div>

      <table className={s.table}>
        <thead>
          <tr className={s.tr}>
            <th className={s.th}>Title</th>
            <th className={s.th}>Price</th>
            <th className={s.th}>Stock</th>
            <th className={s.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr className={s.tr} key={p.id}>
              <td className={s.td}>{p.title}</td>
              <td className={s.td}>${p.price}</td>
              <td className={s.td}>{p.stock || 0}</td>
              <td className={s.td}>
                <button
                  className={s.deleteBtn}
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
