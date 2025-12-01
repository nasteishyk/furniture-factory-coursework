import Categories from "@/components/Categories/Categories";
import s from "./page.module.css";
import ProductCard from "@/components/ProductCard/ProductCard";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  const products = await res.json();

  return (
    <>
      <Categories />
      <div className={s.wrapper}>
        {products.map((p: any) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>
    </>
  );
}
