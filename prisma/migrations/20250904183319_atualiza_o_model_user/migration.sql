/*
  Warnings:

  - Changed the column `type` on the `User` table from a scalar field to a list field. If there are non-null values in that column, this step will fail.

*/
-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "type" SET DEFAULT ARRAY['USER', 'ADMIN']::"public"."typeUser"[],
ALTER COLUMN "type" SET DATA TYPE "public"."typeUser"[];
