<template>
    <div class="admin">
        <div class="word-line" v-for="word in words" :key="word.word" v-bind:class="{ valid: word.validated }">
            <div>
                <input v-model="word.word">
            </div>
            <div>
                <input v-model="word.tags">
            </div>

            <a class="sampler-button" @click="remove(word)">
                <font-awesome-icon  icon="trash" />
            </a>
            <a class="play-button" @click="save(word)">
                <font-awesome-icon  icon="save" />
            </a>
        </div>
        <notifications group="words" />
    </div>
</template>



<script src="./Admin.ts"></script>
<style lang="sass" src="./Admin.scss" />
