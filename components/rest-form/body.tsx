'use client';
import { useState } from 'react';

export const Body = () => {
  const [body, setBody] = useState(() => '');
  return (
    <div className="body-section">
      <h3>Body</h3>
      <textarea
        onChange={(e) => setBody(e.target.value)}
        placeholder="JSON or Text body"
        value={body}
      />
    </div>
  );
};
