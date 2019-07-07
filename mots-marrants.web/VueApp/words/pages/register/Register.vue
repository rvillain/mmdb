<template>
    <div>
        <form
            id="registerForm" @submit="checkForm" method="post">

            <p>
                <label for="login">Choisissez un nom d'utilisateur</label>
                <input id="login" v-model="username" type="text" name="login">
            </p>

            <p>
                <label for="password">Mot de passe</label>
                <input id="password" v-model="password" type="password" name="password">
            </p>

            <p>
                <label for="confirmPassword">Confirmez votre mot de passe</label>
                <input id="confirmPassword" v-model="confirmPassword" type="password" name="confirmPassword">
            </p>
  
            <p>
                <button type="submit">S'inscrire</button>
            </p>

        </form>
        <notifications group="words" />
    </div>
</template>



<script src="./Register.ts"></script>
<style lang="sass" src="./Register.scss" />
