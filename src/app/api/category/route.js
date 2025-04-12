import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Pastikan Prisma client sudah diatur di folder lib

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, userId } = body;

    if (!name || !userId == null) {
      return NextResponse.json(
        { error: "Name and userId are required" },
        { status: 400 },
      );
    }

    const newCategory = await prisma.category.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(newCategory, { status: 201 }); // Sukses
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { id, name } = body;

    if (!id || !name == null) {
      return NextResponse.json(
        { error: "ID and name are required" },
        { status: 400 },
      );
    }

    const updatedAccount = await prisma.category.update({
      where: { id },
      data: {
        name,
      },
    });

    return NextResponse.json(
      { message: "Category updated successfully", updatedAccount },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID is required to delete the account" },
        { status: 400 },
      );
    }

    const deletedAccount = await prisma.category.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      { message: "Category deleted successfully", deletedAccount },
      { status: 200 },
    ); // Sukses
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
