import { TableCell, TableRow } from "~/shared/components/ui/table";
import { Category } from "~/types/entities/Category";
import CategoryRowAction from "./CategoryRowAction";

interface CategoryTableRowProps {
	category: Category;
	onAction: (action: string, category: Category) => void;
}

const CategoryTableRow = ({ category, onAction }: CategoryTableRowProps) => {
	return (
		<TableRow>
			<TableCell className="w-[400px]">
				<p className="font-medium">{category.name}</p>
			</TableCell>
			<TableCell className="text-right">
				<CategoryRowAction category={category} onAction={onAction} />
			</TableCell>
		</TableRow>
	);
};

export default CategoryTableRow;
