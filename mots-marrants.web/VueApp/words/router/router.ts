import VueRouter from 'vue-router'

// Pages
import Ranking from '@/words/pages/ranking/Ranking.vue'
import Home from '@/words/pages/home/Home.vue'
import Login from '@/Words/pages/login/Login.vue'
import Register from '@/Words/pages/register/Register.vue'
import Admin from '@/Words/pages/admin/Admin.vue';
import Sampler from '@/Words/pages/sampler/Sampler.vue';
import { StorageService } from '../services/storage.service';

const routes = [
	{
		name: "home",
		path: '/',
		component: Home
	},
	{
		name: 'ranking',
		path: `/ranking`,
		component: Ranking
	},
	{
		name: 'login',
		path: `/login`,
		component: Login
	},
	{
		name: 'register',
		path: `/register`,
		component: Register
	},
	{
		name: 'admin',
		path: `/admin`,
		component: Admin
	},
	{
		name: 'sampler',
		path: `/sampler`,
		component: Sampler
	},

	// otherwise redirect to home
    { path: '*', redirect: '/' }
]

export const router = new VueRouter({
	mode: 'history',
	routes,
	linkActiveClass: 'is-active'
})

router.beforeEach((to, from, next) => {
	// redirect to login page if not logged in and trying to access a restricted page
	const publicPages = ['/register','/login', '/', 'ranking'];
	const authRequired = !publicPages.includes(to.path);
	const loggedIn = StorageService.isAuthenticated();
  
	if (authRequired && !loggedIn) {
	  return next('/login');
	}
  
	next();
  })
