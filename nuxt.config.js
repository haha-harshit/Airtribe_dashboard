import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Airtribe_dashboard',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/vuetify'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // Simple usage
    '@nuxtjs/vuetify',

    // // With options
    // ['@nuxtjs/vuetify', { /* module options */ }]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: "AIzaSyDKrE43J8AoHFD-lLX9QnRjx49r35wp9nE",
          authDomain: "airtribe-dashboard-dev.firebaseapp.com",
          projectId: "airtribe-dashboard-dev",
          storageBucket: "airtribe-dashboard-dev.appspot.com",
          messagingSenderId: "169919849256",
          appId: "1:169919849256:web:9e899b218dba182347261d"
        },
        services: {
          // auth: true // Just as example. Can be any other service.
          firestore: true,
        }
      }
    ]
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    vendor: ['vuetify']
  }
}
