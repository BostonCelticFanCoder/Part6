import {createSlice} from '@reduxjs/toolkit'

import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote (state, action) {
      state.push(action.payload)
    },
    voteAnecdote(state, action) {
      state.splice(action.payload.index, 1, action.payload.anecdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})


export const { appendAnecdote, voteAnecdote, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdotes = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdotes = content => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.voteAnecdote(content.anecdote)
    dispatch(voteAnecdote({
      index: content.index,
      anecdote: votedAnecdote
    }))
  }
}

export default anecdoteSlice.reducer
