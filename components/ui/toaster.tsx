'use client';
import { Toaster as HotToaster } from 'react-hot-toast';

export function Toaster() {
  return (
    <HotToaster
      position="bottom-right"
      toastOptions={{
        error: {
          style: {
            background: 'hsla(0, 79%, 58%, 0.6)',
            color: 'hsl(0, 0%, 100%)',
          },
        },
        style: {
          borderRadius: '0.25rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          fontSize: '16px',
          minHeight: '70px',
          minWidth: '320px',
          padding: '12px 20px',
        },
        success: {
          style: {
            background: 'hsla(145, 63%, 49%, 0.6)',
            color: 'hsl(0, 0%, 100%)',
          },
        },
      }}
    />
  );
}
