import { Addon, Product, AddonGroup } from "@prisma/client";
import Item from "./Item";

interface ListProps {
  product: Product & {
    addonGroups: (AddonGroup & {
      addons: Addon[];
    })[];
  };
  handleAddonChange: (addon: Addon, isSelected: boolean) => void;
}

export default function List({ product, handleAddonChange }: ListProps) {
  if (product.addonGroups.length === 1) {
    return (
      <div className="flex flex-col gap-4">
        <h3 className="mt-4 pl-2 text-lg font-semibold">
          {product.addonGroups[0].name}
        </h3>
        <hr className="my-2" />
        {product.addonGroups[0].addons.map((addon) => (
          <Item key={addon.id} addon={addon} onChange={handleAddonChange} />
        ))}
      </div>
    );
  }
  return (
    <div className="flex flex-row gap-4">
      {product.addonGroups.map((group) => (
        <div key={group.id} className="border-r-1 border-gray-200 pr-4">
          <h3 className="mt-4 pl-2 text-lg font-semibold">{group.name}</h3>
          <hr className="my-2" />
          {group.addons.map((addon) => (
            <Item key={addon.id} addon={addon} onChange={handleAddonChange} />
          ))}
        </div>
      ))}
    </div>
  );
}
