// src/features/calendar/CalendarView.js
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedDate, removeEvent } from './calendarSlice'
import { format } from 'date-fns'
import AddEventForm from './AddEventForm'
import styles from './CalendarView.module.css'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Hilfsfunktion: Vergleicht zwei Date-Objekte nur nach Jahr/Monat/Tag
function isSameDate(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

// Hilfsfunktion: Erzeugt Array aller Date-Objekte im Monat [1 .. daysInMonth]
function getDatesOfMonth(year, month) {
  const dates = []
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0) // letzter Tag dieses Monats
  for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
    dates.push(new Date(d))
  }
  return dates
}

export default function CalendarView() {
  const dispatch = useDispatch()

  // Aus Redux holen: selectedDate als String 'yyyy-MM-dd'
  const selectedDateString = useSelector((s) => s.calendar.selectedDate)
  // In Date-Objekt umwandeln
  const selectedDate = new Date(selectedDateString)

  // Key fürs Events-Lookup
  const dateKey = format(selectedDate, 'yyyy-MM-dd')
  const events = useSelector(
    (s) => s.calendar.eventsByDate[dateKey] || []
  )

  // State für aktuell angezeigten Monat + Jahr
  const today = new Date()
  const [year, setYear]   = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth()) // 0 = Jan, 11 = Dez

  // 1. Array: alle Tage im aktuellen Monat
  const allDates = getDatesOfMonth(year, month)

  // 2. Berechne Wochentag des 1. Tag im Monat (0=So,1=Mo,…,6=Sa)
  const startWeekday = new Date(year, month, 1).getDay()
  // Für Mo-basiertes Raster: Montag = getDay() 1 → offset 0; …; Sonntag = 0 → offset 6
  const offset = startWeekday === 0 ? 6 : startWeekday - 1

  // 3. Erzeuge 7×6 = 42 Slots (null = leere Zelle), fülle ab offset mit Datum-Objekten
  const totalCells = 7 * 6
  const cells = Array(totalCells).fill(null)
  for (let i = 0; i < allDates.length; i++) {
    cells[offset + i] = allDates[i]
  }

  // Wenn der user den Monat wechselt und selectedDate nicht mehr hineinpasst, markieren wir neu
  useEffect(() => {
    if (
      selectedDate.getFullYear() !== year ||
      selectedDate.getMonth() !== month
    ) {
      // Wenn das bisher gewählte Datum in einem anderen Monat liegt, setzen wir es zurück
      // (optional: statt zurücksetzen → automatisch auf den 1. des Monats setzen)
      dispatch(setSelectedDate(format(new Date(year, month, 1), 'yyyy-MM-dd')))
    }
  }, [year, month, selectedDate, dispatch])

  // Klick-Handler: Setze Redux‐State auf diesen Tag (String-Format 'yyyy-MM-dd')
  const handleDayClick = (dateObj) => {
    const newKey = format(dateObj, 'yyyy-MM-dd')
    dispatch(setSelectedDate(newKey))
  }

  // Lösch-Handler für Termine
  const handleDelete = (eventId) => {
    dispatch(removeEvent({ date: dateKey, eventId }))
  }

  // Monats‐Überschrift: Z.B. „3. Quartal 2025“ oder „März 2025“ – hier: nur Zahlen
  const monthLabel = `${month + 1}/${year}`

  // Navigations-Buttons: Vorheriger/ Nächster Monat
  const prevMonth = () => {
    if (month === 0) {
      setYear(year - 1)
      setMonth(11)
    } else {
      setMonth(month - 1)
    }
  }
  const nextMonth = () => {
    if (month === 11) {
      setYear(year + 1)
      setMonth(0)
    } else {
      setMonth(month + 1)
    }
  }

  return (
    <div className={styles.wrapper}>
      {/* Kalender-Bereich */}
      <div className={styles.calendar}>
        {/* Header mit Pfeilen und Monat/Jahr */}
        <div className={styles.header}>
          <button
            className={styles.previousBtn}
            onClick={prevMonth}
            aria-label="Vorheriger Monat"
          >
            <ChevronLeft color="white" size={18} />
          </button>

          <div className={styles.monthYear}>{monthLabel}</div>

          <button
            className={styles.nextBtn}
            onClick={nextMonth}
            aria-label="Nächster Monat"
          >
            <ChevronRight color="white" size={18} />
          </button>
        </div>

        {/* Wochentags-Zeile */}
        <div className={styles.days}>
          <div className={styles.day}>Mo</div>
          <div className={styles.day}>Di</div>
          <div className={styles.day}>Mi</div>
          <div className={styles.day}>Do</div>
          <div className={styles.day}>Fr</div>
          <div className={styles.day}>Sa</div>
          <div className={styles.day}>So</div>
        </div>

        {/* Datums-Raster: 7 Spalten × 6 Zeilen */}
        <div className={styles.dates}>
          {cells.map((dateObj, idx) => {
            if (!dateObj) {
              // Leere Zelle (kein Datum)
              return <div key={idx} className={styles.dateEmpty} />
            }

            // Prüfen, ob heute
            const isToday = isSameDate(dateObj, new Date())
            // Prüfen, ob ausgewählt
            const isSelected = isSameDate(dateObj, selectedDate)

            // Klassen zusammensetzen
            const classNames = [
              styles.date,
              isSelected
                ? styles.dateSelected
                : isToday
                ? styles.dateToday
                : ''
            ]
              .join(' ')
              .trim()

            return (
              <div
                key={idx}
                className={classNames}
                onClick={() => handleDayClick(dateObj)}
              >
                {dateObj.getDate()}
              </div>
            )
          })}
        </div>
      </div>

      {/* Events-Bereich unterhalb des Kalenders */}
      <div className={styles.events}>
        <h3>Termine</h3>
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
                  onClick={() => handleDelete(e.id)}
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
