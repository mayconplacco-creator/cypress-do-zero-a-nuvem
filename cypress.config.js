const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 880,

  e2e: {
    video: true,
    setupNodeEvents(on, config) {
      // eventos podem ser configurados aqui no futuro
    },
  },
})
