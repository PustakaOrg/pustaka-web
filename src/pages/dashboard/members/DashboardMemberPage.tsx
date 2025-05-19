import { useSearchParams } from "react-router";
import ContentHeader from "~/features/dashboard/components/ContentHeader";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/shared/components/ui/card";

import useMemberList from "~/features/member/hooks/useMemberList";
import MemberTable from "~/features/member/components/MemberTable";
import { Button } from "~/shared/components/ui/button";

const DashboardMemberPage = () => {
	const [searchParams] = useSearchParams();

	const { memberList, isPending } = useMemberList();

	return (
		<main className="flex flex-1 flex-col gap-6 p-6 overflow-scroll ">
			<ContentHeader
				title="Members"
				subtitle="Manage library members."
			/>

			<Card>
				<CardHeader className="">
					<CardTitle className="flex flex-row items-center justify-between">Members
					<Button>Add Member</Button>
					</CardTitle>
					
					<CardDescription>
						{memberList?.results.length} members found
					</CardDescription>
				</CardHeader>
				<CardContent className="">
					{memberList && <MemberTable memberList={memberList} />}
				</CardContent>
			</Card>
		</main>
	);
};

export default DashboardMemberPage;
