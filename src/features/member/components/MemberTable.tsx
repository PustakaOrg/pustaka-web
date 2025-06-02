import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableRow,
} from "~/shared/components/ui/table";
import MemberTableHeader from "./MemberTableHeader";
import { PaginatedResponse } from "~/types/responses";
import { Member } from "~/types/entities/Member";
import MemberTableRow from "./MemberTableRow";
import { Users } from "lucide-react";

const MemberTable = ({
	memberList,
}: { memberList: PaginatedResponse<Member> }) => {
	return (
		<Table>
			<MemberTableHeader />
			<TableBody>
				{memberList && memberList.results.length > 0 ? (
					memberList.results.map((member) => (
						<MemberTableRow key={member.id} member={member} />
					))
				) : (
					<TableRow>
						<TableCell colSpan={6} className="text-center py-8">
							<div className="flex flex-col items-center gap-2">
								<Users className="h-8 w-8 text-muted-foreground" />
								<p className="text-muted-foreground">No members found</p>
								<p className="text-sm text-muted-foreground">
									Try adjusting your search or filters
								</p>
							</div>
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};

export default MemberTable;
