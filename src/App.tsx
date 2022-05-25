import { Route, Routes } from 'solid-app-router'
import { Component, createEffect, createSignal, lazy } from 'solid-js'
import Nav from './components/Nav'
const Home = lazy(() => import('./pages/Home'))
const SavedRepos = lazy(() => import('./pages/SavedRepos'))

const [username, setUserName] = createSignal('ebenezerdon')
const [repos, setRepos] = createSignal([])

createEffect(async () => {
  const res = await fetch(`https://api.github.com/users/${username()}/repos?sort=created`)
  setRepos(await res.json())
})

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

export { username, setUserName, repos }
export default App
