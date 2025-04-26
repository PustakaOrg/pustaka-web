import { Book, BookOpen, Clock, FileText, User, Users } from "lucide-react";
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

const stats = [
	{ title: "Total Books", icon: Book },
	{ title: "Active Loans", icon: BookOpen },
	{ title: "Members", icon: Users },
	{ title: "Overdue", icon: Clock },
];

const LibrarianHomeContent = () => {
	const { data, isPending } = useDashboardHomeLibrarianData();
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
							<Button className="flex flex-col h-auto py-4 gap-2">
								<BookOpen className="h-5 w-5" />
								<span>Loan Book</span>
							</Button>
							<Button className="flex flex-col h-auto py-4 gap-2">
								<Book className="h-5 w-5" />
								<span>Return Book</span>
							</Button>
							<Button className="flex flex-col h-auto py-4 gap-2">
								<User className="h-5 w-5" />
								<span>Add Member</span>
							</Button>
							<Button className="flex flex-col h-auto py-4 gap-2">
								<FileText className="h-5 w-5" />
								<span>Generate Report</span>
							</Button>
						</div>
					</CardContent>
				</Card>
			</section>
		</>
	);
};

export default LibrarianHomeContent;
