import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { GetterTree } from 'vuex'
import { ActionTree } from 'vuex'
import { MutationTree } from 'vuex'
import { RootState } from './state'
import { WordData } from '@/words/types/models/wordData'

import axios from 'axios'
import { SearchVM } from '../types/models/searchVM';
import { WordRate } from '../types/models/wordRate';
import { UserVM } from '../types/models/userVM';
import { StorageService } from '../services/storage.service';
import { router } from '../router/router';

Vue.use(Vuex)

function authHeaders() {
    // return authorization header with jwt token
    let user = StorageService.getUser();

    if (user && user.token) {
        return {'Authorization': 'Bearer ' + user.token};
    } else {
        return { };
    }
}

const state: RootState = {
	word: {} as WordData
}

const getters: GetterTree<RootState, RootState> = {
	character(state): WordData {
		return state.word
	}
}

const actions: ActionTree<RootState, RootState> = {
	getWordById({ commit }, id: number): Promise<boolean> {
		return new Promise((resolve, reject) => {
			axios
				.get('/api/word/' + id)
				.then(response => {
					const payload: WordData = response && response.data
					commit('SET_WORD', payload)
					resolve(true)
				})
				.catch(error => {
					reject(error)
				})
		})
	},
	
	search({ commit }, searchVM: SearchVM): Promise<WordData[]> {
		return new Promise((resolve, reject) => {
			axios
				.post('/api/word/search', searchVM)
				.then(response => {
					resolve(response.data)
				})
				.catch(error => {
					reject(error)
				})
		})
	},
	getForAdmin({ commit }): Promise<WordData[]> {
		let config = {headers: authHeaders()};
		return new Promise((resolve, reject) => {
			axios
				.get('/api/word/getForAdmin', config)
				.then(response => {
					resolve(response.data)
				})
				.catch(error => {
					reject(error)
				})
		})
	},
	add({ commit }, wordData: WordData): Promise<WordData> {
		return new Promise((resolve, reject) => {
			axios
				.post('/api/word', wordData)
				.then(response => {
					resolve(response.data)
				})
				.catch(error => {
					reject(error)
				})
		})
	},
	addToSampler({ commit }, wordData: WordData): Promise<WordData> {
		return new Promise((resolve, reject) => {
			axios
				.post('/api/word/addToSampler', wordData, {headers: authHeaders()})
				.then(response => {
					resolve(response.data)
				})
				.catch(error => {
					reject(error)
				})
		})
	},
	saveSampler({ commit }, userVM: UserVM): Promise<any> {
		return new Promise((resolve, reject) => {
			axios
				.post('/api/word/saveSampler', userVM, {headers: authHeaders()})
				.then(response => {
					resolve(response.data)
				})
				.catch(error => {
					reject(error)
				})
		})
	},
	getSampler({ commit }): Promise<any> {
		return new Promise((resolve, reject) => {
			axios
				.get('/api/word/getSampler', {headers: authHeaders()})
				.then(response => {
					resolve(response.data)
				})
				.catch(error => {
					reject(error)
				})
		})
	},
	update({commit}, word: WordData): Promise<boolean>{
		return new Promise((resolve, reject) => {
			axios.put('/api/word/'+ word.id, word, {headers: authHeaders()})
			.then(response =>{
				resolve(response.data)
			}).catch(error=>{
				reject(error)
			})
		});
	},
	delete({commit}, id: number): Promise<boolean>{
		return new Promise((resolve, reject) => {
			axios.delete('/api/word/'+ id, {headers: authHeaders()})
			.then(response =>{
				resolve(response.data)
			}).catch(error=>{
				reject(error)
			})
		});
	},
	rate({ commit }, wordRate: WordRate): Promise<WordData> {
		return new Promise((resolve, reject) => {
			axios
				.post('/api/word/rate', wordRate)
				.then(response => {
					resolve(response.data)
				})
				.catch(error => {
					reject(error)
				})
		})
	},
	login({ dispatch, commit }, user: UserVM): Promise<UserVM> {
		return new Promise((resolve, reject) => {
			axios
				.post('/api/auth/authenticate', user)
				.then(response => {
					resolve(response.data)
				})
				.catch(error => {
					reject(error)
				})
		})
	},
	register({ dispatch, commit }, user: UserVM): Promise<UserVM> {
		return new Promise((resolve, reject) => {
			axios
				.post('/api/auth/register', user)
				.then(response => {
					resolve(response.data)
				})
				.catch(error => {
					reject(error)
				})
		})
	},
	logout({ commit }) {
		localStorage.removeItem('user');
	}
}

const mutations: MutationTree<RootState> = {
	SET_WORD(state, word: WordData) {
		state.word = word
	}
}

const store: StoreOptions<RootState> = {
	state,
	getters,
	actions,
	mutations
}

axios.interceptors.response.use((response) => {return response}, error => {
	if(error.response.status === 401){
		StorageService.logout();
		router.push('/login');
		return error;
	}
})

export default new Vuex.Store<RootState>(store)
