import Wallet from '@/models/Wallet'

export type WalletKey = keyof Wallet
export type WalletValue = Wallet[WalletKey]

export interface WalletPayload<Key extends keyof Wallet,
  Value extends Wallet[Key]> {
  key: Key,
  value: Value
}