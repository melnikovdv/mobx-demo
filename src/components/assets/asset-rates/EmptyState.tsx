import React from "react"

/**
 * Component displayed when no asset is selected
 */
export const EmptyState: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl">Asset Rates</h2>
      <p className="text-gray-500">Select an asset to view its rates.</p>
    </div>
  )
}
