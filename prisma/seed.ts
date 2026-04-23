import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const manufacturers = [
    { name: 'ניסאן', sortOrder: 1 },
    { name: 'טויוטה', sortOrder: 2 },
    { name: 'מיצובישי', sortOrder: 3 },
    { name: 'פורד', sortOrder: 4 },
    { name: 'הונדה', sortOrder: 5 },
    { name: 'יונדאי', sortOrder: 6 },
    { name: 'קיה', sortOrder: 7 },
    { name: 'סובארו', sortOrder: 8 },
    { name: 'מאזדה', sortOrder: 9 },
    { name: 'סוזוקי', sortOrder: 10 },
  ]

  await prisma.carManufacturer.createMany({
    data: manufacturers.map(m => ({
      name: m.name,
      sortOrder: m.sortOrder,
      isActive: true,
    })),
    skipDuplicates: true,
  })

  console.log('Seeded car manufacturers successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
