import Vue from 'vue'
import App from './App'
import  './pages/code_order/components/spec/spec'
import './components/lqr-toast/index'

Vue.config.productionTip = false

App.mpType = 'app'

import '@/static/assets/iconfont.css'

import api from '@/http/request.js'
Vue.prototype.$api = api;

import Vuex from 'vuex';
Vue.use(Vuex)
import store from './store'
Vue.prototype.$store = store



const app = new Vue({
	...App
})
app.$mount()
