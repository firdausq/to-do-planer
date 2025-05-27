import { configureStore } from '@reduxjs/toolkit';
import headerReducer from '../features/header/headerSlice';
import moodReducer   from '../features/moodImage/moodSlice';
import dailyNoteReducer from '../features/dailyNote/dailyNoteSlice';
import weatherReducer from '../features/weather/weatherSlice';
import calendarReducer from '../features/calendar/calendarSlice';
import todosReducer from '../features/todos/todosSlice';
import notesReducer from '../features/notes/notesSlice';

// Lege hier erstmal einen „leeren“ Reducer an
const store = configureStore({
  reducer: { 
    header: headerReducer,
    mood:   moodReducer,
    dailyNote: dailyNoteReducer,
    weather: weatherReducer,
    calendar:  calendarReducer,
    todos: todosReducer,
    notes: notesReducer,
   }
});

export default store;

