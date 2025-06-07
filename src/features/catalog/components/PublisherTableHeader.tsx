import React from "react";

import { TableHead, TableHeader, TableRow } from "~/shared/components/ui/table";
const PublisherTableHeader = () => {
	return (
		<TableHeader>
			<TableRow className="bg-secondary hover:bg-secondary">
				<TableHead>Publisher</TableHead>
				<TableHead className="text-right">Actions</TableHead>
			</TableRow>
		</TableHeader>
	);
};

export default PublisherTableHeader;
