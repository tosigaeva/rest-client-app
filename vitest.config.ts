import react from '@vitejs/plugin-react';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  test: {
    coverage: {
      all: true,
      exclude: [
        '**/*.d.ts',
        '**/node_modules/**',
        '**/vitest.setup.ts',
        '**/components/ui/**/*.{ts,tsx}',
      ],
      include: ['**/components/**/*.{ts,tsx}', '**/utils/**/*.{ts,tsx}'],
      provider: 'v8',
      reporter: ['text', 'lcov'],
      thresholds: {
        branches: 70,
        functions: 75,
        lines: 80,
        statements: 80,
      },
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
  },
});
