import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        createNotification(state, action) {
            return action.payload
        },
        removeNotification() {
            return ''
        }
    }
})


export const {createNotification, removeNotification} = notificationSlice.actions

export const handleNotification = (anecdote, time) => {
    return async dispatch => {
        dispatch(createNotification(`you voted for '${anecdote}'`))
        setTimeout(() => {
            dispatch(removeNotification())
        }, (time * 1000))
    }
}


export default notificationSlice.reducer