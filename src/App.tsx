import { Route, Routes } from 'solid-app-router'
import { Component } from 'solid-js'
import FavRepos from './components/FavRepos'
import Trends from './components/Trends'

const route = window.location.pathname

console.log(`route: ${route}`)

const App: Component = () => {
  return (
    <Routes>
      <Route path="/" element={<Trends />} />
      <Route path="/favrepos" element={<FavRepos />} />
    </Routes>
  )
}

export default App
