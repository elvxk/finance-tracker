import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Pastikan Prisma client sudah diatur di folder lib

export async function POST(req) {
  try {
    // Ambil data dari request body
    const body = await req.json();
    const { name, userId, balance } = body;

    // Validasi input
    if (!name || !userId || balance == null) {
      return NextResponse.json(
        { error: "Name, userId, and balance are required" },
        { status: 400 },
      );
    }

    // Buat record BankAccount baru
    const newBankAccount = await prisma.bankAccount.create({
      data: {
        name,
        userId,
        balance,
      },
    });

    return NextResponse.json(newBankAccount, { status: 201 }); // Sukses
  } catch (error) {
    console.error("Error creating bank account:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req) {
  try {
    // Ambil data dari request body
    const body = await req.json();
    const { id } = body;

    // Validasi input
    if (!id) {
      return NextResponse.json(
        { error: "ID is required to delete the account" },
        { status: 400 },
      );
    }

    // Hapus record berdasarkan ID
    const deletedAccount = await prisma.bankAccount.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      { message: "Account deleted successfully", deletedAccount },
      { status: 200 },
    ); // Sukses
  } catch (error) {
    console.error("Error deleting account:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(req) {
  try {
    // Ambil data dari request body
    const body = await req.json();
    const { id, name, balance } = body;

    // Validasi input
    if (!id || !name || balance == null) {
      return NextResponse.json(
        { error: "ID, name, and balance are required" },
        { status: 400 },
      );
    }

    // Update record BankAccount berdasarkan ID
    const updatedAccount = await prisma.bankAccount.update({
      where: { id },
      data: {
        name,
        balance,
      },
    });

    return NextResponse.json(
      { message: "Account updated successfully", updatedAccount },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating bank account:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
