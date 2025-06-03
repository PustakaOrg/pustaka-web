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
import AddMemberDialog from "~/features/member/components/AddMemberDialog";
import AddBatchDialog from "~/features/member/components/AddBatchDialog";
import useBatchList from "~/features/member/hooks/useBatchList";
import BatchTable from "~/features/member/components/BatchTable";
import useClassList from "~/features/member/hooks/useClassList";
import AddClassDialog from "~/features/member/components/AddClassDialog";
import ClassTable from "~/features/member/components/ClassTable";

const DashboardMemberPage = () => {
	const [searchParams] = useSearchParams();

	const { memberList, isPending } = useMemberList();
  const {batchList} = useBatchList()
  const { classList } = useClassList()

	return (
		<main className="flex flex-1 flex-col gap-6 p-6 overflow-scroll ">
			<ContentHeader title="Members" subtitle="Manage library members." />
			<Card>
				<CardHeader className="">
					<CardTitle className="flex flex-row items-center justify-between">
						Members
						<AddMemberDialog />
					</CardTitle>
					<CardDescription>
						{memberList?.results.length} members found
					</CardDescription>
				</CardHeader>
				<CardContent className="">
					{memberList && <MemberTable memberList={memberList} />}
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex justify-between">
					<div>
						<CardTitle>Batches</CardTitle>
						<CardDescription>
							{batchList?.results.length ?? 0} batches found
						</CardDescription>
					</div>
					<div>
						<AddBatchDialog />
					</div>
				</CardHeader>
				<CardContent className="">
					{batchList && <BatchTable batchList={batchList}  />}
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex justify-between">
					<div>
						<CardTitle>Classes</CardTitle>
						<CardDescription>
							{classList?.results.length ?? 0} classes found
						</CardDescription>
					</div>
					<div>
						<AddClassDialog />
					</div>
				</CardHeader>
				<CardContent className="">
					{classList && <ClassTable classList={classList}  />}
				</CardContent>
			</Card>
		</main>
	);
};

export default DashboardMemberPage;
