import { LucideIcon } from "lucide-react";
import React from "react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "~/shared/components/ui/card";

const Stat = (stat: { icon?: LucideIcon; title: string; value: string }) => {
	return (
		<Card key={stat.title}>
			<CardHeader className="flex flex-row items-center justify-between pb-2">
				<CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
				{stat.icon && <stat.icon className="h-4 w-4 text-muted-foreground" />}
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">{stat.value}</div>
			</CardContent>
		</Card>
	);
};

export default Stat;
