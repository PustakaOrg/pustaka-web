import { FormEvent } from "react";
import { Button } from "~/shared/components/ui/button";
import { Input } from "~/shared/components/ui/input";
import { Label } from "~/shared/components/ui/label";
import { Category } from "~/types/entities/Category";




interface CategoryFormProps {
	handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
	defaultValues?: Category;
  error?: unknown 
}

const CategoryForm = ({ handleSubmit, defaultValues, error }: CategoryFormProps) => {
	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="grid gap-4 py-4">
				<div className="space-y-2">
					<Label htmlFor="name" className="text-right">
						Nama
					</Label>
					<Input
						id="name"
						name="name"
						type="text"
						placeholder="Masukkan nama Category"
						className="col-span-3"
						defaultValue={defaultValues?.name}
						required
					/>
        {/* @ts-ignore */}
        {error?.data?.name && <p className="text-xs text-destructive">{error.data.name[0]}</p>}
				</div>
				<Button className="cursor-pointer w-full items-right" type="submit">
					Submit
				</Button>
			</div>
		</form>
	);
};

export default CategoryForm;
