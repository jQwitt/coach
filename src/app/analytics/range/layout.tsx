import TimeSpanSelect from "../components/time-span-select";

export default async function AnalyticsRangeLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			{children}
			<TimeSpanSelect />
		</>
	);
}
