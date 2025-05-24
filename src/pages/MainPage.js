import React from 'react';
import Header from '../features/header/Header';
import MoodImage from '../features/moodImage/MoodImage';
import DailyNote from '../features/dailyNote/DailyNote';

export default function MainPage() {
  return (
    <div className="min-h-screen bg-var(--color-background)">
      <Header />
      <main className="p-4">
        <h2>Willkommen in deinem Dashboard</h2>
        <MoodImage />
        <DailyNote />
        {/* hier kommen deine anderen Features */}
      </main>
    </div>
  );
}
