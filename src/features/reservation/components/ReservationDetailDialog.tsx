import { useEffect, useState } from "react";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "~/shared/components/ui/avatar";
import { Dialog, DialogContent, DialogTitle } from "~/shared/components/ui/dialog";
import { Separator } from "~/shared/components/ui/separator";
import { Reservation } from "~/types/entities/Reservation";
import ReservationStatusBadge from "./ReservationStatusBadge";

interface ReservationDetailDialogProps {
	reservation: Reservation;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const ReservationDetailDialog = ({
	reservation,
	open,
	onOpenChange,
}: ReservationDetailDialogProps) => {
	const [qrCodeUrl, setQrCodeUrl] = useState("");

	useEffect(() => {
		const generateQRCode = async () => {
			try {
				const QRCode = await import("qrcode");
				const url = await QRCode.toDataURL(reservation.id, {
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
				<div className="bg-white">
					<div className="bg-gray-50 p-6 text-center border-b space-y-4">
          <DialogTitle>Detail Reservasi</DialogTitle>
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
						<p className="text-xs text-gray-500 font-mono">{reservation.id}</p>

						<ReservationStatusBadge status={reservation.status} />
					</div>

					{/* Content */}
					<div className="p-6 space-y-6">
						{/* Member */}
						<div className="flex items-center space-x-4">
							<Avatar className="w-12 h-12">
								<AvatarImage
									src={
										reservation.reservant.profile_picture || "/placeholder.svg"
									}
									alt={reservation.reservant.account.fullname}
								/>
								<AvatarFallback className="bg-gray-100 text-gray-600">
									{reservation.reservant.account.fullname
										.split(" ")
										.map((n) => n[0])
										.join("")}
								</AvatarFallback>
							</Avatar>
							<div>
								<h3 className="font-semibold text-gray-900">
									{reservation.reservant.account.fullname}
								</h3>
								<p className="text-sm text-gray-500">Member</p>
							</div>
						</div>

						{/* Book */}
						<Separator />
						<div className="flex space-x-4">
							<img
								src={reservation.book.img || "/placeholder.svg"}
								alt={reservation.book.title}
								width={60}
								height={80}
								className="rounded-lg shadow-sm object-cover flex-shrink-0"
							/>
							<div className="flex-1 min-w-0">
								<h4 className="font-semibold text-gray-900 leading-tight">
									{reservation.book.title}
								</h4>
								<p className="text-sm text-gray-500 mt-1">
									{reservation.book.author?.fullname}
								</p>
							</div>
						</div>
						{/* Dates */}
						<div className="bg-gray-50 rounded-xl p-4">
							<div className="flex justify-between items-center">
								<div className="text-center">
									<p className="text-xs text-gray-500 uppercase tracking-wide">
										Tanggal Reservasi
									</p>
									<p className="font-semibold text-gray-900">
										{formatDate(reservation.reservation_date)}
									</p>
								</div>
								<div className="w-8 h-px bg-gray-300"></div>
								<div className="text-center">
									<p className="text-xs text-gray-500 uppercase tracking-wide">
										Tanggal Pengambilan
									</p>
									<p className="font-semibold text-gray-900">
										{formatDate(reservation.pickup_date)}
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

export default ReservationDetailDialog;
