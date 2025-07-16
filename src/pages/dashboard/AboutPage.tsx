import AboutList from "~/features/about/components/AboutList";
import AddAboutFormDialog from "~/features/about/components/AddAboutFormDialog";
import ContentHeader from "~/features/dashboard/components/ContentHeader";

const AboutPage = () => {
	return (
		<main className="flex flex-1 flex-col gap-6 p-6 overflow-scroll ">
			<ContentHeader title="About" subtitle="Configure Settings" />
			<div className="flex flex-col gap-4">
				<AddAboutFormDialog />
				<AboutList />
			</div>
		</main>
	);
};

export default AboutPage;


