import { Timestamp } from 'firebase-admin/firestore';

import { db } from '@/lib/firebase-admin';

export interface RequestLog {
  baseUrl: string;
  body?: string;
  error: null | string;
  headers?: Record<string, string>;
  id: string;
  latency: number;
  method: string;
  requestSize: number;
  responseSize: number;
  status: number;
  timestamp: string;
  url: string;
  userId: string;
}

export async function getUserRequestHistory(userId: string): Promise<RequestLog[]> {
  const snapshot = await db
    .collection('requests')
    .where('userId', '==', userId)
    .orderBy('timestamp', 'desc')
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data() as Omit<RequestLog, 'id' | 'timestamp'> & { timestamp: Timestamp };

    return {
      id: doc.id,
      ...data,
      timestamp: data.timestamp.toDate().toISOString(),
    };
  });
}

export async function saveRequestLog(
  userId: string,
  log: Omit<RequestLog, 'id' | 'timestamp' | 'userId'>,
) {
  const ref = await db.collection('requests').add({
    ...log,
    timestamp: Timestamp.now(),
    userId,
  });

  return ref.id;
}
