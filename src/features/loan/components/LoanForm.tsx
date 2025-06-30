import { set } from "date-fns";
import { FormEvent, useState } from "react";
import { DetectedBarcode } from "react-barcode-scanner";
import BookCombobox from "~/features/catalog/components/BookCombobox";
import MemberCombobox from "~/features/member/components/MemberCombobox";
import useSettings from "~/features/settings/hooks/useSettings";
import BarcodeScannerDrawwer from "~/shared/components/BarcodeScannerDrawwer";
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
	const { settings } = useSettings();

	return (
		<form onSubmit={handleSubmit}>
			<div className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="book" className="text-sm font-medium">
						Buku *
					</Label>
					<div className="flex gap-2">
						<div className="grow">
							<BookCombobox book={book}  setBook={setBook} />
						</div>
					</div>
					{book && <input hidden name="book" value={book} readOnly />}
				</div>
				<div className="space-y-2">
					<Label htmlFor="member" className="text-sm font-medium">
						Member *
					</Label>
					<div className="flex gap-2">
						<div className="grow">
							<MemberCombobox member={member} setMember={setMember} />
						</div>
					</div>
					{member && <input hidden name="borrower" value={member} readOnly />}
				</div>
				<div className="space-y-2">
					<Label htmlFor="day" className="text-sm font-medium">
						Jumlah Hari *
					</Label>
					<Input
						type="number"
						name="day"
						max={settings?.max_loan_day}
						placeholder="Lama peminjamana"
						required
					/>
				</div>
				<Button type="submit" className="w-full" disabled={!book || !member}>
					Submit
				</Button>
			</div>
		</form>
	);
};

export default LoanForm;
