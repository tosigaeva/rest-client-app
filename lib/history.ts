import { Timestamp } from 'firebase-admin/firestore';

import { db } from '@/lib/firebase-admin';

export interface RequestLog {
  baseUrl: string;
  id: string;
  method: string;
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
