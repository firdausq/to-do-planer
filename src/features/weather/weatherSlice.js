// src/features/weather/weatherSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Standard-Koordinaten aus .env
const LAT = process.env.REACT_APP_DEFAULT_LAT
const LON = process.env.REACT_APP_DEFAULT_LON

// Holt das aktuelle Wetter von Open-Meteo
export const fetchWeather = createAsyncThunk(
  'weather/fetchCurrent',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        'https://api.open-meteo.com/v1/forecast',
        {
          params: {
            latitude: LAT,
            longitude: LON,
            current_weather: true,
            timezone: 'Europe/Berlin'
          }
        }
      )
      return {
        temperature: Math.round(data.current_weather.temperature),
        weathercode: data.current_weather.weathercode
      }
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    current:   null,    // { temperature, weathercode }
    isLoading: false,
    error:     null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.isLoading = true
        state.error     = null
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.isLoading = false
        state.current   = action.payload
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.isLoading = false
        state.error     = action.payload
      })
  }
})

export default weatherSlice.reducer
