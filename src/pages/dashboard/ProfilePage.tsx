import { Save } from "lucide-react";
import { FormEvent } from "react";
import useProfile from "~/features/auth/hooks/useProfile";
import {
	isAdminObject,
	isLibrarianObject,
	isMemberObject,
} from "~/features/auth/utils/util";
import ContentHeader from "~/features/dashboard/components/ContentHeader";
import useUpdateMember from "~/features/member/hooks/useUpdateMember";
import { Button } from "~/shared/components/ui/button";
import { Input } from "~/shared/components/ui/input";
import { Label } from "~/shared/components/ui/label";
import { Member } from "~/types/entities/Member";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "~/shared/components/ui/avatar";
import { Librarian } from "~/types/entities/Librarian";
import useUpdateLibrarian from "~/features/librarian/hooks/useUpdateLibrarian";
import { Admin } from "~/types/entities/Admin";
import useUpdateAdminPassword from "~/features/auth/hooks/useUpdateAdminPassword";

const ProfilePage = () => {
	const { profile } = useProfile();
	return (
		<main className="flex flex-1 flex-col gap-6 p-6 overflow-scroll ">
			<section>
				<ContentHeader title="Profile" subtitle="Ubah profil" />
			</section>

			<section>
				{profile ? (
					isMemberObject(profile) ? (
						<>
							<MemberProfileForm profile={profile} />
						</>
					) : isLibrarianObject(profile) ? (
						<LibrarianProfileForm profile={profile} />
					) : (
						isAdminObject(profile) && <AdminProfileForm profile={profile} />
					)
				) : (
					<></>
				)}
			</section>
		</main>
	);
};

export default ProfilePage;

interface AdminProfileFormProps {
	profile: Admin;
}

const AdminProfileForm = ({ profile }: AdminProfileFormProps) => {
	const { updateAdmin } = useUpdateAdminPassword();
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = new FormData(e.currentTarget);

		const password = String(form.get("account.password"));

		if (password !== "") {
			updateAdmin({ id: profile.id, password });
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="name">Nama</Label>
					<Input defaultValue={profile.fullname} disabled />
				</div>

				<div className="space-y-2">
					<Label>Email</Label>
					<Input defaultValue={profile.email} disabled />
				</div>
				<div className="space-y-2">
					<Label>Ubah Password</Label>
					<Input name="account.password" type="password" />
				</div>

				<div className="flex w-full">
					<Button className="ml-auto">
						<Save /> Simpan
					</Button>
				</div>
			</div>
		</form>
	);
};

interface LibrarianProfileFormProps {
	profile: Librarian;
}

const LibrarianProfileForm = ({ profile }: LibrarianProfileFormProps) => {
	const { updateLibrarian } = useUpdateLibrarian();
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = new FormData(e.currentTarget);

		const password = String(form.get("account.password"));

		if (password !== "") {
			updateLibrarian({ id: profile.id, data: { account: { password } } });
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="space-y-4">
				<div className="space-y-2">
					<Label>NIP</Label>
					<Input defaultValue={profile.nip} disabled />
				</div>
				<div className="space-y-2">
					<Label htmlFor="name">Nama Lengkap</Label>
					<Input defaultValue={profile.account.fullname} disabled />
				</div>

				<div className="space-y-2">
					<Label>Email</Label>
					<Input defaultValue={profile.account.email} disabled />
				</div>
				<div className="space-y-2">
					<Label>Ubah Password</Label>
					<Input name="account.password" type="password" />
				</div>

				<div className="flex w-full">
					<Button className="ml-auto">
						<Save /> Simpan
					</Button>
				</div>
			</div>
		</form>
	);
};

interface MemberProfileFormProps {
	profile: Member;
}

const MemberProfileForm = ({ profile }: MemberProfileFormProps) => {
	const { updateMember } = useUpdateMember();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		const profile_pic = form.get("profile_picture") as File | null;

		const password = String(form.get("account.password"));

		if (!profile_pic) {
			form.delete("profile_picture");
		}

		if (password === "") {
			form.delete("account.password");
		}
		updateMember({ memberId: profile.id, data: form });
	};
	return (
		<form onSubmit={handleSubmit}>
			<div className="flex">
				<div className="basis-1/6 grow-0 p-6">
					<Avatar className="size-40 border">
						<AvatarImage src={profile.profile_picture} alt="Profile" />
						<AvatarFallback>M</AvatarFallback>
					</Avatar>
				</div>

				<div className="flex flex-col grow space-y-4">
					<div className="space-y-2">
						<Label htmlFor="name">Ubah Foto</Label>
						<Input
							type="file"
							accept="image/*"
							name="profile_picture"
							placeholder="ubah foto"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="name">Nama Lengkap</Label>
						<Input defaultValue={profile.account.fullname} disabled />
					</div>

					<div className="space-y-2">
						<Label>Email</Label>
						<Input defaultValue={profile.account.email} disabled />
					</div>

					<div className="space-y-2">
						<Label>No Handphone</Label>
						<Input
							name="phone_number"
							defaultValue={profile.phone_number}
							type="number"
							required
						/>
					</div>

					<div className="space-y-2">
						<Label>Ubah Password</Label>
						<Input name="account.password" type="password" />
					</div>

					<div className="flex w-full">
						<Button className="ml-auto">
							<Save /> Simpan
						</Button>
					</div>
				</div>
			</div>
		</form>
	);
};
