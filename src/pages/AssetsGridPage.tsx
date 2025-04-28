import { AssetsGrid } from "src/components/assets/AssetsGrid"
import { RootStore } from "src/stores/RootStore"
import { useMemo } from "react"

export function AssetsGridPage() {
  const rootStore = useMemo(() => {
    const store = new RootStore()
    store.initialize().catch(reason => console.error("Failed to initialize store:", reason))
    return store
  }, [])

  return (
    <div className="space-y-8">
      <h1 className="text-4xl mb-6">Assets Grid Page</h1>
      <AssetsGrid rootStore={ rootStore } />
    </div>
  )
}
