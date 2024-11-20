import { heading } from "../fonts";

export default async function Profile() {
  return (
    <div>
      <h3 className={`${heading.className} text-6xl text-primary m-4`}>
        Profile
      </h3>
    </div>
  );
}
