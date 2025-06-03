import { TableCell, TableRow } from "~/shared/components/ui/table";
import { Batch } from "~/types/entities/Batch";
import BatchRowAction from "./BatchRowAction";

interface BatchTableRowProps {
	batch: Batch;
	onAction: (action: string, batch: Batch) => void;
}

const BatchTableRow = ({ batch, onAction }: BatchTableRowProps) => {
	return (
		<TableRow>
				<TableCell className="w-[400px]">
					<p className="font-medium">{batch.name}</p>
				</TableCell>
			<TableCell className="text-right">
				<BatchRowAction batch={batch} onAction={onAction}/>
			</TableCell>
		</TableRow>
	);
};

export default BatchTableRow;
