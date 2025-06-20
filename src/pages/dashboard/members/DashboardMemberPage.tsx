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
import useDialogWithData from "~/shared/hooks/useDialogWithData";
import { Member } from "~/types/entities/Member";
import MemberCardPrintDialog from "~/features/member/components/MemberCardPrintDialog";
import { MemberCSV, memberToCSV } from "~/features/member/types/MemberExport";
import ExportCSVDialog from "~/shared/components/ExportCSVDialog";
import ImportMemberDialog from "~/features/member/components/ImportMemberDialog";
import { useSearchPagination } from "~/shared/hooks/useSearchPagination";
import { Search } from "lucide-react";
import { Input } from "~/shared/components/ui/input";

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

	const _classes = useSearchPagination();
	const batches = useSearchPagination();

	const { memberList, isPending } = useMemberList(memberListParam);
	const { batchList } = useBatchList(batches.params);
	const { classList } = useClassList(_classes.params);
	const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
	const {
		data: bulkData,
		isOpen,
		openDialog,
		closeDialog,
	} = useDialogWithData<Member[]>();

	const {
		data: memberCSV,
		isOpen: csvOpen,
		openDialog: openCSVDialog,
		closeDialog: closeCSVDialog,
	} = useDialogWithData<MemberCSV>();

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

	const handleBulkAction = (action: string) => {
		const bulkMember = memberList?.results.filter((m) =>
			selectedMembers.includes(m.id),
		);
		if (action === "print") {
			if (bulkMember) openDialog(bulkMember);
		}
		if (action === "export") {
			if (bulkMember) {
				const memberCSV = memberToCSV(bulkMember);
				openCSVDialog(memberCSV);
			}
		}
	};

	const handleOffsetChange = (newOffset: number) => {
		setSearchParams((prev) => {
			prev.set("offset", String(newOffset));
			return prev;
		});
	};

	return (
		<main className="flex flex-1 flex-col gap-6 p-6 overflow-scroll ">
			{memberCSV && (
				<ExportCSVDialog
					data={memberCSV}
					isOpen={csvOpen}
					onOpenChange={closeCSVDialog}
					defaulFileName="Member"
				/>
			)}
			{bulkData && (
				<MemberCardPrintDialog
					isOpen={isOpen}
					onOpenChange={closeDialog}
					members={bulkData}
				/>
			)}

			<ContentHeader title="Member" subtitle="." />
			<Card>
				<CardHeader className="flex justify-between">
					<div>
						<CardTitle className="flex flex-row items-center justify-between">
							Member
						</CardTitle>

						<CardDescription>
							{memberList?.results.length} member ditemukan.
						</CardDescription>
					</div>
					<div className="grid grid-cols-2 gap-2">
						<ImportMemberDialog />
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
							<CardTitle>Angkatan</CardTitle>
							<CardDescription>
								{batchList?.results.length ?? 0} Angkatan ditemukan
							</CardDescription>
						</div>
						<div>
							<AddBatchDialog />
						</div>
					</CardHeader>
					<CardContent className="space-y-2">
						<div className="flex items-center  gap-2 justify-between">
							<div className="flex gap-2">
								<div className="relative ">
									<form
										onSubmit={(e) => {
											e.preventDefault();
											const q = new FormData(e.currentTarget).get(
												"q",
											) as string;
											batches.setQuery(q);
										}}
									>
										<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
										<Input
											type="text"
											placeholder="Cari Angkatan"
											className="w-full pl-9 pr-4"
											name="q"
										/>
										<button hidden type="submit"></button>
									</form>
								</div>
							</div>
						</div>

						{batchList && <BatchTable batchList={batchList} />}
					</CardContent>
					<CardFooter className="flex items-center justify-center">
						{batchList && (
							<Pagination
								totalCount={batchList.count}
								limit={batches.params.limit}
								offset={batches.params.offset}
								onOffsetChange={batches.setOffset}
							/>
						)}
					</CardFooter>
				</Card>

				<Card>
					<CardHeader className="flex justify-between">
						<div>
							<CardTitle>Kelas</CardTitle>
							<CardDescription>
								{classList?.results.length ?? 0} Kelas ditemukan.
							</CardDescription>
						</div>
						<div>
							<AddClassDialog />
						</div>
					</CardHeader>
					<CardContent className="space-y-2">
						<div className="flex items-center  gap-2 justify-between">
							<div className="flex gap-2">
								<div className="relative ">
									<form
										onSubmit={(e) => {
											e.preventDefault();
											const q = new FormData(e.currentTarget).get(
												"q",
											) as string;
											_classes.setQuery(q);
										}}
									>
										<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
										<Input
											type="text"
											placeholder="Cari Kelas"
											className="w-full pl-9 pr-4"
											name="q"
										/>
										<button hidden type="submit"></button>
									</form>
								</div>
							</div>
						</div>
						{classList && <ClassTable classList={classList} />}
					</CardContent>

					<CardFooter className="flex items-center justify-center">
						{classList && (
							<Pagination
								totalCount={classList.count}
								limit={_classes.params.limit}
								offset={_classes.params.offset ?? 0}
								onOffsetChange={_classes.setOffset}
							/>
						)}
					</CardFooter>
				</Card>
			</div>
		</main>
	);
};

export default DashboardMemberPage;
