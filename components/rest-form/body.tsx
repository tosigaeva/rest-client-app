'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setBody as setStateBody } from '@/store/header-slice';

import { Textarea } from '../ui/textarea';

export const Body = () => {
  const [body, setBody] = useState(() => '');
  const dispatch = useDispatch();

  return (
    <div className="space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 shadow dark:bg-neutral-900">
      <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Body</h3>
      <Textarea
        className="min-h-[120px] resize-y rounded-lg border-neutral-300 dark:border-neutral-700"
        onBlur={(e) => dispatch(setStateBody(e.target.value))}
        onChange={(e) => setBody(e.target.value)}
        placeholder="JSON or Text body"
        value={body}
      />
    </div>
  );
};
