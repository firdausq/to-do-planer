import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  title: 'Mein Planer',   // Standard-Name
  theme: 'light',         // 'light' | 'dark' | ggf. weitere
}

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setTitle(state, action) {
      state.title = action.payload
    },
    cycleTheme(state) {
      // schlägt Themes im Array aufeinander um
      const themes = ['light', 'dark', 'blue', 'pink']
      const idx = themes.indexOf(state.theme)
      state.theme = themes[(idx + 1) % themes.length]
    },
    setTheme(state, action) {
      state.theme = action.payload
    },
  },
})

export const { setTitle, cycleTheme, setTheme } = headerSlice.actions
export default headerSlice.reducer
