import { useCallback, useState } from "react";
import { useSearchParams } from "react-router";
import ContentHeader from "~/features/dashboard/components/ContentHeader";
import CategoryTable from "~/features/category/components/CategoryTable";
import useCategoryList from "~/features/category/hooks/useCategoryList";
import {
  defaultColumnVisibility,
  CategoryColumnVisibility,
} from "~/features/category/types/CategoryColumnVisibility";
import { Pagination } from "~/shared/components/Pagination";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/shared/components/ui/card";
import { defaultParams } from "~/shared/utils/functions";
import AddCategoryDialog from "~/features/category/components/AddCategoryDialog";
import { CategoryListParams } from "~/features/category/api/getCategory";

const DashboardCategoryPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryListParams = {
    limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 10,
    offset: searchParams.get("offset")
      ? Number(searchParams.get("offset"))
      : undefined,
  };

  const { categoryList, isPending, isError, error } = useCategoryList(
    defaultParams<CategoryListParams>(categoryListParams),
  );

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [columnVisibility, setColumnVisibility] =
    useState<CategoryColumnVisibility>(defaultColumnVisibility);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCategories(categoryList!.results.map((cat) => cat.id));
    } else {
      setSelectedCategories([]);
    }
  };

  const handleSelectCategory = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories((prev) => [...prev, categoryId]);
    } else {
      setSelectedCategories((prev) => prev.filter((id) => id !== categoryId));
    }
  };

  const handleOffsetChange = useCallback((newOffset: number) => {
    setSearchParams((prev) => {
      prev.set("offset", String(newOffset));
      return prev;
    });
  }, []);

  return (
    <main className="flex flex-1 flex-col gap-6 p-6 overflow-scroll">
      <ContentHeader title="Categories" subtitle="Manage categories" />
      <Card>
        <CardHeader className="flex justify-between">
          <div>
            <CardTitle>Categories</CardTitle>
            <CardDescription>
              {categoryList?.results.length} categories found
            </CardDescription>
          </div>
          <div>
            <AddCategoryDialog />
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {categoryList && (
            <CategoryTable
              categoryList={categoryList}
              selectedCategories={selectedCategories}
              handleSelectAll={handleSelectAll}
              handleSelectCategory={handleSelectCategory}
              columnVisibility={columnVisibility}
            />
          )}
        </CardContent>
        <CardFooter className="flex items-center justify-center mt-8">
          {categoryList && (
            <Pagination
              totalCount={categoryList.count}
              limit={categoryListParams.limit}
              offset={categoryListParams.offset ?? 0}
              onOffsetChange={handleOffsetChange}
            />
          )}
        </CardFooter>
      </Card>
    </main>
  );
};

export default DashboardCategoryPage;
