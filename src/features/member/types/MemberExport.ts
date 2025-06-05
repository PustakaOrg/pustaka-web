import { Member } from "~/types/entities/Member";

export const memberToCSV = (members: Member[]) =>
	members.map((member) => ({
		ID: member.id,
		NIS: member.nis,
		"Nama Lengkap": member.account.fullname,
		Email: member.account.email,
		Angkatan: member.batch?.name,
		"Berlaku hingga": member.expires_date,
	}));

export type MemberCSV = ReturnType<typeof memberToCSV>
