import { Button } from "~/shared/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "~/shared/components/ui/dialog";
import { FormEvent, useCallback, } from "react";
import { Import } from "lucide-react";
import ImportBookForm from "./ImportBookForm";
import useImportBook from "../hooks/useImportBook";

const ImportBookDialog = () => {
	const { isPending, isError, error, importBook } = useImportBook();
	const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		importBook(form);
	}, []);
	return (
		<Dialog>
			<DialogTrigger asChild className="cursor-pointer">
				<Button>
					<Import />
					Import Buku
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:min-w-[90vw] lg:min-w-[70vw] max-h-[98vh] overflow-y-auto">
				<DialogTitle>Import Book</DialogTitle>
				<ImportBookForm handleSubmit={handleSubmit} error={error} />
			</DialogContent>
		</Dialog>
	);
};

export default ImportBookDialog;
