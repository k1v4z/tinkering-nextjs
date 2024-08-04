/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `Refresh_Token` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `expires_at` to the `Refresh_Token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `revoked_at` to the `Refresh_Token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `refresh_token` ADD COLUMN `expires_at` TIMESTAMP(6) NOT NULL,
    ADD COLUMN `revoked_at` TIMESTAMP(6) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Refresh_Token_token_key` ON `Refresh_Token`(`token`);
