import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { queryClient } from "../shared/utils/queryClient";
import { ThemeProvider } from "~/shared/components/theme";

const Providers = ({ children }: React.PropsWithChildren) => {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider defaultTheme="light">{children}</ThemeProvider>
		</QueryClientProvider>
	);
};

export default Providers;
