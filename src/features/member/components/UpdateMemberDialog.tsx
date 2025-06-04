import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogTitle,
} from "~/shared/components/ui/dialog";
import MemberForm from "./MemberForm";
import { FormEvent, useCallback } from "react";
import { Member } from "~/types/entities/Member";
import useUpdateMember from "../hooks/useUpdateMember";

interface UpdateMemberDialogProps {
	member: Member;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

const UpdateMemberDialog = ({
	member,
	isOpen,
	onOpenChange,
}: UpdateMemberDialogProps) => {
	const { isPending, isError, error, updateMember } = useUpdateMember();
	const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		const email = String(form.get("account.email"));
		const password = String(form.get("account.password"));
		const nis = String(form.get("nis"));
		if (email === member.account.email) {
			form.delete("account.email");
		}

		if (nis === member.nis) {
			form.delete("nis");
		}
		if (!password) {
			form.delete("account.password");
		}
		updateMember({ memberId: member.id, data: form });
	}, []);

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="sm:min-w-[90vw] lg:min-w-[70vw] max-h-[98vh] overflow-y-auto">
				<DialogTitle>Edit Member</DialogTitle>
				<MemberForm handleSubmit={handleSubmit} defaultValues={member} />
			</DialogContent>
			<DialogFooter></DialogFooter>
		</Dialog>
	);
};

export default UpdateMemberDialog;
