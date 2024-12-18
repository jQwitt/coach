import NavBarLayout from "@/components/layouts/nav-bar-layout";
import TimeSpanSelect from "./components/time-span-select";

export default function AnalyticsLayout({ children }: { children: React.ReactNode }) {
	return (
		<NavBarLayout>
			{children}
			<TimeSpanSelect />
		</NavBarLayout>
	);
}
