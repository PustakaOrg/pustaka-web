import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/shared/components/ui/card";
import useWAStatus from "../hooks/useWAStatus";
import { Badge } from "~/shared/components/ui/badge";
import { AlertCircleIcon, Dot } from "lucide-react";
import {
	Alert,
	AlertDescription,
	AlertTitle,
} from "~/shared/components/ui/alert";
import WAQRCode from "./WAQRCode";

const WAStatus = () => {
	const { waStatus, isPending, isError, error } = useWAStatus();
	return (
		<Card>
			<CardHeader>
				<CardTitle>Whatsapp Connection</CardTitle>
				<CardDescription>Connect to whatsapp</CardDescription>
			</CardHeader>

			<CardContent className="space-y-6"> 
				<Alert className="text-amber-500">
					<AlertCircleIcon />
					<AlertTitle>Unofficial Whatsapp Connection.</AlertTitle>
					<AlertDescription>
						<p>Please don't use your personal account.</p>
					</AlertDescription>
				</Alert>

				{waStatus &&
					["STARTING", "FAILED", "STOPPED"].includes(waStatus.status) && (
						<Badge variant={"default"} className="bg-amber-400">
							<div className="flex items-center gap-1">
								<Dot className="h-4 w-4" />
								<span className="capitalize">Waiting....</span>
							</div>
						</Badge>
					)}
				{waStatus && waStatus.status === "SCAN_QR_CODE" && <WAQRCode />}
        {waStatus && waStatus.status === "WORKING" && waStatus.status}
			</CardContent>
		</Card>
	);
};

export default WAStatus;
