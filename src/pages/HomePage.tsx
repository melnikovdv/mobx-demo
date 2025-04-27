import { Link } from "react-router-dom"

export function HomePage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl mb-6">MobX Demo Home</h1>
      <p className="text-xl mb-6">Welcome to the MobX Demo application!</p>

      <div className="flex flex-col space-y-4">
        <div className="flex space-x-4">
          <Link
            to="/counter"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded text-lg"
          >
            Counter Page
          </Link>
          <Link
            to="/assets"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded text-lg"
          >
            Assets Grid Page
          </Link>
        </div>
      </div>
    </div>
  )
}
