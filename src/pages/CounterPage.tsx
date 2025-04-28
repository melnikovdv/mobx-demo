import { CounterStore } from "src/stores/CounterStore"
import { Counter } from "src/components/counter/Counter"
import { useMemo } from "react"

export function CounterPage() {
  const counterStore = useMemo(() => new CounterStore(), [])

  return (
    <div className="space-y-8">
      <h1 className="text-4xl mb-6">Counter Page</h1>
      <Counter counterStore={ counterStore } />
    </div>
  )
}
