export default interface CurrentData {
  id: string;
  name: string;
  symbol: string;
  price: {
    usd: number;
    btc: number;
    eth: number;
  }
}