import { TableCell, TableRow } from "~/shared/components/ui/table";
import { Publisher } from "~/types/entities/Publisher";
import PublisherRowAction from "./PublisherRowAction";

interface PublisherTableRowProps {
	publisher: Publisher;
	onAction: (action: string, publisher: Publisher) => void;
}

const PublisherTableRow = ({ publisher, onAction }: PublisherTableRowProps) => {
	return (
		<TableRow>
			<TableCell className="w-[400px]">
				<div>
					<div className="font-medium">{publisher.name}</div>
					<div className="text-sm text-muted-foreground">{publisher.city}</div>
				</div>
			</TableCell>
			<TableCell className="text-right">
				<PublisherRowAction publisher={publisher} onAction={onAction} />
			</TableCell>
		</TableRow>
	);
};

export default PublisherTableRow;
