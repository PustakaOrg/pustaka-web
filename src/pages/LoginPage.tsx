import { GalleryVerticalEnd } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
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
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex justify-center gap-2 md:justify-start">
					<Link to="/" className="flex items-center gap-2 font-medium">
						<div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
							<GalleryVerticalEnd className="size-4" />
						</div>
						Pustaka.
					</Link>
				</div>
				<div className="flex flex-1  items-center justify-center">
					<div className="w-full max-w-sm -mt-24">
						<LoginForm />
					</div>
				</div>
			</div>
			<div className="relative hidden lg:flex justify-center items-center p-4">
				<div className="size-full bg-primary rounded-lg flex p-4">
					<div className="mt-auto text-primary-foreground font-semibold">Pustaka.</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
