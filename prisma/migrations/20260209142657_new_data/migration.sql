-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `role` ENUM('SUPER_ADMIN', 'ADMIN', 'USER', 'GUEST') NOT NULL DEFAULT 'USER',
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `lastLogin` DATETIME(3) NULL,
    `refreshToken` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    INDEX `users_email_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pegawai` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `nip` VARCHAR(191) NOT NULL,
    `nuptk` VARCHAR(191) NULL,
    `nik` VARCHAR(191) NULL,
    `nama` VARCHAR(191) NOT NULL,
    `tempatLahir` VARCHAR(191) NULL,
    `tanggalLahir` DATETIME(3) NULL,
    `gender` ENUM('L', 'P') NOT NULL,
    `jenisPegawai` ENUM('PNS', 'PPPK', 'HONORER', 'GTT', 'PTT', 'GURU') NOT NULL,
    `statusPegawai` ENUM('AKTIF', 'CUTI', 'TUGAS_BELAJAR', 'NON_AKTIF') NOT NULL DEFAULT 'AKTIF',
    `golongan` VARCHAR(191) NULL,
    `jabatan` VARCHAR(191) NOT NULL,
    `unitKerja` VARCHAR(191) NOT NULL,
    `alamat` TEXT NULL,
    `hp` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `pendidikan` VARCHAR(191) NULL,
    `masaKerjaTahun` INTEGER NOT NULL DEFAULT 0,
    `masaKerjaBulan` INTEGER NOT NULL DEFAULT 0,
    `fotoPegawai` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `pegawai_userId_key`(`userId`),
    UNIQUE INDEX `pegawai_nip_key`(`nip`),
    UNIQUE INDEX `pegawai_nuptk_key`(`nuptk`),
    UNIQUE INDEX `pegawai_nik_key`(`nik`),
    INDEX `pegawai_nip_idx`(`nip`),
    INDEX `pegawai_nama_idx`(`nama`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `akademik_data` (
    `id` VARCHAR(191) NOT NULL,
    `pegawaiId` VARCHAR(191) NOT NULL,
    `kurikulum` ENUM('K13', 'MERDEKA', 'KTSP') NOT NULL,
    `tahunPelajaran` VARCHAR(191) NOT NULL,
    `semester` ENUM('GANJIL', 'GENAP') NOT NULL,
    `mapel` VARCHAR(191) NOT NULL,
    `kelas` VARCHAR(191) NOT NULL,
    `jamMengajar` INTEGER NOT NULL,
    `jumlahSiswa` INTEGER NOT NULL,
    `ekskul` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `akademik_data_pegawaiId_key`(`pegawaiId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `instansi` (
    `id` VARCHAR(191) NOT NULL,
    `header1` VARCHAR(191) NOT NULL,
    `header2` VARCHAR(191) NOT NULL,
    `header3` VARCHAR(191) NOT NULL,
    `alamat` TEXT NOT NULL,
    `telepon` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `website` VARCHAR(191) NULL,
    `logoUtama` TEXT NULL,
    `logoInstansi` TEXT NULL,
    `namaKepala` VARCHAR(191) NOT NULL,
    `nipKepala` VARCHAR(191) NOT NULL,
    `pangkatKepala` VARCHAR(191) NOT NULL,
    `ttdKepala` TEXT NULL,
    `titimangsa` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reports` (
    `id` VARCHAR(191) NOT NULL,
    `pegawaiId` VARCHAR(191) NOT NULL,
    `instansiId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `bulan` INTEGER NOT NULL,
    `tahun` INTEGER NOT NULL,
    `tugasPokok` TEXT NOT NULL,
    `tugasTambahan` TEXT NULL,
    `targetTahunan` TEXT NULL,
    `hambatan` TEXT NULL,
    `solusi` TEXT NULL,
    `content` LONGTEXT NOT NULL,
    `modelAI` VARCHAR(191) NOT NULL,
    `tokensUsed` INTEGER NULL,
    `nomorDokumen` VARCHAR(191) NOT NULL,
    `hashDokumen` VARCHAR(191) NULL,
    `qrCode` TEXT NULL,
    `ttdTimestamp` DATETIME(3) NULL,
    `status` ENUM('DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    `publishedAt` DATETIME(3) NULL,
    `metadata` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `reports_nomorDokumen_key`(`nomorDokumen`),
    INDEX `reports_pegawaiId_idx`(`pegawaiId`),
    INDEX `reports_userId_idx`(`userId`),
    INDEX `reports_bulan_tahun_idx`(`bulan`, `tahun`),
    INDEX `reports_nomorDokumen_idx`(`nomorDokumen`),
    INDEX `reports_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `file_uploads` (
    `id` VARCHAR(191) NOT NULL,
    `filename` VARCHAR(191) NOT NULL,
    `originalName` VARCHAR(191) NOT NULL,
    `mimetype` VARCHAR(191) NOT NULL,
    `size` INTEGER NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NULL,
    `uploadedBy` VARCHAR(191) NOT NULL,
    `category` ENUM('FOTO_PEGAWAI', 'LOGO_INSTANSI', 'TTD', 'LAMPIRAN', 'DOKUMEN', 'OTHER') NOT NULL,
    `metadata` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `file_uploads_uploadedBy_idx`(`uploadedBy`),
    INDEX `file_uploads_category_idx`(`category`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `audit_logs` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `action` VARCHAR(191) NOT NULL,
    `entity` VARCHAR(191) NOT NULL,
    `entityId` VARCHAR(191) NULL,
    `oldData` JSON NULL,
    `newData` JSON NULL,
    `ipAddress` VARCHAR(191) NULL,
    `userAgent` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `audit_logs_userId_idx`(`userId`),
    INDEX `audit_logs_entity_idx`(`entity`),
    INDEX `audit_logs_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notifications` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `message` TEXT NOT NULL,
    `type` ENUM('INFO', 'SUCCESS', 'WARNING', 'ERROR', 'REPORT_SUBMITTED', 'REPORT_APPROVED', 'REPORT_REJECTED') NOT NULL,
    `isRead` BOOLEAN NOT NULL DEFAULT false,
    `readAt` DATETIME(3) NULL,
    `metadata` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `notifications_userId_idx`(`userId`),
    INDEX `notifications_isRead_idx`(`isRead`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `settings` (
    `id` VARCHAR(191) NOT NULL,
    `key` VARCHAR(191) NOT NULL,
    `value` TEXT NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `isPublic` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `settings_key_key`(`key`),
    INDEX `settings_key_idx`(`key`),
    INDEX `settings_category_idx`(`category`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pegawai` ADD CONSTRAINT `pegawai_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `akademik_data` ADD CONSTRAINT `akademik_data_pegawaiId_fkey` FOREIGN KEY (`pegawaiId`) REFERENCES `pegawai`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reports` ADD CONSTRAINT `reports_pegawaiId_fkey` FOREIGN KEY (`pegawaiId`) REFERENCES `pegawai`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reports` ADD CONSTRAINT `reports_instansiId_fkey` FOREIGN KEY (`instansiId`) REFERENCES `instansi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reports` ADD CONSTRAINT `reports_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `audit_logs` ADD CONSTRAINT `audit_logs_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
