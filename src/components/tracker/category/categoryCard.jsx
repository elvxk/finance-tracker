import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CategoryEdit from "./categoryEdit";
import CategoryDel from "./categoryDel";

const CategoryCard = ({ data }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
      {data.map((cat, index) => (
        <Card key={index} className="@container/card">
          <CardHeader className="relative">
            <CardTitle className="@[254px]/card:text-2xl text-xl font-semibold tabular-nums">
              {cat.name}
            </CardTitle>
            {/* <CardDescription className="text-black dark:text-white font-bold flex items-center"> */}
            {/*   {cat.name} */}
            {/* </CardDescription> */}
          </CardHeader>
          <CardFooter>
            <div className="flex justify-center gap-4 -mt-6">
              <CategoryEdit data={cat} />
              <CategoryDel account={cat} />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
export default CategoryCard;
