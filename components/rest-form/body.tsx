import { BodyEditor } from './json-editor';

import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

function handleSendRequest() {}

export const Body = () => {
  return (
    <div className="space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 shadow dark:bg-neutral-900">
      <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Body</h3>
      <BodyEditor />
    </div>
  );
};
