import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/shared/components/ui/card";
import { Input } from "~/shared/components/ui/input";
import { Label } from "~/shared/components/ui/label";
import { FormEvent, useCallback, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
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
		<Card className="md:w-[500px]">
			<CardHeader>
				<CardTitle className="text-lg text-center">
					Sign In to your account
				</CardTitle>
				<CardDescription className="text-sm text-center">
					To continue using the app you must be Signed In.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
					<div className="flex flex-col gap-y-1">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							name="email"
							placeholder="Your email"
							type="email"
							required
							disabled={isPending}
						/>
					</div>
					<div className="flex flex-col gap-y-1">
						<Label htmlFor="password">Password</Label>
						<div className="relative flex items-center">
							<Input
								id="password"
								name="password"
								placeholder="Your Password"
								type={showPassword ? "text" : "password"}
								required
								disabled={isPending}
							/>
							{showPassword ? (
								<EyeOffIcon
									className="absolute right-3"
									onClick={() => setShowPassword((prev) => !prev)}
								/>
							) : (
								<EyeIcon
									className="absolute right-3"
									onClick={() => setShowPassword((prev) => !prev)}
								/>
							)}
						</div>
					</div>
					<Button
						size={"lg"}
						className="w-full font-semibold mt-3"
						type="submit"
						disabled={isPending}
					>
						Log In
						{/* {fetchState === "idle" && "Sign In"} */}
						{/* {fetchState === "submitting" && ( */}
						{/* 	<> */}
						{/* 		<LoaderCircleIcon strokeWidth={4} className="animate-spin" /> */}
						{/* 		Signing In */}
						{/* 	</> */}
						{/* )} */}
						{/* {fetchState === "loading" && location.pathname !== "/" && ( */}
						{/* 	<> */}
						{/* 		<CheckIcon strokeWidth={4} /> */}
						{/* 		Success */}
						{/* 	</> */}
						{/* )} */}
						{/* {fetchState === "loading" && location.pathname === "/" && ( */}
						{/* 	<>Sign In</> */}
						{/* )} */}
					</Button>
				</form>
			</CardContent>
			<CardFooter className="flex flex-col">
				{error && !isPending && (
					<p className="self-start text-sm mx-1 text-destructive">
						{error.message}
					</p>
				)}
			</CardFooter>
		</Card>
	);
};

export default LoginForm;
