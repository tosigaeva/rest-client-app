'use client';
import { decode } from 'js-base64';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { HTTP_METHODS } from '@/constants';
import { setMethod, setRequestUrl } from '@/store/rest-slice';
import { AppProps, HttpMethod } from '@/type';

const DEBOUNCE_DELAY = 1000;

export const RestMain = ({ user }: AppProps) => {
  const t = useTranslations('rest-client');
  const dispatch = useDispatch();
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const username = user?.uid || 'Guest';
  const [url, setUrl] = useState<string>(() => {
    try {
      return segments[3] ? decode(segments[3]) : '';
    } catch {
      return '';
    }
  });
  useEffect(() => {
    dispatch(setRequestUrl({ requestUrl: url, username }));
    dispatch(setMethod((segments[2] as HttpMethod) || 'GET'));
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setRequestUrl({ requestUrl: url, username }));
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(handler);
  }, [url, dispatch]);

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-neutral-200 bg-fuchsia-50 p-4 shadow dark:bg-neutral-900">
      <Select
        defaultValue={segments[2] || 'GET'}
        onValueChange={(value: HttpMethod) => dispatch(setMethod(value))}
      >
        <SelectTrigger className="w-[140px] rounded-md border-neutral-300 dark:border-neutral-700">
          <SelectValue placeholder="Method" />
        </SelectTrigger>
        <SelectContent>
          {HTTP_METHODS.map((item) => (
            <SelectItem className="font-delius bg-white" key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        className="min-w-[200px] flex-1 bg-white"
        onBlur={(e) => dispatch(setRequestUrl({ requestUrl: e.target.value, username }))}
        onChange={(e) => setUrl(e.target.value)}
        placeholder={t('placeholder_url')}
        type="text"
        value={url}
      />
    </div>
  );
};
