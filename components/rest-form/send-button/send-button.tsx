'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Button } from '@/components/ui/button';
import { STYLE_BUTTON } from '@/constants';
import { sendRequestThunk } from '@/store/request-slice';
import { RootState, useAppDispatch } from '@/store/store';
import { AppProps } from '@/type';
import { prepareHeaders } from '@/utils/prepare-headers';
import { setQueryParams } from '@/utils/set-query-params';

export const SendButton = ({ user }: AppProps) => {
  const dispatch = useAppDispatch();
  const { body, headers, method, requestUrl } = useSelector((state: RootState) => state.restData);

  const router = useRouter();
  const [isValid, setIsValid] = useState(!!(method && requestUrl));

  async function setUrl(query: string) {
    router.push(query);
  }

  const sendRequest = async (query: string) => {
    dispatch(
      sendRequestThunk({
        body,
        headers: prepareHeaders(headers),
        method,
        query,
        token: user ? user.uid : undefined,
        url: requestUrl,
      }),
    );
  };

  async function handleOnClick() {
    const query = setQueryParams(method, requestUrl, body, headers);
    setUrl(query);
    sendRequest(query);
  }

  useEffect(() => setIsValid(!!(method && requestUrl)), [method, requestUrl]);

  return (
    <>
      <div
        className={`rounded-md px-2 py-1 text-sm transition-colors duration-500 ${'bg-transparent text-red-600'}`}
      >
        {!isValid && 'Please select HTTP method and enter url'}
      </div>
      <Button className={STYLE_BUTTON} disabled={!isValid} onClick={handleOnClick} size="sm">
        Send Request
      </Button>
    </>
  );
};
