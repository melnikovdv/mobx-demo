// Error message component
interface ErrorMessageProps {
  message: string
}

const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
    Error: { message }
  </div>
)

export default ErrorMessage
