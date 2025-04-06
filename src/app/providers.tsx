import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { queryClient } from "../shared/utils/queryClient";

const Providers = ({ children }: React.PropsWithChildren) => {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};

export default Providers;
