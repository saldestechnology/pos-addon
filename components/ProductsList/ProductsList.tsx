import Button from "./Button";
import { ProductWithAddons } from "../types/product";

interface ProductsListProps {
  products: ProductWithAddons[];
}

export default function ProductsList({ products }: ProductsListProps) {
  return (
    <ul className="flex w-full flex-wrap gap-4 py-4">
      {products.map((product) => (
        <li key={product.id}>
          <Button product={product} />
        </li>
      ))}
    </ul>
  );
}
