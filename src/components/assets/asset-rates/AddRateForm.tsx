import React, { useState } from "react"

interface AddRateFormProps {
  onSubmit: (price: number, comment: string) => Promise<void>
}

/**
 * Form component for adding new asset rates
 */
export const AddRateForm: React.FC<AddRateFormProps> = ({ onSubmit }) => {
  const [newPrice, setNewPrice] = useState<string>("")
  const [newComment, setNewComment] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const priceValue = parseFloat(newPrice)
    if (isNaN(priceValue) || priceValue <= 0) {
      alert("Please enter a valid price")
      return
    }

    setIsSubmitting(true)

    try {
      await onSubmit(priceValue, newComment)

      // Reset form
      setNewPrice("")
      setNewComment("")
    } catch (error) {
      console.error("Failed to add rate:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
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
  )
}
