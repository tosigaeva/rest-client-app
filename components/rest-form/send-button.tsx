'use client';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

import { RootState } from '@/store/store';
import { setQueryParams } from '@/utils/set-query-params';

import { Button } from '../ui/button';

export const SendButton = () => {
  const router = useRouter();
  const { body, headers, method, url } = useSelector((state: RootState) => state.restData);

  const query = setQueryParams(method, url, body, headers);
  function sendRequest() {
    router.push(query);
  }
  const isValid = true;

  return (
    <>
      <div
        className={`rounded-md px-2 py-1 text-sm transition-colors duration-500 ${'bg-transparent text-red-600'}`}
      >
        {!isValid && 'Invalid JSON; prettify skipped'}
      </div>
      <Button onClick={() => sendRequest()} size="sm">
        Send Request
      </Button>
    </>
  );
};
