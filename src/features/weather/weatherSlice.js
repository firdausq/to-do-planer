import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const LAT = process.env.REACT_APP_DEFAULT_LAT
const LON = process.env.REACT_APP_DEFAULT_LON

// Async-Thunk für aktuelles Wetter + 5-Tage-Forecast
// Akzeptiert nun optional ein Objekt { lat, lon }, ansonsten werden LAT/LON aus .env verwendet.
export const fetchWeather = createAsyncThunk(
  'weather/fetchCurrent',
  async (
    { lat = LAT, lon = LON } = {},    // default-Werte, falls kein Argument
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.get(
        'https://api.open-meteo.com/v1/forecast',
        {
          params: {
            latitude:        lat,
            longitude:       lon,
            current_weather: true,
            daily:           'weathercode,temperature_2m_max,temperature_2m_min',
            timezone:        'Europe/Berlin'
          }
        }
      )

      // Aktuelles Wetter
      const current = {
        temperature: Math.round(data.current_weather.temperature),
        weathercode: data.current_weather.weathercode
      }

      // Forecast-Liste bauen (heute + kommende Tage)
      const forecast = data.daily.time.map((date, i) => ({
        date,
        weathercode: data.daily.weathercode[i],
        temp_max:    Math.round(data.daily.temperature_2m_max[i]),
        temp_min:    Math.round(data.daily.temperature_2m_min[i])
      }))

      return { current, forecast }
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message)
    }
  }
)

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    current:   null,
    forecast:  [],
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
        state.current   = action.payload.current
        // Nur die nächsten 5 Tage anzeigen (slice(1,6) überspringt heute)
        state.forecast  = action.payload.forecast.slice(1, 6)
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.isLoading = false
        state.error     = action.payload
      })
  }
})

export default weatherSlice.reducer
