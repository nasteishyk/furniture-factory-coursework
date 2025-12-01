import ProductGrid from "@/components/ProductGrid/ProductGrid";

export default async function Sofas() {
  const res = await fetch("http://localhost:3000/api/products?category=sofas", {
    cache: "no-store",
  });
  const items = await res.json();
  return (
    <div className="section">
      <h2>Sofas</h2>
      <ProductGrid products={items} />
    </div>
  );
}
