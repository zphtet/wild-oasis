import { formatDistance, intlFormat } from "date-fns";

export const formatCreatedDate = (date: Date) => {
  return formatDistance(new Date(date), new Date(), {
    addSuffix: true,
  });
};

export const formatDate = (date: Date) => {
  return intlFormat(new Date(date), {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatDate2 = (date: Date) => {
  return intlFormat(new Date(date), {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "short",
  });
};

export const formatPrice = (price: number) => {
  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return USDollar.format(price);
};

export const getKey = (date: Date) => {
  return intlFormat(new Date(date), {
    month: "short",
  });
};
