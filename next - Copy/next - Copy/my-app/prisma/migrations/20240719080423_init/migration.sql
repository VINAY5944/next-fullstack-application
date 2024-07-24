/*
  Warnings:

  - The values [SYSTEM] on the enum `User_theme` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `theme` ENUM('LIGHT', 'DARK') NOT NULL DEFAULT 'LIGHT';

-- CreateTable
CREATE TABLE `Arrangement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `position1` INTEGER NOT NULL,
    `position2` INTEGER NOT NULL,
    `position3` INTEGER NOT NULL,
    `position4` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Arrangement` ADD CONSTRAINT `Arrangement_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
