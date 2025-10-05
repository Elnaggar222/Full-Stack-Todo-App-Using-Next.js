import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
  //^ Todo seeding
  // await prisma.todo.createMany({
  //   data: Array.from({ length: 10 }).map(() => ({
  //     title: faker.lorem.words(3),
  //     body: faker.lorem.sentence(),
  //   })),
  // });
  //^ user seeding
  // await prisma.user.createMany({
  //   data: Array.from({ length: 10 }).map(() => ({
  //     name: faker.person.fullName(),
  //     email: faker.internet.email(),
  //     address: {
  //       city: faker.location.city(),
  //       state: faker.location.state(),
  //       zip: faker.location.zipCode(),
  //       street: faker.location.streetAddress(),
  //     },
  //   })),
  // });
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
