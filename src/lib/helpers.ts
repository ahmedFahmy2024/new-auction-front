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

export const formatPrice = (price: string | number) => {
  return new Intl.NumberFormat("en-SA", {
    style: "currency",
    currency: "SAR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(price));
};
