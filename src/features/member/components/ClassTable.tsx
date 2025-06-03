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

interface ClassTableProps {
  classList: PaginatedResponse<Class>
}

const ClassTable = ({classList}: ClassTableProps) => {
	const {
		data: _class,
		openDialog,
		isOpen,
		closeDialog,
	} = useDialogWithData<Class>();

	const onAction = (action: string, batch: Class) => {
		if (action === "edit") {
			openDialog(batch);
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
									<p className="text-muted-foreground">No Class found</p>
									<p className="text-sm text-muted-foreground">
										Try adjusting your search or filters
									</p>
								</div>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
      {_class && <UpdateClassDialog _class={_class} onOpenChange={closeDialog} isOpen={isOpen} />}
		</div>
	);
};

export default ClassTable;
