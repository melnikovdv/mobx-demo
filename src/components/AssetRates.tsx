import { useState } from "react"
import { RootStore } from "src/stores/RootStore.ts"

export interface AssetRatesProps {
  rootStore: RootStore
}

export const AssetRates = ({ rootStore }: AssetRatesProps) => {
  const { assetsStore, assetRatesStore } = rootStore
  const selectedAsset = assetsStore.selectedAsset

  const [newPrice, setNewPrice] = useState<string>("")
  const [newComment, setNewComment] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(date)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(price)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedAsset) return

    const priceValue = parseFloat(newPrice)
    if (isNaN(priceValue) || priceValue <= 0) {
      alert("Please enter a valid price")
      return
    }

    setIsSubmitting(true)

    try {
      await assetRatesStore.addRate(selectedAsset.id, priceValue, newComment)

      // Reset form
      setNewPrice("")
      setNewComment("")
    } catch (error) {
      console.error("Failed to add rate:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!selectedAsset) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl">Asset Rates</h2>
        <p className="text-gray-500">Select an asset to view its rates.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl">Rates for { selectedAsset.assetName } ({ selectedAsset.assetTicker })</h2>
        <button
          className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
          onClick={ () => rootStore.selectAssetWithRates(null) }
        >
          Clear Selection
        </button>
      </div>

      { assetRatesStore.isLoading && <p>Loading rates...</p> }

      { assetRatesStore.error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: { assetRatesStore.error }
        </div>
      ) }

      {/* Latest rate card */ }
      { assetRatesStore.latestRate && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-medium mb-2">Latest Rate</h3>
          <div className="flex justify-between">
            <div>
              <p className="text-3xl font-bold text-blue-700">
                { formatPrice(assetRatesStore.latestRate.price) }
              </p>
              <p className="text-gray-600">{ formatDate(assetRatesStore.latestRate.date) }</p>
            </div>
            <div className="max-w-xs">
              <p className="text-gray-700 italic">"{ assetRatesStore.latestRate.comment }"</p>
            </div>
          </div>
        </div>
      ) }

      {/* Add new rate form */ }
      <div className="bg-gray-50 border rounded-lg p-4">
        <h3 className="text-lg font-medium mb-3">Add New Rate</h3>
        <form onSubmit={ handleSubmit } className="space-y-3">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              id="price"
              value={ newPrice }
              onChange={ (e) => setNewPrice(e.target.value) }
              placeholder="Enter price"
              step="0.01"
              min="0"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comment</label>
            <textarea
              id="comment"
              value={ newComment }
              onChange={ (e) => setNewComment(e.target.value) }
              placeholder="Add a comment about this rate"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              rows={ 2 }
            />
          </div>

          <button
            type="submit"
            disabled={ isSubmitting }
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            { isSubmitting ? "Adding..." : "Add Rate" }
          </button>
        </form>
      </div>

      {/* Rates history */ }
      <div>
        <h3 className="text-lg font-medium mb-3">Rate History</h3>

        { assetRatesStore.sortedRates.length === 0 ? (
          <p className="text-gray-500">No rate history available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment
                </th>
              </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              { assetRatesStore.sortedRates.map(rate => (
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
    </div>
  )
}
