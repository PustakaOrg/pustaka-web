import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { queryClient } from "../shared/utils/queryClient";
import { ThemeProvider } from "~/shared/components/theme";
import { Toaster } from "~/shared/components/ui/sonner";

const Providers = ({ children }: React.PropsWithChildren) => {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider defaultTheme="system">{children}</ThemeProvider>
			<Toaster />
		</QueryClientProvider>
	);
};

export default Providers;
