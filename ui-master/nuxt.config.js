export default {
  mode: 'universal',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Code Reporter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, height=device-height, initial-scale=1.0, target-densityDpi=device-dpi' },
      { hid: 'description', name: 'description', content: 'A better way to generate code for your reports. There are millions of GitHub repositories that are ready to help you get random code for your reports.' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: process.env.NODE_ENV === 'production'
      ? []
      : [
          {
            src: '//cdn.jsdelivr.net/npm/eruda'
          },
          {
            type: 'text/javascript',
            innerHTML: 'eruda.init();'
          }
        ]
  },

  router: {
    middleware: 'trakt'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  proxy: {
    '/api/trakt/': { target: 'https://api.trakt.tv/', pathRewrite: { '^/api/trakt/': '' } }
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/portal.js',
    '~/plugins/screen-size.js',
    { src: '~/plugins/visibility', ssr: false },
    { src: '~/plugins/vuex-persist', ssr: false },
    { src: '~/plugins/spatial-navigation', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-analytics'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    'vue-toastification/nuxt'
  ],

  googleAnalytics: {
    id: 'UA-208512695-1'
  },

  env: {
    baseUrl: process.env.BROWSER_BASE_URL || `http://localhost:${process.env.PORT}`,
    client_id: '94ff3b02fe05bde15a5ccccc0bc3505477577fc9762bd82a9dd1cf545d681739',
    client_secret: 'd598f018c26776a18c2c74ea39e6e2c9c94153472a1ae84c5bbada95bc1bdb40'
  },

  axios: {
    baseURL: `http://localhost:${process.env.PORT}`,
    proxy: true
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
