<template>
    <div>
        <div class="errors" v-if="errors.length">
            <ul>
                <li v-for="(error, index) in errors" v-bind:key="index">{{ getError(error.code) }}</li>
            </ul>
        </div>
        <form
            id="registerForm" @submit="checkForm" method="post" v-if="!isLoading">

            <p>
                <label for="login">Choisissez un nom d'utilisateur</label>
                <input id="login" v-model="username" type="text" name="login" maxlength="30">
            </p>

            <p>
                <label for="password">Mot de passe</label>
                <input id="password" v-model="password" type="password" name="password" 
                v-bind:pattern="passRegex.source"
                v-bind:title="passTip"
                >
            </p>

            <p>
                <label for="confirmPassword">Confirmez votre mot de passe</label>
                <input id="confirmPassword" v-model="confirmPassword" type="password" name="confirmPassword" 
                v-bind:pattern="passRegex.source">
            </p>
  
            <p>
                <button type="submit">S'inscrire</button>
            </p>

        </form>
        <div v-else class="loading">
            Chargement...
        </div>
        <notifications group="words" />
    </div>
</template>



<script src="./Register.ts"></script>
<style lang="sass" src="./Register.scss" />
