import Header from "@/components/ui/header";
import { ChartColumn } from "lucide-react";
import TimeSpanSelect from "../components/time-span-select";

export default async function AnalyticsRangeLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header title="Analytics" Icon={ChartColumn} />
			<TimeSpanSelect />
			{children}
		</>
	);
}
