'use client';

import { useDispatch } from 'react-redux';

import { sendRequest } from '@/store/rest-slice';

import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

export const GeneratedCode = () => {
  const dispatch = useDispatch();

  return (
    <div className="space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 shadow dark:bg-neutral-900">
      <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
        Generated Code
      </h3>
      <Textarea
        className="min-h-[120px] resize-y rounded-lg border-neutral-300 dark:border-neutral-700"
        disabled
        placeholder="JSON or Text body"
        value="{body}"
      />
      <Button onClick={() => dispatch(sendRequest())} size="sm">
        Send Request
      </Button>
    </div>
  );
};
