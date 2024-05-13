import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, createAnecdote, voteAnecdote } from './request'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useReducer } from 'react'
import NotificationContext from './NotificationContex'

const App = () => {

  const queryClient = useQueryClient()

  const notificationReducer = (state, action) => {
    switch(action.type) {
        case "CREATE":
            return action.content
        case "REMOVE":
            return null
    }
  }

  const [notification, notificationDispatch] = useReducer(notificationReducer, null)


  let anecdote = []

  const result = useQuery(
    {
      queryKey: ['anecdotes'],
      queryFn: getAnecdotes,
      retry: false,
      refetchOnWindowFocus: false
    }
  )
  
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
    onError: () => {
      notificationDispatch({type: "CREATE", content: `too short anecdote, must have length 5 or more`})
      setTimeout(() => {
        notificationDispatch({type: "REMOVE"})
      }, 5000)
    }
  })


  const newVotingMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })


  const handleVote = (anecdote) => {
    newVotingMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    notificationDispatch({type: "CREATE", content: `anecdote '${anecdote.content}' voted`})
    setTimeout(() => {
      notificationDispatch({type: "REMOVE"})
    }, 5000)
  }

  const addAnecdote = (content) => {
    newAnecdoteMutation.mutate({content: content, votes: 0})
    notificationDispatch({type: "CREATE", content: `anecdote '${content}' created`})
    setTimeout(() => {
      notificationDispatch({type: "REMOVE"})
    }, 5000)
  }
  

  if (result.error) {
    return <div>anecdote service not available doe to problems in server</div>
  } else if (result.isLoading) {
    return <div>loading data...</div>
  }

  anecdote = result.data






  return (
    <div>
      <h3>Anecdote app</h3>
      <NotificationContext.Provider value={[notification, notificationDispatch]}>
        <Notification />
      </NotificationContext.Provider>

      <AnecdoteForm appendAnecdote={addAnecdote} />
    
      {anecdote.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}


export default App
