import LoginForm from "~/features/auth/components/LoginForm";

const LoginPage = () => {
	return (
		<main className="h-screen grid place-items-center">
			<div className="w-sm md:w-md lg:w-xl">
				<LoginForm />
			</div>
		</main>
	);
};

export default LoginPage;
