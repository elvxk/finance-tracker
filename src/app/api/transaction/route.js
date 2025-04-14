import { NextResponse } from "next/server";

import prisma from "@/lib/prisma"; // Path ke Prisma Client

export async function POST(req) {
  try {
    // Ambil data dari request body
    const body = await req.json();
    const { name, amount, category, bankAccount, date, isIncome, userId } =
      body;

    // Validasi input
    if (
      !name ||
      !amount ||
      !category ||
      !bankAccount ||
      !date ||
      typeof isIncome === "undefined" ||
      !userId
    ) {
      return NextResponse.json(
        {
          error:
            "All fields are required: name, amount, category, bankAccount, date, isIncome, userId",
        },
        { status: 400 },
      );
    }

    // Konversi dan validasi nilai amount
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return NextResponse.json(
        {
          error: "Amount must be a positive number",
        },
        { status: 400 },
      );
    }

    // Gunakan transaksi database untuk memastikan integritas data
    const transaction = await prisma.$transaction(async (prisma) => {
      // Perbarui saldo akun bank langsung dengan increment/decrement
      const bankAccountUpdate = await prisma.bankAccount.update({
        where: { id: bankAccount },
        data: {
          balance: isIncome
            ? { increment: parsedAmount } // Tambahkan saldo jika income
            : { decrement: parsedAmount }, // Kurangi saldo jika expense
        },
        select: { balance: true }, // Ambil saldo terbaru
      });

      // Buat transaksi baru dengan saldo terkini
      const newTransaction = await prisma.transaction.create({
        data: {
          name,
          amount: parsedAmount, // Konversi ke Decimal
          date: new Date(date), // Konversi ke tipe DateTime
          isIncome,
          categoryId: category, // Relasi ke tabel Category
          bankAccountId: bankAccount, // Relasi ke tabel BankAccount
          userId, // ID user (dari Clerk)
          currentBalance: bankAccountUpdate.balance, // Saldo setelah transaksi
        },
      });

      return newTransaction;
    });

    // Kembalikan respon sukses
    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    console.error("Error creating transaction:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
