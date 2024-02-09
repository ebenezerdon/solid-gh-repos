import { Component, For, Show, createResource, createSignal } from 'solid-js'
import RepoCard, { Repo } from '../components/RepoCard'

const date = new Date()
date.setDate(date.getDate() - 7)
const formattedDate = date.toISOString().split('T')[0]

const Home: Component = () => {
  const [username, setUserName] = createSignal('')
  const baseUrl = 'https://api.github.com'

  const fetchRepos = async (username: string) => {
    const trendingReposUrl = `${baseUrl}/search/repositories?q=created:>${formattedDate}&sort=stars&order=desc&per_page=30`
    const userReposUrl = `${baseUrl}/users/${username}/repos?sort=created`
    const url = username ? userReposUrl : trendingReposUrl

    const res = await fetch(url)
    const data = await res.json()
    return data.items || data
  }

  const [repos] = createResource(username, fetchRepos)

  const refetchRepos = (event: Event) => {
    event.preventDefault()
    const usernameInput = document.querySelector('#usernameInput') as HTMLInputElement
    setUserName(usernameInput.value)
  }

  return (
    <div>
      <Show when={repos.loading}>
        <p>Loading...</p>
      </Show>

      <form class="mb-3" onSubmit={(event) => refetchRepos(event)}>
        <input type="text" class="p-1 align-middle" placeholder="Type username..." id="usernameInput" />

        <button class="btn btn-dark ms-3 w-auto" type="submit">
          Fetch
        </button>
      </form>

      <Show when={username()} fallback={<h1>Most starred repos since {formattedDate}</h1>}>
        <h3>GitHub repos for {username()}</h3>
      </Show>
      <For each={repos()}>{(repo: Repo) => <RepoCard repo={repo} />}</For>
    </div>
  )
}

export default Home
