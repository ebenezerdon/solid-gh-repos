import { Component, ComponentProps } from 'solid-js'
import Nav from './components/Nav'

const App: Component = (props: ComponentProps<'div'>) => {
  return (
    <div class="container">
      <Nav />
      {props.children}
    </div>
  )
}

export default App
