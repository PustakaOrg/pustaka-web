import { useEffect, useState } from "react";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "~/shared/components/ui/avatar";
import {
	Dialog,
	DialogContent,
	DialogTitle,
} from "~/shared/components/ui/dialog";
import { Separator } from "~/shared/components/ui/separator";
import { Fine } from "~/types/entities/Fine";
import PaymentStatusBadge from "./PaymentStatusBadge";
import { differenceInDays } from "date-fns";
import { formatToIDR } from "~/shared/utils/functions";

interface LoanDetailDialogProps {
	fine: Fine;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const FineDetailDialog = ({
	fine,
	open,
	onOpenChange,
}: LoanDetailDialogProps) => {
	const [qrCodeUrl, setQrCodeUrl] = useState("");

	useEffect(() => {
		const generateQRCode = async () => {
			try {
				const QRCode = await import("qrcode");
				const url = await QRCode.toDataURL(fine.id, {
					width: 120,
					margin: 1,
					color: {
						dark: "#1f2937",
						light: "#ffffff",
					},
				});
				setQrCodeUrl(url);
			} catch (error) {
				console.error("Error generating QR code:", error);
			}
		};

		generateQRCode();
	}, []);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-md border-0 shadow-2xl rounded-2xl p-0 overflow-hidden">
				<div className="bg-background">
					<div className="bg-accent p-6 text-center border-b space-y-4">
						<DialogTitle>Detail Denda</DialogTitle>
						{qrCodeUrl && (
							<div className="inline-block bg-white p-3 rounded-xl shadow-sm mb-3">
								<img
									src={qrCodeUrl || "/placeholder.svg"}
									alt="QR Code"
									width={120}
									height={120}
									className="rounded-lg"
								/>
							</div>
						)}
						<p className="text-xs  font-mono">{fine.id}</p>

						<PaymentStatusBadge status={fine.payment.status} />
					</div>

					{/* Content */}
					<div className="p-6 space-y-6">
						{/* Member */}
						<div className="flex items-center space-x-4">
							<Avatar className="w-12 h-12">
								<AvatarImage
									src={fine.loan.borrower.profile_picture || "/placeholder.svg"}
									alt={fine.loan.borrower.account.fullname}
								/>
								<AvatarFallback className="">
									{fine.loan.borrower.account.fullname
										.split(" ")
										.map((n) => n[0])
										.join("")}
								</AvatarFallback>
							</Avatar>
							<div>
								<h3 className="font-semibold ">
									{fine.loan.borrower.account.fullname}
								</h3>
								<p className="text-sm">Member</p>
							</div>
						</div>
						{/* Book */}
						<Separator />
						<div className="flex space-x-4">
							<img
								src={fine.loan.book.img || "/placeholder.svg"}
								alt={fine.loan.book.title}
								width={60}
								height={80}
								className="rounded-lg shadow-sm object-cover flex-shrink-0"
							/>
							<div className="flex-1 min-w-0">
								<h4 className="font-semibold  leading-tight">
									{fine.loan.book.title}
								</h4>
								<p className="text-sm  mt-1">
									{fine.loan.book.author?.fullname}
								</p>
							</div>
						</div>
						<div className="bg-accent rounded-xl p-4">
							<div className="flex justify-between items-center">
								<div className="text-center">
									<p className="text-xs  uppercase tracking-wide">
										Total terlambat
									</p>
									<p className="font-semibold ">
										{differenceInDays(
											new Date(fine.loan.return_date),
											new Date(),
										)}
									</p>
								</div>
								<div className="w-8 h-px bg-accent-foreground"></div>
								<div className="text-center">
									<p className="text-xs  uppercase tracking-wide">
										Total Denda
									</p>
									<p className="font-semibold ">
										{formatToIDR(Number(fine.amount))}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default FineDetailDialog;
