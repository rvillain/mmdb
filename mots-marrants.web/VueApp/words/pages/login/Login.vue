<template>
    <div>
        <form
            id="loginForm"
            @submit="checkForm"
            method="post">

            <p>
                <label for="login">Login</label>
                <input
                id="login"
                v-model="username"
                type="text"
                name="login">
            </p>

            <p>
                <label for="password">Mot de passe</label>
                <input
                id="password"
                v-model="password"
                type="password"
                name="password">
            </p>
  
            <p>
                <button
                type="submit">Se connecter</button>
            </p>

        </form>
        <notifications group="words" />
    </div>
</template>



<script src="./Login.ts"></script>
<style lang="sass" src="./Login.scss" />
