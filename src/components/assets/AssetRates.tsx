import { RootStore } from "src/stores/RootStore.ts"
import { EmptyState } from "./asset-rates/EmptyState"
import { LoadingIndicator } from "./asset-rates/LoadingIndicator"
import { ErrorMessage } from "./asset-rates/ErrorMessage"
import { LatestRateCard } from "./asset-rates/LatestRateCard"
import { AddRateForm } from "./asset-rates/AddRateForm"
import { RateHistory } from "./asset-rates/RateHistory"

export interface AssetRatesProps {
  rootStore: RootStore
}

export const AssetRates = ({ rootStore }: AssetRatesProps) => {
  const { assetsStore, assetRatesStore } = rootStore
  const selectedAsset = assetsStore.selectedAsset

  const handleAddRate = async (price: number, comment: string) => {
    if (!selectedAsset) return
    await assetRatesStore.addRate(selectedAsset.id, price, comment)
  }

  if (!selectedAsset) {
    return <EmptyState />
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl">Asset Rates</h2>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl">Rates for { selectedAsset.assetName } ({ selectedAsset.assetTicker })</h2>
        <div>
          { assetRatesStore.isLoading && <LoadingIndicator /> }
        </div>
        <button
          className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
          onClick={ () => rootStore.selectAssetWithRates(null) }
        >
          Clear Selection
        </button>
      </div>

      { assetRatesStore.error && <ErrorMessage error={ assetRatesStore.error } /> }

      { assetRatesStore.latestRate && <LatestRateCard rate={ assetRatesStore.latestRate } /> }

      <RateHistory rates={ assetRatesStore.sortedRates } />

      <AddRateForm onSubmit={ handleAddRate } />
    </div>
  )
}
