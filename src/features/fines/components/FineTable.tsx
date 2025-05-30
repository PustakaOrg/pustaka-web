import { PaginatedResponse } from "~/types/responses";
import { Table, TableBody } from "~/shared/components/ui/table";
import { FineColumnVisibility } from "../types/ColumnVisibility";
import { Fine } from "~/types/entities/Fine";
import FineTableRow from "./FineTableRow";
import FineTableHeader from "./FineTableHeader";
import FineNotFoundTableRow from "./FineNotFoundTableRow";

interface FineTableProps {
	fineList: PaginatedResponse<Fine>;

	columnVisibility: FineColumnVisibility;
	selectedFines: string[];
	handleSelectAll: (checked: boolean) => void;
	handleSelectFine: (fineId: string, checked: boolean) => void;
}

const FineTable = ({
	fineList,
	columnVisibility,
	selectedFines,
	handleSelectAll,
	handleSelectFine,
}: FineTableProps) => {
	const handelRowAction = (action: string, fine: Fine) => {
		if (action == "view-detail") {
		}
	};

	const isAllSelected =
		selectedFines.length === fineList.results.length &&
		fineList.results.length > 0;
	const isIndeterminate =
		selectedFines.length > 0 && selectedFines.length < fineList.results.length;

	return (
		<div>
			<Table>
				<FineTableHeader
					columnVisibility={columnVisibility}
					onSelectAll={handleSelectAll}
					isIndeterminate={isIndeterminate}
					isAllSelected={isAllSelected}
				/>
				<TableBody>
					{fineList &&
						fineList.results.length > 0 &&
						fineList.results.map((fine) => (
							<FineTableRow
								key={fine.id}
								fine={fine}
								onAction={handelRowAction}
								columnVisibility={columnVisibility}
								isSelected={selectedFines.includes(fine.id)}
								onSelect={handleSelectFine}
							/>
						))}
					{fineList && fineList.results.length == 0 && <FineNotFoundTableRow />}
				</TableBody>
			</Table>
		</div>
	);
};

export default FineTable;
