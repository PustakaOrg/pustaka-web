import { FormEvent, useState } from "react";
import { Button } from "~/shared/components/ui/button";
import { Input } from "~/shared/components/ui/input";
import { Label } from "~/shared/components/ui/label";
import { Member } from "~/types/entities/Member";
import ClassCombobox from "./ClassCombobox";
import BatchCombobox from "./BatchCombobox";

interface MemberFormProps {
	handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
	defaultValues?: Member;
	error?: unknown;
}
const MemberForm = ({
	handleSubmit,
	defaultValues,
	error,
}: MemberFormProps) => {
	const [_class, setClass] = useState(defaultValues?._class?.id ?? "");

	const [batch, setBatch] = useState(defaultValues?.batch?.id ?? "");

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="grid gap-4 py-4">
				<div className="space-y-2">
					<Label htmlFor="account.email" className="text-right">
						Email
					</Label>
					<Input
						id="account.email"
						name="account.email"
						defaultValue={defaultValues?.account.email}
						type="email"
						placeholder="Enter member email"
						className="col-span-3"
						required
					/>
					{/* @ts-ignore */}
					{error?.data?.account?.email && (
						<p className="text-xs text-destructive">
							{/* @ts-ignore */}
							{error.data?.account?.email[0]}
						</p>
					)}
				</div>
				<div className="space-y-2">
					<Label htmlFor="account.password" className="text-right">
						Password
					</Label>
					<Input
						id="account.password"
						name="account.password"
						type="password"
						min="1"
						placeholder="Enter member password"
						className="col-span-3"
						required={!defaultValues}
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="nis" className="text-right">
						NIS
					</Label>
					<Input
						id="nis"
						name="nis"
						type="text"
						min="1"
						placeholder="Enter member NIS"
						className="col-span-3"
						defaultValue={defaultValues?.nis}
						required
					/>
					{/* @ts-ignore */}
					{error?.data?.nis && (
						<p className="text-xs text-destructive">
							{/* @ts-ignore */}
							{error.data?.nis[0]}
						</p>
					)}
				</div>
				<div className="space-y-2">
					<Label htmlFor="account.fullname" className="text-right">
						Nama Lengkap
					</Label>
					<Input
						id="account.fullname"
						name="account.fullname"
						type="text"
						placeholder="Enter member fullname"
						className="col-span-3"
						defaultValue={defaultValues?.account.fullname}
						required
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="profile_picture" className="text-right">
						Foto Profil
					</Label>
					<div className="col-span-3">
						<Input
							id="profile_picture"
							name="profile_picture"
							type="file"
							accept="image/*"
							className="col-span-3"
						/>
					</div>
				</div>
				<div className="space-y-2">
					<Label htmlFor="phone_number" className="text-right">
						No Handphone
					</Label>
					<Input
						id="phone_number"
						name="phone_number"
						type="number"
						min="1"
						placeholder="Enter member phone number"
						className="col-span-3"
						defaultValue={defaultValues?.phone_number}
						required
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="_class" className="text-sm font-medium">
						Kelas
					</Label>
					<ClassCombobox _class={_class} setClass={setClass} />
					<input hidden name="_class" value={_class} readOnly />
				</div>

				<div className="space-y-2">
					<Label htmlFor="_class" className="text-sm font-medium">
						Angkatan
					</Label>
					<BatchCombobox batch={batch} setBatch={setBatch} />
					<input hidden name="batch" value={batch} readOnly />
				</div>

				<div className="space-y-2">
					<Label htmlFor="expires_date" className="text-sm font-medium">
						Expires date
					</Label>
					<Input
						name="expires_date"
						defaultValue={defaultValues?.expires_date}
						type="date"
						placeholder="Enter"
					/>
					{/* @ts-ignore */}
					{error?.data?.expires_date && (
						<p className="text-xs text-destructive">
							{/* @ts-ignore */}
							{error?.data?.expires_date[0]}
						</p>
					)}
				</div>

				<Button
					className="cursor-pointer w-full items-right mt-8"
					type="submit"
				>
					Submit
				</Button>
			</div>
		</form>
	);
};

export default MemberForm;
