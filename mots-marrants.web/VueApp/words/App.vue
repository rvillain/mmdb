<template>
    <div>
        <nav>
            <ul class="menu-list">
                <li class="title">
                    <router-link :to="{ name: 'home' }">Mots marrants</router-link>
                </li>
                <li v-if="storage.isAuthenticated()">
                    <router-link :to="{ name: 'sampler' }"><font-awesome-icon icon="th-large" /> Sampler</router-link> 
                </li>
                <li v-if="storage.isAdmin()">
                    <router-link :to="{ name: 'admin' }">Admin</router-link> 
                </li>
                <li v-if="!storage.isAuthenticated()">
                    <router-link :to="{ name: 'login' }"><font-awesome-icon icon="sign-in-alt" /></router-link> 
                </li>
                <li v-if="storage.isAuthenticated()">
                    <a @click="logout()" title="Se déconnecter"><font-awesome-icon icon="sign-out-alt" /></a> 
                </li>
            </ul>
        </nav>
    
        <router-view></router-view>
        <notifications group="global" position="bottom center" /> 
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { StorageService } from './services/storage.service' 

import Notifications from 'vue-notification'
import { router } from './router/router';

Vue.use(Notifications)

@Component({
    name: 'App'
})
export default class App extends Vue { 
    storage = StorageService
    logout(){
        StorageService.logout();
        router.push('/login');
        this.$forceUpdate();
    }
}
</script>

<style lang="scss" src="./App.scss" />

