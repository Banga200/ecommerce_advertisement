const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
//   devServer: {
//     proxy: 'https://localhost:8888'
// },
  transpileDependencies: [
    'vuetify'
  ],

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
      enableBridge: false
    }
  }
})
