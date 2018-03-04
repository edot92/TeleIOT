require('dotenv').config()
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ],
    script: [
      {
        src: 'https://unpkg.com/babel-polyfill/dist/polyfill.min.js'
      },
      {
        src: 'https://cdn.jsdelivr.net/npm/sweetalert'
      }
    ]
  },
  /*
  ** Global CSS
  */
  css: ['~/assets/css/main.css', '~/assets/css/app.styl'],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios', 'vuetify'],
    extractCSS: true,
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push(
          {
            enforce: 'pre',
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            exclude: /(node_modules)/
          },
          // {
          //   test: /\.js$/,
          //   loader: 'babel-loader',
          //   exclude: /node_modules/
          // },
          {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'url-loader',
            options: {
              name: '[name].[ext]?[hash]'
            }
          }
        )
      }
    }
  },
  /*
  ** Load Vuetify into the app
  */
  plugins: ['~/plugins/vuetify', '~/plugins/moment']
  /*
  ** Load Vuetify CSS globally
  */
  // css: []
}
