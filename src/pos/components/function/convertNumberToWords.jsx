export const convertNumberToWords = (inputNumber) => {
  if (inputNumber === 0) return "Zero";

  const units = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];

  const teens = [
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];

  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  function convertLessThanOneThousand(number) {
    if (number >= 100) {
      return `${
        units[Math.floor(number / 100)]
      } Hundred ${convertLessThanOneThousand(number % 100)}`;
    } else if (number >= 10 && number <= 19) {
      return teens[number - 10];
    } else {
      return `${tens[Math.floor(number / 10)]} ${units[number % 10]}`;
    }
  }

  function convert(number) {
    if (number === 0) {
      return "";
    } else if (number < 1000) {
      return convertLessThanOneThousand(Math.floor(number));
    } else {
      let result = "";
      for (let i = 0; number > 0; i++) {
        if (number % 1000 !== 0) {
          result = `${convertLessThanOneThousand(Math.floor(number % 1000))} ${
            ["", "Thousand", "Million", "Billion"][i]
          } ${result}`;
        }
        number = Math.floor(number / 1000);
      }
      return result.trim();
    }
  }

  return convert(inputNumber);
};
