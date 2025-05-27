import React from 'react'
import Calendar from 'react-calendar'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedDate, removeEvent } from './calendarSlice'  // removeEvent importieren
import 'react-calendar/dist/Calendar.css'
import styles from './CalendarWidget.module.css'
import { format } from 'date-fns'
import AddEventForm from './AddEventForm'

export default function CalendarView() {
  const dispatch     = useDispatch()
  const selectedDate = useSelector((s) => new Date(s.calendar.selectedDate))
  const dateKey      = format(selectedDate, 'yyyy-MM-dd')
  const events       = useSelector(
    (s) => s.calendar.eventsByDate[dateKey] || []
  )

  const onChange = (date) => {
    dispatch(setSelectedDate(format(date, 'yyyy-MM-dd')))
  }

  const onDelete = (eventId) => {
    dispatch(removeEvent({ date: dateKey, eventId }))
  }

  return (
    <div className={styles.wrapper}>
      <Calendar onChange={onChange} value={selectedDate} />
      <div className={styles.events}>
        <h3>Termine für {dateKey}</h3>
        {events.length === 0 ? (
          <p>Keine Termine</p>
        ) : (
          <ul className={styles.eventList}>
            {events.map((e) => (
              <li key={e.id} className={styles.eventItem}>
               <span>
                 {e.time} – {e.title}
               </span>
               <button
                 className={styles.deleteButton}
                 onClick={() => onDelete(e.id)}
                 aria-label={`Termin "${e.title}" löschen`}
               >
                 ✕
               </button>
              </li>
            ))}
          </ul>
        )}
        <AddEventForm date={dateKey} />
      </div>
    </div>
  )
}
