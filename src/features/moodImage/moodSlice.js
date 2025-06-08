import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Zugangsdaten aus der .env
const ACCESS_KEY    = process.env.REACT_APP_UNSPLASH_ACCESS_KEY
const COLLECTION_ID = process.env.REACT_APP_UNSPLASH_COLLECTION_ID

// Async-Thunk zum Laden eines zufälligen Bildes aus deiner Collection
export const fetchMoodImage = createAsyncThunk(
  'mood/fetchImage',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        'https://api.unsplash.com/photos/random',
        {
          params: {
            client_id:    ACCESS_KEY,
            collections:  COLLECTION_ID,
            orientation:  'landscape'
          }
        }
      )
      return data.urls.regular
    } catch (err) {
      const msg =
        err.response?.data?.errors?.[0] ||
        err.response?.data?.message      ||
        err.message
      return rejectWithValue(msg)
    }
  }
)

const moodSlice = createSlice({
  name: 'mood',
  initialState: {
    url:       '',
    isLoading: false,
    error:     null
  },
  reducers: {
    // setzen wir später aus dem localStorage
    setMoodImageUrl(state, action) {
      state.url       = action.payload
      state.isLoading = false
      state.error     = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoodImage.pending, (state) => {
        state.isLoading = true
        state.error     = null
      })
      .addCase(fetchMoodImage.fulfilled, (state, action) => {
        state.isLoading = false
        state.url       = action.payload
      })
      .addCase(fetchMoodImage.rejected, (state, action) => {
        state.isLoading = false
        state.error     = action.payload
      })
  }
})

export const { setMoodImageUrl } = moodSlice.actions
export default moodSlice.reducer
