import { formatDistance, intlFormat } from "date-fns";
// import  from "date-fns/intlFormat";
const val = formatDistance(new Date("2023-09-06T03:43:54+00:00"), new Date(), {
  addSuffix: true,
});

// console.log(val);

const result = intlFormat(new Date("2023-09-06T03:43:54+00:00"), {
  //   weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
});

// console.log(result);

const date = new Date("2023-09-06T03:43:54+00:00");
console.log(date.getTime());
