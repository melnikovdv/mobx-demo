import { CounterStore } from "src/counter/CounterStore"
import { Counter } from "src/counter/Counter"
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
