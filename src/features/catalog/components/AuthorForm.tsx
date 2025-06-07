import { FormEvent } from "react";
import { Button } from "~/shared/components/ui/button";
import { Input } from "~/shared/components/ui/input";
import { Label } from "~/shared/components/ui/label";
import { Author } from "~/types/entities/Author";




interface AuthorFormProps {
	handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
	defaultValues?: Author;
  error?: unknown 
}

const AuthorForm = ({ handleSubmit, defaultValues, error }: AuthorFormProps) => {
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
						placeholder="Masukkan nama Author"
						className="col-span-3"
						defaultValue={defaultValues?.fullname}
						required
					/>
        {/* @ts-ignore */}
        {error?.data?.fullname && <p className="text-xs text-destructive">{error.data.fullname[0]}</p>}
				</div>
				<Button className="cursor-pointer w-full items-right" type="submit">
					Submit
				</Button>
			</div>
		</form>
	);
};

export default AuthorForm;
