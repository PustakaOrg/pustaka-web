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
	const [bookScanOpen, setBookScanOpen] = useState(false);
	const [memberScanOpen, setMemberScanOpen] = useState(false);
	const { settings } = useSettings();

	const handleBookScanCapture = (codes: DetectedBarcode[]) => {
		const code = codes
			.filter((c) => c.format === "qr_code")
			.map((c) => c.rawValue)
			.at(0);
		if (code) {
			setBook(code);
			setBookScanOpen(false);
		}
	};

	const handleMemberScanCapture = (codes: DetectedBarcode[]) => {
		const code = codes
			.filter((c) => c.format === "qr_code")
			.map((c) => c.rawValue)
			.at(0);
		if (code) {
			setMember(code);
			setMemberScanOpen(false);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="book" className="text-sm font-medium">
						Buku *
					</Label>
					<div className="flex gap-2">
						<div className="grow">
							<BookCombobox book={book} setBook={setBook} />
						</div>
						<BarcodeScannerDrawwer
							isOpen={bookScanOpen}
							onOpenChange={setBookScanOpen}
							handleCapture={handleBookScanCapture}
						/>
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
						<BarcodeScannerDrawwer
							isOpen={memberScanOpen}
							onOpenChange={setMemberScanOpen}
							handleCapture={handleMemberScanCapture}
						/>
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
