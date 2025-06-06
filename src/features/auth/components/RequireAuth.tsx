import React from "react";
import useProfile from "../hooks/useProfile";
import { Navigate, useLocation } from "react-router";
import LoadingPage from "~/pages/LoadingPage";

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
	const { profile, isPending, isError } = useProfile();
	const location = useLocation();

	if (isPending) {
		return (
      <LoadingPage />
		);
	}
	if (!isPending && !isError && profile) {
		return children;
	}

	return <Navigate to={"/login"} replace state={{ path: location.pathname }} />;
};
