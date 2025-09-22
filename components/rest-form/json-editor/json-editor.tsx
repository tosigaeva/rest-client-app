'use client';
import { json } from '@codemirror/lang-json';
import CodeMirror from '@uiw/react-codemirror';
import { decode } from 'js-base64';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setBody as setStateBody } from '@/store/rest-slice';
import { ServerUser } from '@/type';

export const BodyEditor = ({
  initialBody = '',
  readOnly = false,
  user = null,
}: {
  initialBody?: string;
  readOnly?: boolean;
  user?: null | ServerUser;
}) => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const [body, setBody] = useState(!readOnly ? decode(segments[4] ?? '') : '');
  const dispatch = useDispatch();
  const username = user?.uid || 'Guest';
  const [isJson, setIsJson] = useState<boolean>(() => {
    try {
      JSON.parse(body);
      return true;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!readOnly) {
      dispatch(setStateBody({ body, username }));
    }
  }, []);

  useEffect(() => {
    if (readOnly && initialBody) {
      try {
        const parsed = JSON.parse(initialBody);
        setBody(JSON.stringify(parsed, null, 2));
        setIsJson(true);
      } catch {
        setIsJson(false);
      }
    }
  }, [readOnly, initialBody]);

  const handleBlur = () => {
    dispatch(setStateBody({ body, username }));
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
        basicSetup={{
          allowMultipleSelections: true,
          foldGutter: true,
          highlightActiveLine: !readOnly,
          highlightActiveLineGutter: !readOnly,
          lineNumbers: true,
        }}
        className="max-h-[400px] min-h-[120px] w-full overflow-auto rounded-lg border border-neutral-300 dark:border-neutral-700"
        editable={!readOnly}
        extensions={extensions}
        onBlur={!readOnly ? handleBlur : undefined}
        onChange={setBody}
        value={body}
      />
      <div
        className={`rounded-md px-2 py-1 text-sm transition-colors duration-500 ${'bg-transparent text-yellow-600'}`}
      >
        {!isJson && body && !readOnly && 'Invalid JSON; prettify skipped'}
      </div>
    </>
  );
};
