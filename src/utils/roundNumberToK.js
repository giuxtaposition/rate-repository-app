export const roundNumberToK = number => {
  if (number >= 1000) {
    number = Math.round((number / 1000) * 10) / 10;
    number += 'k';
  }

  return number;
};
