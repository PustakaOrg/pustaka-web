import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Librarian } from "~/types/entities/Librarian";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/shared/components/ui/form";
import { Input } from "~/shared/components/ui/input";
import { Button } from "~/shared/components/ui/button";

export const getLibrarianFormSchema = (isEditing: boolean) =>
	z
		.object({
			email: z
				.string()
				.min(1, { message: "Email is required." })
				.email({ message: "Not valid email address." }),
			fullname: z.string().min(1, { message: "Fullname is required." }),
			nip: z
				.string()
				.min(1, { message: "NIP is required" })
				.max(13, "Max is 13"),
			phoneNumber: z
				.string()
				.min(1, { message: "Phone Number is required" })
				.max(12, "Max is 13"),
			password: isEditing
				? z.string().optional()
				: z
						.string()
						.min(8, { message: "Password must be at least 8 characters." }),
			confirm: isEditing
				? z.string().optional()
				: z.string().min(1, { message: "Please confirm your password." }),
		})
		.refine((data) => isEditing || data.password === data.confirm, {
			message: "Passwords do not match.",
			path: ["confirm"],
		});

export type LibrarianFormData = z.infer<
	ReturnType<typeof getLibrarianFormSchema>
>;

interface LibrarianFormProps {
	librarian?: Librarian;
	handleSubmit: (data: LibrarianFormData) => void;
	error?: unknown;
}

const LibrarianForm = ({
	librarian,
	handleSubmit,
	error,
}: LibrarianFormProps) => {
	const isEditing = Boolean(librarian);
	const schema = getLibrarianFormSchema(isEditing);
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			email: "",
			fullname: "",
			password: "",
			confirm: "",
		},
	});
	useEffect(() => {
		if (librarian) {
			form.setValue("email", librarian.account.email || "");
			form.setValue("fullname", librarian.account.fullname || "");
			form.setValue("nip", librarian.nip || "");
			form.setValue("phoneNumber", librarian.phone_number || "");
		}
		// @ts-ignore
		if (error?.data?.account?.email) {
			// @ts-ignore
			form.setError("email",{message: error.data.account.email[0]});
      
		}

		// @ts-ignore
		if (error?.data?.nip) {
			// @ts-ignore
			form.setError("nip", {message:error.data.nip[0]});
		}
	}, [librarian, form, error]);
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="fullname"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Fullname</FormLabel>
							<FormControl>
								<Input placeholder="Your Fullname" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="Your email" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="nip"
					render={({ field }) => (
						<FormItem>
							<FormLabel>NIP</FormLabel>
							<FormControl>
								<Input placeholder="Your Nip" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="phoneNumber"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Phone Number</FormLabel>
							<FormControl>
								<Input placeholder="Your phone number" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input type="password" placeholder="Password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="confirm"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="Confirm Password"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full">
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default LibrarianForm;
