/*
  Warnings:

  - You are about to drop the column `code` on the `team` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "team" DROP COLUMN "code";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "fcm_token" TEXT;
