import { Book, BookOpen, Clock, Users } from "lucide-react";
import useDashboardHomeLibrarianData from "~/features/dashboard/hooks/useHomeData";
import Stat from "./Stat";

const stats = [
	{ title: "Total Books", icon: Book },
	{ title: "Active Loans", icon: BookOpen },
	{ title: "Members", icon: Users },
	{ title: "Overdue", icon: Clock },
];

const LibrarianHomeContent = () => {
	const { data, isPending, isError, error } = useDashboardHomeLibrarianData();
	return (
		<div className="">
			<div className="flex flex-col gap-6">
				<div>
					<h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
					<p className="text-muted-foreground">
						Welcome back to your library management system.
					</p>
				</div>

				{/* Stats */}
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
				</div>
			</div>
		</div>
	);
};

export default LibrarianHomeContent;
