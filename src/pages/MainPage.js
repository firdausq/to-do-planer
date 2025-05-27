import React from 'react';
import Header from '../features/header/Header';
import MoodImage from '../features/moodImage/MoodImage';
import DailyNote from '../features/dailyNote/DailyNote';
import WeatherWidget from '../features/weather/WeatherWidget';
import CalendarWidget from '../features/calendar/CalendarWidget';
import TodosPanel from '../features/todos/Todos';
import NotesPanel from '../features/notes/Notes';

export default function MainPage() {
  return (
    <div className="min-h-screen bg-var(--color-background)">
      <Header />
      <main className="p-4">
        <h2>Willkommen in deinem Dashboard</h2>
        <MoodImage />
        <DailyNote />
        <WeatherWidget />
        <CalendarWidget />
        <div className="flex gap-[var(--spacing-md)]">
          <TodosPanel />
          <NotesPanel />
      </div>
      </main>
    </div>
  );
}
