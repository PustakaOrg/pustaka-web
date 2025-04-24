import {
	LogOutIcon,
	MoreVerticalIcon,
	UserCircleIcon,
} from "lucide-react";
import useLogout from "~/features/auth/hooks/useLogout";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "~/shared/components/ui/avatar";
import {
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "~/shared/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "~/shared/components/ui/sidebar";

const NavUser = ({
	user,
}: {
	user: {
		name: string;
		email: string;
		avatar: string;
	};
}) => {
	const { isMobile } = useSidebar();
	const logout = useLogout();

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="h-8 w-8 rounded-lg grayscale">
								<AvatarImage src={user.avatar} alt={user.name} />
								<AvatarFallback className="rounded-lg">L</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">{user.name}</span>
								<span className="truncate text-xs text-muted-foreground">
									{user.email}
								</span>
							</div>
							<MoreVerticalIcon className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage src={user.avatar} alt={user.name} />
									<AvatarFallback className="rounded-lg">L</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">{user.name}</span>
									<span className="truncate text-xs text-muted-foreground">
										{user.email}
									</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
							<DropdownMenuItem>
								<UserCircleIcon />
								Account
							</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={logout}>
							<LogOutIcon />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
};

export default NavUser;
