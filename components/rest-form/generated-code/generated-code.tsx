'use client';

import { Textarea } from '@/components/ui/textarea';

export const GeneratedCode = () => {
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
    </div>
  );
};
