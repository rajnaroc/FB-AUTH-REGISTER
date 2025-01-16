<template>
    <section>
        <h1 v-if="userName">Bienvenido, {{ userName }}</h1>
        <h1 v-else>cargando...</h1>
        <button @click="logout">Cerrar sesión</button>
    </section>
</template>

<script>

import { auth } from '@/db/firebase' 
import { signOut } from 'firebase/auth'

export default {
    name: 'PerfilView',
    data() {
        return {
            userName: null,
        };
    },
    mounted() {
        const currentUser = auth.currentUser;
        if (currentUser) {
            this.userName = currentUser.email;
        } else {
            this.$router.push({ name: 'register' });
        }
    },
    methods: {
        async logout() {
            try {
                await signOut(auth);
                this.$router.push({ name: 'register' });
            } catch (error) {
                console.error('Error al cerrar sesión:', error.message);
            }
        },
    },
};
</script>

<style>
/* Agrega estilos aquí si es necesario */
</style>
