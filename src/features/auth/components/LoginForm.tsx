import { Input } from "~/shared/components/ui/input";
import { Label } from "~/shared/components/ui/label";
import { FormEvent, useCallback, useState } from "react";
import { EyeIcon, EyeOffIcon, LoaderCircleIcon } from "lucide-react";
import { Button } from "~/shared/components/ui/button";
import useLogin from "../hooks/useLogin";
import { useLocation, useNavigate } from "react-router";

const LoginForm = () => {
	const navigate = useNavigate();
	const { state } = useLocation();

	const onSuccess = () => {
		navigate(state?.path || "/dashboard");
	};

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
				<h1 className="text-2xl font-bold">Login ke Pustaka</h1>
				<p className="text-balance text-sm text-muted-foreground">
        Masukkan Email anda untuk masuk ke Pustaka
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
						placeholder="email@example.com"
						required
					/>
				</div>
				<div className="grid gap-2">
					<Label htmlFor="password">Password</Label>
					<div className="relative">
						<Input
							placeholder="Password"
							className="border-black-800 pr-10"
							id="password"
							type={showPassword ? "text" : "password"}
							name="password"
							required
						/>
						<button
							type="button"
							onClick={() => setShowPassword((prev) => !prev)}
							className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
						>
							{showPassword ? (
								<EyeIcon className="h-4 w-4" />
							) : (
								<EyeOffIcon className="h-4 w-4" />
							)}
						</button>
					</div>
				</div>
				{error && (
					<p className="text-destructive text-xs">{error.data.detail}</p>
				)}
				<Button
					type="submit"
					className="cursor-pointer w-full"
					disabled={isPending}
				>
					{isPending ? (
						<>
							<LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin" />
							Logging in...
						</>
					) : (
						"Login"
					)}
				</Button>
			</div>
		</form>
	);
};

export default LoginForm;
