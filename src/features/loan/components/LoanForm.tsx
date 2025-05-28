import { FormEvent, useState } from "react";
import BookCombobox from "~/features/catalog/components/BookCombobox";
import MemberCombobox from "~/features/member/components/MemberCombobox";
import { Button } from "~/shared/components/ui/button";
import { Input } from "~/shared/components/ui/input";
import { Label } from "~/shared/components/ui/label";
import { Loan } from "~/types/entities/Loan";
interface LoanFormProps {
	defaultValues?: Loan;
	handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}
const LoanForm = ({ handleSubmit }: LoanFormProps) => {
	const [book, setBook] = useState("");
	const [member, setMember] = useState("");

	return (
		<form onSubmit={handleSubmit}>
			<div className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="book" className="text-sm font-medium">
						Book *
					</Label>
					<BookCombobox book={book} setBook={setBook} />
					{book && <input hidden name="book" value={book} readOnly />}
				</div>
				<div className="space-y-2">
					<Label htmlFor="member" className="text-sm font-medium">
						Member *
					</Label>
					<MemberCombobox member={member} setMember={setMember} />
					{member && <input hidden name="borrower" value={member} readOnly />}
				</div>
				<div className="space-y-2">
					<Label htmlFor="day" className="text-sm font-medium">
						Day *
					</Label>
            <Input type="number" name="day" max={7} placeholder="Day long" />
				</div>
        <Button type="submit" className="w-full">Submit</Button>
			</div>
		</form>
	);
};

export default LoanForm;
