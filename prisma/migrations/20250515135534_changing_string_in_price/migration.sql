/*
  Warnings:

  - You are about to alter the column `price` on the `catalog` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.

*/
-- AlterTable
ALTER TABLE `catalog` MODIFY `price` DOUBLE NOT NULL;
