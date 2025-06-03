import React from "react";
import { Batch } from "~/types/entities/Batch";

import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuSeparator,
	DropdownMenuItem,
} from "~/shared/components/ui/dropdown-menu";
import { Button } from "~/shared/components/ui/button";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";

interface BatchRowActionProps {
	batch: Batch;
	onAction: (action: string, batch: Batch) => void;
}
const BatchRowAction = ({ batch, onAction }: BatchRowActionProps) => {
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
						onAction("edit", batch);
					}}
				>
					<Edit className="mr-2 h-4 w-4" />
					Edit Batch
				</DropdownMenuItem>
				<DropdownMenuSeparator />
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default BatchRowAction;
