// Asset status badge component
interface AssetStatusBadgeProps {
  enabled: boolean
}

const AssetStatusBadge = ({ enabled }: AssetStatusBadgeProps) => (
  <span className={ `px-2 py-1 text-xs rounded ${
    enabled
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800"
  }` }>
    { enabled ? "Enabled" : "Disabled" }
  </span>
)

export default AssetStatusBadge
