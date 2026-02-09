import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Hash password
  const hashedPassword = await bcrypt.hash('admin123', 10);

  // Create Super Admin
  const superAdmin = await prisma.user.upsert({
    where: { email: 'superadmin@ekinerja.com' },
    update: {},
    create: {
      email: 'superadmin@ekinerja.com',
      password: hashedPassword,
      name: 'Super Administrator',
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  });

  console.log('✅ Super Admin created:', superAdmin.email);

  // Create Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ekinerja.com' },
    update: {},
    create: {
      email: 'admin@ekinerja.com',
      password: hashedPassword,
      name: 'Administrator',
      role: 'ADMIN',
      isActive: true,
    },
  });

  console.log('✅ Admin created:', admin.email);

  // Create Demo User
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@ekinerja.com' },
    update: {},
    create: {
      email: 'demo@ekinerja.com',
      password: hashedPassword,
      name: 'Demo User',
      role: 'USER',
      isActive: true,
    },
  });

  console.log('✅ Demo User created:', demoUser.email);

  // Create Demo Instansi
  const instansi = await prisma.instansi.upsert({
    where: { id: '1' },
    update: {},
    create: {
      header1: 'KEMENTERIAN AGAMA REPUBLIK INDONESIA',
      header2: 'KANTOR KABUPATEN PANDEGLANG',
      header3: 'MADRASAH TSANAWIYAH NEGERI 1 PANDEGLANG',
      alamat: 'Jl. Raya Labuan Km. 5,7 Pandeglang - Banten 42253',
      telepon: '(0253) 201000',
      email: 'mtsn1pandeglang@kemenag.go.id',
      website: 'https://mtsn1pandeglang.sch.id',
      namaKepala: 'Dr. H. Fulan bin Fulan, M.Pd',
      nipKepala: '196501011990031001',
      pangkatKepala: 'Pembina/IV-a',
      titimangsa: 'Pandeglang',
      isActive: true,
    },
  });

  console.log('✅ Demo Instansi created:', instansi.header3);

  // Create Demo Pegawai
  const pegawai = await prisma.pegawai.upsert({
    where: { userId: demoUser.id },
    update: {},
    create: {
      userId: demoUser.id,
      nip: '198501012010011001',
      nuptk: '1234567890123456',
      nama: 'Ahmad Dahlan, S.Pd',
      tempatLahir: 'Pandeglang',
      tanggalLahir: new Date('1990-01-01'),
      gender: 'L',
      jenisPegawai: 'PNS',
      statusPegawai: 'AKTIF',
      golongan: 'III/a',
      jabatan: 'Guru Ahli Pertama',
      unitKerja: 'MTsN 1 Pandeglang',
      pendidikan: 'S1 Pendidikan Matematika',
      masaKerjaTahun: 5,
      masaKerjaBulan: 6,
    },
  });

  console.log('✅ Demo Pegawai created:', pegawai.nama);

  // Create Demo Akademik Data
  const akademik = await prisma.akademikData.upsert({
    where: { pegawaiId: pegawai.id },
    update: {},
    create: {
      pegawaiId: pegawai.id,
      kurikulum: 'MERDEKA',
      tahunPelajaran: '2024/2025',
      semester: 'GANJIL',
      mapel: 'Matematika',
      kelas: 'VII-A, VII-B',
      jamMengajar: 24,
      jumlahSiswa: 64,
      ekskul: 'Olimpiade Matematika',
    },
  });

  console.log('✅ Demo Akademik Data created');

  console.log('\n🎉 Seeding completed!\n');
  console.log('📝 Login credentials:');
  console.log('   Super Admin: superadmin@ekinerja.com / admin123');
  console.log('   Admin: admin@ekinerja.com / admin123');
  console.log('   Demo User: demo@ekinerja.com / admin123');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
