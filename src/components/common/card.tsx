import { FunctionComponent } from "@/types";

export const Card: FunctionComponent = ({ children }) => {
  return (
    <div className="w-full bg-contentLight rounded-lg p-4">{children}</div>
  );
};
