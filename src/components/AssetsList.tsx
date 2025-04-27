import { RootStore } from "src/stores/RootStore.ts"

export interface AssetsListProps {
  rootStore: RootStore
}

export const AssetsList = ({ rootStore }: AssetsListProps) => {
  const { assetsStore } = rootStore

  return (
    <div className="space-y-4">
      <h2 className="text-2xl">Assets</h2>

      { assetsStore.isLoading && <p>Loading assets...</p> }

      { assetsStore.error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: { assetsStore.error }
        </div>
      ) }

      <div className="space-y-2">
        { assetsStore.assets.map(asset => (
          <div
            key={ asset.id }
            className={ `p-4 border rounded cursor-pointer ${
              assetsStore.selectedAssetId === asset.id
                ? "bg-blue-100 border-blue-500"
                : "hover:bg-gray-50"
            }` }
            onClick={ () => rootStore.selectAssetWithRates(asset.id) }
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">{ asset.assetName }</h3>
                <p className="text-gray-500">{ asset.assetTicker }</p>
                <p className="text-sm">Last Transaction ID: { asset.lastTransactionId }</p>
              </div>

              <div className="flex items-center space-x-2">
                <span className={ `px-2 py-1 text-xs rounded ${
                  asset.enabled
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }` }>
                  { asset.enabled ? "Enabled" : "Disabled" }
                </span>

                <button
                  className={ `px-3 py-1 rounded text-white ${
                    asset.enabled
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                  }` }
                  onClick={ (e) => {
                    e.stopPropagation() // Prevent selecting the asset when clicking the button
                    assetsStore.toggleAssetEnabled(asset.id)
                  } }
                >
                  { asset.enabled ? "Disable" : "Enable" }
                </button>
              </div>
            </div>
          </div>
        )) }
      </div>

      { assetsStore.assets.length === 0 && !assetsStore.isLoading && (
        <p className="text-gray-500">No assets found.</p>
      ) }
    </div>
  )
}
