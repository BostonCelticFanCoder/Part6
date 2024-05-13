import { useDispatch } from 'react-redux'
import {createAnecdotes} from '../reducers/anecdoteReducer'
import { createNotification, removeNotification} from '../reducers/notificationReducer'


const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addNote = async () => {
        event.preventDefault()
        let content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdotes(content))
        dispatch(createNotification(`you created '${content}'`))
        setTimeout(() => {
        dispatch(removeNotification())
        }, 5000)
    }
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addNote}>
                <div><input name="anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm