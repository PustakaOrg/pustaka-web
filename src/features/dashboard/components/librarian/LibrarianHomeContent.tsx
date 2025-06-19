import {
	Book,
	Bookmark,
	BookOpen,
	Clock,
	DollarSign,
	FileText,
	Search,
	User,
	Users,
} from "lucide-react";
import useDashboardHomeLibrarianData from "~/features/dashboard/hooks/useHomeData";
import Stat from "./Stat";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/shared/components/ui/card";
import { Button } from "~/shared/components/ui/button";
import ContentHeader from "../ContentHeader";
import AddLoanDialog from "~/features/loan/components/AddLoanDialog";
import useProfile from "~/features/auth/hooks/useProfile";
import { isLibrarianObject } from "~/features/auth/utils/util";
import SearchLoanDialog from "./SearchLoanDialog";
import SearchReservationDialog from "./SearchReservationDialog";
import SearchFineDialog from "./SearchFineDialog";
import useActivityLogs from "../../hooks/useActivityLogs";

const stats = [
	{ title: "Total Buku", icon: Book },
	{ title: "Total Member", icon: Users },
	{ title: "Peminjaman Terlambat", icon: BookOpen },
	{ title: "Denda", icon: DollarSign },
];

const LibrarianHomeContent = () => {
	const { data, isPending } = useDashboardHomeLibrarianData();
	const { activityLogs } = useActivityLogs();
	const { profile } = useProfile();
	return (
		<>
			<ContentHeader
				title="Dashboard"
				subtitle="Selamat datang di sistem pengelolaan perpustakaan."
			/>

			{/* Stats */}
			<section className="grid gap-4 grid-cols-2 lg:grid-cols-4">
				{isPending &&
					stats.map((_, idx) => (
						<Stat key={`skeleton-${idx}`} value="" title="" />
					))}
				{data &&
					Object.keys(data).map((key, index) => {
						return (
							<Stat
								key={index}
								icon={stats[index].icon}
								//@ts-ignore
								value={data[key]}
								title={stats[index].title}
							/>
						);
					})}
			</section>

			<section>
				<Card className="lg:col-span-4">
					<CardHeader>
						<CardTitle>Aktifitas Anggorta</CardTitle>
						<CardDescription>Aktitifitas Anggota pada sistem</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4 max-h-[200px] overflow-y-scroll">
							{activityLogs &&
								activityLogs.results.map((activity) => (
									<div
										key={activity.created_at}
										className="flex border rounded-lg p-2 items-center gap-2"
									>
										<div
											className={`rounded-full p-2 ${
												activity.action === "borrowed"
													? "bg-blue-100 text-blue-600"
													: activity.action === "returned"
														? "bg-green-100 text-green-600"
														: activity.action === "reserved"
															? "bg-purple-100 text-purple-600"
															: activity.action === "payment_done"
																? "bg-yellow-100 text-yellow-600"
																: "bg-gray-100 text-gray-600"
											}`}
										>
											{activity.action === "borrowed" ? (
												<BookOpen className="h-4 w-4" />
											) : activity.action === "returned" ? (
												<Book className="h-4 w-4" />
											) : activity.action === "reserved" ? (
												<Bookmark className="h-4 w-4" />
											) : activity.action === "payment_done" ? (
												<DollarSign className="h-4 w-4" />
											) : (
												<User className="h-4 w-4" />
											)}
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-sm font-medium">{activity.message}</p>
										</div>
										<div className="text-xs text-muted-foreground">
											{new Date(activity.created_at).toLocaleString()}
										</div>
									</div>
								))}
						</div>
					</CardContent>
				</Card>
			</section>

			{/* Quick Actions */}
			<section>
				<Card>
					<CardHeader>
						<CardTitle>Akses Cepat</CardTitle>
						<CardDescription>Operasi paling sering</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							{profile && isLibrarianObject(profile) && (
								<div>
									<AddLoanDialog
										trigger={
											<Button className="flex flex-col h-full w-full py-4 gap-2">
												<BookOpen className="h-5 w-5" />
												<span>Pinjam buku</span>
											</Button>
										}
									/>
								</div>
							)}
							<div>
								<SearchLoanDialog
									trigger={
										<Button className="flex flex-col h-full w-full py-4 gap-2">
											<Search className="h-5 w-5" />
											<span>Cari Peminjaman</span>
										</Button>
									}
								/>
							</div>
							<div>
								<SearchReservationDialog
									trigger={
										<Button className="flex flex-col h-full w-full py-4 gap-2">
											<Search className="h-5 w-5" />
											<span>Cari Reservasi</span>
										</Button>
									}
								/>
							</div>
							<div>
								<SearchFineDialog
									trigger={
										<Button className="flex flex-col h-full w-full py-4 gap-2">
											<Search className="h-5 w-5" />
											<span>Search Denda</span>
										</Button>
									}
								/>
							</div>
						</div>
					</CardContent>
				</Card>
			</section>
		</>
	);
};

export default LibrarianHomeContent;
