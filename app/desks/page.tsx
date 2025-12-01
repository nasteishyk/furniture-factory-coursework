import ProductGrid from "@/components/ProductGrid/ProductGrid";

export default async function Desks() {
  const res = await fetch("http://localhost:3000/api/products?category=desks", {
    cache: "no-store",
  });
  const items = await res.json();

  return (
    <div className="section">
      <h2>Desks</h2>
      <ProductGrid products={items} />
    </div>
  );
}
