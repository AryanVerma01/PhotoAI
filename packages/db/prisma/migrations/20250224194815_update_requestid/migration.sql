/*
  Warnings:

  - You are about to drop the column `falAiRequestId` on the `Model` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Model" DROP COLUMN "falAiRequestId",
ADD COLUMN     "RequestId" TEXT;

-- AlterTable
ALTER TABLE "OutputImages" ADD COLUMN     "requestId" TEXT;
