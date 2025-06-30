import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "~/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/shared/components/ui/card";

export default function NotFoundPage() {
	const navigate = useNavigate();

	return (
		<div className="flex items-center justify-center min-h-screen bg-background p-4">
			<Card className="max-w-md text-center p-8 shadow-lg rounded-2xl">
				<CardHeader>
					<AlertCircle className="mx-auto h-12 w-12" />
					<CardTitle className="mt-4 text-5xl font-extrabold">
						Tidak Ditemukan
					</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription className="mt-2 text-lg">
						Kami tidak menemukan halaman yang anda cari
					</CardDescription>
					<Button
						variant="outline"
						onClick={() => navigate("/")}
						className="mt-6 w-full"
					>
						Kembali
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
