import { getCurrentUser } from "@/app/actions";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import UserControls from "@/components/blocks/user-controls";
import Header, { HeaderLevel } from "@/components/ui/header";

export default async function Profile() {
  const { firstName, lastName, email } = (await getCurrentUser()) || {};

  return (
    <div className="flex flex-col gap-4">
      <Header title="Profile" />
      <Card>
        <CardHeader>
          <Header title="Account" level={HeaderLevel.SECTION} />
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
          <Header title="Settings" level={HeaderLevel.SECTION} />
        </CardHeader>
        <CardContent>
          <UserControls />
        </CardContent>
      </Card>
    </div>
  );
}
