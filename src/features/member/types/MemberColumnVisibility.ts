import { Member } from "~/types/entities/Member";

export interface MemberColumnVisibility {
	member: boolean;
	nis: boolean;
	_class: boolean;
	batch: boolean;
	expires_at: boolean;
	phone_number: boolean;
}

export const defalultMemberColumnVisibility: MemberColumnVisibility = {
	member: true,
	nis: true,
	_class: true,
	batch: true,
	expires_at: true,
	phone_number: true,
};
