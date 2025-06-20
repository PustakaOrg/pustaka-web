import { Category } from "~/types/entities/Category";

import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuSeparator,
	DropdownMenuItem,
} from "~/shared/components/ui/dropdown-menu";
import { Button } from "~/shared/components/ui/button";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";

interface CategoryRowActionProps {
	category: Category;
	onAction: (action: string, category: Category) => void;
}
const CategoryRowAction = ({ category, onAction }: CategoryRowActionProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className="cursor-pointer">
				<Button variant="ghost" size="icon">
					<MoreHorizontal className="h-4 w-4" />
					<span className="sr-only">Actions</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem
					onClick={() => {
						onAction("edit", category);
					}}
					className="cursor-pointer"
				>
					<Edit className="mr-2 h-4 w-4" />
					Edit Category
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() => onAction("delete", category)}
					className="cursor-pointer text-destructive"
					variant="destructive"
				>
					<Trash2 className="mr-2 h-4 w-4" />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default CategoryRowAction;
