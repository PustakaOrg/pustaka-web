import { CheckCircle2, Clock } from "lucide-react";
import { Badge } from "~/shared/components/ui/badge";
import { PaymentStatus } from "~/types/entities/Payment";

const statusLabel: Record<PaymentStatus, string> = {
	pending: "Menunggu",
	done: "selesai",
};

const PaymentStatusBadge = ({ status }: { status: PaymentStatus }) => {
	return (
		<Badge variant={status === "pending" ? "default" : "secondary"}>
			<div className="flex items-center gap-1">
				{status === "pending" ? (
					<Clock className="h-3 w-3" />
				) : (
					<CheckCircle2 className="h-3 w-3" />
				)}
				<span className="capitalize">{statusLabel[status]}</span>
			</div>
		</Badge>
	);
};

export default PaymentStatusBadge;
