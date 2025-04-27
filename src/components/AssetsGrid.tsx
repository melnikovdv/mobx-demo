import React from "react"
import { AssetsList } from "./AssetsList"
import { AssetRates } from "./AssetRates"
import { RootStore } from "src/stores/RootStore.ts"

export interface AssetsGridProps {
  rootStore: RootStore
}

export const AssetsGrid: React.FC<AssetsGridProps> = ({ rootStore }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <AssetsList rootStore={ rootStore } />
      </div>
      <div>
        <AssetRates rootStore={ rootStore } />
      </div>
    </div>
  )
}
