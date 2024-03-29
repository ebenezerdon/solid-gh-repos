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

    if (!res.ok || res.status === 404) return []
    else {
      const data = await res.json()
      return data.items || data
    }
  }

  const [repos] = createResource(username, fetchRepos)

  const handleSubmit = (event: Event) => {
    event.preventDefault()
    const form = event.currentTarget as HTMLFormElement
    const formData = new FormData(form)
    const usernameInput = formData.get('username') as string
    setUserName(usernameInput)
  }

  return (
    <div>
      <Show when={repos.loading}>
        <p>Loading...</p>
      </Show>
      <form class="mb-3" onSubmit={handleSubmit}>
        <input type="text" class="p-1 align-middle" placeholder="Type username..." name="username" />

        <button class="btn btn-dark ms-3 w-auto" type="submit">
          Fetch
        </button>
      </form>

      <Show when={username()} fallback={<h1>Most starred repos since {formattedDate}</h1>}>
        <h1>GitHub repos for {username()}</h1>
      </Show>
      <Show when={repos()?.length === 0}>
        <p>No repos found. Try another username.</p>
      </Show>
      <For each={repos()}>{(repo: Repo) => <RepoCard repo={repo} />}</For>
    </div>
  )
}

export default Home
