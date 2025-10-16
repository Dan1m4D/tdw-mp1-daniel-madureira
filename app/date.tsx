import { format } from "date-fns";

export default function DateComponent({
  dateString,
}: Readonly<{ dateString: string }>) {
  return (
    <time dateTime={dateString}>
      {format(new Date(dateString), "LLLL d, yyyy")}
    </time>
  );
}
