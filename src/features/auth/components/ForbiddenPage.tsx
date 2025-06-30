import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "~/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/shared/components/ui/card";

export default function ForbiddenPage() {
	const navigate = useNavigate();

	return (
		<div className="flex items-center justify-center min-h-screen bg-background p-4">
			<Card className="max-w-md text-center p-8 shadow-lg rounded-2xl">
				<CardHeader>
					<AlertTriangle className="mx-auto h-12 w-12 text-red-600" />
					<CardTitle className="mt-4 text-5xl font-extrabold text-red-700">
						Akses ditolak
					</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription className="mt-2 text-lg">
						Oops! Anda tidak punya izin untuk mengakses halaman ini.
					</CardDescription>
					<Button
						variant="outline"
						onClick={() => navigate(-1)}
						className="mt-6 w-full"
					>
						Kembali
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
