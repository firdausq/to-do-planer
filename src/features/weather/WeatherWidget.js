import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWeather } from './weatherSlice'
import styles from './WeatherWidget.module.css'

// Icons aus lucide-react importieren
import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudHail,
  CloudRain,
  CloudLightning,
  Snowflake
} from 'lucide-react'

// Mapping von Open-Meteo weathercode → Icon-Komponente
const codeToIcon = {
  0:  Sun,              // Klarer Himmel
  1:  Sun,              // Hauptsächlich klar
  2:  CloudSun,         // Teilweise bewölkt
  3:  Cloud,            // Bewölkt
  45: CloudFog,         // Nebel
  48: CloudFog,         // Reifnebel
  51: CloudFog,         // Leichter Sprühnebel
  53: CloudFog,         // Mäßiger Sprühnebel
  55: CloudFog,         // Dichter Sprühnebel
  61: CloudDrizzle,     // Leichter Regen
  63: CloudRain,        // Mäßiger Regen
  65: CloudRain,        // Starker Regen
  71: Snowflake,        // Leichter Schneefall
  73: Snowflake,        // Mäßiger Schneefall
  75: Snowflake,        // Starker Schneefall
  80: CloudRain,        // Leichte Regenschauer
  81: CloudRain,        // Mäßige Regenschauer
  82: CloudRain,        // Heftige Regenschauer
  95: CloudLightning,   // Gewitter
  96: CloudHail,        // Gewitter: Leichter Hagel
  99: CloudHail         // Gewitter: Starker Hagel
}

// Mapping von Open-Meteo weathercode → Textbeschreibung
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
  96: 'Gewitter: Leichter Hagel',
  99: 'Gewitter: Starker Hagel'
}

export default function WeatherWidget() {
  const dispatch = useDispatch()
  const { current, forecast, isLoading, error } = useSelector(
    (state) => state.weather
  )

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          dispatch(fetchWeather({ lat: latitude, lon: longitude }))
        },
        (geoError) => {
          console.warn(
            'Geolocation nicht verfügbar oder verweigert, verwende Standard-Koordinaten.',
            geoError
          )
          dispatch(fetchWeather())
        }
      )
    } else {
      console.warn('Browser unterstützt keine Geolocation-API, verwende Standard-Koordinaten.')
      dispatch(fetchWeather())
    }
  }, [dispatch])

  if (isLoading) return <p>Lädt Wetter…</p>
  if (error)     return <p>Fehler: {error}</p>
  if (!current)  return null

  const { temperature, weathercode } = current
  const description = codeDescriptions[weathercode] || 'Unbekannt'

  // Icon-Komponente für das aktuelle Wetter
  const Icon = codeToIcon[weathercode] || Sun

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        {/* Aktuelles Wetter-Icon */}
        <Icon size={100} className={styles.icon} />

        <div>
          <span className={styles.temp}>{temperature}°C</span>
          <span className={styles.desc}>{description}</span>
        </div>
      </div>

      <div className={styles.forecast}>
        {forecast.map((day) => {
          const DayIcon = codeToIcon[day.weathercode] || Sun
          return (
            <div key={day.date} className={styles.day}>
              <span className={styles.dayLabel}>
                {new Date(day.date).toLocaleDateString('de-DE', { weekday: 'short' })}
              </span>
              <DayIcon size={32} className={styles.iconSmall} />
              <span className={styles.tempSmall}>
                {day.temp_max}° / {day.temp_min}°
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
