// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: ['@nuxtjs/tailwindcss', '@vesp/nuxt-fontawesome', "@nuxt/image"],
  runtimeConfig : {
    public: {
      server_url: process.env.SERVER_URL,
      server_auth_url: process.env.SERVER_AUTH_URL
    }
  },
  app: {
    head: {
      title: 'Ticketing App',
      link: [{ rel: 'icon', type: 'image/png', href: '/system.png' }]
    },
  },
  fontawesome: {
    icons: {
      solid: [
        'code',
        'box-archive', 
        'archive', 'circle-user', 'users', 
        'arrow-right-from-bracket', 
        'bars', 'xmark', 'house', 
        'clipboard-list', 'magnifying-glass', 
        'download', 'arrow-left', 
        'paper-plane', 'eye', 'eye-slash',
        'gears', 'angle-left', 'angle-right', 'angles-left', 'angles-right', 'angle-down',
        'plus','pencil', 'user', 'list', 'clock', 'spinner', 'check','key','clipboard-user',
      ],
      regular: ['comment', 'face-smile', 'calendar', 'moon','sun'],
      brands: ['twitter'],
    },
  }
})