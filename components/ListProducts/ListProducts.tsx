import { Product } from "@prisma/client";
import Button from "./Button";

interface ListProductsProps {
  products: Product[];
}

export default ({ products }: ListProductsProps) => {
  return (
    <ul className="flex w-full flex-wrap gap-4">
      {products.map(({ id, name }) => (
        <li key={id}>
          <Button id={id} name={name} />
        </li>
      ))}
    </ul>
  );
};