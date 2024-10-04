// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: ['@nuxtjs/tailwindcss', '@vesp/nuxt-fontawesome', "@nuxt/image"],
  runtimeConfig : {
    public: {
      server_url: process.env.SERVER_URL
    }
  },
  fontawesome: {
    icons: {
      solid: [
        'code',
        'box-archive', 
        'archive', 'circle-user', 
        'arrow-right-from-bracket', 
        'bars', 'xmark', 'house', 
        'clipboard-list', 'magnifying-glass', 
        'download', 'arrow-left', 
        'paper-plane', 'eye', 
        'gears', 'angle-left', 'angle-right', 'angles-left', 'angles-right', 'angle-down',
        'plus','pencil', 'user', 'list', 'clock', 'spinner', 'check'
      ],
      regular: ['comment', 'face-smile'],
      brands: ['twitter'],
    },
  }
})