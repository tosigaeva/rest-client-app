'use client';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

import { Button } from '@/components/ui/button';
import { sendRequestThunk } from '@/store/request-slice';
import { RootState, useAppDispatch } from '@/store/store';
import { Locale } from '@/type';
import { prepareHeaders } from '@/utils/prepare-headers';
import { setQueryParams } from '@/utils/set-query-params';

export const SendButton = ({ locale }: { locale: Locale }) => {
  const dispatch = useAppDispatch();
  const { body, headers, method, requestUrl } = useSelector((state: RootState) => state.restData);

  const router = useRouter();

  async function setUrl() {
    const query = setQueryParams(locale || 'en', method, requestUrl, body, headers);
    router.push(query);
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
    if (requestUrl) {
      setUrl();
      sendRequest();
    }
  }

  return (
    <>
      <div
        className={`rounded-md px-2 py-1 text-sm transition-colors duration-500 ${'bg-transparent text-red-600'}`}
      >
        {!requestUrl && 'Please enter url'}
      </div>
      <Button onClick={handleOnClick} size="sm">
        Send Request
      </Button>
    </>
  );
};
