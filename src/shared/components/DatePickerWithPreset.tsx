import * as React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "~/shared/components/ui/button";
import { Calendar } from "~/shared/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "~/shared/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/shared/components/ui/select";
import { cn } from "../libs/ui";

interface DatePickerWithPresetProps {
  date?: Date,
  onDateChange: (date?: Date) => void
}

const DatePickerWithPreset = ({date,onDateChange}: DatePickerWithPresetProps) => {

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"w-full justify-start text-left font-normal",
						!date && "text-muted-foreground",
					)}
				>
					<CalendarIcon />
					{date ? format(date, "PPP") : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent
				align="start"
				className="flex w-auto flex-col space-y-2 p-2"
			>
				<Select
					onValueChange={(value) =>
						onDateChange(addDays(new Date(), parseInt(value)))
					}
				>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Select" />
					</SelectTrigger>
					<SelectContent position="popper">
						<SelectItem value="0">Today</SelectItem>
						<SelectItem value="1">Tomorrow</SelectItem>
						<SelectItem value="3">In 3 days</SelectItem>
						<SelectItem value="7">In a week</SelectItem>
					</SelectContent>
				</Select>
				<div className="grid place-items-center">
					<div className="rounded-md border">
						<Calendar
							mode="single"
							className="w-full"
							selected={date}
							onSelect={onDateChange}
						/>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default DatePickerWithPreset;
