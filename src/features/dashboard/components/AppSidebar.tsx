import {
	ArrowUpCircleIcon,
	BookOpen,
	Calendar,
	FileText,
	GalleryVerticalEnd,
	LayoutDashboardIcon,
	Library,
	SettingsIcon,
	Users,
	Users2,
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
import useProfile from "~/features/auth/hooks/useProfile";
import {
	isAdminObject,
	isLibrarianObject,
	isMemberObject,
} from "~/features/auth/utils/util";
import { Link } from "react-router";

const nav = {
	navMember: [
		{
			title: "Dashboard",
			url: "/dashboard",
			icon: LayoutDashboardIcon,
		},
		{
			title: "My Loans",
			url: "/dashboard/loans",
			icon: BookOpen,
		},
		{
			title: "My Fines",
			url: "/dashboard/loans",
			icon: FileText,
		},
	],
	navLibrarian: [
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
			title: "Categories",
			url: "/dashboard/categories",
			icon: GalleryVerticalEnd,
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
			title: "Fines",
			url: "/dashboard/fines",
			icon: FileText,
		},
	],
	navAdmin: {
		main: [
			{
				title: "Librarians",
				url: "/dashboard/librarians",
				icon: Users2,
			},
		],
		secondary: [
			{
				title: "Settings",
				url: "/dashboard/settings",
				icon: SettingsIcon,
			},
		],
	},
};

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
	const { profile } = useProfile();
	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className="cursor-pointer data-[slot=sidebar-menu-button]:!p-1.5"
						>
							<Link to="/" className="flex items-center gap-2 font-semibold">
								<div className="flex h-6 w-6 items-center justify-center rounded-sm bg-primary text-primary-foreground">
									<GalleryVerticalEnd className="size-4" />
								</div>
								Pustaka.
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				{isMemberObject(profile) && <NavMain items={nav.navMember} />}
				{isLibrarianObject(profile) && <NavMain items={nav.navLibrarian} />}
				{isAdminObject(profile) && (
					<>
						<NavMain items={[...nav.navLibrarian, ...nav.navAdmin.main]} />
						<NavSecondary items={nav.navAdmin.secondary} className="mt-auto" />
					</>
				)}
			</SidebarContent>
			<SidebarFooter>
				{isAdminObject(profile) && (
					<NavUser
						user={{ name: profile.fullname, email: profile.email, avatar: "" }}
					/>
				)}
				{isMemberObject(profile) && (
					<NavUser
						user={{
							name: profile.account.fullname,
							email: profile.account.email,
							avatar: profile.profile_picture,
						}}
					/>
				)}
				{isLibrarianObject(profile) && (
					<NavUser
						user={{
							name: profile.account.fullname,
							email: profile.account.email,
							avatar: "",
						}}
					/>
				)}
			</SidebarFooter>
		</Sidebar>
	);
};

export default AppSidebar;
