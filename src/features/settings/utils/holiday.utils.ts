export const formatHoliday = (
  holidayDate: Date | string,
  description: string,
): string => {
  const dateOnlyMatch =
    typeof holidayDate === "string"
      ? /^(\d{4})-(\d{2})-(\d{2})/.exec(holidayDate)
      : null;

  const date = dateOnlyMatch
    ? new Date(
        Number(dateOnlyMatch[1]),
        Number(dateOnlyMatch[2]) - 1,
        Number(dateOnlyMatch[3]),
      )
    : new Date(holidayDate);

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
  }).format(date);

  return `${formattedDate} - ${description}`;
};
