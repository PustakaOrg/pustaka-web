import { FormEvent } from "react";
import { Button } from "~/shared/components/ui/button";
import { Input } from "~/shared/components/ui/input";
import { Label } from "~/shared/components/ui/label";
import { Publisher } from "~/types/entities/Publisher";

interface PublisherFormProps {
	handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
	defaultValues?: Publisher;
	error?: unknown;
}

const PublisherForm = ({
	handleSubmit,
	defaultValues,
	error,
}: PublisherFormProps) => {
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
						placeholder="Masukkan nama Publisher"
						className="col-span-3"
						defaultValue={defaultValues?.name}
						required
					/>
          {/* @ts-ignore */}
					{error?.data?.name && (
						<p className="text-xs text-destructive">{error.data.name[0]}</p>
					)}
				</div>
				<div className="space-y-2">
					<Label htmlFor="city" className="text-right">
						Kota
					</Label>
					<Input
						id="city"
						name="city"
						type="text"
						placeholder="Masukkan nama kota"
						className="col-span-3"
						defaultValue={defaultValues?.city}
						required
					/>
					{/* @ts-ignore */}
					{error?.data?.city && (
						<p className="text-xs text-destructive">{error.data.city[0]}</p>
					)}
				</div>

				<Button className="cursor-pointer w-full items-right" type="submit">
					Submit
				</Button>
			</div>
		</form>
	);
};

export default PublisherForm;
