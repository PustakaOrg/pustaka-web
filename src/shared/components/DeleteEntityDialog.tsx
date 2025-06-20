import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogFooter,
} from "~/shared/components/ui/alert-dialog";

interface DeleteEntityAlertDialogProps<T> {
	entity: T;
	entityName: string;
	entityLabel: string;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	onConfirm: (data: T) => void;
}

export default function DeleteEntityAlertDialog<T>({
	entity,
	entityName,
	entityLabel,
	isOpen,
	onOpenChange,
	onConfirm,
}: DeleteEntityAlertDialogProps<T>) {
	const handleConfirm = () => {
		onConfirm(entity);
		onOpenChange(false);
	};

	return (
		<AlertDialog open={isOpen} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. It will permanently delete{" "}
						<b>{entityLabel}</b> {entityName}.
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						className="bg-destructive hover:bg-destructive/90"
						onClick={handleConfirm}
					>
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
