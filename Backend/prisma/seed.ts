import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando sembrado masivo de datos para ColimaConnect...');

  // 1. Limpieza de tablas (Orden correcto para no romper llaves foráneas)
  await prisma.appointments.deleteMany();
  await prisma.business_hours.deleteMany();
  await prisma.services.deleteMany();
  await prisma.staff.deleteMany();
  await prisma.clients.deleteMany();
  await prisma.businesses.deleteMany();
  await prisma.owners.deleteMany();

  // 2. Crear un Dueño
  const owner = await prisma.owners.create({
    data: {
      full_name: 'Roberto Gómez',
      email: 'roberto@colimaconnect.com',
      password_hash: '$2b$10$EixZAYVK1VzKNnlKq0A.u.7QY5O.85vD.j6J', // Hash de ejemplo
      phone: '3121010101'
    }
  });

  // 3. Crear Negocios (Usando categorías válidas de tu ENUM)
  const b1 = await prisma.businesses.create({
    data: {
      owner_id: owner.id,
      name: 'Barbería El Volcán',
      slug: 'barberia-volcan',
      category: 'beauty', // Válido
      city: 'Colima',
      address: 'Av. Constitución 450'
    }
  });

  const b2 = await prisma.businesses.create({
    data: {
      owner_id: owner.id,
      name: 'Fisioterapia Colima',
      slug: 'fisio-colima',
      category: 'health', // Válido
      city: 'Villa de Álvarez',
      address: 'J. Merced Cabrera 12'
    }
  });

// 4. Crear Staff (Ajustado a tu esquema real)
  await prisma.staff.create({
    data: {
      business_id: b1.id,
      name: 'Carlos Barbero',
      specialty: 'Cortes modernos'
      // Eliminamos 'role' porque no existe en tu schema.prisma
    }
  });

  await prisma.staff.create({
    data: {
      business_id: b2.id,
      name: 'Dra. Elena Ramos',
      specialty: 'Ortodoncia'
    }
  });

  // 5. Crear Clientes (Ligados obligatoriamente a un negocio)
  await prisma.clients.create({
    data: {
      business_id: b1.id, // Relación obligatoria
      full_name: 'Juan Pérez',
      email: 'juan@email.com',
      phone: '3125556677'
    }
  });

  console.log('✅ Base de datos poblada con éxito.');
}

main()
  .catch((e) => {
    console.error('❌ Error en el seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });