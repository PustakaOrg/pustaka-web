import  { useEffect, useState } from "react";
import { Loan } from "~/types/entities/Loan";

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
import LoanStatusBadge from "./LoanStatusBadge";

interface LoanDetailDialogProps {
	loan: Loan;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const LoanDetailDialog = ({
	loan,
	open,
	onOpenChange,
}: LoanDetailDialogProps) => {
	const [qrCodeUrl, setQrCodeUrl] = useState("");

	useEffect(() => {
		const generateQRCode = async () => {
			try {
				const QRCode = await import("qrcode");
				const url = await QRCode.toDataURL(loan.id, {
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

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-md border-0 shadow-2xl rounded-2xl p-0 overflow-hidden">
				<div className="">
					<div className="bg-accent p-6 text-center border-b space-y-4">
						<DialogTitle>Detail Peminjaman</DialogTitle>
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
						<p className="text-xs  font-mono">{loan.id}</p>

						<LoanStatusBadge status={loan.status} />
					</div>

					{/* Content */}
					<div className="p-6 space-y-6">
						{/* Member */}
						<div className="flex items-center space-x-4">
							<Avatar className="w-12 h-12">
								<AvatarImage
									src={
										loan.borrower.profile_picture || "/placeholder.svg"
									}
									alt={loan.borrower.account.fullname}
								/>
								<AvatarFallback className="">
									{loan.borrower.account.fullname
										.split(" ")
										.map((n) => n[0])
										.join("")}
								</AvatarFallback>
							</Avatar>
							<div>
								<h3 className="font-semibold ">
									{loan.borrower.account.fullname}
								</h3>
								<p className="text-sm text-muted-foreground">Member</p>
							</div>
						</div>

						{/* Book */}
						<Separator />
						<div className="flex space-x-4">
							<img
								src={loan.book.img || "/placeholder.svg"}
								alt={loan.book.title}
								width={60}
								height={80}
								className="rounded-lg shadow-sm object-cover flex-shrink-0"
							/>
							<div className="flex-1 min-w-0">
								<h4 className="font-semibold  leading-tight">
									{loan.book.title}
								</h4>
								<p className="text-sm mt-1">
									{loan.book.author?.fullname}
								</p>
							</div>
						</div>
						{/* Dates */}
						<div className="bg-accent text-accent-foreground rounded-xl p-4">
							<div className="flex justify-between items-center">
								<div className="text-center">
									<p className="text-xs uppercase tracking-wide">
										Dipinjam pada
									</p>
									<p className="font-semibold ">
										{formatDate(loan.loan_date)}
									</p>
								</div>
								<div className="w-8 h-px bg-accent-foreground"></div>
								<div className="text-center">
									<p className="text-xs uppercase tracking-wide">
										Dikembalikan pada
									</p>
									<p className="font-semibold ">
										{formatDate(loan.return_date)}
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

export default LoanDetailDialog;
