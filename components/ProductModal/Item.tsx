import { Addon } from "@prisma/client";
import { useState } from "react";

interface ItemProps {
  addon: Addon;
  onChange: (addon: any, isSelected: boolean) => void;
}

export default function Item({ addon, onChange }: ItemProps) {
  const [checked, setChecked] = useState(false);
  const handleCheck = () => {
    setChecked(!checked);
    onChange(addon, !checked);
  };
  return (
    <label
      onClick={handleCheck}
      className="group my-2 flex cursor-pointer items-center space-x-3 pl-2"
    >
      <div
        className={`h-5 w-5 rounded-full border transition-all duration-300 ${checked ? "border-gray-900 shadow-lg" : "border-gray-200"}`}
      >
        {checked && (
          <div className="h-full w-full scale-75 transform rounded-full bg-gray-900"></div>
        )}
      </div>
      <span className="text-lg text-gray-600 group-hover:text-gray-900">
        {addon.name} (+{addon.price} kr)
      </span>
    </label>
  );
}
