import {
	ArrowUpCircleIcon,
	BookOpen,
	BookUp,
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
			title: "Reservasiku",
			url: "/dashboard/reservations",
			icon: Calendar,
		},
		{
			title: "Peminjamanku",
			url: "/dashboard/loans",
			icon: BookOpen,
		},
		{
			title: "Denda",
			url: "/dashboard/fines",
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
			title: "Katalog",
			url: "/dashboard/books",
			icon: Library,
		},
		// {
		// 	title: "Categories",
		// 	url: "/dashboard/categories",
		// 	icon: GalleryVerticalEnd,
		// },
		{
			title: "Member",
			url: "/dashboard/members",
			icon: Users,
		},
		{
			title: "Peminjaman",
			url: "/dashboard/loans",
			icon: BookOpen,
		},
		{
			title: "Reservasi",
			url: "/dashboard/reservations",
			icon: Calendar,
		},
		{
			title: "Denda",
			url: "/dashboard/fines",
			icon: FileText,
		},
    {
      title: "Report",
      url: "/dashboard/report"
      ,icon: BookUp
    }

	],
	navAdmin: {
		main: [
			{
				title: "Pustakawan",
				url: "/dashboard/librarians",
				icon: Users2,
			},
		],
		secondary: [
			{
				title: "Pengaturan",
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
