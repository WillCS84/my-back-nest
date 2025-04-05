/*
  Warnings:

  - You are about to drop the column `name` on the `Laucher` table. All the data in the column will be lost.
  - Made the column `description` on table `Laucher` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Laucher` DROP COLUMN `name`,
    MODIFY `description` VARCHAR(191) NOT NULL;
