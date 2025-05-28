import { Member } from "~/types/entities/Member";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "~/shared/components/ui/avatar";

const MemberListItem = ({ member }: { member: Member }) => {
	return (
		<div className="flex items-center gap-3">
			<Avatar className="h-8 w-8 hidden sm:flex">
				<AvatarImage
					src={member.profile_picture}
					alt={member.account.fullname}
				/>
				<AvatarFallback>{member.account.fullname.charAt(0)}</AvatarFallback>
			</Avatar>
			<div>
				<p className="font-medium">{member.account.fullname}</p>
				<p className="text-xs text-muted-foreground hidden md:block">
					{member.account.email}
				</p>
			</div>
		</div>
	);
};

export default MemberListItem;
