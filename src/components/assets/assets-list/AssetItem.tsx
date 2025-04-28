import { Asset } from "src/stores/AssetsStore"
import AssetStatusBadge from "./AssetStatusBadge"
import ToggleButton from "./ToggleButton"

// Asset item component
interface AssetItemProps {
  asset: Asset
  isSelected: boolean
  onSelect: (assetId: number) => void
  onToggleEnabled: (assetId: number) => void
}

const AssetItem = ({ asset, isSelected, onSelect, onToggleEnabled }: AssetItemProps) => (
  <div
    key={ asset.id }
    className={ `p-4 border rounded cursor-pointer ${
      isSelected
        ? "bg-blue-100 border-blue-500"
        : "hover:bg-gray-50 border-gray-400"
    }` }
    onClick={ () => onSelect(asset.id) }
  >
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-lg font-medium">{ asset.assetName }</h3>
        <p className="text-gray-500">{ asset.assetTicker }</p>
        <p className="text-sm">Last Transaction ID: { asset.lastTransactionId }</p>
      </div>

      <div className="flex items-center space-x-2">
        <AssetStatusBadge enabled={ asset.enabled } />
        <ToggleButton
          enabled={ asset.enabled }
          onToggle={ () => onToggleEnabled(asset.id) }
        />
      </div>
    </div>
  </div>
)

export default AssetItem
