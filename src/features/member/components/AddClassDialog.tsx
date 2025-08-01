import { Button } from "~/shared/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "~/shared/components/ui/dialog";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import useAddClass from "../hooks/useAddClass";
import { PostClassPayload } from "../api/postClass";
import ClassForm from "./ClassForm";

const AddClassDialog = () => {
	const { newClass, isPending, isError, error, addClass } = useAddClass();
	const [open, setOpen] = useState(false);
	const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		const name = String(form.get("name"));
		const payload: PostClassPayload = {
			name,
		};
		addClass(payload);
	}, [addClass]);

	useEffect(() => {
		if (!isPending && !isError) {
			setOpen(false);
		}
	}, [isPending, isError]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild className="cursor-pointer">
				<Button>
					<Plus />
					Kelas
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:min-w-[90vw] lg:min-w-[70vw] max-h-[98vh] overflow-y-auto">
				<DialogTitle>Tambah Kelas</DialogTitle>
				<ClassForm handleSubmit={handleSubmit} error={error} />
			</DialogContent>
		</Dialog>
	);
};

export default AddClassDialog;
