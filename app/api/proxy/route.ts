import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { body, headers, method, url } = await req.json();

    const res = await fetch(url, {
      body: body && !['GET', 'HEAD'].includes(method) ? JSON.stringify(body) : undefined,
      headers,
      method,
    });

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

    return NextResponse.json(
      {
        data,
        isJson,
        ok: res.ok,
      },
      { status: res.status },
    );
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Unknown error' },
      { status: 502 },
    );
  }
}
