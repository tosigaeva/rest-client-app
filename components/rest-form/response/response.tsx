'use client';

import { useSelector } from 'react-redux';

import { RootState } from '@/store/store';

import { BodyEditor } from '../json-editor/json-editor';

export const RestResponse = () => {
  const { error, loading, response } = useSelector((state: RootState) => state.restRequest);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!response) return <p>No response yet.</p>;

  return (
    <div className="space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 shadow dark:bg-neutral-900">
      <div className="flex items-center gap-2 text-sm">
        <h3 className="font-semibold text-neutral-800 dark:text-neutral-100">Status:</h3>
        <span className="font-medium text-green-600">{response.status}</span>
      </div>
      <div className="flex items-start gap-2 text-sm">
        <h3 className="font-semibold text-neutral-800 dark:text-neutral-100">Body:</h3>
        <div className="flex-1">
          <BodyEditor initialBody={response.data} readOnly />
        </div>
      </div>
    </div>
  );
};
