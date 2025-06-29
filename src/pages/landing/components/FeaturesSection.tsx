import {
	Bell,
	BookMarked,
	QrCode,
} from "lucide-react";
import { Card, CardContent } from "~/shared/components/ui/card";

const FeaturesSection = () => {
	return (
		<section className="flex justify-center w-full py-12 md:py-24 lg:py-32">
			<div className="container px-4 md:px-6">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<div className="space-y-2">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
							Fitur-fitur pada Pustaka.
						</h2>
						<p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
							Sistem Ini memiliki beragam fitur-fitur unggulan yang dapat
							memudahkan pengelolaan perpustakaan yang bermanfaat bagi semua..
						</p>
					</div>
				</div>
				<div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
					<Card className="size-full">
						<CardContent className="pt-6 duration-300 ease-in-out hover:scale-105">
							<div className="flex flex-col items-center space-y-2 text-center">
								<BookMarked className="h-12 w-12 text-primary" />
								<h3 className="text-xl font-bold">
									Perhitungan Denda Otomatis
								</h3>
								<p className="text-sm text-muted-foreground">
									Sistem Otomatis melakukan perhitungan denda
								</p>
							</div>
						</CardContent>
					</Card>
					<Card className="size-full">
						<CardContent className="pt-6 duration-300 ease-in-out hover:scale-105">
							<div className="flex flex-col items-center space-y-2 text-center">
								<Bell className="h-12 w-12 text-primary" />
								<h3 className="text-xl font-bold">Notifikasi Whatsapp</h3>
								<p className="text-sm text-muted-foreground">
									Memberikan notifikasi Whatsapp ketika peminjaman dan reservasi
								</p>
							</div>
						</CardContent>
					</Card>
					<Card className="size-full">
						<CardContent className="pt-6 duration-300 ease-in-out hover:scale-105">
							<div className="flex flex-col items-center space-y-2 text-center">
								<QrCode className="h-12 w-12 text-primary" />
								<h3 className="text-xl font-bold">Pencarian Dengan QR</h3>
								<p className="text-sm text-muted-foreground">
                Memudahkan pencarian anda menggunakan Scan QrCode
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
};

export default FeaturesSection;
