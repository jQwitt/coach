import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getCurrentUser } from "../actions";
import { heading } from "../fonts";

export default async function LiveCoachPage() {
  const { firstName } = await getCurrentUser();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="p-4 space-y-4">
        <Card>
          <CardHeader>
            <h3 className={`${heading.className} text-6xl text-primary`}>
              Welcome back
            </h3>
          </CardHeader>
          <CardContent>
            <p>
              It's good to see you again,
              <span className="font-bold"> {firstName}</span> - lets get back to
              training!
            </p>
          </CardContent>
        </Card>

        {/* <Button onClick={() => redirect("log-workout/lifting")}>
            Log a workout!
          </Button> */}
      </main>
    </div>
  );
}
