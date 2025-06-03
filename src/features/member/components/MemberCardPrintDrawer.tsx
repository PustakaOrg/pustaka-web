import  { useRef } from "react";
import {  toJpeg } from "html-to-image";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Button } from "~/shared/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/shared/components/ui/dialog";
import { Member } from "~/types/entities/Member";
import MemberCard from "./MemberCard";
import useSettings from "~/features/settings/hooks/useSettings";
import { Printer } from "lucide-react";

interface MemmberCardPrintDialogProps {
	members: Member[];
}

const MemberCardPrintDialog = ({ members }: MemmberCardPrintDialogProps) => {
	const refs = useRef<(HTMLDivElement | null)[]>([]);
	const { settings } = useSettings();

	const downloadAll = async () => {
		const zip = new JSZip();
		const folder = zip.folder("kartu-member");

		for (let i = 0; i < refs.current.length; i++) {
			const ref = refs.current[i];
			const member = members[i];

			if (!ref) continue;
			const dataUrl = await toJpeg(ref, { quality: 0.95, skipFonts: true });
			const base64 = dataUrl.split(",")[1];
			folder?.file(`kartu-${member.id}.jpg`, base64, { base64: true });
		}

		const blob = await zip.generateAsync({ type: "blob" });
		saveAs(blob, "semua-kartu-member.zip");
	};

	return (
		<Dialog>
			<DialogTrigger>Open</DialogTrigger>
			<DialogContent className="min-w-[90vw]">
				<DialogHeader>
					<DialogTitle>Cetak Kartu Anggota</DialogTitle>
				</DialogHeader>
				<div className="h-[600px] w-full overflow-scroll space-y-4 grid place-items-center">
					{members
						.map((member, index) => (
							<div>
								<MemberCard
									member={member}
									ref={(el) => (refs.current[index] = el)}
									backgroundUrl={settings?.member_card_background || ""}
								/>
							</div>
						))}
				</div>
				<DialogFooter>
					<Button className="w-full" onClick={downloadAll}>
						<Printer />
						Cetak dan Download
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default MemberCardPrintDialog;
