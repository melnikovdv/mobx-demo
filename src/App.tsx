import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Navigation } from "src/components/Navigation"
import { HomePage } from "src/pages/HomePage"
import { CounterPage } from "src/pages/CounterPage"
import { AssetsGridPage } from "src/pages/AssetsGridPage"

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={ <HomePage /> } />
            <Route path="/counter" element={ <CounterPage /> } />
            <Route path="/assets" element={ <AssetsGridPage /> } />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}
