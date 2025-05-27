// src/features/weather/WeatherWidget.js
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWeather } from './weatherSlice'
import styles from './WeatherWidget.module.css'

// Mapping von Open-Meteo weathercode → Text
const codeDescriptions = {
  0:  'Klarer Himmel',
  1:  'Hauptsächlich klar',
  2:  'Teilweise bewölkt',
  3:  'Bewölkt',
  45: 'Nebel',
  48: 'Reifnebel',
  51: 'Leichter Sprühnebel',
  53: 'Mäßiger Sprühnebel',
  55: 'Dichter Sprühnebel',
  56: 'Leichter gefrierender Sprühnebel',
  57: 'Dichter gefrierender Sprühnebel',
  61: 'Leichter Regen',
  63: 'Mäßiger Regen',
  65: 'Starker Regen',
  66: 'Leichter gefrierender Regen',
  67: 'Starker gefrierender Regen',
  71: 'Leichter Schneefall',
  73: 'Mäßiger Schneefall',
  75: 'Starker Schneefall',
  77: 'Griesel',
  80: 'Leichte Regenschauer',
  81: 'Mäßige Regenschauer',
  82: 'Heftige Regenschauer',
  85: 'Leichte Schneeschauer',
  86: 'Starke Schneeschauer',
  95: 'Gewitter',
  96: 'Gewitter: leichter Hagel',
  99: 'Gewitter: starker Hagel'
}

export default function WeatherWidget() {
  const dispatch    = useDispatch()
  const { current, isLoading, error } = useSelector((state) => state.weather)

  useEffect(() => {
    dispatch(fetchWeather())
  }, [dispatch])

  if (isLoading) return <p>Lädt Wetter…</p>
  if (error)     return <p>Fehler: {error}</p>
  if (!current)  return null

  const { temperature, weathercode } = current
  const description = codeDescriptions[weathercode] || 'Unbekannt'

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <span className={styles.temp}>{temperature}°C</span>
        <span className={styles.desc}>{description}</span>
      </div>
    </div>
  )
}
