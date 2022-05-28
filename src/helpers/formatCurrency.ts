export const formatCurrency = (value: number, currency = 'usd', style = 'currency', locales = 'eu-EU'): string => {
  return new Intl.NumberFormat(locales, { style, currency }).format(value)
}