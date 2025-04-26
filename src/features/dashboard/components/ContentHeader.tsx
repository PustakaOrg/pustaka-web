import React from "react";

const ContentHeader = ({
	title,
	subtitle,
}: { title: string; subtitle: string }) => {
	return (
		<header>
			<h2 className="text-3xl font-bold tracking-tight">{title}</h2>
			<p className="text-muted-foreground">{subtitle}</p>
		</header>
	);
};

export default ContentHeader;
