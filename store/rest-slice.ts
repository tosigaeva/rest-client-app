import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EMPTY_HEADER } from '@/constants';
import { Header, Headers, HttpMethod } from '@/type';

const initialState: Headers = {
  body: '',
  header: EMPTY_HEADER,
  headers: [],
  method: 'GET',
  requestUrl: '',
  url: 'GET',
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

    setBody: (state, action: PayloadAction<string>) => {
      state.body = action.payload;
    },

    setMethod: (state, action: PayloadAction<HttpMethod>) => {
      state.method = action.payload;
    },

    setRequest: () => {},

    setRequestUrl: (state, action: PayloadAction<string>) => {
      state.requestUrl = action.payload;
    },
  },
});

export const {
  addHeader,
  clearHeaders,
  removeHeader,
  setBody,
  setMethod,
  setRequest,
  setRequestUrl,
} = headersSlice.actions;

export default headersSlice.reducer;
