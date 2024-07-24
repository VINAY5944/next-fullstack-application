/*
  Warnings:

  - You are about to drop the column `dashboardLayoutId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `themeId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `dashboardlayout` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `theme` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `postId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_dashboardLayoutId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_themeId_fkey`;

-- AlterTable
ALTER TABLE `comment` ADD COLUMN `postId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `dashboardLayoutId`,
    DROP COLUMN `themeId`,
    ADD COLUMN `layout` ENUM('GRID', 'LIST', 'CUSTOM') NOT NULL DEFAULT 'GRID',
    ADD COLUMN `theme` ENUM('LIGHT', 'DARK', 'SYSTEM') NOT NULL DEFAULT 'LIGHT';

-- DropTable
DROP TABLE `dashboardlayout`;

-- DropTable
DROP TABLE `theme`;
