import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "~/shared/components/ui/alert-dialog";
import { Category } from "~/types/entities/Category";
import useDeleteCategory from "../hooks/useDeleteCategory";

interface DeleteCategoryAlertDialogProps {
  category: Category;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}
const DeleteCategoryAlertDialog = ({
  category,
  isOpen,
  onOpenChange,
}: DeleteCategoryAlertDialogProps) => {
  const { deleteCategory } = useDeleteCategory();
  const handleClick = () => {
    deleteCategory(category.id);
    onOpenChange(false);
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            <b>{category.name}</b> book.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="cursor-pointer bg-destructive hover:bg-destructive/90"
            onClick={handleClick}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCategoryAlertDialog;
