import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setNoteForDate } from './notesSlice'
import styles from './NotesPanel.module.css'

export default function NotesPanel() {
  const dispatch = useDispatch()
  const dateKey  = useSelector(s => s.calendar.selectedDate)
  const text     = useSelector(s => s.notes.notesByDate[dateKey] || '')

  const onChange = e =>
    dispatch(setNoteForDate({ date: dateKey, text: e.target.value }))

  return (
    <div className={styles.container}>
      <h3>Notizen für {dateKey}</h3>
      <textarea
        className={styles.textarea}
        rows={8}
        value={text}
        onChange={onChange}
        placeholder="Deine Notizen…"
      />
    </div>
  )
}
