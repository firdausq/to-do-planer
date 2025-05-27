import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addEvent } from './calendarSlice'
import { nanoid } from '@reduxjs/toolkit'
import styles from './AddEventForm.module.css'



export default function AddEventForm({ date }) {
  const dispatch = useDispatch()
  const [time, setTime] = useState('')
  const [title, setTitle] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    if (!time || !title) return

    dispatch(
      addEvent({
        date,
        event: { id: nanoid(), time, title }
      })
    )
    setTime('')
    setTitle('')
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.field}>
        <label htmlFor="event-time">Uhrzeit</label>
        <input
          id="event-time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="event-title">Termin</label>
        <input
          id="event-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Bezeichnung"
          required
        />
      </div>
      <button type="submit" className={styles.button}>
        Hinzufügen
      </button>
    </form>
  )
}
