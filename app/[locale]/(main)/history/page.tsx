import { getUserRequestHistory, RequestLog } from '@/lib/history';

export default async function History() {
  const userId = 'H9MmBQpFF1N8Vc5HXw46oSzQVbg1';
  const history: RequestLog[] = await getUserRequestHistory(userId);

  return (
    <section>
      <div className="m-full mx-auto mt-24 mb-auto px-8 pt-0 pb-8">
        <div className="space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 shadow dark:bg-neutral-900">
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
            History Requests
          </h3>
          <ul className="flex flex-col gap-2">
            {history.map((doc) => {
              const date = new Date(doc.timestamp).toDateString();
              const time = new Date(doc.timestamp).toLocaleTimeString();

              return (
                <li
                  className="flex cursor-pointer gap-3 rounded-md bg-neutral-100 px-2.5 py-3 text-sm hover:bg-neutral-200"
                  key={doc.id}
                >
                  <span>
                    {date} {time}
                  </span>
                  <span>
                    <strong>{doc.method}</strong>
                  </span>
                  <span>{doc.baseUrl}</span>
                </li>
              );
            })}
          </ul>
          <p className="font-light text-gray-500">
            Click on a request to restore it in the REST Client.
          </p>
        </div>
      </div>
    </section>
  );
}
