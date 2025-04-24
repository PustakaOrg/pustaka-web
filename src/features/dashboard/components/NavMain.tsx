import { LucideIcon, MailIcon, PlusCircleIcon } from "lucide-react";
import React from "react";
import { Link, NavLink, useLocation } from "react-router";
import { Button } from "~/shared/components/ui/button";
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "~/shared/components/ui/sidebar";

const NavMain = ({
	items,
}: {
	items: {
		title: string;
		url: string;
		icon?: LucideIcon;
	}[];
}) => {
	const location = useLocation();
	return (
		<SidebarGroup>
			<SidebarGroupContent className="flex flex-col gap-2">
				<SidebarMenu>
					{items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<Link to={item.url}>
								<SidebarMenuButton isActive={location.pathname == item.url} tooltip={item.title}>
									{item.icon && <item.icon />}
									<span>{item.title}</span>
								</SidebarMenuButton>
							</Link>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
};

export default NavMain;
