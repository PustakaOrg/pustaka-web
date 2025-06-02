import ContentHeader from "~/features/dashboard/components/ContentHeader";
import SettingsForm from "~/features/settings/components/SettingsForm";
import WASettings from "~/features/settings/components/WAStatus";
import useSettings from "~/features/settings/hooks/useSettings";
import useUpdateSettings from "~/features/settings/hooks/useUpdateSettings";

const DashboardSettingsPage = () => {
	const { settings } = useSettings();
	const { updateSettings } = useUpdateSettings();
	const handleSubmit = (data: FormData) => {
		updateSettings({ data });
	};
	return (
		<main className="flex flex-1 flex-col gap-6 p-6 overflow-scroll ">
			<ContentHeader title="Settings" subtitle="Configure Settings" />
			<WASettings />
			{settings && (
				<SettingsForm
					defaultValues={{
						member_card_background: settings.member_card_background as string,
						max_loan_day: settings.max_loan_day,
						fine_per_lateday: Number(settings.fine_per_lateday),
						fine_for_lost: Number(settings.fine_for_lost),
					}}
					handleSubmit={handleSubmit}
				/>
			)}
		</main>
	);
};

export default DashboardSettingsPage;
