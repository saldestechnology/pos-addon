const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Create categories
  const hotDrinks = await prisma.category.create({
    data: {
      name: 'Hot Drinks',
    },
  })

  const coldDrinks = await prisma.category.create({
    data: {
      name: 'Cold Drinks',
    },
  })

  const pastries = await prisma.category.create({
    data: {
      name: 'Pastries & Snacks',
    },
  })

  // Create addon groups
  const syrupAddons = await prisma.addonGroup.create({
    data: {
      name: 'Syrups',
      limit: 2,
      sortOrder: 1,
      addons: {
        create: [
          { name: 'Vanilla Syrup', price: 5, limit: 1, sortOrder: 1 },
          { name: 'Caramel Syrup', price: 5, limit: 1, sortOrder: 2 },
          { name: 'Hazelnut Syrup', price: 5, limit: 1, sortOrder: 3 },
          { name: 'Chocolate Syrup', price: 5, limit: 1, sortOrder: 4 },
        ],
      },
    },
  })

  const milkOptions = await prisma.addonGroup.create({
    data: {
      name: 'Milk Options',
      limit: 1,
      sortOrder: 2,
      addons: {
        create: [
          { name: 'Oat Milk', price: 5, limit: 1, sortOrder: 1 },
          { name: 'Almond Milk', price: 5, limit: 1, sortOrder: 2 },
          { name: 'Soy Milk', price: 5, limit: 1, sortOrder: 3 },
          { name: 'Coconut Milk', price: 5, limit: 1, sortOrder: 4 },
        ],
      },
    },
  })

  const extraShots = await prisma.addonGroup.create({
    data: {
      name: 'Extra Shots',
      limit: 4,
      sortOrder: 3,
      addons: {
        create: [
          { name: 'Extra Espresso Shot', price: 7, limit: 4, sortOrder: 1 },
          { name: 'Decaf Shot', price: 7, limit: 4, sortOrder: 2 },
        ],
      },
    },
  })

  const toppings = await prisma.addonGroup.create({
    data: {
      name: 'Toppings',
      limit: 3,
      sortOrder: 4,
      addons: {
        create: [
          { name: 'Whipped Cream', price: 5, limit: 1, sortOrder: 1 },
          { name: 'Cinnamon', price: 0, limit: 1, sortOrder: 2 },
          { name: 'Chocolate Powder', price: 0, limit: 1, sortOrder: 3 },
          { name: 'Caramel Drizzle', price: 5, limit: 1, sortOrder: 4 },
        ],
      },
    },
  })

  const pastryExtras = await prisma.addonGroup.create({
    data: {
      name: 'Extra Options',
      limit: 2,
      sortOrder: 5,
      addons: {
        create: [
          { name: 'Extra Butter', price: 0, limit: 1, sortOrder: 1 },
          { name: 'Jam', price: 5, limit: 1, sortOrder: 2 },
          { name: 'Honey', price: 5, limit: 1, sortOrder: 3 },
          { name: 'Cream Cheese', price: 7, limit: 1, sortOrder: 4 },
        ],
      },
    },
  })

  // Create hot drinks
  const latte = await prisma.product.create({
    data: {
      name: 'Caffè Latte',
      basePrice: 45,
      description: 'Espresso with steamed milk and a light layer of foam',
      categoryId: hotDrinks.id,
      modifications: {
        create: [
          {
            type: 'sizes',
            options: {
              create: [
                { name: 'Small', addonPrice: 0, sortOrder: 1 },
                { name: 'Medium', addonPrice: 5, sortOrder: 2 },
                { name: 'Large', addonPrice: 10, sortOrder: 3 },
              ],
            },
          },
        ],
      },
      addonGroups: {
        connect: [
          { id: syrupAddons.id },
          { id: milkOptions.id },
          { id: extraShots.id },
          { id: toppings.id },
        ],
      },
    },
  })

  const cappuccino = await prisma.product.create({
    data: {
      name: 'Cappuccino',
      basePrice: 45,
      description: 'Equal parts espresso, steamed milk, and milk foam',
      categoryId: hotDrinks.id,
      modifications: {
        create: [
          {
            type: 'sizes',
            options: {
              create: [
                { name: 'Small', addonPrice: 0, sortOrder: 1 },
                { name: 'Medium', addonPrice: 5, sortOrder: 2 },
                { name: 'Large', addonPrice: 10, sortOrder: 3 },
              ],
            },
          },
        ],
      },
      addonGroups: {
        connect: [
          { id: syrupAddons.id },
          { id: milkOptions.id },
          { id: extraShots.id },
          { id: toppings.id },
        ],
      },
    },
  })

  const americano = await prisma.product.create({
    data: {
      name: 'Americano',
      basePrice: 38,
      description: 'Espresso shots topped with hot water',
      categoryId: hotDrinks.id,
      modifications: {
        create: [
          {
            type: 'sizes',
            options: {
              create: [
                { name: 'Small', addonPrice: 0, sortOrder: 1 },
                { name: 'Medium', addonPrice: 5, sortOrder: 2 },
                { name: 'Large', addonPrice: 10, sortOrder: 3 },
              ],
            },
          },
        ],
      },
      addonGroups: {
        connect: [
          { id: syrupAddons.id },
          { id: extraShots.id },
        ],
      },
    },
  })

  // Create cold drinks
  const icedLatte = await prisma.product.create({
    data: {
      name: 'Iced Latte',
      basePrice: 48,
      description: 'Espresso with cold milk and ice',
      categoryId: coldDrinks.id,
      modifications: {
        create: [
          {
            type: 'sizes',
            options: {
              create: [
                { name: 'Small', addonPrice: 0, sortOrder: 1 },
                { name: 'Medium', addonPrice: 5, sortOrder: 2 },
                { name: 'Large', addonPrice: 10, sortOrder: 3 },
              ],
            },
          },
        ],
      },
      addonGroups: {
        connect: [
          { id: syrupAddons.id },
          { id: milkOptions.id },
          { id: extraShots.id },
          { id: toppings.id },
        ],
      },
    },
  })

  const frappuccino = await prisma.product.create({
    data: {
      name: 'Frappuccino',
      basePrice: 52,
      description: 'Blended ice drink with coffee, milk, and whipped cream',
      categoryId: coldDrinks.id,
      modifications: {
        create: [
          {
            type: 'sizes',
            options: {
              create: [
                { name: 'Small', addonPrice: 0, sortOrder: 1 },
                { name: 'Medium', addonPrice: 5, sortOrder: 2 },
                { name: 'Large', addonPrice: 10, sortOrder: 3 },
              ],
            },
          },
          {
            type: 'flavours',
            options: {
              create: [
                { name: 'Coffee', addonPrice: 0, sortOrder: 1 },
                { name: 'Mocha', addonPrice: 5, sortOrder: 2 },
                { name: 'Caramel', addonPrice: 5, sortOrder: 3 },
                { name: 'Vanilla', addonPrice: 5, sortOrder: 4 },
              ],
            },
          },
        ],
      },
      addonGroups: {
        connect: [
          { id: syrupAddons.id },
          { id: milkOptions.id },
          { id: extraShots.id },
          { id: toppings.id },
        ],
      },
    },
  })

  const coldBrew = await prisma.product.create({
    data: {
      name: 'Cold Brew',
      basePrice: 45,
      description: 'Smooth, cold-extracted coffee served over ice',
      categoryId: coldDrinks.id,
      modifications: {
        create: [
          {
            type: 'sizes',
            options: {
              create: [
                { name: 'Small', addonPrice: 0, sortOrder: 1 },
                { name: 'Medium', addonPrice: 5, sortOrder: 2 },
                { name: 'Large', addonPrice: 10, sortOrder: 3 },
              ],
            },
          },
        ],
      },
      addonGroups: {
        connect: [
          { id: syrupAddons.id },
          { id: milkOptions.id },
        ],
      },
    },
  })

  // Create pastries
  const croissant = await prisma.product.create({
    data: {
      name: 'Butter Croissant',
      basePrice: 35,
      description: 'Classic French butter croissant',
      categoryId: pastries.id,
      addonGroups: {
        connect: [
          { id: pastryExtras.id },
        ],
      },
    },
  })

  const muffin = await prisma.product.create({
    data: {
      name: 'Blueberry Muffin',
      basePrice: 32,
      description: 'Fresh-baked muffin with real blueberries',
      categoryId: pastries.id,
      addonGroups: {
        connect: [
          { id: pastryExtras.id },
        ],
      },
    },
  })

  const brownie = await prisma.product.create({
    data: {
      name: 'Double Chocolate Brownie',
      basePrice: 38,
      description: 'Rich chocolate brownie with chocolate chunks',
      categoryId: pastries.id,
      addonGroups: {
        connect: [
          { id: toppings.id },
        ],
      },
    },
  })

  console.log('Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })