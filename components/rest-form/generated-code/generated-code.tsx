'use client';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PROGRAMMING_LANGUAGES } from '@/constants';
import { RootState } from '@/store/store';
import { ProgrammingLanguages, RequestData } from '@/type';
import { generateCode } from '@/utils/generate-code';
import { prepareHeaders } from '@/utils/prepare-headers';

export const GeneratedCode = () => {
  const [settings, setSettings] = useState({ client: 'curl', language: 'shell' });
  const { body, headers, method, requestUrl } = useSelector((state: RootState) => state.restData);

  if (!method) {
    return (
      <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
        Select HTTP method
      </h3>
    );
  }

  if (!requestUrl) {
    return (
      <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Enter url</h3>
    );
  }

  const request: RequestData = {
    method,
    url: requestUrl,
  };

  if (headers) {
    request.headers = prepareHeaders(headers);
  }

  if (body) {
    request.body = body;
  }

  function setLangAndCli(value: ProgrammingLanguages): { client?: string; language: string } {
    const language = PROGRAMMING_LANGUAGES[value];
    let client;
    if (language === 'shell') {
      client = 'curl';
    }
    if (language === 'javascript') {
      client = value === 'JavaScript (Fetch api)' ? 'fetch' : 'xhr';
    }
    const result: { client?: string; language: string } = { language };
    if (client) {
      result.client = client;
    }
    return result;
  }

  let code = '';
  try {
    code = generateCode(request, settings.language, settings.client);
  } catch (e) {
    code = `Failed to generate code ( ${e} )`;
  }

  return (
    <div className="flex flex-row gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 shadow dark:bg-neutral-900">
      <div className="flex flex-col items-start gap-2">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
          Generated Code
        </h3>
        <Select
          onValueChange={(value: ProgrammingLanguages) =>
            setSettings((prev) => ({ ...prev, ...setLangAndCli(value) }))
          }
          value={
            Object.keys(PROGRAMMING_LANGUAGES).find(
              (key) => PROGRAMMING_LANGUAGES[key as ProgrammingLanguages] === settings.language,
            ) ?? ''
          }
        >
          <SelectTrigger className="w-[180px] rounded-md border-neutral-300 dark:border-neutral-700">
            <SelectValue placeholder="Programming language" />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(PROGRAMMING_LANGUAGES) as (keyof typeof PROGRAMMING_LANGUAGES)[]).map(
              (item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ),
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1">
        <SyntaxHighlighter
          customStyle={{ borderRadius: '1rem', padding: '1rem', width: '100%' }}
          language={settings.language}
          style={vscDarkPlus}
          wrapLongLines
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
