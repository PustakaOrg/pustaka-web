import useLogout from "~/features/auth/hooks/useLogout";
import useProfile from "~/features/auth/hooks/useProfile";
import { Button } from "~/shared/components/ui/button";

const DashboardHomePage = () => {
	const { profile, isPending, isError, error } = useProfile();
	const logout = useLogout();

	return (
		<main className="flex flex-col">
			{!isPending && profile && <pre>{JSON.stringify(profile)}</pre>}
			<Button onClick={logout}>Logout</Button>
		</main>
	);
};

export default DashboardHomePage;
