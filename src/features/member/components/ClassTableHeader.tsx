import React from "react";

import { TableHead, TableHeader, TableRow } from "~/shared/components/ui/table";
const BatchTableHeader = () => {
	return (
		<TableHeader>
			<TableRow className="bg-secondary hover:bg-secondary">
				<TableHead>Kelas</TableHead>
				<TableHead className="text-right">Aksi</TableHead>
			</TableRow>
		</TableHeader>
	);
};

export default BatchTableHeader;
