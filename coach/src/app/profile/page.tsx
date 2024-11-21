import { heading } from "../fonts";
import { getCurrentUser } from "../actions";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import UserControls from "@/components/blocks/user-controls";

export default async function Profile() {
  const { firstName, lastName, email } = await getCurrentUser();

  return (
    <div className="flex flex-col gap-4">
      <h3 className={`${heading.className} text-6xl text-primary my-4`}>
        Profile
      </h3>
      <Card>
        <CardHeader>
          <h5 className={`${heading.className} text-3xl text-primary my-1`}>
            Account
          </h5>
        </CardHeader>
        <CardContent>
          <p>
            {firstName} {lastName}
          </p>
          <p>{email}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <h5 className={`${heading.className} text-3xl text-primary my-1`}>
            Settings
          </h5>
        </CardHeader>
        <CardContent>
          <UserControls />
        </CardContent>
      </Card>
    </div>
  );
}
