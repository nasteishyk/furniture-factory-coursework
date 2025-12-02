import ProductGrid from "@/components/ProductGrid/ProductGrid";

export default async function Chairs() {
  const res = await fetch(
    "http://localhost:3000/api/products?category=chairs",
    { cache: "no-store" }
  );
  const items = await res.json();

  return (
    <div className="section">
      <h2>Chairs</h2>
      <ProductGrid products={items} />
      </div>
  );
}
