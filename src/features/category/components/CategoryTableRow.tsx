import { TableCell, TableRow } from "~/shared/components/ui/table";
import { Checkbox } from "~/shared/components/ui/checkbox";
import CategoryRowAction from "./CategoryRowAction";
import CategoryListItem from "./CategoryListItem";
import { Category } from "~/types/entities/Category";
import { CategoryColumnVisibility } from "../types/CategoryColumnVisibility";

interface CategoryTableRowProps {
    category: Category;
    columnVisibility: CategoryColumnVisibility;
    onAction: (action: string, category: Category) => void;
    isSelected: boolean;
    onSelect: (categoryId: string, checked: boolean) => void;
}

const CategoryTableRow = ({
    category,
    columnVisibility,
    onAction,    
    onSelect,
    isSelected,
}: CategoryTableRowProps) => {
  return (
    <TableRow>
			<TableCell>
				<Checkbox
					checked={isSelected}
					onCheckedChange={(checked) =>
						onSelect(category.id, checked as boolean)
					}
					aria-label={`Select ${category.id}`}
				/>
			</TableCell>
			{columnVisibility.category && (
				<TableCell className="w-[400px]">
					<CategoryListItem  category={category} />
				</TableCell>
			)}
			<TableCell className="text-right">
				<CategoryRowAction category={category} onAction={onAction} />
			</TableCell>
		</TableRow>
  )
}

export default CategoryTableRow