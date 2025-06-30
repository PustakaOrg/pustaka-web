import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/shared/components/ui/card";
import useWAStatus from "../hooks/useWAStatus";
import { Badge } from "~/shared/components/ui/badge";
import { AlertCircleIcon, CheckCircle, Dot, Loader2 } from "lucide-react";
import {
	Alert,
	AlertDescription,
	AlertTitle,
} from "~/shared/components/ui/alert";
import WAQRCode from "./WAQRCode";
import { WAStatus as Status } from "../api/getWAStatus";

const WAStatus = () => {
	const { waStatus, isPending, isError, error } = useWAStatus();

	return (
		<Card>
			<CardHeader>
				<CardTitle>Koneksi WhatsApp</CardTitle>
				<CardDescription>Hubungkan sistem ke whatsapp</CardDescription>
			</CardHeader>

			<CardContent className="space-y-6">
				<Alert className="text-amber-500">
					<AlertCircleIcon />
					<AlertTitle>Koneksi tidak resmi.</AlertTitle>
					<AlertDescription>
						<p>Jangan gunakan akun pribadi anda.</p>
					</AlertDescription>
				</Alert>

				{waStatus &&
					["STARTING", "FAILED", "STOPPED"].includes(waStatus.status) && (
						<div className="flex flex-col lg:flex-row items-center gap-8 p-6 rounded-lg border">
							<div className="flex-shrink-0">
								<div className="p-6 rounded-full">
									<Loader2 className="h-16 w-16 animate-spin text-primary" />
								</div>
							</div>
							<div className="flex-1 text-center lg:text-left">
								<h3 className="text-xl font-semibold">
                Menyiapkan
								</h3>
								<p className="mb-4">
									Sedang menyiapkan koneksi Whatsapp...
								</p>
							</div>
						</div>
					)}
				{waStatus && waStatus.status === "SCAN_QR_CODE" && (
					<div className="border rounded-lg p-6">
						<WAQRCode />
					</div>
				)}
				{waStatus && waStatus.status === "WORKING" && (
					<div className="flex flex-col lg:flex-row items-center gap-8 p-6 rounded-lg border ">
						<div className="flex-shrink-0">
							<div className="bg-green-100 p-6 rounded-full">
								<CheckCircle className="h-16 w-16 text-green-600" />
							</div>
						</div>
						<div className="flex-1 text-center lg:text-left">
							<h3 className="text-xl font-bold ">Berhasil Terhubung!</h3>
							<p className=" mb-4">
								Notifikasi dengan whatsapp siap digunakan.
							</p>
							<div className="flex flex-wrap gap-2 justify-center lg:justify-start">
								<Badge className="bg-green-200">Koneksi aktif</Badge>
							</div>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default WAStatus;
