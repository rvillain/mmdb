<template>
    <div>
        <div class="no-data" v-if="!words || words.length == 0">
            Vous n'avez aucun mot dans votre sampler<br>
            <router-link :to="{ name: 'home' }" class="button">Chercher des mots</router-link>
        </div>
        <div class="sampler">
            <div class="sampler-item" v-for="(word, index) in words" :key="index" @click="speek(word)">
                <div>{{word}}</div>
                <a @click="remove($event, index)"><font-awesome-icon  icon="times" /></a>
            </div>
        </div>
        <notifications group="words" />
    </div>
</template>



<script src="./Sampler.ts"></script>
<style lang="sass" src="./Sampler.scss" />
