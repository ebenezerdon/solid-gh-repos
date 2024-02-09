/* @refresh reload */
import { render } from 'solid-js/web'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Router } from '@solidjs/router'
import Home from './pages/Home'
import SavedRepos from './pages/SavedRepos'

const root = document.getElementById('root') as HTMLElement

render(
  () => (
    <Router root={App}>
      <Route path="/" component={Home} />
      <Route path="/favorites" component={SavedRepos} />
    </Router>
  ),
  root,
)
