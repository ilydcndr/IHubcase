// vitest.setup.js
import '@testing-library/jest-dom'; // jest-dom matchers (if using)
import { expect } from 'vitest';

// Örnek: fetch mock'u
global.fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
