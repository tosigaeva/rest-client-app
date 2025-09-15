import { NextResponse } from 'next/server';

import { adminAuth } from '@/lib/firebase-admin';
import { saveRequestLog } from '@/lib/history';

export async function POST(req: Request) {
  try {
    const { body, headers, method, query, token, url } = await req.json();
    let userId = 'anonymous';
    if (token) {
      try {
        const decoded = await adminAuth.verifyIdToken(token);
        userId = decoded.uid;
      } catch (error) {
        console.warn('Token verification failed:', error);
      }
    }

    const start = Date.now();
    const requestParams = {
      body:
        method !== 'GET' && method !== 'DELETE' && method !== 'HEAD'
          ? JSON.stringify(body ?? {})
          : undefined,
      headers,
      method,
    };
    const res = await fetch(url, requestParams);
    const end = Date.now();

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
    const responseSize = new TextEncoder().encode(
      typeof data === 'string' ? data : JSON.stringify(data),
    ).length;
    await saveRequestLog(userId, {
      baseUrl: url,
      body,
      error: res.ok ? null : res.statusText,
      headers,
      latency: end - start,
      method,
      requestSize,
      responseSize,
      status: res.status,
      url: query,
    });

    return NextResponse.json({
      data,
      isJson,
      ok: res.ok,
      status: res.status,
    });
  } catch (e: unknown) {
    let errorMessage = 'Unknown error';
    if (e instanceof Error) {
      errorMessage = e.message;
    }

    await saveRequestLog('anonymous', {
      baseUrl: '',
      error: errorMessage,
      latency: 0,
      method: 'UNKNOWN',
      requestSize: 0,
      responseSize: 0,
      status: 0,
      url: 'unknown',
    });
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
