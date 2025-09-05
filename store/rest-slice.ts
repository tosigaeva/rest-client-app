import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EMPTY_HEADER } from '@/constants';
import { Header, Headers, HttpMethod } from '@/type';

const initialState: Headers = {
  body: '',
  header: EMPTY_HEADER,
  headers: [],
  method: 'GET',
  url: '',
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

    sendRequest: () => {},

    setBody: (state, action: PayloadAction<string>) => {
      state.body = action.payload;
    },

    setMethod: (state, action: PayloadAction<HttpMethod>) => {
      state.method = action.payload;
    },

    setUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
  },
});

export const { addHeader, clearHeaders, removeHeader, sendRequest, setBody, setMethod, setUrl } =
  headersSlice.actions;

export default headersSlice.reducer;
