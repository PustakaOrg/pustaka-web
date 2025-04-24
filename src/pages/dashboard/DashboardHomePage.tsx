import useLogout from "~/features/auth/hooks/useLogout";
import useProfile from "~/features/auth/hooks/useProfile";
import { Button } from "~/shared/components/ui/button";

const DashboardHomePage = () => {
  // Example
	const { profile, isPending, isError, error } = useProfile();
	const logout = useLogout();

	return (
		<main className="flex flex-col">
			{!isPending && <pre>{JSON.stringify(profile as any)}</pre>}
			<Button onClick={logout}>Logout</Button>
		</main>
	);
};

export default DashboardHomePage;
