import { makeAutoObservable, runInAction } from "mobx"
import { FakeApiClient } from "../api/FakeApiClient"

export interface Asset {
  id: number;
  assetName: string;
  assetTicker: string;
  enabled: boolean;
  lastTransactionId: number;
}

export class AssetsStore {
  assets: Asset[] = []
  isLoading: boolean = false
  error: string | null = null
  selectedAssetId: number | null = null

  constructor(private apiClient: FakeApiClient) {
    this.apiClient = apiClient
    makeAutoObservable<AssetsStore, "apiClient">(this, { apiClient: false })
  }

  /**
   * Fetches all assets from the API
   */
  async fetchAssets() {
    this.isLoading = true
    this.error = null

    try {
      const assets = await this.apiClient.fetchAssets()

      // We use runInAction because we're updating observable state after an async operation
      runInAction(() => {
        this.assets = assets
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
   * Toggles the enabled status of an asset
   * @param assetId The ID of the asset to toggle
   */
  async toggleAssetEnabled(assetId: number) {
    const asset = this.assets.find(a => a.id === assetId)
    if (!asset) return

    const updatedAsset = { ...asset, enabled: !asset.enabled }

    try {
      await this.apiClient.updateAsset(updatedAsset)

      runInAction(() => {
        // Update the asset in our local state
        const index = this.assets.findIndex(a => a.id === assetId)
        if (index !== -1) {
          this.assets[index] = updatedAsset
        }
      })
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : "Failed to update asset"
      })
    }
  }

  /**
   * Selects an asset by ID
   * @param assetId The ID of the asset to select
   */
  selectAsset(assetId: number | null) {
    this.selectedAssetId = assetId
  }

  /**
   * Returns the currently selected asset, if any
   */
  get selectedAsset(): Asset | undefined {
    if (this.selectedAssetId === null) return undefined
    return this.assets.find(asset => asset.id === this.selectedAssetId)
  }
}
