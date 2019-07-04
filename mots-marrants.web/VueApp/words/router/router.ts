import VueRouter from 'vue-router'

// Pages
import Ranking from '@/words/pages/ranking/Ranking.vue'
import Home from '@/words/pages/home/Home.vue'

const routePrefix = 'words'

const routes = [
	{
		name: "home",
		path: '*',
		component: Home
	},
	{
		name: 'ranking',
		path: `/${routePrefix}`,
		component: Ranking
	}
]

export const router = new VueRouter({
	mode: 'history',
	routes,
	linkActiveClass: 'is-active'
})
