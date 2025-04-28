import React from "react"

interface ErrorMessageProps {
  error: string
}

/**
 * Component to display error messages
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      Error: { error }
    </div>
  )
}
