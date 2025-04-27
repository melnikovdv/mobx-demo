import { makeAutoObservable } from "mobx"
import { FakeApiClient } from "../api/FakeApiClient"
import { AssetsStore } from "./AssetsStore"
import { AssetRatesStore } from "./AssetRatesStore"

export class RootStore {
  apiClient: FakeApiClient
  assetsStore: AssetsStore
  assetRatesStore: AssetRatesStore

  constructor() {
    this.apiClient = new FakeApiClient()

    this.assetsStore = new AssetsStore(this.apiClient)
    this.assetRatesStore = new AssetRatesStore(this.apiClient)

    makeAutoObservable(this, { apiClient: false })
  }

  async initialize() {
    await this.assetsStore.fetchAssets()
  }

  async selectAssetWithRates(assetId: number | null) {
    // Clear rates when deselecting an asset
    if (assetId === null) {
      this.assetsStore.selectAsset(null)
      this.assetRatesStore.clearRates()
      return
    }

    this.assetsStore.selectAsset(assetId)

    await this.assetRatesStore.fetchRatesForAsset(assetId)
  }
}
