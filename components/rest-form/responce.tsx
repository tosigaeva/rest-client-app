export const RestResponce = () => {
  return (
    <div className="space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 shadow dark:bg-neutral-900">
      <div className="flex items-center gap-2 text-sm">
        <h3 className="font-semibold text-neutral-800 dark:text-neutral-100">Status:</h3>
        <span className="font-medium text-green-600">202</span>
      </div>
      <div className="flex items-start gap-2 text-sm">
        <h3 className="font-semibold text-neutral-800 dark:text-neutral-100">Body:</h3>
        <pre className="break-words whitespace-pre-wrap text-neutral-700 dark:text-neutral-300">
          23456789876543
        </pre>
      </div>
    </div>
  );
};
