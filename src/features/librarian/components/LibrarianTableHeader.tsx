import React from "react";
import { LibrarianColumnVisibility } from "../type/LibrarianColumnVisibility";
import { TableHead, TableHeader, TableRow } from "~/shared/components/ui/table";
import { Checkbox } from "~/shared/components/ui/checkbox";

interface LibrarianTableHeaderProps {
  columnVisibility: LibrarianColumnVisibility;
  isAllSelected: boolean;
  isIndeterminate: boolean;
  onSelectAll: (checked: boolean) => void;
}

const LibrarianTableHeader = ({
  columnVisibility,
  isAllSelected,
  isIndeterminate,
  onSelectAll,
}: LibrarianTableHeaderProps) => {
  return (
    <TableHeader>
      <TableRow className="bg-secondary hover:bg-secondary">
        <TableHead className="w-12">
          <Checkbox
            checked={isAllSelected}
            onCheckedChange={onSelectAll}
            aria-label="Select all librarians"
            {...(isIndeterminate && { "data-state": "indeterminate" })}
          />
        </TableHead>
        {columnVisibility.librarian && <TableHead>Pustakawan</TableHead>}
        {columnVisibility.nip && <TableHead>NIP</TableHead>}
        {columnVisibility.phone_number && <TableHead>No HP</TableHead>}
        <TableHead className="text-right">Aksi</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default LibrarianTableHeader;
