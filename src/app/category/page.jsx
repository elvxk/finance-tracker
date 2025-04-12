import CategoryAdd from "@/components/tracker/category/categoryAdd";
import CategoryCard from "@/components/tracker/category/categoryCard";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

const Category = async () => {
  const user = await currentUser();
  const categories = await prisma.Category.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      userId: user.id,
    },
  });
  return (
    <>
      <div className="flex flex-col gap-4 lg:gap-6">
        <CategoryAdd user={user.id} />
        <CategoryCard data={categories} />
      </div>
    </>
  );
};
export default Category;
