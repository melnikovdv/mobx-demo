import { useEffect, useMemo } from "react"
import { rootStore } from "src/stores/RootStore"
import { AssetsList } from "src/components/AssetsList"
import { AssetRates } from "src/components/AssetRates"
import { Counter } from "src/counter/Counter"
import { CounterStore } from "src/counter/CounterStore"

export function App() {
  // Initialize the root store when the component mounts
  useEffect(() => {
    rootStore.initialize()
  }, [])

  const counterStore: CounterStore = useMemo(() => new CounterStore(), [])

  return (
    <>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl mb-6">MobX Assets Demo</h1>
        <div className="space-y-8">
          <Counter counterStore={ counterStore } />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <AssetsList />
            </div>
            <div>
              <AssetRates />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
