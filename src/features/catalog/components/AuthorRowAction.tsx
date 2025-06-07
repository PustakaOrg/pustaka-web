
import { Author } from "~/types/entities/Author";

import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuSeparator,
	DropdownMenuItem,
} from "~/shared/components/ui/dropdown-menu";
import { Button } from "~/shared/components/ui/button";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";

interface AuthorRowActionProps {
	author: Author;
	onAction: (action: string, batch: Author) => void;
}
const AuthorRowAction = ({  author, onAction }: AuthorRowActionProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					<MoreHorizontal className="h-4 w-4" />
					<span className="sr-only">Actions</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem
					onClick={() => {
						onAction("edit", author);
					}}
				>
					<Edit className="mr-2 h-4 w-4" />
					Edit Author
				</DropdownMenuItem>
				<DropdownMenuSeparator />
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default AuthorRowAction;
