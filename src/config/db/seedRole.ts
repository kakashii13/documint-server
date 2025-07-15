import { prisma } from "../../prismaClient";

export const seedRole = async () => {
  const roles = ["admin", "admin-client", "client"];

  for (const role of roles) {
    try {
      await prisma.role.upsert({
        where: { role: role },
        update: {},
        create: { role: role },
      });
      console.log(`Role '${role}' seeded successfully.`);
    } catch (error) {
      console.error(`Error seeding role '${role}':`, error);
    }
  }
};
