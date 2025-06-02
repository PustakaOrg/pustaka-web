import { Checkbox } from "~/shared/components/ui/checkbox";
import { TableHead, TableHeader, TableRow } from "~/shared/components/ui/table";

interface CategoryTableHeaderProps {
  isAllSelected: boolean;
  isIndeterminate: boolean;
  onSelectAll: (checked: boolean) => void;
}
const CategoryTableHeader = ({
  isAllSelected,
  isIndeterminate,
  onSelectAll,
}: CategoryTableHeaderProps) => {
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
        <TableHead>Category</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default CategoryTableHeader;
