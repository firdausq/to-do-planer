import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMoodImage, setMoodImageUrl } from './moodSlice'
import styles from './MoodImage.module.css'

export default function MoodImage() {
  const dispatch    = useDispatch()
  const { url, isLoading, error } = useSelector((state) => state.mood)

  useEffect(() => {
    // Datum im Format "YYYY-MM-DD"
    const today = new Date().toISOString().split('T')[0]
    const cachedDate = localStorage.getItem('moodImageDate')
    const cachedUrl  = localStorage.getItem('moodImageUrl')

    if (cachedDate === today && cachedUrl) {
      // aus localStorage laden
      dispatch(setMoodImageUrl(cachedUrl))
    } else {
      // neues Bild laden
      dispatch(fetchMoodImage())
        .unwrap()
        .then((newUrl) => {
          // im localStorage für heute speichern
          localStorage.setItem('moodImageDate', today)
          localStorage.setItem('moodImageUrl', newUrl)
        })
        .catch(() => {
          // Fehler: nichts weiter, wird von isLoading/error im Redux-State behandelt
        })
    }
  }, [dispatch])

  if (isLoading) return <p>Lädt Bild…</p>
  if (error)     return <p>Fehler beim Laden: {error}</p>

  return (
    <div className={styles.container}>
      <img src={url} alt="Tagesbild" className={styles.image} />
    </div>
  )
}
