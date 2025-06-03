import { TableHead, TableHeader, TableRow } from "~/shared/components/ui/table";
const BatchTableHeader = () => {
	return (
		<TableHeader>
			<TableRow className="bg-secondary hover:bg-secondary">
				<TableHead>Batch</TableHead>
				<TableHead className="text-right">Actions</TableHead>
			</TableRow>
		</TableHeader>
	);
};

export default BatchTableHeader;
