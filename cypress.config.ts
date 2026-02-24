import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4000',
    specPattern: 'cypress/e2e/**/*.cy.{ts,tsx}',
    supportFile: false,
    env: {
      BURGER_API_URL: 'https://norma.nomoreparties.space/api'
    },
    chromeWebSecurity: false,
    modifyObstructiveCode: false
  }
});