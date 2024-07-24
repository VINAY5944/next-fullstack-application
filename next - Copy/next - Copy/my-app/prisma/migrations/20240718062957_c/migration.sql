/*
  Warnings:

  - You are about to drop the column `postId` on the `comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `comment` DROP COLUMN `postId`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `dashboardLayoutId` INTEGER NULL,
    ADD COLUMN `themeId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Theme` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `theme` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DashboardLayout` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `layout` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_themeId_fkey` FOREIGN KEY (`themeId`) REFERENCES `Theme`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_dashboardLayoutId_fkey` FOREIGN KEY (`dashboardLayoutId`) REFERENCES `DashboardLayout`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
