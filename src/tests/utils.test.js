import { formatCreatedDate } from "../utils/utils";

test("Should return a formatted valid date", () => {
  const date = "2018-03-15T00:00:00.000";
  const formattedDate = formatCreatedDate(date);
  expect(formattedDate).toEqual("03/15/2018");
});

test("Should return the string '-' for an invalid date", () => {
  const date = "invalid date";
  const formattedDate = formatCreatedDate(date);
  expect(formattedDate).toEqual("-");
});
