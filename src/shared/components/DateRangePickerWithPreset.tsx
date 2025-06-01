import {
	endOfMonth,
	endOfWeek,
	format,
	startOfMonth,
	startOfToday,
	startOfWeek,
	subDays,
} from "date-fns";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "../libs/ui";

export type DateRange = {
	from: Date | undefined;
	to: Date | undefined;
};

const presetOptions = [
	{
		value: "today",
		label: "Today",
		range: { from: startOfToday(), to: startOfToday() },
	},
	{
		value: "last7",
		label: "Last 7 Days",
		range: { from: subDays(startOfToday(), 6), to: startOfToday() },
	},
	{
		value: "last30",
		label: "Last 30 Days",
		range: { from: subDays(startOfToday(), 29), to: startOfToday() },
	},
	{
		value: "thisWeek",
		label: "This Week",
		range: {
			from: startOfWeek(new Date()), // Monday
			to: endOfWeek(new Date()), // Sunday
		},
	},
	{
		value: "thisMonth",
		label: "This Month",
		range: { from: startOfMonth(new Date()), to: endOfMonth(new Date()) },
	},
];

interface DateRangePickerWithPresetProps {
	date?: DateRange;
	onDateChange: (date?: DateRange) => void;
}
const DateRangePickerWithPreset = ({
	date,
	onDateChange,
}: DateRangePickerWithPresetProps) => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
          size={"sm"}
					className={cn(
						"w-full justify-start text-left font-normal",
						!date && "text-muted-foreground",
					)}
				>
					<CalendarIcon />
					{date?.from && date?.to
						? `${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}`
						: "Select a custom range"}
				</Button>
			</PopoverTrigger>
			<PopoverContent
				align="start"
				className="flex w-auto flex-col space-y-2 p-2"
			>
				<Select
					onValueChange={(value) => {
						const selected = presetOptions.filter(
							(opt) => opt.value === value,
						)[0];

						onDateChange(selected.range);
					}}
				>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Select" />
					</SelectTrigger>
					<SelectContent position="popper">
						{presetOptions.map((opt) => (
							<SelectItem key={opt.value} value={opt.value}>
								{opt.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<div className="grid place-items-center">
					<div className="rounded-md border">
						<Calendar
							mode="range"
							className="w-full"
							selected={date}
							numberOfMonths={2}
							onSelect={(range) => {
								onDateChange(range as DateRange);
							}}
						/>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default DateRangePickerWithPreset;
