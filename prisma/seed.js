const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Starting cleanup...');
    await prisma.$transaction([
      prisma.addonGroupRelation.deleteMany(),
      prisma.addon.deleteMany(),
      prisma.addonGroup.deleteMany(),
      prisma.modificationOption.deleteMany(),
      prisma.modification.deleteMany(),
      prisma.product.deleteMany(),
      prisma.category.deleteMany(),
    ]);
    console.log('Database cleaned');

    // Create categories
    console.log('Creating categories...');
    const categories = await Promise.all(
      ['Beverages', 'Food', 'Desserts', 'Snacks'].map(name =>
        prisma.category.create({
          data: { name }
        })
      )
    );
    console.log('Categories created:', categories.length);

    // Create addon groups
    console.log('Creating addon groups...');
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
    console.log('Addon groups created:', addonGroups.length);

    // Helper function for image URLs
    const getRandomImageUrl = (category) => {
      const imageTypes = {
        'Beverages': [
          'coffee', 'tea', 'smoothie', 'juice', 'soda',
          'latte', 'cappuccino', 'milkshake', 'cocktail'
        ],
        'Food': [
          'burger', 'pizza', 'sandwich', 'pasta', 'salad',
          'sushi', 'rice', 'noodles'
        ],
        'Desserts': [
          'cake', 'ice-cream', 'cookie', 'donut', 'pie',
          'brownie', 'pudding'
        ],
        'Snacks': [
          'chips', 'popcorn', 'nuts', 'fries', 'nachos',
          'pretzels'
        ]
      };

      const types = imageTypes[category.name] || ['food'];
      const randomType = types[Math.floor(Math.random() * types.length)];
      return faker.image.urlLoremFlickr({ width: 400, height: 300 });
    };

    // Create products
    for (const category of categories) {
      const productsCount = faker.number.int({ min: 3, max: 6 });
      console.log(`Creating ${productsCount} products for category ${category.name}...`);
      
      for (let i = 0; i < productsCount; i++) {
        const product = await prisma.product.create({
          data: {
            name: faker.commerce.productName(),
            basePrice: faker.number.int({ min: 500, max: 2000 }),
            description: faker.commerce.productDescription(),
            imageUrl: getRandomImageUrl(category),
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
        console.log(`Created product: ${product.name}`);
      }
    }

    // Verify data
    const counts = await prisma.$transaction([
      prisma.category.count(),
      prisma.product.count(),
      prisma.modification.count(),
      prisma.modificationOption.count(),
      prisma.addonGroup.count(),
      prisma.addon.count(),
      prisma.addonGroupRelation.count(),
    ]);

    console.log('Final counts:', {
      categories: counts[0],
      products: counts[1],
      modifications: counts[2],
      modificationOptions: counts[3],
      addonGroups: counts[4],
      addons: counts[5],
      addonGroupRelations: counts[6],
    });

  } catch (error) {
    console.error('Seed error:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });