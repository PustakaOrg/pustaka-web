import {
	ArrowUpCircleIcon,
	BookOpen,
	Calendar,
	FileText,
	LayoutDashboardIcon,
	Library,
	SettingsIcon,
	Users,
} from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "~/shared/components/ui/sidebar";
import NavUser from "./NavUser";
import NavMain from "./NavMain";
import NavSecondary from "./NavSecondary";

const nav = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	navMain: [
		{
			title: "Dashboard",
			url: "/dashboard",
			icon: LayoutDashboardIcon,
		},
		{
			title: "Books",
			url: "/dashboard/books",
			icon: Library,
		},
		{
			title: "Members",
			url: "/dashboard/members",
			icon: Users,
		},
		{
			title: "Loans",
			url: "/dashboard/loans",
			icon: BookOpen,
		},
		{
			title: "Reservations",
			url: "/dashboard/reservations",
			icon: Calendar,
		},
		{
			title: "Reports",
			url: "/dashboard/reports",
			icon: FileText,
		},
	],
	navSecondary: [
		{
			title: "Settings",
			url: "/dashboard/settings",
			icon: SettingsIcon,
		},
	],
};

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className="data-[slot=sidebar-menu-button]:!p-1.5"
						>
							<a href="#">
								<ArrowUpCircleIcon className="h-5 w-5" />
								<span className="text-base font-semibold">Acme Inc.</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={nav.navMain} />
				{/* <NavDocuments items={data.documents} /> */}
				<NavSecondary items={nav.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={nav.user} />
			</SidebarFooter>
		</Sidebar>
	);
};

export default AppSidebar;
