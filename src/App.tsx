import { Route, Routes } from 'solid-app-router'
import { Component, lazy } from 'solid-js'
import Nav from './components/Nav'
const Home = lazy(() => import('./pages/Home'))
const SavedRepos = lazy(() => import('./pages/SavedRepos'))

const App: Component = () => {
  return (
    <div class="container">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favrepos" element={<SavedRepos />} />
      </Routes>
    </div>
  )
}

export default App
