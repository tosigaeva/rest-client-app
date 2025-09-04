'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { HTTP_METHODS } from '@/constants';
import { setMethod, setUrl as setStateUrl } from '@/store/header-slice';
import { HttpMethod } from '@/type';

import { Input } from '../ui/input';

export const RestMain = () => {
  const [url, setUrl] = useState<string>('');
  const dispatch = useDispatch();

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 shadow dark:bg-neutral-900">
      <Select onValueChange={(value: HttpMethod) => dispatch(setMethod(value))}>
        <SelectTrigger className="w-[140px] rounded-md border-neutral-300 dark:border-neutral-700">
          <SelectValue placeholder="Method" />
        </SelectTrigger>
        <SelectContent>
          {HTTP_METHODS.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        className="min-w-[200px] flex-1"
        onBlur={(e) => dispatch(setStateUrl(e.target.value))}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Endpoint URL"
        type="text"
        value={url}
      />
    </div>
  );
};
