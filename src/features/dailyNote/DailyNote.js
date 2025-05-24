import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setNoteForToday } from './dailyNoteSlice'
import styles from './DailyNote.module.css'
import { format } from 'date-fns'

const MAX_LEN = 300

export default function DailyNote() {
  const dispatch = useDispatch()
  const today    = format(new Date(), 'yyyy-MM-dd')
  const note     = useSelector((state) => state.dailyNote.notesByDate[today] || '')

  const onChange = (e) => {
    // Slice notwenidig? Browser verhindert bereits längere Eingabe
    dispatch(setNoteForToday(e.target.value))
  }

  return (
    <div className={styles.container}>
      <h3>Tagesnotiz ({today})</h3>
      <textarea
        className={styles.textarea}
        rows={4}
        value={note}
        onChange={onChange}
        maxLength={MAX_LEN}
        placeholder="Schreibe hier deine Notiz für heute…"
      />
      <div className={styles.counter}>
        {note.length} / {MAX_LEN}
      </div>
    </div>
  )
}
