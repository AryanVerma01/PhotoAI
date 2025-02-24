-- AlterTable
ALTER TABLE "Model" ADD COLUMN     "falAiRequestId" TEXT,
ADD COLUMN     "status" "outputImagesStatusenum" NOT NULL DEFAULT 'Pending',
ADD COLUMN     "tensorPath" TEXT,
ADD COLUMN     "triggerWord" TEXT;
