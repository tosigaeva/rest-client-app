import { NextResponse } from 'next/server';

import { adminAuth } from '@/lib/firebase-admin';
import { saveRequestLog } from '@/lib/history';

export async function POST(req: Request) {
  const start = Date.now();

  try {
    const { body, headers, method, query, token, url } = await req.json();

    let userId: null | string = null;
    if (token) {
      try {
        const decoded = await adminAuth.verifyIdToken(token);
        userId = decoded.uid;
      } catch (error) {
        console.warn('Invalid Firebase token', error);
      }
    }

    const requestParams = {
      body: body ? JSON.stringify(body) : undefined,
      headers,
      method,
    };
    const res = await fetch(url, requestParams);
    const latency = Date.now() - start;

    if (res.status < 200 || res.status >= 400 || [204, 205, 304].includes(res.status)) {
      return new NextResponse(null, { status: res.status });
    }
    let data;
    let isJson = false;

    try {
      data = await res.json();
      isJson = true;
    } catch {
      data = await res.text();
    }

    const requestSize = body ? new TextEncoder().encode(JSON.stringify(body)).length : 0;
    const responseSize = data
      ? new TextEncoder().encode(isJson ? JSON.stringify(data) : data).length
      : 0;

    if (userId) {
      await saveRequestLog(userId, {
        baseUrl: new URL(url).origin,
        body,
        error: res.ok ? null : res.statusText,
        headers,
        latency,
        method,
        requestSize,
        responseSize,
        status: res.status,
        url: query,
      });
    }

    return NextResponse.json({
      data,
      isJson,
      ok: res.ok,
      status: res.status,
    });
  } catch (e: unknown) {
    const latency = Date.now() - start;

    const errorMessage = e instanceof Error ? e.message : 'Unknown error';

    const { body, headers, method, token, url } = await req.json().catch(() => ({}));

    let userId: null | string = null;
    if (token) {
      try {
        const decoded = await adminAuth.verifyIdToken(token);
        userId = decoded.uid;
      } catch (error) {
        console.warn('Invalid Firebase token', error);
      }
    }

    if (userId && url && method) {
      await saveRequestLog(userId, {
        baseUrl: url ? new URL(url).origin : '',
        body,
        error: errorMessage,
        headers,
        latency,
        method,
        requestSize: body ? new TextEncoder().encode(JSON.stringify(body)).length : 0,
        responseSize: 0,
        status: 0,
        url,
      });
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
