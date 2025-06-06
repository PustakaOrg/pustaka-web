import { Save } from "lucide-react";
import React, { FormEvent } from "react";
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
import { Librarian } from "~/types/entities/Librarian";
import { Member } from "~/types/entities/Member";

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
						<MemberProfileForm profile={profile} />
					) : isLibrarianObject(profile) ? (
						<p>Librarian</p>
					) : (
						isAdminObject(profile) && <p>Admin</p>
					)
				) : (
					<></>
				)}
			</section>
		</main>
	);
};

export default ProfilePage;

interface MemberProfileFormProps {
	profile: Librarian;
}

const MemberProfileForm = ({ profile }: MemberProfileFormProps) => {
  const {updateMember} = useUpdateMember()



	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const form = new FormData(e.currentTarget)






  };
	return (
		<form onSubmit={handleSubmit}>
			<div className="flex">
				<div className="basis-1/6 grow-0 p-6">
					<div className="size-32 bg-green-50"></div>
				</div>
				<div className="flex flex-col grow space-y-4">
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
						<Input name="phone_number" defaultValue={profile.phone_number} />
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
