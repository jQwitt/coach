import { heading } from "@/app/fonts";

export enum HeaderLevel {
  PAGE,
  SECTION,
  SUB_SECTION,
}

export default function Header({
  title,
  level = HeaderLevel.PAGE,
  className = "",
}: {
  title: string;
  level?: HeaderLevel;
  className?: string;
}) {
  if (level === HeaderLevel.PAGE) {
    return (
      <h2
        className={`${heading.className} text-6xl text-primary m-4 ${className}`}
      >
        {title}
      </h2>
    );
  }

  if (level === HeaderLevel.SECTION) {
    return (
      <h3
        className={`${heading.className} text-3xl text-primary my-1 ${className}`}
      >
        {title}
      </h3>
    );
  }

  if (level === HeaderLevel.SUB_SECTION) {
    return (
      <h6
        className={`${heading.className} text-xl text-primary my-1 ${className}`}
      >
        {title}
      </h6>
    );
  }

  return null;
}
