import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdotes } from '../reducers/anecdoteReducer'
import { handleNotification} from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === 'ALL') {
       return state.anecdote
    }
    return state.anecdote.filter(anec => anec.content.toLowerCase().includes(state.filter))
  })
  const dispatch = useDispatch()
  const vote = (id) => {
    let anecdote
    let index
    for (let i = 0; i < anecdotes.length; i++) {
      if (anecdotes[i].id == id) {
        index = i
        anecdote = anecdotes[i]
      }
    }
    dispatch(handleNotification(anecdote.content, 5))
    const votes = anecdote.votes
    dispatch(voteAnecdotes({
      anecdote: {...anecdote, votes: votes + 1},
      index: index
    }))
  }



  const compareLikes = (a,b) => {
    return b.votes - a.votes
  }


  return (
    <div>
      {[...anecdotes].sort(compareLikes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList