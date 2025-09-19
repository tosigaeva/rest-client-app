import { MdAccessTime, MdErrorOutline, MdOutlineDownload, MdOutlineUpload } from 'react-icons/md';

import { RequestLog } from '@/lib/history';

type Props = {
  doc: RequestLog;
};

export async function HistoryItem({ doc }: Props) {
  const date = new Date(doc.timestamp).toDateString();
  const time = new Date(doc.timestamp).toLocaleTimeString();

  const statusColor =
    doc.status >= 200 && doc.status < 300
      ? 'bg-green-100 text-green-700'
      : doc.status >= 400
        ? 'bg-red-100 text-red-700'
        : 'bg-yellow-100 text-yellow-700';

  const methodColor =
    doc.method === 'GET'
      ? 'text-blue-600'
      : doc.method === 'POST'
        ? 'text-green-600'
        : doc.method === 'DELETE'
          ? 'text-red-600'
          : 'text-purple-600';

  return (
    <li className="cursor-pointer rounded-md border-neutral-100 bg-white p-4 shadow transition hover:shadow-md">
      <a href={doc.url}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-light">
            <span className="text-gray-500">
              {date} {time}
            </span>
            <span className={`font-semibold ${methodColor}`}>{doc.method} </span>
            <span className="text-gray-800">{doc.baseUrl}</span>
          </div>
          <span className={`rounded px-2 py-1 text-xs font-medium ${statusColor}`}>
            {doc.status}
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <MdAccessTime />
            <span className="pb-0.5">{doc.latency}ms</span>
          </div>
          <div className="flex items-center gap-1">
            <MdOutlineUpload />
            <span className="pb-0.5">{doc.requestSize}B</span>
          </div>
          <span className="flex items-center gap-1">
            <MdOutlineDownload />
            <span className="pb-0.5">{doc.responseSize}B</span>
          </span>
        </div>
        {doc.error && (
          <p className="mt-2 flex items-center gap-1 text-xs text-red-600">
            <MdErrorOutline />
            <span>{doc.error}</span>
          </p>
        )}
      </a>
    </li>
  );
}
