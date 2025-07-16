import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/shared/components/ui/table";
import useAboutList from "../hooks/useAboutList";
import { Button } from "~/shared/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { About } from "~/types/entities/About";
import useDeleteAbout from "../hooks/useDeleteAbout";
import useUpdateAbout from "../hooks/useUpdateAbout";

const AboutList = () => {
	const { aboutList, isPending, error } = useAboutList();
	const { deleteAbout } = useDeleteAbout();
  const { updateAbout } = useUpdateAbout()

	const handleDelete = (about: About) => {
		deleteAbout(about.id);
	};

	const handleEdit = (about: About) => {
    updateAbout({
      id: about.id,
      payload: {
        nama: "Ahmad",
        nim: "C030322111"
      }
    })
  };

	return (
		<div>
			<Table>
				<TableHeader>
					<TableRow className="bg-secondary hover:bg-secondary">
						<TableHead>Nama</TableHead>
						<TableHead>NIM</TableHead>
						<TableHead className="text-right">Aksi</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{aboutList?.results.map((about) => (
						<TableRow>
							<TableCell className="w-[400px]">
								<p className="font-medium">{about.nama}</p>
							</TableCell>
							<TableCell>
								<p>{about.nim}</p>
							</TableCell>

							<TableCell
								className="flex justify-end gap-1"
								onClick={() => handleEdit(about)}
							>
								<Button size={"icon"}>
									<Edit />
								</Button>

								<Button
									size={"icon"}
									variant={"destructive"}
									onClick={() => handleDelete(about)}
								>
									<Trash />
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default AboutList;
