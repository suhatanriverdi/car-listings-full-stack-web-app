/*
  Warnings:

  - Added the required column `status` to the `TradeIn` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TradeIn" ADD COLUMN     "status" TEXT NOT NULL;
