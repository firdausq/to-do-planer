import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setNoteForDate } from './dailyNoteSlice'
import styles from './DailyNote.module.css'

const MAX_LEN = 150

export default function DailyNote() {
  const dispatch = useDispatch()
  const dateKey  = useSelector(state => state.calendar.selectedDate) 
  const saved    = useSelector(state => state.dailyNote.notesByDate[dateKey] || '')
  const [value, setValue] = useState(saved)
  const textareaRef = useRef(null)

  useEffect(() => {
    setValue(saved)
  }, [saved, dateKey])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [value])

  const onChange = e => {
    const text = e.target.value
    if (text.length <= MAX_LEN) {
      setValue(text)
      dispatch(setNoteForDate({ date: dateKey, text }))
    }
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Spruch des Tages</h3>
      <textarea
        ref={textareaRef}
        className={styles.textarea}
        value={value}
        onChange={onChange}
        placeholder="Schreibe hier einen Spruch oder eine Notiz für den Tag…"
      />
      <div className={styles.counter}>
        {value.length} / {MAX_LEN}
      </div>
    </div>
  )
}
