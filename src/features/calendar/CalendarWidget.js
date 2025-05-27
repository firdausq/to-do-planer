import React from 'react'
import Calendar from 'react-calendar'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedDate } from './calendarSlice'
import { format } from 'date-fns'
import 'react-calendar/dist/Calendar.css'
import styles from './CalendarWidget.module.css'

export default function CalendarWidget() {
  const dispatch     = useDispatch()
  const selectedDate = useSelector((s) => new Date(s.calendar.selectedDate))
  const events       = useSelector(
    (s) => s.calendar.eventsByDate[s.calendar.selectedDate] || []
  )

  const onChange = (date) => {
    const key = format(date, 'yyyy-MM-dd')
    dispatch(setSelectedDate(key))
  }

  return (
    <div className={styles.wrapper}>
      <Calendar
        onChange={onChange}
        value={selectedDate}
      />
      <div className={styles.events}>
        <h3>Termine für {selectedDate.toISOString().split('T')[0]}</h3>
        {events.length === 0 ? (
          <p>Keine Termine</p>
        ) : (
          <ul>
            {events.map((e) => (
              <li key={e.id}>
                {e.time} – {e.title}
              </li>
            ))}
          </ul>
        )}
        {/* Hier können wir später noch ein „AddEventForm“ einbauen */}
      </div>
    </div>
  )
}
