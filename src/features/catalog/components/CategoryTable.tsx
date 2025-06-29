import {
	Table,
	TableBody,
	TableCell,
	TableRow,
} from "~/shared/components/ui/table";
import { Tag, Users } from "lucide-react";
import CategoryTableHeader from "./CategoryTableHeader";
import CategoryTableRow from "./CategoryTableRow";
import { Category } from "~/types/entities/Category";
import useDialogWithData from "~/shared/hooks/useDialogWithData";
import { PaginatedResponse } from "~/types/responses";
import UpdateCategoryDialog from "./UpdateCategoryDialog";
import DeleteEntityAlertDialog from "~/shared/components/DeleteEntityDialog";
import useDeleteCategory from "../hooks/useDeleteCategory";

interface CategoryTableProps {
	categoryList: PaginatedResponse<Category>;
}

const CategoryTable = ({ categoryList }: CategoryTableProps) => {
	const { deleteCategory } = useDeleteCategory();
	const {
		data: category,
		openDialog,
		isOpen,
		closeDialog,
	} = useDialogWithData<Category>();
	const {
		data: deleteCategoryData,
		openDialog: openDeleteDialog,
		isOpen: isDeleteOpen,
		closeDialog: closeDeleteDialog,
	} = useDialogWithData<Category>();

	const onAction = (action: string, category: Category) => {
		if (action === "edit") {
			openDialog(category);
		}
		if (action === "delete") {
			openDeleteDialog(category);
		}
	};
	return (
		<div>
			<Table>
				<CategoryTableHeader />
				<TableBody>
					{categoryList && categoryList.results.length > 0 ? (
						categoryList.results.map((category) => (
							<CategoryTableRow
								key={category.id}
								category={category}
								onAction={onAction}
							/>
						))
					) : (
						<TableRow>
							<TableCell colSpan={6} className="text-center py-8">
								<div className="flex flex-col items-center gap-2">
									<Tag className="h-8 w-8 text-muted-foreground" />
									<p className="text-muted-foreground">Tidak ada kategori ditemukan.</p>
									<p className="text-sm text-muted-foreground">
                      Atur ulang pencarian atau filter.
									</p>
								</div>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			{category && (
				<UpdateCategoryDialog
					category={category}
					onOpenChange={closeDialog}
					isOpen={isOpen}
				/>
			)}
			{deleteCategoryData && (
				<DeleteEntityAlertDialog
					entity={deleteCategoryData}
					entityName="kategori"
					entityLabel={deleteCategoryData.name}
					isOpen={isDeleteOpen}
					onOpenChange={closeDeleteDialog}
					onConfirm={() => deleteCategory(deleteCategoryData.id)}
				/>
			)}
		</div>
	);
};

export default CategoryTable;
