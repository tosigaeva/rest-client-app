'use client';
import { useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { flexRow } from '@/constants/css-constants';

import { Input } from '../ui/input';

const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

export const RestMain = () => {
  const [url, setUrl] = useState<string>('');

  return (
    <div className={flexRow}>
      <Select>
        <SelectTrigger className="mb-4 flex w-[180px] gap-3">
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
        className=""
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Endpoint URL"
        type="text"
        value={url}
      />
    </div>
  );
};
