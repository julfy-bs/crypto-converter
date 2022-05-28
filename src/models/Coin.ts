export default interface Coin {
  id: string;
  symbol: string;
  name: string;
  market_data: {
    current_price: {
      usd: number;
      eth: number;
      btc: number;
    }
  }
  last_updated: string;
}