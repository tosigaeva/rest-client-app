import { RequestLog } from '@/lib/history';

type Props = {
  doc: RequestLog;
};

export async function HistoryItem({ doc }: Props) {
  const date = new Date(doc.timestamp).toDateString();
  const time = new Date(doc.timestamp).toLocaleTimeString();

  return (
    <li className="cursor-pointer rounded-md bg-neutral-100 px-2.5 py-3 text-sm hover:bg-neutral-200">
      <a className="flex gap-3" href={doc.url}>
        <span>
          {date} {time}
        </span>
        <span>
          <strong>{doc.method}</strong>
        </span>
        <span>{doc.baseUrl}</span>
      </a>
    </li>
  );
}
