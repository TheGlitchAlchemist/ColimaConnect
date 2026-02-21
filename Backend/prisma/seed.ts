import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando el sembrado de datos...');

  // 1. Crear el Propietario (Owner)
  const owner = await prisma.owners.create({
    data: {
      full_name: 'The Glitch Alchemist',
      email: 'contacto@colimaconnect.com',
      password_hash: 'hash_seguro_123', // En producción usarás bcrypt
      phone: '3121234567',
    },
  });

  // 2. Crear el Negocio (Business) vinculado al Owner
  const business = await prisma.businesses.create({
    data: {
      owner_id: owner.id,
      name: 'Barbería Glitch Colima',
      slug: 'barberia-glitch',
      category: 'beauty',
      city: 'Colima',
      address: 'Av. Constitución 123',
    },
  });

  // 3. Crear un Servicio para ese negocio
  await prisma.services.create({
    data: {
      business_id: business.id,
      name: 'Corte de Autor',
      description: 'Corte personalizado con acabado premium',
      price: 250.00,
      duration_minutes: 45,
    },
  });

  console.log('✅ Datos sembrados con éxito: Se creó el dueño, el negocio y el servicio.');
}

main()
  .catch((e) => {
    console.error('❌ Error en el seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });