import { defineConfig } from 'vite';

export default defineConfig({
  // Set to '/<repo-name>/' if deploying to a GitHub Pages project site.
  base: './',
  server: {
    // Browser-automation output lands here; watching it would reload the page mid-test.
    watch: { ignored: ['**/.playwright-mcp/**'] },
  },
  build: {
    target: 'es2022',
    cssMinify: true,
  },
});
