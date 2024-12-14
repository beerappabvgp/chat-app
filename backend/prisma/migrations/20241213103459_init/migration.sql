/*
  Warnings:

  - You are about to drop the column `content` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Message` table. All the data in the column will be lost.
  - Added the required column `message` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "content",
DROP COLUMN "username",
ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL DEFAULT '';
