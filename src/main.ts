import Vue from 'vue'
// import './plugins/vuetify';
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'parse/dist/parse.min.js'
import 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css'
import 'swiper/dist/css/swiper.min.css'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import './assets/css/helper.scss'
import './assets/css/color.scss'
import './assets/css/main.scss'
import * as Parse from './services/parse'
// var jQuery = require('jquery/dist/jquery.min.js');
import { validateDirective } from './directives/index'
// import 'jquery/dist/jquery.min.js';
var Swiper = require('swiper/dist/js/swiper.min.js')

Vue.config.productionTip = false

Vue.prototype.Parse = Parse.init()

Vue.prototype.Swiper = Swiper
// Vue.prototype.jQuery = jQuery;

Vue.use({
  install: function (Vue, options) {
    // (<any>window).$ = (<any>window).jQuery = require('jquery'); // you'll have this.$jQuery anywhere in your vue project
    // (<any>window).M = require('materialize-css'); // you'll have this.$jQuery anywhere in your vue project
  }
})

Vue.directive('validate', validateDirective)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
