import ContentHeader from "~/features/dashboard/components/ContentHeader";

const DashboardBookPage = () => {
	return (
		<main className="flex flex-1 flex-col gap-6 p-6 overflow-scroll ">
			<ContentHeader
				title="Books"
				subtitle="Manage your library's book collection."
			/>
		</main>
	);
};

export default DashboardBookPage;
