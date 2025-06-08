import { createSlice } from '@reduxjs/toolkit'
import { format } from 'date-fns'

const todayKey = () => format(new Date(), 'yyyy-MM-dd')

const dailyNoteSlice = createSlice({
  name: 'dailyNote',
  initialState: {
    notesByDate: {
    }
  },
  reducers: {
    setNoteForToday(state, action) {
      state.notesByDate[todayKey()] = action.payload
    },
    setNoteForDate(state, action) {
      const { date, text } = action.payload
      state.notesByDate[date] = text
    }
  }
})

export const { setNoteForToday, setNoteForDate } = dailyNoteSlice.actions
export default dailyNoteSlice.reducer
