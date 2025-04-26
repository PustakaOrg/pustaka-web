import useProfile from "~/features/auth/hooks/useProfile";
import { isAdminObject, isLibrarianObject } from "~/features/auth/utils/util";
import LibrarianHomeContent from "~/features/dashboard/components/librarian/LibrarianHomeContent";

const DashboardHomePage = () => {
	const { profile, isPending, isError, error } = useProfile();

	return (
		<main className="flex flex-1 flex-col gap-6 p-6">
			<div className="@container/main overflow-scroll ">
				{(isLibrarianObject(profile) || isAdminObject(profile)) && (
					<LibrarianHomeContent />
				)}
			</div>
		</main>
	);
};

export default DashboardHomePage;
