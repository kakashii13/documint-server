import { hashValue } from "../../utils/hashValue";
import { prisma } from "../../prismaClient";

export const seedAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  console.log(
    "Seeding admin with:",
    adminEmail,
    adminPassword ? "[hidden]" : "undefined"
  );

  if (!adminEmail || !adminPassword) {
    console.error("Admin email or password not set in environment variables.");
    return;
  }

  const hashedPassword = await hashValue(adminPassword);

  try {
    await prisma.user.upsert({
      where: { email: adminEmail },
      update: {},
      create: {
        email: adminEmail,
        hash_password: hashedPassword,
        role: "admin",
        name: "Admin User",
        active: true,
      },
    });
    console.log("Admin user seeded successfully.");
  } catch (error) {
    console.error("Error seeding admin user:", error);
  }
};
