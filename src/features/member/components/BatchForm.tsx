import { FormEvent } from "react";
import { Button } from "~/shared/components/ui/button";
import { Input } from "~/shared/components/ui/input";
import { Label } from "~/shared/components/ui/label";
import { Separator } from "~/shared/components/ui/separator";
import { Batch } from "~/types/entities/Batch";

interface BatchFormProps {
	handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
	defaultValues?: Batch;
  error?: unknown 
}

const BatchForm = ({ handleSubmit, defaultValues, error }: BatchFormProps) => {
	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="grid gap-4 py-4">
				<div className="space-y-2">
					<Label htmlFor="name" className="text-right">
						Name
					</Label>
					<Input
						id="name"
						name="name"
						type="text"
						placeholder="Enter batch name"
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

export default BatchForm;
