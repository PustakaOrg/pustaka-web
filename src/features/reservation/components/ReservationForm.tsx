import { format } from "date-fns";
import { FormEvent, useState } from "react";
import BookCombobox from "~/features/catalog/components/BookCombobox";
import MemberCombobox from "~/features/member/components/MemberCombobox";
import useSettings from "~/features/settings/hooks/useSettings";
import DatePickerWithPreset from "~/shared/components/DatePickerWithPreset";
import { Button } from "~/shared/components/ui/button";
import { Input } from "~/shared/components/ui/input";
import { Label } from "~/shared/components/ui/label";
import { Reservation } from "~/types/entities/Reservation";
interface ReservationFormProps {
	defaultValues?: Reservation;
	handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}
const ReservationForm = ({
	defaultValues,
	handleSubmit,
}: ReservationFormProps) => {
	const [book, setBook] = useState(defaultValues?.book.id ?? "");
	const [member, setMember] = useState(defaultValues?.reservant.id ?? "");
	const [date, setDate] = useState<Date>();
	const { settings } = useSettings();

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

				<div className="grid grid-cols-2 gap-6">
					<div className="space-y-2">
						<Label htmlFor="pick_up_date" className="text-sm font-medium">
							Pick Up Date *
						</Label>
						<DatePickerWithPreset date={date} onDateChange={setDate} />
						{date && (
							<input
								type="hidden"
								name="pick_up_date"
								value={format(date, "yyyy-MM-dd")}
								readOnly
							/>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="day" className="text-sm font-medium">
							Day For Loan*
						</Label>
						<Input
							type="number"
							name="day"
							max={settings?.max_loan_day}
							placeholder="Day long"
							required
						/>
					</div>
				</div>

				<Button type="submit" className="w-full">
					Submit
				</Button>
			</div>
		</form>
	);
};

export default ReservationForm;
