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
import { defalultMemberColumnVisibility } from "~/features/member/types/MemberColumnVisibility";
import MemberBulkActionBar from "~/features/member/components/MemberBulkActionBar";
import ShowPerPage from "~/shared/components/ShowPerPage";
import ClassCombobox from "~/features/member/components/ClassCombobox";
import BatchCombobox from "~/features/member/components/BatchCombobox";

const DashboardMemberPage = () => {
	const [columnVisibility, setColumnVisibility] = useState(
		defalultMemberColumnVisibility,
	);
	const [searchParams, setSearchParams] = useSearchParams();
	const [_class, setClass] = useState("");
	const [batch, setBatch] = useState("");
	const memberListParam = {
		limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 10,
		offset: searchParams.get("offset")
			? Number(searchParams.get("offset"))
			: undefined,
		_class: _class,
		batch: batch,
	};

	const [classListParams, setClassListParams] = useState({
		limit: 5,
		offset: 0,
	});

	const [batchLimitOffset, setBatchLimitOffset] = useState({
		limit: 5,
		offset: 0,
	});

	const { memberList, isPending } = useMemberList(memberListParam);
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

	const handleBulkAction = (action: string) => {};

	const handleOffsetChange = (newOffset: number) => {
		setSearchParams((prev) => {
			prev.set("offset", String(newOffset));
			return prev;
		});
	};

	return (
		<main className="flex flex-1 flex-col gap-6 p-6 overflow-scroll ">
			<ContentHeader title="Members" subtitle="Manage library members." />
			<Card>
				<CardHeader className="flex justify-between">
					<div>
						<CardTitle className="flex flex-row items-center justify-between">
							Members
						</CardTitle>

						<CardDescription>
							{memberList?.results.length} members found
						</CardDescription>
					</div>
					<div>
						<AddMemberDialog />
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="w-full flex justify-between">
						<div className="flex gap-2">
							<ShowPerPage />
						</div>
						<div className="flex  gap-2">
							<div className="w-[150px]">
								<ClassCombobox _class={_class} setClass={setClass} />
							</div>

							<div className="w-[150px]">
								<BatchCombobox batch={batch} setBatch={setBatch} />
							</div>
						</div>
					</div>

					<MemberBulkActionBar
						selectedCount={selectedMembers.length}
						onAction={handleBulkAction}
					/>
					{memberList && (
						<MemberTable
							memberList={memberList}
							columnVisibility={columnVisibility}
							handleSelectAll={handleSelectAll}
							handleSelectMember={handleSelectMember}
							selectedMembers={selectedMembers}
						/>
					)}
					{memberList && (
						<CardFooter className="flex items-center justify-center">
							<Pagination
								totalCount={memberList.count}
								limit={memberListParam.limit}
								offset={memberListParam.offset ?? 0}
								onOffsetChange={handleOffsetChange}
							/>
						</CardFooter>
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
