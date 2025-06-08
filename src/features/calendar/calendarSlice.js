import { createSlice } from '@reduxjs/toolkit'
import { format } from 'date-fns'

const today = () => format(new Date(), 'yyyy-MM-dd')

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    selectedDate: today(),
    eventsByDate: {
    }
  },
  reducers: {
    setSelectedDate(state, action) {
      state.selectedDate = action.payload
    },
    addEvent(state, action) {
      const { date, event } = action.payload
      if (!state.eventsByDate[date]) {
        state.eventsByDate[date] = []
      }
      state.eventsByDate[date].push(event)
    },
    removeEvent(state, action) {
      const { date, eventId } = action.payload
      state.eventsByDate[date] = state.eventsByDate[date].filter(
        (e) => e.id !== eventId
      )
    }
  }
})

export const { setSelectedDate, addEvent, removeEvent } = calendarSlice.actions
export default calendarSlice.reducer
