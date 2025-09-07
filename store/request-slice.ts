import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const sendRequestThunk = createAsyncThunk(
  'restClient/sendRequest',
  async (args: {
    body?: string;
    headers?: Record<string, string>;
    method: string;
    url: string;
  }) => {
    const res = await fetch('/api/proxy', {
      body: JSON.stringify(args),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });

    const result = await res.json();
    console.log('---------> result: ', result);
    return {
      data: typeof result.data === 'string' ? result.data : JSON.stringify(result.data, null, 2),
      status: result.status,
      statusText: result.ok ? 'OK' : 'Error',
    };
  },
);

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
        state.error = action.error.message ?? 'Unknown error';
      });
  },
  initialState,
  name: 'restClient',
  reducers: {},
});

export default restClientSlice.reducer;
