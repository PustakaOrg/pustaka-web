
import { Button } from "~/shared/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "~/shared/components/ui/dialog";
import { FormEvent, use, useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import useAddPublisher from "../hooks/useAddPublisher";
import { PostPublisherPayload } from "../api/postPublisher";
import PublisherForm from "./PublisherForm";

const AddPublisherDialog = () => {
	const { newPublisher, isPending, isError, error, addPublisher } = useAddPublisher();
	const [open, setOpen] = useState(false);
	const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		const name = String(form.get("name"));
		const city = String(form.get("city"));
		const payload: PostPublisherPayload = {
			 name,
       city
		};
		addPublisher(payload);
	}, [addPublisher]);

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
					Penerbit
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:min-w-[90vw] lg:min-w-[70vw] max-h-[98vh] overflow-y-auto">
				<DialogTitle>Tambah Penerbit</DialogTitle>
				<PublisherForm handleSubmit={handleSubmit} error={error} />
			</DialogContent>
		</Dialog>
	);
};

export default AddPublisherDialog;
