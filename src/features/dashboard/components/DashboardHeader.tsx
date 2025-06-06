import { Separator } from "~/shared/components/ui/separator";
import { SidebarTrigger } from "~/shared/components/ui/sidebar";

const DashboardHeader = () => {
	return (
		<header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 sticky z-50 top-0 items-center gap-2 border-b transition-[width,height] bg-background ease-linear">
			<div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
				<SidebarTrigger className="-ml-1" />
				<Separator
					orientation="vertical"
					className="mx-2 data-[orientation=vertical]:h-4"
				/>
				<h1 className="text-base font-medium">Dashboard</h1>
			</div>
		</header>
	);
};

export default DashboardHeader;
