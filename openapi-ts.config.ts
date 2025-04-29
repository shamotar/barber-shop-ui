import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'https://barbershop-app.duckdns.org/api/openapi.json'
  output: 'src/api',
  plugins: [
    '@hey-api/client-fetch'
  ],
});
