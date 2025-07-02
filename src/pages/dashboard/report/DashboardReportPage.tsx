import { addDays, format, startOfToday, subDays } from "date-fns";
import { useState } from "react";
import ContentHeader from "~/features/dashboard/components/ContentHeader";
import DateRangePickerWithPreset, {
	DateRange,
} from "~/shared/components/DateRangePickerWithPreset";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/shared/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/shared/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/shared/components/ui/table";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "~/shared/components/ui/chart";
import { PopularLoanListParams } from "~/features/report/api/getLoans";
import usePopularLoanList from "~/features/report/type/usePopularLoanList";

const DashboardReportPage = () => {
	const [reportType, setReportType] = useState("popular");

	const [dateRange, setDateRange] = useState<DateRange>({
		from: subDays(startOfToday(), 29),
		to: startOfToday(),
	});

	const popularLoanListParams: PopularLoanListParams = {
		...(dateRange?.from && {
			created_at_from: format(dateRange.from, "yyyy-MM-dd"),
		}),
		...(dateRange?.to && {
			created_at_to: format(addDays(dateRange.to, 1), "yyyy-MM-dd"),
		}),
	};

	const { popularLoanList } = usePopularLoanList(popularLoanListParams);

	return (
		<main className="flex flex-1 flex-col gap-6 p-6 overflow-scroll ">
			<ContentHeader
				title="Report"
				subtitle="Buat dan lihat data perpustakaan"
			/>

			<Card>
				<CardHeader>
					<CardTitle>Buat Report</CardTitle>
					<CardDescription>Pilih Tipe Laporan</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
						<div className="space-y-2 w-full">
							<label className="text-sm font-bold">Tipe Report</label>
							<Select value={reportType} onValueChange={setReportType}>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select report type" />
								</SelectTrigger>
								<SelectContent>
									{/* <SelectItem value="circulation">Book Circulation</SelectItem> */}
									{/* <SelectItem value="members">Member Activity</SelectItem> */}
									{/* <SelectItem value="overdue">Overdue Items</SelectItem> */}
									<SelectItem value="popular">Buku Popular</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-bold">Range Tanggal</label>
							<DateRangePickerWithPreset
								date={dateRange}
								onDateChange={setDateRange}
							/>
						</div>
					</div>
				</CardContent>
			</Card>
			<Card>
				<CardContent>
					{reportType === "popular" && popularLoanList && (
						<div>
							<div className="mb-6">
								<h3 className="text-lg font-medium mb-2">Buku Populer</h3>
								<ChartContainer
									config={{
										loan_count: {
											label: "Total",
										},
									}}
									className="h-[400px] w-full"
								>
									<BarChart
										accessibilityLayer
										data={popularLoanList.results}
										margin={{
											top: 20,
											right: 30,
											left: 20,
										}}
									>
										<CartesianGrid vertical={false} />
										<XAxis
											dataKey="title"
											tickFormatter={(value) => value.slice(0, 10) + "..."}
											tickLine={false}
											tickMargin={10}
											axisLine={false}
											height={80}
											interval={0}
											className="truncate"
										/>
										<YAxis
											tickLine={false}
											axisLine={false}
											tickMargin={8}
											domain={[0, "dataMax"]}
										/>
										<ChartTooltip
											cursor={false}
											content={<ChartTooltipContent indicator="dot" />}
										/>
										<Bar
											dataKey="loan_count"
											fill="var(--color-primary)"
											radius={[4, 4, 0, 0]}
										/>
									</BarChart>
								</ChartContainer>
							</div>
							<Table>
								<TableHeader>
									<TableRow className="bg-secondary hover:bg-secondary">
										<TableHead>Rank</TableHead>
										<TableHead>Judul</TableHead>
										<TableHead>ISBN</TableHead>
										<TableHead className="text-right">
											Total Peminjaman
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{popularLoanList &&
										popularLoanList.results.map((item, index) => (
											<TableRow key={item.title}>
												<TableCell>{index + 1}</TableCell>
												<TableCell className="font-medium">
													{item.title}
												</TableCell>
												<TableCell>{item.isbn}</TableCell>
												<TableCell className="text-right">
													{item.loan_count}
												</TableCell>
											</TableRow>
										))}
								</TableBody>
							</Table>
						</div>
					)}
				</CardContent>
			</Card>
		</main>
	);
};

export default DashboardReportPage;
