export const formatCurrency = (value: number, currency = 'usd', style = 'currency', locales = 'eu-EU'): string | number => {
  if (value && !isNaN(value)) {
    return new Intl.NumberFormat(locales, { style, currency }).format(value).toString()
  } else {
    return value
  }
}