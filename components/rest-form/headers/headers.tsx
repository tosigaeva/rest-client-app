'use client';
import { HeaderItem } from '@components';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EMPTY_HEADER } from '@/constants';
import { addHeader, removeHeader } from '@/store/rest-slice';
import { RootState } from '@/store/store';
import { AppProps, Header } from '@/type';

export const RestHeaders = ({ user }: AppProps) => {
  const [header, setHeader] = useState<Header>(EMPTY_HEADER);
  const headers: Header[] = useSelector((state: RootState) => state.restData.headers);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const username = user?.uid || 'Guest';
  useEffect(() => {
    searchParams
      ?.entries()
      .forEach(([key, value]) =>
        dispatch(addHeader({ header: { headerKey: key, value }, username })),
      );
  }, []);

  function handlerAddHeader() {
    dispatch(addHeader({ header, username }));
    setHeader(EMPTY_HEADER);
  }

  return (
    <div className="space-y-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 shadow dark:bg-neutral-900">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Headers</h3>
        <Input
          className="w-40"
          onChange={(e) => setHeader((prev) => ({ ...prev, headerKey: e.target.value }))}
          placeholder="Key"
          type="text"
          value={header.headerKey}
        />
        <Input
          className="w-40"
          onChange={(e) => {
            setHeader((prev) => ({ ...prev, value: e.target.value }));
          }}
          placeholder="Value"
          type="text"
          value={header.value}
        />
        <Button onClick={handlerAddHeader} size="sm">
          Add Header
        </Button>
      </div>
      <div className="space-y-2">
        {headers.map((header, i) => (
          <div key={i}>
            {
              <HeaderItem
                header={header}
                key={`${header.headerKey}${header.value}`}
                onDelete={() => dispatch(removeHeader(header))}
              />
            }
          </div>
        ))}
      </div>
    </div>
  );
};
