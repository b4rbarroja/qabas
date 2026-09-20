-- CreateEnum
CREATE TYPE "postStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "status" "postStatus" NOT NULL DEFAULT 'PENDING';
