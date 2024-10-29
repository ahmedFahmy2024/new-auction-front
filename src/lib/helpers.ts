export const formatReleaseDate = (
  dateString: string,
  locale: string = "en-US"
) => {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
};
