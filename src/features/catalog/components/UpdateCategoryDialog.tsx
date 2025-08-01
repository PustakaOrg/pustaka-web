import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogTitle,
} from "~/shared/components/ui/dialog";
import { FormEvent, useCallback, useEffect } from "react";
import { Category } from "~/types/entities/Category";
import useUpdateCategory from "../hooks/useUpdateCategory";
import { PatchCategoryPayload } from "../api/patchCategory";
import CategoryForm from "./CategoryForm";


interface UpdateCategoryDialogProps {
	category: Category;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

const UpdateCategoryDialog = ({
	category,
	isOpen,
	onOpenChange,
}: UpdateCategoryDialogProps) => {
	const { updateCategory, isPending , isError, error } = useUpdateCategory();
	const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		const name = String(form.get("name"));
		const payload: PatchCategoryPayload = {
			name,
		};
		updateCategory({ id: category.id, payload });
	}, [updateCategory]);

	useEffect(() => {
		if (!isPending && !isError) {
			onOpenChange(false);
		}
	}, [isPending, isError]);

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="sm:min-w-[90vw] lg:min-w-[70vw] max-h-[98vh] overflow-y-auto">
				<DialogTitle>Edit Kategori</DialogTitle>
        <CategoryForm handleSubmit={handleSubmit} error={error} defaultValues={category} />
			</DialogContent>
			<DialogFooter></DialogFooter>
		</Dialog>
	);
};

export default UpdateCategoryDialog;
