import { TableCell, TableRow } from "~/shared/components/ui/table";
import { Class } from "~/types/entities/Class";
import ClassRowAction from "./ClassRowAction";

interface ClassTableRowProps {
	_class: Class;
	onAction: (action: string, _class: Class) => void;
}

const ClassTableRow = ({ _class, onAction }: ClassTableRowProps) => {
	return (
		<TableRow>
				<TableCell className="w-[400px]">
					<p className="font-medium">{_class.name}</p>
				</TableCell>
			<TableCell className="text-right">
				<ClassRowAction _class={_class} onAction={onAction}/>
			</TableCell>
		</TableRow>
	);
};

export default ClassTableRow;
