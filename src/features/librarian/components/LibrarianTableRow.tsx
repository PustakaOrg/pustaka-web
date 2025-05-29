import React from "react";
import { Librarian } from "~/types/entities/Librarian";
import { LibrarianColumnVisibility } from "../type/LibrarianColumnVisibility";
import { TableCell, TableRow } from "~/shared/components/ui/table";
import { Checkbox } from "~/shared/components/ui/checkbox";
import LibrarianListItem from "./LibrarianListItem";
import LibrarianRowAction from "./LibrarianRowAction";

interface LibrarianTableRowProps {
	librarian: Librarian;

	onAction: (action: string, librarian: Librarian) => void;
	columnVisibility: LibrarianColumnVisibility;
	isSelected: boolean;
	onSelect: (librarianId: string, checked: boolean) => void;
}

const LibrarianTableRow = ({
	librarian,
	columnVisibility,
	onAction,
	onSelect,
	isSelected,
}: LibrarianTableRowProps) => {
	return (
		<TableRow>
			<TableCell>
				<Checkbox
					checked={isSelected}
					onCheckedChange={(checked) =>
						onSelect(librarian.id, checked as boolean)
					}
					aria-label={`Select ${librarian.id}`}
				/>
			</TableCell>
			{columnVisibility.librarian && (
				<TableCell className="w-[400px]">
					<LibrarianListItem librarian={librarian} />
				</TableCell>
			)}
			{columnVisibility.nip && (<TableCell>{librarian.nip}</TableCell>)}
			{columnVisibility.phone_number && (<TableCell>{librarian.phone_number}</TableCell>)}


			<TableCell className="text-right">
				<LibrarianRowAction librarian={librarian} onAction={onAction} />
			</TableCell>
		</TableRow>
	);
};

export default LibrarianTableRow;
