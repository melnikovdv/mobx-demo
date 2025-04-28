import { CounterStore } from "./CounterStore"

interface CounterProps {
  counterStore: CounterStore
}

export function Counter({ counterStore }: CounterProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl">Counter</h2>
      <p>Value: {counterStore.count}</p>
      <div className="flex items-center space-x-4">
        <button
          className="bg-blue-500 active:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => counterStore.increment()}
        >
          Increment
        </button>
        <button
          className="bg-red-500 active:bg-red-600 text-white px-4 py-2 rounded"
          onClick={() => counterStore.decrement()}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}
