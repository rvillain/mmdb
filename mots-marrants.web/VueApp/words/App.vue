<template>
    <div>
        <nav>
            <ul class="menu-list">
                <li class="title">
                    <router-link :to="{ name: 'home' }">Mots marrants</router-link>
                </li>
                <li>
                    <!-- <router-link :to="{ name: 'ranking' }">Classement</router-link> -->
                </li>
            </ul>
        </nav>
    
        <router-view></router-view>
        <notifications group="global" position="bottom center" /> 
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import Notifications from 'vue-notification'

Vue.use(Notifications)

@Component({
    name: 'App'
})
export default class App extends Vue { }
</script>

<style lang="scss" src="./App.scss" />
