
import { Publisher } from "~/types/entities/Publisher";

import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuSeparator,
	DropdownMenuItem,
} from "~/shared/components/ui/dropdown-menu";
import { Button } from "~/shared/components/ui/button";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";

interface PublisherRowActionProps {
	publisher: Publisher;
	onAction: (action: string, publisher: Publisher) => void;
}
const PublisherRowAction = ({  publisher, onAction }: PublisherRowActionProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className="cursor-pointer">
				<Button variant="ghost" size="icon">
					<MoreHorizontal className="h-4 w-4" />
					<span className="sr-only">Aksi</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem
					onClick={() => {
						onAction("edit", publisher);
					}}
					className="cursor-pointer"
				>
					<Edit className="mr-2 h-4 w-4" />
					Edit Penerbit
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() => onAction("delete", publisher)}
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

export default PublisherRowAction;
