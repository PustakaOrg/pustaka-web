import React from "react";

import { TableHead, TableHeader, TableRow } from "~/shared/components/ui/table";
const CategoryTableHeader = () => {
	return (
		<TableHeader>
			<TableRow className="bg-secondary hover:bg-secondary">
				<TableHead>Category</TableHead>
				<TableHead className="text-right">Actions</TableHead>
			</TableRow>
		</TableHeader>
	);
};

export default CategoryTableHeader;
