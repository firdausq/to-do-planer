import { createSlice } from '@reduxjs/toolkit'

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notesByDate: {}
  },
  reducers: {
    setNoteForDate(state, action) {
      const { date, text } = action.payload
      state.notesByDate[date] = text
    }
  }
})

export const { setNoteForDate } = notesSlice.actions
export default notesSlice.reducer
