import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "~/shared/components/ui/button";
import { Input } from "~/shared/components/ui/input";

const HeroSection = () => {
	const [searchText, setSearchText] = useState("");
	const navigate = useNavigate();

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter" && searchText.trim()) {
			navigate(`/catalog?q=${encodeURIComponent(searchText.trim())}`);
		}
	};

	const handleSearchClick = () => {
		if (searchText.trim()) {
			navigate(`/catalog?q=${encodeURIComponent(searchText.trim())}`);
		}
	};
	return (
		<section
			className="flex justify-center relative w-full py-12 md:py-24 lg:py-32 bg-cover bg-center text-white"
			style={{
				backgroundImage:
					"linear-gradient(rgba(0, 0, 0, 0.4), rgba(125, 125, 125, 0.63)), url(/background-hero.jpg)",
			}}
		>
			<div className="container px-4 md:px-6">
				<div className="items-center justify-center text-center">
					<div className="flex flex-col items-center justify-center space-y-4">
						<div className="space-y-2">
							<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
								Selamat Datang di{" "}
								<span className="bg-background/70 backdrop-blur text-primary p-0.5">
									Pustaka.{" "}
								</span>
							</h1>
							<p className="max-w-[900px] text-muted-background md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								Cari berbagai buku dan lakukan peminjaman dengan mudah...
							</p>
						</div>
						<div className="w-full max-w-2xl space-y-2 bg-secondary p-3 rounded-lg">
							<div className="relative ">
								<Search className="absolute left-2.5 top-4 h-4 w-4 text-muted-foreground" />
								<Input
									type="text"
									placeholder="Cari Judul Buku, Pengarang Atau ISBN"
									onChange={(e) => setSearchText(e.target.value)}
									onKeyDown={handleKeyDown}
									className="w-full pl-9 pr-24 py-6 text-black rounded-lg border-2 focus-visible:ring-primary"
								/>
								<Button
									className="cursor-pointer absolute right-2 top-2 h-8"
									onClick={handleSearchClick}
								>
									Cari
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
