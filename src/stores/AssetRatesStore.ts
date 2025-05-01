import { makeAutoObservable, runInAction } from "mobx"
import { FakeApiClient } from "../api/FakeApiClient"

export interface AssetRate {
  id: number;
  assetId: number;
  date: Date;
  price: number;
  comment: string;
}

export class AssetRatesStore {
  rates: AssetRate[] = []
  isLoading: boolean = false
  error: string | null = null

  constructor(private apiClient: FakeApiClient) {
    makeAutoObservable<AssetRatesStore, "apiClient">(this, { apiClient: false })
  }

  /**
   * Fetches rates for a specific asset
   * @param assetId The ID of the asset to fetch rates for
   */
  async fetchRatesForAsset(assetId: number) {
    this.isLoading = true
    this.error = null

    try {
      const rates = await this.apiClient.fetchAssetRates(assetId)

      runInAction(() => {
        this.rates = rates
        this.isLoading = false
      })
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : "An unknown error occurred"
        this.isLoading = false
      })
    }
  }

  /**
   * Adds a new rate for an asset
   * @param assetId The ID of the asset
   * @param price The price value
   * @param comment A comment about the rate
   */
  async addRate(assetId: number, price: number, comment: string) {
    const newRate: Omit<AssetRate, "id"> = {
      assetId,
      date: new Date(),
      price,
      comment
    }

    try {
      const addedRate = await this.apiClient.addAssetRate(newRate as AssetRate)

      runInAction(() => {
        this.rates.push(addedRate)
      })

      return addedRate
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : "Failed to add rate"
      })
      return null
    }
  }

  /**
   * Clears the current rates data
   */
  clearRates() {
    this.rates = []
  }

  /**
   * Returns rates sorted by date (newest first)
   */
  get sortedRates(): AssetRate[] {
    return [...this.rates].sort((a, b) => b.date.getTime() - a.date.getTime())
  }

  /**
   * Returns the latest rate for the current asset
   */
  get latestRate(): AssetRate | undefined {
    if (this.rates.length === 0) return undefined
    return this.sortedRates[0]
  }
}
