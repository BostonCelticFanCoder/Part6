import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import AnecdoteForm from './components/anecdoteForm'
import AnecdoteList from './components/anecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import {initializeAnecdotes} from './reducers/anecdoteReducer'



const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  })
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App