import { Button } from "~/shared/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "~/shared/components/ui/dialog";
import { FormEvent, useCallback, useEffect } from "react";
import { Import, Plus } from "lucide-react";
import ImportMemberForm from "./ImportMemberForm";
import useImportMember from "../hooks/useImportMember";

const ImportMemberDialog = () => {
	const { isPending, isError, error, importMember } = useImportMember();
	const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		importMember(form);
	}, []);
	return (
		<Dialog>
			<DialogTrigger asChild className="cursor-pointer">
				<Button>
					<Import />
					Import Member
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:min-w-[90vw] lg:min-w-[70vw] max-h-[98vh] overflow-y-auto">
				<DialogTitle>Import Member</DialogTitle>
				<ImportMemberForm handleSubmit={handleSubmit} error={error} />
			</DialogContent>
		</Dialog>
	);
};

export default ImportMemberDialog;
