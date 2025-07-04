
import { Button } from "~/shared/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "~/shared/components/ui/dialog";
import { FormEvent, useCallback, useState } from "react";
import { Plus } from "lucide-react";
import useAddCategory from "../hooks/useAddCategory";
import { PostCategoryPayload } from "../api/postCategory";
import CategoryForm from "./CategoryForm";

const AddCategoryDialog = () => {
	const { newCategory, isPending, isError, error, addCategory } = useAddCategory();
	const [open, setOpen] = useState(false);
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		const name = String(form.get("name"));
		const payload: PostCategoryPayload = {
		name,
		};
		addCategory(payload);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild className="cursor-pointer">
				<Button>
					<Plus />
					Kategori
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:min-w-[90vw] lg:min-w-[70vw] max-h-[98vh] overflow-y-auto">
				<DialogTitle>Tambah Kategori</DialogTitle>
				<CategoryForm handleSubmit={handleSubmit} error={error} />
			</DialogContent>
		</Dialog>
	);
};

export default AddCategoryDialog;
