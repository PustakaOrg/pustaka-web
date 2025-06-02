import { Button } from "~/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/shared/components/ui/dialog";
import CategoryForm from "./CategoryForm";
import { FormEvent, useCallback, useEffect } from "react";
import { Plus } from "lucide-react";
import useAddCategory from "../hooks/useAddCategory";

const AddCategoryDialog = () => {
  const { isPending, isError, error, addCategory } = useAddCategory();
  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    addCategory(form);
  }, []);
  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        <Button>
          <Plus />
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:min-w-[90vw] lg:min-w-[70vw] max-h-[98vh] overflow-y-auto">
        <DialogTitle>Add New Category</DialogTitle>
        <CategoryForm handleSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryDialog;
