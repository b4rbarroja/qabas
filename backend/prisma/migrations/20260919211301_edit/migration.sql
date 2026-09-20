/*
  Warnings:

  - The `status` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "status",
ADD COLUMN     "status" "PostStatus" NOT NULL DEFAULT 'PENDING';

-- DropEnum
DROP TYPE "postStatus";
