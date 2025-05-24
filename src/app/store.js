import { configureStore } from '@reduxjs/toolkit';
import headerReducer from '../features/header/headerSlice';
import moodReducer   from '../features/moodImage/moodSlice'

// Lege hier erstmal einen „leeren“ Reducer an
const store = configureStore({
  reducer: { 
    header: headerReducer,
    mood:   moodReducer,
   }
});

export default store;

