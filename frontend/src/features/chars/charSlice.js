import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import charService from './charService'

const initialState = {
  chars: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new char
export const createChar = createAsyncThunk(
  'chars/create',
  async (charData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await charService.createChar(charData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user chars
export const getChars = createAsyncThunk(
  'chars/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await charService.getChars(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user char
export const deleteChar = createAsyncThunk(
  'chars/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await charService.deleteChar(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Update char
export const updateChar = createAsyncThunk(
  'chars/update',
  async (charData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await charService.updateChar(charData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const charSlice = createSlice({
  name: 'char',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createChar.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createChar.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.chars.push(action.payload)
      })
      .addCase(createChar.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getChars.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getChars.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.chars = action.payload
      })
      .addCase(getChars.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteChar.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteChar.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.chars = state.chars.filter(
          (char) => char._id !== action.payload.id
        )
      })
      .addCase(deleteChar.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = charSlice.actions
export default charSlice.reducer
