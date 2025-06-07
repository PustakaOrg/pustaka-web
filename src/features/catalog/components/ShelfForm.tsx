import { FormEvent } from "react";
import { Button } from "~/shared/components/ui/button";
import { Input } from "~/shared/components/ui/input";
import { Label } from "~/shared/components/ui/label";
import { Shelf } from "~/types/entities/Shelf";




interface ShelfFormProps {
	handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
	defaultValues?: Shelf;
  error?: unknown 
}

const ShelfForm = ({ handleSubmit, defaultValues, error }: ShelfFormProps) => {
	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="grid gap-4 py-4">
				<div className="space-y-2">
					<Label htmlFor="name" className="text-right">
						Kode
					</Label>
					<Input
						id="name"
						name="code"
						type="text"
						placeholder="Masukkan kode Rak"
						className="col-span-3"
						defaultValue={defaultValues?.code}
						required
					/>
        {/* @ts-ignore */}
        {error?.data?.code && <p className="text-xs text-destructive">{error.data.code[0]}</p>}
				</div>
				<Button className="cursor-pointer w-full items-right" type="submit">
					Submit
				</Button>
			</div>
		</form>
	);
};

export default ShelfForm;
