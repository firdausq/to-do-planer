import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from '@reduxjs/toolkit'

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todosByDate: {}
  },
  reducers: {
    addTodo(state, action) {
      const { date, text } = action.payload
      if (!state.todosByDate[date]) state.todosByDate[date] = []
      state.todosByDate[date].push({
        id: nanoid(),
        text,
        done: false
      })
    },
    toggleTodo(state, action) {
      const { date, id } = action.payload
      const list = state.todosByDate[date] || []
      const todo = list.find(t => t.id === id)
      if (todo) todo.done = !todo.done
    },
    removeTodo(state, action) {
      const { date, id } = action.payload
      state.todosByDate[date] = (state.todosByDate[date] || [])
        .filter(t => t.id !== id)
    }
  }
})

export const { addTodo, toggleTodo, removeTodo } = todosSlice.actions
export default todosSlice.reducer
