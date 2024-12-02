import { Addon, AddonGroup, Product } from "@prisma/client";

export type ProductWithAddons = Product & {
  addonGroups: (AddonGroup & {
    addons: Addon[];
  })[];
};