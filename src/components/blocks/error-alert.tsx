import { AlertCircle, SquareArrowOutUpRightIcon as OpenNew } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export default function ErrorAlert({
	children,
	className,
	linkText,
	linkRoute,
	message,
}: {
	children?: React.ReactNode;
	className?: string;
	linkText?: string;
	linkRoute?: string;
	message: string;
}) {
	return (
		<Alert variant="destructive" className={`space-x-2 bg-destructive-foreground ${className}`}>
			<AlertCircle className="h-6 w-6" />
			<AlertTitle>Error</AlertTitle>
			<AlertDescription>
				<p>{message}</p>
				{linkText && (
					<Link href={linkRoute ?? ""} className="underline flex items-center">
						{linkText}
						<OpenNew className="ml-2 h-4 w-4" />
					</Link>
				)}
			</AlertDescription>
			{children}
		</Alert>
	);
}
