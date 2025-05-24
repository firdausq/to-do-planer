import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMoodImage } from './moodSlice'
import styles from './MoodImage.module.css'

export default function MoodImage() {
  const dispatch    = useDispatch()
  const { url, isLoading, error } = useSelector((state) => state.mood)

  useEffect(() => {
    dispatch(fetchMoodImage())
  }, [dispatch])

  if (isLoading) return <p>Lädt Bild…</p>
  if (error)     return <p>Fehler beim Laden: {error}</p>

  return (
    <div className={styles.container}>
      <img src={url} alt="Tagesbild" className={styles.image} />
    </div>
  )
}
