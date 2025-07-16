import React, { FormEvent } from "react";
import useAddAbout from "../hooks/useAddAbout";
import { Dialog, DialogContent, DialogTitle, DialogTrigger, } from "~/shared/components/ui/dialog";
import { Button } from "~/shared/components/ui/button";
import { Plus } from "lucide-react";
import { Label } from "~/shared/components/ui/label";
import { Input } from "~/shared/components/ui/input";

const AddAboutFormDialog = () => {
	const { addAbout, error } = useAddAbout();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		const nama = form.get("nama") as string;
		const nim = form.get("nim") as string;
		addAbout({
			nama,
			nim,
		});
	};

	return (
		<Dialog>
			<DialogTrigger asChild className="cursor-pointer">
				<Button>
					<Plus />
					About
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:min-w-[90vw] lg:min-w-[70vw] max-h-[98vh] overflow-y-auto">
				<DialogTitle>Tambah About</DialogTitle>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="grid gap-4 py-4">
						<div className="space-y-2">
							<Label htmlFor="name" className="text-right"> Nama </Label>
							<Input id="nama" name="nama" type="text" placeholder="Masukkan nama" className="col-span-3" required />
						</div>
						<div className="space-y-2">
							<Label htmlFor="name" className="text-right"> Nim </Label> 
              <Input id="nim" name="nim" type="text" placeholder="Masukkan NIM" className="col-span-3" required />
						</div>
						<Button className="cursor-pointer w-full items-right" type="submit">
							Submit
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default AddAboutFormDialog;
