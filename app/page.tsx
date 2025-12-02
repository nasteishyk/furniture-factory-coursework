import Categories from "@/components/Categories/Categories";
import s from "./page.module.css";
import ProductGrid from "@/components/ProductGrid/ProductGrid";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  const products = await res.json();

  return (
    <>
      <Categories />
      <ProductGrid products={products} />
    </>
  );
}
