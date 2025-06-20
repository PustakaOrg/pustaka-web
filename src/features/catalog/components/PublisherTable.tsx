import {
	Table,
	TableBody,
	TableCell,
	TableRow,
} from "~/shared/components/ui/table";
import { Users } from "lucide-react";
import PublisherTableHeader from "./PublisherTableHeader";
import PublisherTableRow from "./PublisherTableRow";
import { Publisher } from "~/types/entities/Publisher";
import useDialogWithData from "~/shared/hooks/useDialogWithData";
import { PaginatedResponse } from "~/types/responses";
import UpdatePublisherDialog from "./UpdatePublisherDialog";
import DeleteEntityAlertDialog from "~/shared/components/DeleteEntityDialog";
import useDeletePublisher from "../hooks/useDeletePublisher";

interface PublisherTableProps {
	publisherList: PaginatedResponse<Publisher>;
}

const PublisherTable = ({ publisherList }: PublisherTableProps) => {
	const { deletePublisher } = useDeletePublisher();
	const {
		data: publisher,
		openDialog,
		isOpen,
		closeDialog,
	} = useDialogWithData<Publisher>();
	const {
		data: deletePublisherData,
		openDialog: openDeleteDialog,
		isOpen: isDeleteOpen,
		closeDialog: closeDeleteDialog,
	} = useDialogWithData<Publisher>();

	const onAction = (action: string, publisher: Publisher) => {
		if (action === "edit") {
			openDialog(publisher);
		}
		if (action === "delete") {
			openDeleteDialog(publisher);
		}
	};
	return (
		<div>
			<Table>
				<PublisherTableHeader />
				<TableBody>
					{publisherList && publisherList.results.length > 0 ? (
						publisherList.results.map((publisher) => (
							<PublisherTableRow
								key={publisher.id}
								publisher={publisher}
								onAction={onAction}
							/>
						))
					) : (
						<TableRow>
							<TableCell colSpan={6} className="text-center py-8">
								<div className="flex flex-col items-center gap-2">
									<Users className="h-8 w-8 text-muted-foreground" />
									<p className="text-muted-foreground">No Publisher found</p>
									<p className="text-sm text-muted-foreground">
										Try adjusting your search or filters
									</p>
								</div>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			{publisher && (
				<UpdatePublisherDialog
					publisher={publisher}
					onOpenChange={closeDialog}
					isOpen={isOpen}
				/>
			)}
			{deletePublisherData && (
				<DeleteEntityAlertDialog
					entity={deletePublisherData}
					entityName="publisher"
					entityLabel={deletePublisherData.name}
					isOpen={isDeleteOpen}
					onOpenChange={closeDeleteDialog}
					onConfirm={() => deletePublisher(deletePublisherData.id)}
				/>
			)}
		</div>
	);
};

export default PublisherTable;
