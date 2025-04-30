const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  try {
    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    
    const admin = await prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        name: 'Alisina',
        email: 'admin@example.com',
        password: adminPassword,
        image: 'https://avatars.githubusercontent.com/u/100498538?v=4',
        role: 'admin',
        bio: 'Software Developer who thrives on building elegant and practical solutions. Passionate about scalable backend systems, sleek frontend designs, and efficient infrastructure with expertise in Go, Python, and modern JavaScript frameworks.'
      }
    });

    console.log('Admin user created:', admin.name);
    console.log('Seed completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 