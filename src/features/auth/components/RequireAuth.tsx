import React from "react";
import useProfile from "../hooks/useProfile";
import { Navigate, useLocation } from "react-router";

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
	const { profile, isPending, isError } = useProfile();
	const location = useLocation();

	if (isPending) {
		return (
			<main className="h-full w-full bg-background grid place-items-center">
				<p>Loading</p>
			</main>
		);
	}
	if (!isPending && !isError && profile) {
		return children;
	}

	return <Navigate to={"/login"} replace state={{ path: location.pathname }} />;
};
