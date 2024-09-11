import { UserButton } from "@clerk/nextjs";

import { FunctionComponent } from "@/types";

export const Header: FunctionComponent = () => {
  return (
    <div className="flex justify-end p-2">
      <UserButton />
    </div>
  );
};
