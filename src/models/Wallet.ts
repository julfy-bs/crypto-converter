export interface WalletItem {
  readonly id: string;
  name: string;
  value: string;
  isEditable: boolean;
}

export default interface Wallet {
  btc: WalletItem;
  eth: WalletItem;
  usd: WalletItem;
}