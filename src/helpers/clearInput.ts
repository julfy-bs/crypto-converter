export const clearInput = (value: string): string => {
  return value
    .toString()
    .replace(',', '.')
    .replace('.00', '')
    .replace(/\$|ETH|BTC$/, '')
    .replace(/\s/g, '')
}