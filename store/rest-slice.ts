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
    addHeader: (state, action: PayloadAction<{ header: Header; username: string }>) => {
      const { header, username } = action.payload;
      const variables = JSON.parse(localStorage.getItem(`variables-${username}`) || '{}');
      const processedHeader = {
        headerKey: header.headerKey,
        value: replaceVariables(header.value, variables),
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

    setBody: (state, action: PayloadAction<{ body: string; username: string }>) => {
      const { body, username } = action.payload;
      const variables = JSON.parse(localStorage.getItem(`variables-${username}`) || '{}');
      state.body = replaceVariables(body, variables);
    },

    setMethod: (state, action: PayloadAction<HttpMethod>) => {
      state.method = action.payload;
    },

    setRequestUrl: (state, action: PayloadAction<{ requestUrl: string; username: string }>) => {
      const { requestUrl, username } = action.payload;
      const variables = JSON.parse(localStorage.getItem(`variables-${username}`) || '{}');
      state.requestUrl = replaceVariables(requestUrl, variables).trim();
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
