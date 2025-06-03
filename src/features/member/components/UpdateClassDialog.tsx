import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogTitle,
} from "~/shared/components/ui/dialog";
import { FormEvent, useCallback } from "react";
import { Class } from "~/types/entities/Class";
import useUpdateClass from "../hooks/useUpdateClass";
import { PatchClassPayload } from "../api/patchClass";
import ClassForm from "./ClassForm";


interface UpdateClassDialogProps {
	_class: Class;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

const UpdateClassDialog = ({
	_class,
	isOpen,
	onOpenChange,
}: UpdateClassDialogProps) => {
	const { updateClass, isPending , isError, error } = useUpdateClass();
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		const name = String(form.get("name"));
		const payload: PatchClassPayload = {
			name,
		};
		updateClass({ id: _class.id, payload });
	}

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="sm:min-w-[90vw] lg:min-w-[70vw] max-h-[98vh] overflow-y-auto">
				<DialogTitle>Edit Class</DialogTitle>
        <ClassForm handleSubmit={handleSubmit} error={error} defaultValues={_class} />
			</DialogContent>
			<DialogFooter></DialogFooter>
		</Dialog>
	);
};

export default UpdateClassDialog;
