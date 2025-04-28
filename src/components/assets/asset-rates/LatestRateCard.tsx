import React from "react"
import { formatDate, formatPrice } from "./utils"
import { AssetRate } from "src/stores/AssetRatesStore.ts"

interface LatestRateCardProps {
  rate: AssetRate
}

/**
 * Component to display the latest rate information
 */
export const LatestRateCard: React.FC<LatestRateCardProps> = ({ rate }) => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h3 className="text-lg font-medium mb-2">Latest Rate</h3>
      <div className="flex justify-between">
        <div>
          <p className="text-3xl font-bold text-blue-700">
            { formatPrice(rate.price) }
          </p>
          <p className="text-gray-600">{ formatDate(rate.date) }</p>
        </div>
        <div className="max-w-xs">
          <p className="text-gray-700 italic">"{ rate.comment }"</p>
        </div>
      </div>
    </div>
  )
}
