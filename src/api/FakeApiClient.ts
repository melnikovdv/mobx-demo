import { Asset } from "../stores/AssetsStore"
import { AssetRate } from "../stores/AssetRatesStore"

export class FakeApiClient {
  private generateRandomDelay(min: number = 200, max: number = 1500): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  private async simulateRequest<T>(data: T): Promise<T> {
    const delay = this.generateRandomDelay()
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data)
      }, delay)
    })
  }

  async fetchAssets(): Promise<Asset[]> {
    const assets: Asset[] = [
      { id: 1, assetName: "Bitcoin", assetTicker: "BTC", enabled: true, lastTransactionId: 101 },
      { id: 2, assetName: "Ethereum", assetTicker: "ETH", enabled: true, lastTransactionId: 102 },
      { id: 3, assetName: "Cardano", assetTicker: "ADA", enabled: false, lastTransactionId: 103 },
      { id: 4, assetName: "Solana", assetTicker: "SOL", enabled: true, lastTransactionId: 104 },
      { id: 5, assetName: "Polkadot", assetTicker: "DOT", enabled: false, lastTransactionId: 105 }
    ]

    return this.simulateRequest(assets)
  }

  async fetchAssetRates(assetId: number): Promise<AssetRate[]> {
    const today = new Date()

    const rates: AssetRate[] = [
      {
        id: 1,
        assetId,
        date: new Date(today.setDate(today.getDate() - 4)),
        price: 45000 + Math.random() * 1000,
        comment: "Market stabilizing"
      },
      {
        id: 2,
        assetId,
        date: new Date(today.setDate(today.getDate() + 1)),
        price: 46000 + Math.random() * 1000,
        comment: "Slight uptrend"
      },
      {
        id: 3,
        assetId,
        date: new Date(today.setDate(today.getDate() + 1)),
        price: 47000 + Math.random() * 1000,
        comment: "Bull market indicators"
      },
      {
        id: 4,
        assetId,
        date: new Date(today.setDate(today.getDate() + 1)),
        price: 46500 + Math.random() * 1000,
        comment: "Minor correction"
      },
      {
        id: 5,
        assetId,
        date: new Date(today.setDate(today.getDate() + 1)),
        price: 48000 + Math.random() * 1000,
        comment: "Strong buying pressure"
      }
    ]

    return this.simulateRequest(rates)
  }

  async updateAsset(asset: Asset): Promise<Asset> {
    return this.simulateRequest(asset)
  }

  async addAssetRate(rate: AssetRate): Promise<AssetRate> {
    const newRate = { ...rate, id: Math.floor(Math.random() * 1000) + 100 }
    return this.simulateRequest(newRate)
  }
}
