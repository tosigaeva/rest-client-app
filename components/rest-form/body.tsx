'use client';
import { useState } from 'react';

import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

function handleSendRequest() {}

export const Body = () => {
  const [body, setBody] = useState(() => '');
  return (
    <div className="body-section">
      <h3>Body</h3>
      <Textarea
        onChange={(e) => setBody(e.target.value)}
        placeholder="JSON or Text body"
        value={body}
      />

      <Button onClick={handleSendRequest}>Send</Button>
    </div>
  );
};
