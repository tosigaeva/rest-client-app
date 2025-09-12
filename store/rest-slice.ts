import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EMPTY_HEADER } from '@/constants';
import { Header, Headers, HttpMethod } from '@/type';
import { replaceVariables } from '@/utils/replace-variables';

const initialState: Headers = {
  body: '',
  header: EMPTY_HEADER,
  headers: [],
  method: 'GET',
  requestUrl: '',
  response: '',
  url: 'GET',
};

export const headersSlice = createSlice({
  initialState,
  name: 'headers',
  reducers: {
    addHeader: (state, action: PayloadAction<Header>) => {
      const variables = JSON.parse(localStorage.getItem('variables') || '{}');
      const processedHeader = {
        headerKey: action.payload.headerKey,
        value: replaceVariables(action.payload.value, variables),
      };
      state.headers.push(processedHeader);
      state.header = EMPTY_HEADER;
    },

    clearData: () => initialState,

    removeHeader: (state, action: PayloadAction<Header>) => {
      state.headers = state.headers.filter(
        (header) =>
          header.headerKey !== action.payload.headerKey || header.value !== action.payload.value,
      );
    },

    setBody: (state, action: PayloadAction<string>) => {
      const variables = JSON.parse(localStorage.getItem('variables') || '{}');
      state.body = replaceVariables(action.payload, variables);
    },

    setMethod: (state, action: PayloadAction<HttpMethod>) => {
      state.method = action.payload;
    },

    setRequestUrl: (state, action: PayloadAction<string>) => {
      const variables = JSON.parse(localStorage.getItem('variables') || '{}');
      state.requestUrl = replaceVariables(action.payload, variables).trim();
    },

    setResponse: (state, action: PayloadAction<string>) => {
      state.response = action.payload;
    },
  },
});

export const {
  addHeader,
  clearData,
  removeHeader,
  setBody,
  setMethod,
  setRequestUrl,
  setResponse,
} = headersSlice.actions;

export default headersSlice.reducer;
