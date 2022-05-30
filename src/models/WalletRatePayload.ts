import WalletRate from '@/models/WalletRate'

export type WalletRateKey = keyof WalletRate
export type WalletRateValue = WalletRate[WalletRateKey]
export type WalletRateAvailableValues = 'ethereum' | 'bitcoin'
export interface WalletRatePayload<Key extends keyof WalletRate,
  Value extends WalletRate[Key]> {
  key: Key & WalletRateAvailableValues,
  value: Value
}