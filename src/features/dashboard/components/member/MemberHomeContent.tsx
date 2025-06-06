import { Link } from "react-router";
import ContentHeader from "../ContentHeader";
import useProfile from "~/features/auth/hooks/useProfile";
import { isMemberObject } from "~/features/auth/utils/util";
import useLoanList from "~/features/loan/hooks/useLoanList";
import { Button } from "~/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/shared/components/ui/card";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";
import { Badge } from "~/shared/components/ui/badge";
import useFineList from "~/features/fines/hooks/useFineList";
import { formatToIDR } from "~/shared/utils/functions";
import useReservationList from "~/features/reservation/hooks/useReservationList";

const calculateDaysRemaining = (dueDate: string) => {
	const due = new Date(dueDate);
	const today = new Date();
	const diffTime = due.getTime() - today.getTime();
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	return diffDays;
};

const MemberHomeContent = () => {
	const { profile } = useProfile();
	const { loanList } = useLoanList({ status: "active" });
	const { fineList } = useFineList({ status: "pending" });
  const { reservationList } = useReservationList({ status: "ready" })

	return (
		<div className="space-y-8">
			<section>
				{profile && isMemberObject(profile) && (
					<ContentHeader
						title={`Dashboard`}
						subtitle="Lihat reservasi, peminjaman, & dendamu"
					/>
				)}
			</section>

			<div className="grid lg:grid-cols-2 gap-4">
				<section className="h-full w-full">
					<Card className="w-full h-full">
						<CardHeader className="pb-2">
							<CardTitle>Tenggat Pengembalian</CardTitle>
							<CardDescription>Buku yang harus dikembalikan</CardDescription>
						</CardHeader>
						<CardContent className="max-h-[300px] overflow-auto h-full w-full">
							<div className="space-y-4">
								{loanList &&
									loanList.results.length > 0 &&
									loanList.results
										.sort(
											(a, b) =>
												new Date(a.return_date).getTime() -
												new Date(b.return_date).getTime(),
										)
										.map((l) => {
											const daysRemaining = calculateDaysRemaining(
												l.return_date,
											);
											return (
												<div key={l.id} className="flex items-center gap-4">
													<div
														className={`rounded-full p-2 ${
															daysRemaining <= 3
																? "bg-red-100 text-red-600"
																: daysRemaining <= 7
																	? "bg-amber-100 text-amber-600"
																	: "bg-green-100 text-green-600"
														}`}
													>
														<Clock className="h-4 w-4" />
													</div>
													<div className="flex-1 min-w-0">
														<p className="text-sm font-medium truncate">
															{l.book.title}
														</p>
														<p className="text-xs text-muted-foreground">
															Tanggal Pengembalian {l.return_date}
														</p>
													</div>
													<Badge
														variant={
															daysRemaining <= 3
																? "destructive"
																: daysRemaining <= 7
																	? "secondary"
																	: "outline"
														}
													>
														{daysRemaining} hari lagi
													</Badge>
												</div>
											);
										})}
							</div>
						</CardContent>
						<CardFooter>
							<Button asChild variant={"outline"} className="w-full">
								<Link to={"/dashboard/loans?status=active"}>Lihat semua</Link>
							</Button>
						</CardFooter>
					</Card>
				</section>
				<section className="w-full h-full">
					<Card className="w-full h-full">
						<CardHeader className="pb-2">
							<CardTitle>Denda Perpustakaan</CardTitle>
							<CardDescription>Denda yang harus dibayar</CardDescription>
						</CardHeader>
						<CardContent className="max-h-[300px] overflow-auto h-full w-full">
							<div className="space-y-4">
								{fineList &&
									fineList.results.length > 0 &&
									fineList.results
										.sort((a, b) => {
											return (
												Number.parseInt(b.amount) - Number.parseInt(a.amount)
											);
										})
										.map((fine) => {
											const isPending = fine.payment.status === "pending";
											return (
												<div key={fine.id} className="flex items-center gap-4">
													<div
														className={`rounded-full p-2 ${
															isPending
																? "bg-red-100 text-red-600"
																: "bg-green-100 text-green-600"
														}`}
													>
														{isPending ? (
															<AlertCircle className="h-4 w-4" />
														) : (
															<CheckCircle className="h-4 w-4" />
														)}
													</div>
													<div className="flex-1 min-w-0">
														<p className="text-sm font-medium truncate">
															{fine.loan.book.title}
														</p>
														<p className="text-xs text-muted-foreground">
															Denda: {formatToIDR(Number(fine.amount))}
														</p>
													</div>
													<Badge
														variant={isPending ? "destructive" : "secondary"}
													>
														{isPending ? "Belum Bayar" : "Lunas"}
													</Badge>
												</div>
											);
										})}
							</div>
						</CardContent>
						<CardFooter>
							<Button asChild variant={"outline"} className="w-full">
								<Link to="/dashboard/fines?status=pending">Lihat semua</Link>
							</Button>
						</CardFooter>
					</Card>
				</section>

				<section>
					<Card>
						<CardHeader>
							<CardTitle>Reservasimu yang siap</CardTitle>
							<CardDescription>
								Beberapa buku yang sedang kamu reservasi
                </CardDescription>
						</CardHeader>
						<CardContent className="max-h-[300px] overflow-auto">
							<div className="space-y-6">
								{reservationList &&
									reservationList.results.length > 0 &&
									reservationList.results.map((r) => (
										<div key={r.id} className="flex flex-col h-full w-full">
											<div className="flex gap-4 border rounded-lg p-4 w-full">
												<img
													src={r.book.img || "/placeholder.svg"}
													alt={r.book.title}
													width={80}
													height={120}
													className="rounded border object-cover"
												/>
												<div className="flex-1 min-w-0">
													<h3 className="font-medium">{r.book.title}</h3>
													<p className="text-sm text-muted-foreground">
														{r.book.author?.fullname}
													</p>
													<div className="mt-3 flex justify-between text-xs text-muted-foreground">
														<span>Tanggal Reservasi: {r.reservation_date}</span>
														<span>Tanggal Pengembalian: {r.pickup_date}</span>
													</div>
												</div>
											</div>
										</div>
									))}
							</div>
						</CardContent>
						<CardFooter>
							<Button asChild variant={"outline"} className="w-full">
								<Link to={"/dashboard/reservations?status=ready"}>Lihat semua</Link>
							</Button>
						</CardFooter>
					</Card>
				</section>
			</div>
		</div>
	);
};

export default MemberHomeContent;

