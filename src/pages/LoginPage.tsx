import { useEffect } from "react";
import { useNavigate } from "react-router";
import LoginForm from "~/features/auth/components/LoginForm";
import useProfile from "~/features/auth/hooks/useProfile";

const LoginPage = () => {
	const navigate = useNavigate();
	const { profile } = useProfile();
	useEffect(() => {
		if (profile !== undefined) {
			navigate("/dashboard");
		}
	}, []);
	return (
		<main className="h-screen grid place-items-center">
			<div className="w-sm md:w-md lg:w-xl">
				<LoginForm />
			</div>
		</main>
	);
};

export default LoginPage;
