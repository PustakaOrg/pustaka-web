import { Fine } from "~/types/entities/Fine";

import { Button } from "~/shared/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/shared/components/ui/dropdown-menu";

import { CheckCircle, Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";

interface FineRowActionProps {
	fine: Fine;
	onAction: (action: string, fine: Fine) => void;
}

const FineRowAction = ({ fine, onAction }: FineRowActionProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">Open menu</span>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => onAction("view", fine)}>
					<Eye className="mr-2 h-4 w-4" />
					View Details
				</DropdownMenuItem>
				{fine.payment.status == "pending" && (
					<DropdownMenuItem onClick={() => onAction("mark-done", fine)}>
						<CheckCircle className="mr-2 h-4 w-4" />
						Mark as done
					</DropdownMenuItem>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default FineRowAction;
