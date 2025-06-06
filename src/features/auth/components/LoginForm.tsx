import { Input } from "~/shared/components/ui/input";
import { Label } from "~/shared/components/ui/label";
import { FormEvent, useCallback, useState } from "react";
import { EyeIcon, EyeOffIcon, LoaderCircleIcon } from "lucide-react";
import { Button } from "~/shared/components/ui/button";
import useLogin from "../hooks/useLogin";
import { useLocation, useNavigate } from "react-router";
import { ApiError } from "~/shared/libs/apiClient";

const LoginForm = () => {
	const navigate = useNavigate();
	const { state } = useLocation();

	const onSuccess = () => {
		navigate(state?.path || "/dashboard");
	};

	// TODO: ERROR Handle
	const { isPending, isError, error, login } = useLogin(onSuccess);
	const [showPassword, setShowPassword] = useState(false);

	const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const email = String(formData.get("email"));
		const password = String(formData.get("password"));

		login({
			email,
			password,
		});
	}, []);

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
			<div className="flex flex-col items-center gap-2 text-center">
				<h1 className="text-2xl font-bold">Login to your account</h1>
				<p className="text-balance text-sm text-muted-foreground">
					Enter your email below to login to your account
				</p>
			</div>
			<div className="grid gap-6">
				<div className="grid gap-2">
					<Label htmlFor="email">Email</Label>
					<Input
						className="border-black-800"
						id="email"
						type="email"
						name="email"
						placeholder="m@example.com"
						required
					/>
				</div>
				<div className="grid gap-2">
					<Input
						className="border-black-800"
						id="password"
						type="password"
						name="password"
						required
					/>
				</div>
				{error && (
					<p className="text-destructive text-xs">{error.data.detail}</p>
				)}
				<Button type="submit" className="w-full">
					Login
				</Button>
			</div>
		</form>
	);
};

export default LoginForm;
