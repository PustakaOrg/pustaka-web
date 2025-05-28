import { FormEvent, useState } from "react";
import BookCombobox from "~/features/catalog/components/BookCombobox";
import { Label } from "~/shared/components/ui/label";
import { Loan } from "~/types/entities/Loan";
interface LoanFormProps {
	defaultValues?: Loan;
	handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}
const LoanForm = ({ handleSubmit }: LoanFormProps) => {
	const [book, setBook] = useState("");

	return (
		<form onSubmit={handleSubmit}>
			<div className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="author" className="text-sm font-medium">
						Category *
					</Label>
					<BookCombobox book={book} setBook={setBook} />
					{book && <input hidden name="category" value={book} readOnly />}
				</div>
			</div>
		</form>
	);
};

export default LoanForm;
