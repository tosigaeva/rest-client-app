'use client';

import { HistoryItem } from '@components';

import { RequestLog } from '@/lib/history';

type Props = {
  history: RequestLog[];
};

export function HistoryList({ history }: Props) {
  return (
    <ul className="flex flex-col gap-2">
      {history.map((doc) => (
        <HistoryItem doc={doc} key={doc.id} />
      ))}
    </ul>
  );
}
