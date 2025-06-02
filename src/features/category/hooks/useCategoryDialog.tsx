import { useCallback, useState } from "react";
import { Category } from "~/types/entities/Category";

const useCategoryDialog = () => {
  const [category, setCategory] = useState<Category | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = useCallback((category: Category) => {
    setCategory(category);
    setIsOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, category, openDialog, closeDialog };
};

export default useCategoryDialog;
