import Button from "./Button";
import { ProductWithAddons } from "../types/product";

interface ListProductsProps {
  products: ProductWithAddons[];
}

export default function ListProducts({ products }: ListProductsProps) {
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
