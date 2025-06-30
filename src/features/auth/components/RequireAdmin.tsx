import { ReactNode } from "react";
import useProfile from "../hooks/useProfile";
import { Navigate, useLocation } from "react-router";
import LoadingPage from "~/pages/LoadingPage";
import { isAdminObject, isLibrarianObject } from "../utils/util";
import ForbiddenPage from "./ForbiddenPage";

const RequireAdmin = ({ children }: { children: ReactNode }) => {
	const { profile, isPending, isError } = useProfile();
	const location = useLocation();

	if (isPending) {
		return <LoadingPage />;
	}
	if (!isPending && !isError && isAdminObject(profile)) {
		return children;
	}

	if (!isPending && !isError && !isAdminObject(profile)) {
		return <Navigate to={"/forbidden"} replace state={{ path: location.pathname }} />;
	}

	return <Navigate to={"/login"} replace state={{ path: location.pathname }} />;
};

export default RequireAdmin;
