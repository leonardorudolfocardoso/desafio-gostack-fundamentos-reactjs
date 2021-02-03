const formatValue = (value: number | string): string =>
  Intl.NumberFormat('Brazil', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(
    typeof value === 'number' ? value : Number.parseFloat(value)
    ); // TODO DONE

export default formatValue;
