/*
  Warnings:

  - Added the required column `currentBalance` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "currentBalance" DECIMAL(65,30) NOT NULL;
