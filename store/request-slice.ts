import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const sendRequestThunk = createAsyncThunk<
  { data: string; status: number; statusText: string },
  {
    body?: string;
    headers?: Record<string, string>;
    method: string;
    query?: string;
    token?: string;
    url: string;
  },
  { rejectValue: { data: string; status: number; statusText: string } }
>('restClient/sendRequest', async (args, { rejectWithValue }) => {
  try {
    const res = await fetch('/api/proxy', {
      body: JSON.stringify(args),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });

    const result = await res.json();
    const returnValue = {
      data: !result.isJson ? result.data : JSON.stringify(result.data, null, 2),
      status: result.status,
      statusText: result.statusText,
    };

    if (!result.ok) {
      return rejectWithValue(returnValue);
    }
    return returnValue;
  } catch (err) {
    return rejectWithValue({
      data: '',
      status: 0,
      statusText: err + 'Network error',
    });
  }
});

interface RestClientState {
  error: null | string;
  loading: boolean;
  response: {
    data: string;
    status: number;
    statusText: string;
  };
}

const initialState: RestClientState = {
  error: null,
  loading: false,
  response: { data: '', status: 0, statusText: '' },
};

const restClientSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(sendRequestThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendRequestThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload;
        state.error = null;
      })
      .addCase(sendRequestThunk.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.response = action.payload;
        }
        state.error = action.error.message ?? 'Unknown error';
      });
  },
  initialState,
  name: 'restClient',
  reducers: {},
});

export default restClientSlice.reducer;
