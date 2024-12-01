const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.$transaction([
    prisma.addonGroupRelation.deleteMany(),
    prisma.addon.deleteMany(),
    prisma.addonGroup.deleteMany(),
    prisma.modificationOption.deleteMany(),
    prisma.modification.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ]);

  // Create categories
  const categories = await Promise.all(
    ['Beverages', 'Food', 'Desserts', 'Snacks'].map(name =>
      prisma.category.create({
        data: { name }
      })
    )
  );

  // Create addon groups
  const addonGroups = await Promise.all(
    [
      { name: 'Extra Toppings', limit: 3, sortOrder: 1 },
      { name: 'Syrups', limit: 2, sortOrder: 2 },
      { name: 'Extra Shots', limit: 4, sortOrder: 3 },
    ].map(group =>
      prisma.addonGroup.create({
        data: {
          ...group,
          addons: {
            create: Array.from({ length: 4 }, (_, i) => ({
              name: faker.commerce.productAdjective() + ' ' + faker.commerce.product(),
              price: faker.number.int({ min: 50, max: 200 }),
              limit: faker.number.int({ min: 1, max: 3 }),
              sortOrder: i + 1,
            })),
          },
        },
      })
    )
  );

  // Create products with modifications and addon group relations
  for (const category of categories) {
    const productsCount = faker.number.int({ min: 3, max: 6 });
    
    for (let i = 0; i < productsCount; i++) {
      const product = await prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          basePrice: faker.number.int({ min: 500, max: 2000 }),
          description: faker.commerce.productDescription(),
          categoryId: category.id,
          modifications: {
            create: [
              {
                name: 'Size',
                options: {
                  create: [
                    { name: 'Small', addonPrice: 0, sortOrder: 1 },
                    { name: 'Medium', addonPrice: 100, sortOrder: 2 },
                    { name: 'Large', addonPrice: 200, sortOrder: 3 },
                  ],
                },
              },
              {
                name: 'Temperature',
                options: {
                  create: [
                    { name: 'Hot', addonPrice: 0, sortOrder: 1 },
                    { name: 'Iced', addonPrice: 50, sortOrder: 2 },
                  ],
                },
              },
            ],
          },
          addonGroups: {
            create: addonGroups
              .slice(0, faker.number.int({ min: 1, max: 3 }))
              .map(group => ({
                addonGroupId: group.id,
              })),
          },
        },
      });
    }
  }

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });