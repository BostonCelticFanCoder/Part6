import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createAnecdote = async (content) => {
    const anecdote = {content, id: Number(100000000 * Math.random()).toFixed(0), votes: 0}
    const response = await axios.post(baseUrl, anecdote)
    return response.data
}

const voteAnecdote = async (content) => {
    const anecdote = content
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
    return response.data
}

export default {getAll, createAnecdote, voteAnecdote} 