import React from 'react'
import Layout from '../components/Layout'
import MoodImage      from '../features/moodImage/MoodImage'
import DailyNote     from '../features/dailyNote/DailyNote'
import WeatherWidget from '../features/weather/WeatherWidget'
import CalendarView  from '../features/calendar/CalendarView'
import TodosPanel    from '../features/todos/TodosPanel'
import NotesPanel    from '../features/notes/NotesPanel'
import styles from '../components/Layout.module.css'

export default function MainPage() {
  return (
    <Layout>
      <div style={{ gridArea: 'mood'     }}><MoodImage /></div>
      <div style={{ gridArea: 'weather'  }}><WeatherWidget /></div>
      <div style={{ gridArea: 'note'     }}><DailyNote /></div>
      <div style={{ gridArea: 'calendar' }}><CalendarView /></div>
      <div style={{ gridArea: 'rightColumn' }}>
        <div className={styles.rightStack}>
          <TodosPanel />
          <NotesPanel />
        </div>
      </div>
    </Layout>
  )
}
