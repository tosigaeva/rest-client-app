import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { body, headers, method, url } = await req.json();

    const res = await fetch(url, {
      body: body ? JSON.stringify(body) : undefined,
      headers,
      method,
    });

    let data;
    let isJson = false;

    try {
      data = await res.json();
      isJson = true;
    } catch {
      data = await res.text();
    }

    return NextResponse.json({
      data,
      isJson,
      ok: res.ok,
      status: res.status,
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}
