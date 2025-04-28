import { RootStore } from "src/stores/RootStore.ts"
import LoadingIndicator from "./assets-list/LoadingIndicator"
import ErrorMessage from "./assets-list/ErrorMessage"
import EmptyState from "./assets-list/EmptyState"
import AssetItem from "./assets-list/AssetItem"

export interface AssetsListProps {
  rootStore: RootStore
}

export const AssetsList = ({ rootStore }: AssetsListProps) => {
  const { assetsStore } = rootStore

  const handleSelectAsset = (assetId: number) => {
    rootStore.selectAssetWithRates(assetId)
  }

  const handleToggleEnabled = (assetId: number) => {
    assetsStore.toggleAssetEnabled(assetId)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl">Assets</h2>

      { assetsStore.isLoading && <LoadingIndicator /> }

      { assetsStore.error && <ErrorMessage message={ assetsStore.error } /> }

      <div className="space-y-2">
        { assetsStore.assets.map(asset => (
          <AssetItem
            key={ asset.id }
            asset={ asset }
            isSelected={ assetsStore.selectedAssetId === asset.id }
            onSelect={ handleSelectAsset }
            onToggleEnabled={ handleToggleEnabled }
          />
        )) }
      </div>

      { assetsStore.assets.length === 0 && !assetsStore.isLoading && <EmptyState /> }
    </div>
  )
}
