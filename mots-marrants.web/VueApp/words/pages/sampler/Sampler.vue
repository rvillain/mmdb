<template>
    <div>
        <div class="sampler">
            <div class="sampler-item" v-for="(word, index) in words" :key="index" @click="speek(word)">
                <div>{{word}}</div>
                <a @click="remove(index)"><font-awesome-icon  icon="times" /></a>
            </div>
        </div>
        <notifications group="words" />
    </div>
</template>



<script src="./Sampler.ts"></script>
<style lang="sass" src="./Sampler.scss" />
