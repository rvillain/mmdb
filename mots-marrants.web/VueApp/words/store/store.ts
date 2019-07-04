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

Vue.use(Vuex)

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
				.post('/api/search', searchVM)
				.then(response => {
					resolve(response.data)
				})
				.catch(error => {
					reject(error)
				})
		})
	},
	add({ commit }, wordData: WordData): Promise<WordData[]> {
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
	rate({ commit }, wordRate: WordRate): Promise<WordData> {
		return new Promise((resolve, reject) => {
			axios
				.post('/api/rate', wordRate)
				.then(response => {
					resolve(response.data)
				})
				.catch(error => {
					reject(error)
				})
		})
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

export default new Vuex.Store<RootState>(store)
