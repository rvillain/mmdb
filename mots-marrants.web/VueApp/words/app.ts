import Vue from 'vue'
import VueRouter from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fab)
library.add(fas)
library.add(far)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.performance = true

Vue.use(VueRouter)

import store from './store/store'
import { router } from './router/router'

import App from './App.vue'

new Vue({
	store,
	router,
	render: h => h(App)
}).$mount('#app')
