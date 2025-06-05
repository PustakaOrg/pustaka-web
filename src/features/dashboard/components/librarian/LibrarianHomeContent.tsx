import {
	Book,
	BookOpen,
	Clock,
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

const stats = [
	{ title: "Total Books", icon: Book },
	{ title: "Active Loans", icon: BookOpen },
	{ title: "Members", icon: Users },
	{ title: "Overdue", icon: Clock },
];

const LibrarianHomeContent = () => {
	const { data, isPending } = useDashboardHomeLibrarianData();
	const { profile } = useProfile();
	return (
		<>
			<ContentHeader
				title="Dashboard"
				subtitle="Welcome back to your library management system."
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

			{/* Quick Actions */}
			<section>
				<Card>
					<CardHeader>
						<CardTitle>Quick Actions</CardTitle>
						<CardDescription>Common library operations</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							{profile && isLibrarianObject(profile) && (
								<div>
									<AddLoanDialog
										trigger={
											<Button className="flex flex-col h-full w-full py-4 gap-2">
												<BookOpen className="h-5 w-5" />
												<span>Loan Book</span>
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
											<span>Search Loan</span>
										</Button>
									}
								/>
							</div>
						<div>
								<SearchReservationDialog
									trigger={
										<Button className="flex flex-col h-full w-full py-4 gap-2">
											<Search className="h-5 w-5" />
											<span>Search Reservation</span>
										</Button>
									}
								/>
							</div>
						<div>
								<SearchFineDialog
									trigger={
										<Button className="flex flex-col h-full w-full py-4 gap-2">
											<Search className="h-5 w-5" />
											<span>Search Fine</span>
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
