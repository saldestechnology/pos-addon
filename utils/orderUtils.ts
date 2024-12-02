// utils/orderUtils.ts
import { Addon } from "@prisma/client";

export const getOrderItemKey = (productId: string, addons: Addon[]): string => {
  const shortProductId = productId.slice(0, 4);
  const addonHash = addons
    .map(a => a.id.slice(0, 2))
    .sort()
    .join('');
    
  return `${shortProductId}-${addonHash}`;
};