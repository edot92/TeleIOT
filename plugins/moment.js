import Vue from 'vue'
// require('moment/locale/id')

// var moment = require('moment')
// Vue.use(moment)

// Vue.use(require('vue-moment'))
const moment = require('moment')
require('moment/locale/id')
Vue.use(require('vue-moment'), {
  moment
})
