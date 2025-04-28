// Toggle button component
interface ToggleButtonProps {
  enabled: boolean
  onToggle: () => void
}

const ToggleButton = ({ enabled, onToggle }: ToggleButtonProps) => (
  <button
    className={ `px-3 py-1 rounded text-white ${
      enabled
        ? "bg-red-500 hover:bg-red-600"
        : "bg-green-500 hover:bg-green-600"
    }` }
    onClick={ (e) => {
      e.stopPropagation() // Prevent selecting the asset when clicking the button
      onToggle()
    } }
  >
    { enabled ? "Disable" : "Enable" }
  </button>
)

export default ToggleButton
