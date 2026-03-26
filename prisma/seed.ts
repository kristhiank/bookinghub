import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const services = [
  { id: "1", name: "General Consultation", description: "General medical consultation", duration: 30, price: 50, color: "#3b82f6" },
  { id: "2", name: "Full Checkup", description: "Complete physical examination", duration: 60, price: 100, color: "#10b981" },
  { id: "3", name: "Specialist Consultation", description: "With specialist", duration: 45, price: 80, color: "#f59e0b" },
  { id: "4", name: "Follow-up", description: "Follow-up appointment", duration: 20, price: 30, color: "#8b5cf6" },
];

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin/owner user for services
  const admin = await prisma.user.upsert({
    where: { email: "admin@bookinghub.com" },
    update: {},
    create: {
      id: "admin-user-id",
      email: "admin@bookinghub.com",
      name: "Admin",
      role: "ADMIN",
    },
  });

  console.log("✅ Admin user created:", admin.email);

  // Create services
  for (const service of services) {
    const created = await prisma.service.upsert({
      where: { id: service.id },
      update: service,
      create: {
        ...service,
        createdBy: admin.id,
      },
    });
    console.log("✅ Service created:", created.name);
  }

  console.log("🎉 Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
