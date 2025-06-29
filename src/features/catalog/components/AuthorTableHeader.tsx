import React from "react";

import { TableHead, TableHeader, TableRow } from "~/shared/components/ui/table";
const AuthorTableHeader = () => {
	return (
		<TableHeader>
			<TableRow className="bg-secondary hover:bg-secondary">
				<TableHead>Author</TableHead>
				<TableHead className="text-right">Aksi</TableHead>
			</TableRow>
		</TableHeader>
	);
};

export default AuthorTableHeader;
