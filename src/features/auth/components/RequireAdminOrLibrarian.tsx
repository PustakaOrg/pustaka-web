import { ReactNode } from "react";
import useProfile from "../hooks/useProfile";
import { Navigate, useLocation } from "react-router";
import LoadingPage from "~/pages/LoadingPage";
import { isAdminObject, isLibrarianObject } from "../utils/util";

const RequireAdminOrLibrarian = ({ children }: { children: ReactNode }) => {
	const { profile, isPending, isError } = useProfile();
	const location = useLocation();

	if (isPending) {
		return <LoadingPage />;
	}
	if (!isPending && !isError && (isAdminObject(profile) || isLibrarianObject(profile) )) {
		return children;
	}

  // TODO: Forbidden Page

	return <Navigate to={"/login"} replace state={{ path: location.pathname }} />;
};

export default RequireAdminOrLibrarian;
