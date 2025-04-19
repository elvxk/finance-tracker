import CategoryAdd from "@/components/tracker/category/categoryAdd";
import CategoryCard from "@/components/tracker/category/categoryCard";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const Category = async () => {
  const { userId } = await auth();
  const categories = await prisma.Category.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: { userId },
  });
  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <CategoryAdd user={userId} />
      <CategoryCard data={categories} />
    </div>
  );
};
export default Category;
