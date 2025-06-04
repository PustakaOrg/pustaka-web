import { useSearchParams } from "react-router";
import ContentHeader from "~/features/dashboard/components/ContentHeader";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
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
import { Pagination } from "~/shared/components/Pagination";
import { useState } from "react";
import ClassCombobox from "~/features/member/components/ClassCombobox";
import BatchCombobox from "~/features/member/components/BatchCombobox";
import { defalultMemberColumnVisibility } from "~/features/member/types/MemberColumnVisibility";

const DashboardMemberPage = () => {
	const [columnVisibility, setColumnVisibility] = useState(
		defalultMemberColumnVisibility,
	);
	const [searchParams] = useSearchParams();
	const [classListParams, setClassListParams] = useState({
		limit: 5,
		offset: 0,
	});

	const [batchLimitOffset, setBatchLimitOffset] = useState({
		limit: 5,
		offset: 0,
	});

	const { memberList, isPending } = useMemberList();
	const { batchList } = useBatchList(batchLimitOffset);
	const { classList } = useClassList(classListParams);

	const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
	const handleSelectAll = (checked: boolean) => {
		if (checked) {
			setSelectedMembers(memberList?.results.map((book) => book.id) ?? []);
		} else {
			setSelectedMembers([]);
		}
	};
	const handleSelectMember = (memberId: string, checked: boolean) => {
		if (checked) {
			setSelectedMembers((prev) => [...prev, memberId]);
		} else {
			setSelectedMembers((prev) => prev.filter((id) => id !== memberId));
		}
	};
	const handleClassOffsetChange = (newOffset: number) => {
		setClassListParams((prev) => {
			return { ...prev, offset: newOffset };
		});
	};

	const handleBatchOffsetChange = (newOffset: number) => {
		setBatchLimitOffset((prev) => {
			return { ...prev, offset: newOffset };
		});
	};

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
					{memberList && (
						<MemberTable
							memberList={memberList}
							columnVisibility={columnVisibility}
              handleSelectAll={handleSelectAll}
              handleSelectMember={handleSelectMember}
              selectedMembers={selectedMembers}
						/>
					)}
				</CardContent>
			</Card>
			<div className="grid gap-6 lg:grid-cols-2">
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
						{batchList && <BatchTable batchList={batchList} />}
					</CardContent>
					<CardFooter className="flex items-center justify-center">
						{batchList && (
							<Pagination
								totalCount={batchList.count}
								limit={batchLimitOffset.limit}
								offset={batchLimitOffset.offset}
								onOffsetChange={handleBatchOffsetChange}
							/>
						)}
					</CardFooter>
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
						{classList && <ClassTable classList={classList} />}
					</CardContent>

					<CardFooter className="flex items-center justify-center">
						{classList && (
							<Pagination
								totalCount={classList.count}
								limit={classListParams.limit}
								offset={classListParams.offset ?? 0}
								onOffsetChange={handleClassOffsetChange}
							/>
						)}
					</CardFooter>
				</Card>
			</div>
		</main>
	);
};

export default DashboardMemberPage;
