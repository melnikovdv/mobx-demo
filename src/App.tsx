import { useMemo } from "react"
import { CounterStore } from "./counter/CounterStore"
import { Counter } from "./counter/Counter"

function App() {

  const counterStore: CounterStore = useMemo(() => new CounterStore(), [])

  return (
    <>
      <div className="contrainer max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-4xl mb-6">MobX demo</h1>
        <div className="space-y-6">
          <Counter counterStore={counterStore} />
        </div>
      </div>
    </>
  )
}

export default App
