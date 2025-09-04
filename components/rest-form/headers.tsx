'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { EMPTY_HEADER } from '@/constants';
import { flexRow } from '@/constants/css-constants';
import { addHeader, removeHeader } from '@/store/header-slice';
import { RootState } from '@/store/store';
import { Header } from '@/type';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { HeaderItem } from './header-item';

export const RestHeaders = () => {
  const [header, setHeader] = useState<Header>(EMPTY_HEADER);
  const headers: Header[] = useSelector((state: RootState) => state.headers.headers);
  const dispatch = useDispatch();

  function handlerAddHeader(header: Header) {
    dispatch(addHeader(header));
    setHeader(EMPTY_HEADER);
  }

  return (
    <div className="headers-section">
      <div className={flexRow}>
        <h3>Headers:</h3>
        <Input
          onChange={(e) => setHeader((prev) => ({ ...prev, headerKey: e.target.value }))}
          placeholder="Key"
          type="text"
          value={header.headerKey}
        />
        <Input
          onChange={(e) => {
            setHeader((prev) => ({ ...prev, value: e.target.value }));
          }}
          placeholder="Value"
          type="text"
          value={header.value}
        />
        <Button onClick={() => handlerAddHeader(header)}>Add Header</Button>
      </div>
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
  );
};
