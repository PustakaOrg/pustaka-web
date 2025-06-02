import React from "react";
import ContentHeader from "~/features/dashboard/components/ContentHeader";
import SettingsForm from "~/features/settings/components/SettingsForm";

const DashboardSettingsPage = () => {
	return (
		<main className="flex flex-1 flex-col gap-6 p-6 overflow-scroll ">
			<ContentHeader title="Settings" subtitle="Configure Settings" />
      <SettingsForm />
		</main>
	);
};

export default DashboardSettingsPage;
