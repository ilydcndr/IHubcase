/// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  // diğer vite ayarların...
  test: {
    globals: true,
    environment: 'jsdom', // DOM manipülasyonu için jsdom önemli
    setupFiles: './vitest.setup.js', // varsa
    include: ['src/**/*.test.js', 'src/**/*.spec.js', '**/*.test.js'], // test dosya kalıbı
  },
});

