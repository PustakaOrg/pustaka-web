
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
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					<MoreHorizontal className="h-4 w-4" />
					<span className="sr-only">Actions</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem
					onClick={() => {
						onAction("edit", publisher);
					}}
				>
					<Edit className="mr-2 h-4 w-4" />
					Edit Publisher
				</DropdownMenuItem>
				<DropdownMenuSeparator />
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default PublisherRowAction;
