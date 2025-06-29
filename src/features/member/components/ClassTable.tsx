import {
	Table,
	TableBody,
	TableCell,
	TableRow,
} from "~/shared/components/ui/table";
import { Users } from "lucide-react";
import ClassTableHeader from "./ClassTableHeader";
import ClassTableRow from "./ClassTableRow";
import { Class } from "~/types/entities/Class";
import useDialogWithData from "~/shared/hooks/useDialogWithData";
import { PaginatedResponse } from "~/types/responses";
import UpdateClassDialog from "./UpdateClassDialog";
import useDeleteClass from "../hooks/useDeleteClass";
import DeleteEntityAlertDialog from "~/shared/components/DeleteEntityDialog";

interface ClassTableProps {
  classList: PaginatedResponse<Class>
}

const ClassTable = ({classList}: ClassTableProps) => {
  const {deleteClass} = useDeleteClass()
	const {
		data: _class,
		openDialog,
		isOpen,
		closeDialog,
	} = useDialogWithData<Class>();
	const {
		data: deleteClassData,
		openDialog: openDeleteDialog,
		isOpen: isDeleteOpen,
		closeDialog: closeDeleteDialog,
	} = useDialogWithData<Class>();
	const onAction = (action: string, _class: Class) => {
		if (action === "edit") {
			openDialog(_class);
		}
		if (action === "delete") {
			openDeleteDialog(_class);
		}
	};
	return (
		<div>
			<Table>
				<ClassTableHeader />
				<TableBody>
					{classList && classList.results.length > 0 ? (
						classList.results.map((_class) => (
							<ClassTableRow key={_class.id} _class={_class} onAction={onAction} />
						))
					) : (
						<TableRow>
							<TableCell colSpan={6} className="text-center py-8">
								<div className="flex flex-col items-center gap-2">
									<Users className="h-8 w-8 text-muted-foreground" />
									<p className="text-muted-foreground">Tidak ditemukan</p>
									<p className="text-sm text-muted-foreground">
                      Atur ulang pencarian atau filter.
									</p>
								</div>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
      {_class && <UpdateClassDialog _class={_class} onOpenChange={closeDialog} isOpen={isOpen} />}
			{deleteClassData && (
				<DeleteEntityAlertDialog
					entity={deleteClassData}
					entityName="class"
					entityLabel={deleteClassData.name}
					isOpen={isDeleteOpen}
					onOpenChange={closeDeleteDialog}
					onConfirm={() => deleteClass(deleteClassData.id)}
				/>
			)}
		</div>
	);
};

export default ClassTable;
