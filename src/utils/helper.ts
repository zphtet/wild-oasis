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
