import { useMemo } from "react"
import { RootStore } from "src/stores/RootStore"
import { Counter } from "src/counter/Counter"
import { CounterStore } from "src/counter/CounterStore"
import { AssetsGrid } from "src/components/AssetsGrid"

export function App() {
  const rootStore = useMemo(() => {
    const store = new RootStore()
    store.initialize().catch(reason => console.error("Failed to initialize store:", reason))
    return store
  }, [])

  const counterStore: CounterStore = useMemo(() => new CounterStore(), [])

  return (
    <>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl mb-6">MobX Demo</h1>
        <div className="space-y-8">
          <Counter counterStore={ counterStore } />
          <AssetsGrid rootStore={ rootStore } />
        </div>
      </div>
    </>
  )
}
