import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "~/shared/components/ui/table";
import { PaginatedResponse } from "~/types/responses";
import { Category } from "~/types/entities/Category";
import { Users } from "lucide-react";
import CategoryTableHeader from "./CategoryTableHeader";
import useCategoryDialog from "../hooks/useCategoryDialog";
import CategoryTableRow from "./CategoryTableRow";
import { CategoryColumnVisibility } from "../types/CategoryColumnVisibility";
import DeleteCategoryAlertDialog from "./DeleteCategoryAlertDialog";

interface CategoryTableProps {
  categoryList: PaginatedResponse<Category>;
  columnVisibility: CategoryColumnVisibility;
  selectedCategories: string[];
  handleSelectAll: (checked: boolean) => void;
  handleSelectCategory: (categoryId: string, checked: boolean) => void;
}

const CategoryTable = React.memo(
  ({
    categoryList,
    columnVisibility,
    selectedCategories,
    handleSelectAll,
    handleSelectCategory,
  }: CategoryTableProps) => {
    const {
      category: categoryDelete,
      isOpen: deleteDialogOpen,
      closeDialog: closeDeleteDialog,
      openDialog: openDeleteDialog,
    } = useCategoryDialog();

    const handleRowAction = (action: string, category: Category) => {
      if (action === "edit") category;
      if (action === "delete") {
        openDeleteDialog(category);
      }
    };

    const isAllSelected =
      selectedCategories.length === categoryList.results.length &&
      categoryList.results.length > 0;

    const isIndeterminate =
      selectedCategories.length > 0 &&
      selectedCategories.length < categoryList.results.length;

    return (
      <div>
        <Table>
          <CategoryTableHeader
            onSelectAll={handleSelectAll}
            isIndeterminate={isIndeterminate}
            isAllSelected={isAllSelected}
          />
          <TableBody>
            {categoryList.results.length > 0 ? (
              categoryList.results.map((category) => (
                <CategoryTableRow
                  key={category.id}
                  category={category}
                  onAction={handleRowAction}
                  columnVisibility={columnVisibility}
                  isSelected={selectedCategories.includes(category.id)}
                  onSelect={handleSelectCategory}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex flex-col items-center gap-2">
                    <Users className="h-8 w-8 text-muted-foreground" />
                    <p className="text-muted-foreground">No categories found</p>
                    <p className="text-sm text-muted-foreground">
                      Try adjusting your search or filters
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {categoryDelete && (
          <DeleteCategoryAlertDialog
            category={categoryDelete}
            onOpenChange={closeDeleteDialog}
            isOpen={deleteDialogOpen}
          />
        )}
      </div>
    );
  }
);

export default CategoryTable;
