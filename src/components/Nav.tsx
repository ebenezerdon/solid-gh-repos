import { A } from '@solidjs/router'
import { Component } from 'solid-js'
import { savedRepos } from '../pages/SavedRepos'

const Nav: Component = () => {
  return (
    <nav class="mt-5 mb-3">
      <A href="/" end class="btn btn-primary me-2" activeClass="btn-success">
        Home
      </A>
      <A href="/favorites" class="btn btn-primary" activeClass="btn-success">
        Saved ~ {savedRepos().length}
      </A>
    </nav>
  )
}

export default Nav
