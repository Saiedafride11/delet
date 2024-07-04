export const twoDigitFixed = (value) => {
  return (
    Number(value)
      ?.toFixed(2)
      // .replace(/\.?0*$/, "");
      .replace(/(\.\d*?[1-9])0*$|\.0*$|^(\d+)$/, "$1")
  );
};
