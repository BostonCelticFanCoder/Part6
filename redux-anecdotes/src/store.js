import { configureStore } from "@reduxjs/toolkit"

import anecdoteReducer, {setAnecdotes} from "./reducers/anecdoteReducer"
import anecdoteFilter from "./reducers/anecdoteFilter"
import notificationReducer from "./reducers/notificationReducer"
import anecdoteService from './services/anecdotes'

const store = configureStore({
    reducer: {
      anecdote: anecdoteReducer,
      filter: anecdoteFilter,
      notification: notificationReducer
    }
})

anecdoteService.getAll().then(notes => {
    store.dispatch(setAnecdotes(notes))
})

export default store