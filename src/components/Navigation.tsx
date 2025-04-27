import { NavLink } from "react-router-dom"

export function Navigation() {
  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return `px-4 py-2 ${
      isActive
        ? "bg-gray-200 text-gray-900 font-medium"
        : "text-gray-600 hover:bg-gray-100"
    } rounded transition-colors`
  }

  return (
    <nav className="bg-white shadow mb-8">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-xl font-bold text-gray-900">
              MobX Demo
            </NavLink>
          </div>
          <div className="flex space-x-4">
            <NavLink to="/" end className={ getLinkClass }>
              Home
            </NavLink>
            <NavLink to="/counter" className={ getLinkClass }>
              Counter
            </NavLink>
            <NavLink to="/assets" className={ getLinkClass }>
              Assets Grid
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}
