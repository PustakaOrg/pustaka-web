import React, { FormEvent } from "react";
import { Button } from "~/shared/components/ui/button";
import { Input } from "~/shared/components/ui/input";
import { Label } from "~/shared/components/ui/label";

interface ImportBookFormProps {
	handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
	error: unknown;
}

const ImportBookForm = ({ handleSubmit, error }: ImportBookFormProps) => {
	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="grid gap-4 py-4">
				<div className="space-y-2">
					<Label htmlFor="name" className="text-right">
						File
					</Label>
					<Input
						id="file"
						name="file"
						type="file"
						accept=".csv"
						className="col-span-3"
						required
					/>
					{/* @ts-ignore */}
					{error?.detail && ( <p className="text-xs text-destructive">{error.detail}</p>)}
				</div>
				<Button className="cursor-pointer w-full items-right" type="submit">
					Submit
				</Button>
			</div>
		</form>
	);
};

export default ImportBookForm;

