'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { sendRequestThunk } from '@/store/request-slice';
import { clearData } from '@/store/rest-slice';
import { RootState, useAppDispatch } from '@/store/store';
import { Locale } from '@/type';
import { prepareHeaders } from '@/utils/prepare-headers';
import { setQueryParams } from '@/utils/set-query-params';

import { Button } from '../ui/button';

export const SendButton = ({ locale }: { locale: Locale }) => {
  const dispatch = useAppDispatch();
  const { body, headers, method, requestUrl } = useSelector((state: RootState) => state.restData);

  const router = useRouter();
  const [isValid, setIsValid] = useState(!!(method && requestUrl));

  async function setUrl() {
    const query = setQueryParams(locale || 'en', method, requestUrl, body, headers);
    router.push(query);
    dispatch(clearData());
  }

  const sendRequest = () => {
    dispatch(
      sendRequestThunk({
        body,
        headers: prepareHeaders(headers),
        method,
        url: requestUrl,
      }),
    );
  };

  async function handleOnClick() {
    setUrl();
    sendRequest();
  }

  useEffect(() => setIsValid(!!(method && requestUrl)), [method, requestUrl]);

  return (
    <>
      <div
        className={`rounded-md px-2 py-1 text-sm transition-colors duration-500 ${'bg-transparent text-red-600'}`}
      >
        {!isValid && 'Please select HTTP method and enter url'}
      </div>
      <Button disabled={!isValid} onClick={handleOnClick} size="sm">
        Send Request
      </Button>
    </>
  );
};
