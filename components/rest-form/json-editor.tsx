'use client';
import { json } from '@codemirror/lang-json';
import CodeMirror from '@uiw/react-codemirror';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setBody as setStateBody } from '@/store/rest-slice';

export const BodyEditor = ({ readOnly = false }: { readOnly?: boolean }) => {
  const [body, setBody] = useState('');
  const dispatch = useDispatch();
  const [isJson, setIsJson] = useState<boolean>(false);

  const handleBlur = () => {
    if (!readOnly) {
      dispatch(setStateBody(body));
    }
    prettifyJson();
  };

  const prettifyJson = () => {
    try {
      const parsed = JSON.parse(body);
      setBody(JSON.stringify(parsed, null, 2));
      setIsJson(true);
    } catch {
      setIsJson(false);
    }
  };

  const extensions = isJson ? [json()] : [];

  return (
    <>
      <CodeMirror
        className="min-h-[120px] rounded-lg border border-neutral-300 dark:border-neutral-700"
        editable={!readOnly}
        extensions={extensions}
        onBlur={handleBlur}
        onChange={setBody}
        value={body}
      />
      <div
        className={`rounded-md px-2 py-1 text-sm transition-colors duration-500 ${'bg-transparent text-red-600'}`}
      >
        {!isJson && body && 'Invalid JSON; prettify skipped'}
      </div>
    </>
  );
};
