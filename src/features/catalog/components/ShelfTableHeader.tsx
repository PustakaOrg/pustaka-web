import React from "react";

import { TableHead, TableHeader, TableRow } from "~/shared/components/ui/table";
const ShelfTableHeader = () => {
	return (
		<TableHeader>
			<TableRow className="bg-secondary hover:bg-secondary">
				<TableHead>Shelf</TableHead>
				<TableHead className="text-right">Actions</TableHead>
			</TableRow>
		</TableHeader>
	);
};

export default ShelfTableHeader;
