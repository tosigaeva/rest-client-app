import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// store/headersSlice.ts
import { EMPTY_HEADER } from '@/constants';
import { Header, Headers } from '@/type';

const initialState: Headers = {
  header: EMPTY_HEADER,
  headers: [],
};

export const headersSlice = createSlice({
  initialState,
  name: 'headers',
  reducers: {
    addHeader: (state, action: PayloadAction<Header>) => {
      state.headers.push(action.payload);
      state.header = EMPTY_HEADER;
    },

    clearHeaders: (state) => {
      state.headers = [];
    },

    removeHeader: (state, action: PayloadAction<Header>) => {
      state.headers = state.headers.filter(
        (header) =>
          header.headerKey !== action.payload.headerKey || header.value !== action.payload.value,
      );
    },
  },
});

export const { addHeader, clearHeaders, removeHeader } = headersSlice.actions;

export default headersSlice.reducer;
