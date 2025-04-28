import React from "react"
import { formatDate, formatPrice } from "./utils"
import { AssetRate } from "src/stores/AssetRatesStore.ts"

interface RateHistoryProps {
  rates: AssetRate[]
}

/**
 * Component to display the history of asset rates in a table
 */
export const RateHistory: React.FC<RateHistoryProps> = ({ rates }) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Rate History</h3>

      { rates.length === 0 ? (
        <p className="text-gray-500">No rate history available</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment
              </th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            { rates.map(rate => (
              <tr key={ rate.id }>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ formatDate(rate.date) }</td>
                <td
                  className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ formatPrice(rate.price) }</td>
                <td className="px-6 py-4 text-sm text-gray-500">{ rate.comment }</td>
              </tr>
            )) }
            </tbody>
          </table>
        </div>
      ) }
    </div>
  )
}
