import { beforeEach, describe, expect, it, vi } from 'vitest';

import { generateCode } from './generate-code';
import { replaceVariables } from './replace-variables';
import { getVariables, setVariables } from './storage-variables';

vi.mock('./replace-variables', () => ({
  replaceVariables: vi.fn((input: string, vars: Record<string, string>) =>
    Object.keys(vars).reduce((str, key) => str.replace(`{{${key}}}`, vars[key]), input),
  ),
}));

describe('Storage Utilities', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('getVariables returns empty object if nothing is stored', () => {
    const result = getVariables('user1');
    expect(result).toEqual({});
  });

  it('setVariables stores values in localStorage', () => {
    const vars = { VAR1: '123', VAR2: '456' };
    setVariables('user1', vars);

    const stored = JSON.parse(localStorage.getItem('variables-user1')!);
    expect(stored).toEqual(vars);
  });

  it('getVariables retrieves previously stored values', () => {
    const vars = { VAR1: '123', VAR2: '456' };
    localStorage.setItem('variables-user1', JSON.stringify(vars));

    const result = getVariables('user1');
    expect(result).toEqual(vars);
  });
});

describe('generateCode', () => {
  const req = {
    body: '{"data":"{{value}}"}',
    headers: { Authorization: 'Bearer {{token}}' },
    method: 'POST',
    url: 'https://api.example.com/{{endpoint}}',
  };

  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem(
      'variables-testuser',
      JSON.stringify({ endpoint: 'users', token: 'abc123', value: '42' }),
    );
  });

  it('replaces variables in url, headers and body', () => {
    const code = generateCode(req, 'shell', 'curl', 'testuser');
    expect(code).toContain('https://api.example.com/users');
    expect(code).toContain('Bearer abc123');
    expect(code).toContain('42');
  });

  it('calls replaceVariables internally', () => {
    generateCode(req, 'shell', 'curl', 'testuser');
    expect(replaceVariables).toHaveBeenCalled();
  });
});
