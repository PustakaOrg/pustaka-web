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

interface PublisherTableProps {
  publisherList: PaginatedResponse<Publisher>
}

const PublisherTable = ({publisherList}: PublisherTableProps) => {
	const {
		data: publisher,
		openDialog,
		isOpen,
		closeDialog,
	} = useDialogWithData<Publisher>();

	const onAction = (action: string, batch: Publisher) => {
		if (action === "edit") {
			openDialog(batch);
		}
	};
	return (
		<div>
			<Table>
				<PublisherTableHeader />
				<TableBody>
					{publisherList && publisherList.results.length > 0 ? (
						publisherList.results.map((publisher) => (
							<PublisherTableRow key={publisher.id} publisher={publisher} onAction={onAction} />
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
      {publisher && <UpdatePublisherDialog publisher={publisher} onOpenChange={closeDialog} isOpen={isOpen} />}
		</div>
	);
};

export default PublisherTable;
