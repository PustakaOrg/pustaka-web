import { useQuery } from "@tanstack/react-query";
import { CategoryListParams, getCategory } from "../api/getCategory";

const useCategoryList = (params?: CategoryListParams) => {
  const {
    data: categoryList,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["categories", params],
    queryFn: () => getCategory(params),
  });
  return {
    categoryList,
    isPending,
    isError,
    error,
  };
};

export default useCategoryList;
