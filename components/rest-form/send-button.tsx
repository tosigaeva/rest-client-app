'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clearData } from '@/store/rest-slice';
import { RootState } from '@/store/store';
import { Locale } from '@/type';
import { setQueryParams } from '@/utils/set-query-params';

import { Button } from '../ui/button';

export const SendButton = ({ locale }: { locale: Locale }) => {
  const router = useRouter();
  const { body, headers, method, requestUrl } = useSelector((state: RootState) => state.restData);
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(!!(method && requestUrl));

  async function sendRequest() {
    const query = setQueryParams(locale || 'en', method, requestUrl, body, headers);
    router.push(query);
    dispatch(clearData());
  }

  useEffect(() => setIsValid(!!(method && requestUrl)), [method, requestUrl]);

  return (
    <>
      <div
        className={`rounded-md px-2 py-1 text-sm transition-colors duration-500 ${'bg-transparent text-red-600'}`}
      >
        {!isValid && 'Please select HTTP method and enter url'}
      </div>
      <Button disabled={!isValid} onClick={sendRequest} size="sm">
        Send Request
      </Button>
    </>
  );
};
