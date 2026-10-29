const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'mochawesome',

  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true,
    charts: true,
    reportPageTitle: 'Relatório de Testes Automatizados',
    embeddedScreenshots: true,
    inlineAssets: true
  },

  e2e: {
    watchForFileChanges: false,

    setupNodeEvents(on, config) {
      return config;
    }
  }
});