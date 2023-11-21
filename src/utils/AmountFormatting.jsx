const AmountFormatting = (value) =>
   Number(parseFloat(value)).toLocaleString("en", {
      minimumFractionDigits: 2,
   });

export default AmountFormatting;
