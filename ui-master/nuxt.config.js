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
    middleware: 'user'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/portal.js',
    '~/plugins/screen-size.js',
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
    'vue-toastification/nuxt'
  ],

  googleAnalytics: {
    id: 'UA-208512695-1'
  },

  env: {
    baseUrl: process.env.BROWSER_BASE_URL || 'https://code-reporter.rowanberry.xyz'
  },

  axios: {
    baseURL: 'https://code-reporter.rowanberry.xyz'
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
