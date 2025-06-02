import useProfile from "~/features/auth/hooks/useProfile";
import { isAdminObject, isLibrarianObject, isMemberObject } from "~/features/auth/utils/util";
import LibrarianHomeContent from "~/features/dashboard/components/librarian/LibrarianHomeContent";
import MemberHomeContent from "~/features/dashboard/components/member/MemberHomeContent";

const DashboardHomePage = () => {
	const { profile, isPending, isError, error } = useProfile();

	return (
		<main className="flex flex-1 flex-col gap-6 p-6 overflow-scroll ">
				{(isLibrarianObject(profile) || isAdminObject(profile)) && (
					<LibrarianHomeContent />
				)}
				{(isMemberObject(profile) || isError) && (<MemberHomeContent />)}
		</main>
	);
};

export default DashboardHomePage;
