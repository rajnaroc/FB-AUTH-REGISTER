<template>
    <section>
        <h2>Registro de Usuarios</h2>
        <form @submit.prevent="registerUser">
            <div>
                <label>Correo Eletronico</label>
                <input type="email" id="email" v-model="email" placeholder="Introduce tu email" required>
            </div>
            <div>
                <label>Contraseña</label>
                <input type="password" id="password" v-model="password" placeholder="Introduce una contraseña" required>
            </div>
            <button type="submit">enviar</button>
        </form>
    </section>
</template>

<script>

import { auth } from '@/db/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export default {
    name: 'RegisterView',
    data(){
        return{
            email: '',

        }
    },
    methods:{
        async registerUser(){
        try {
            // crear el usaurio en firebase Auth
            const userCredential = await  createUserWithEmailAndPassword (auth, this.email, this.password)
            const user = userCredential.user
            console.log('Usuario creado', user)
            // redirigir
            this.$router.push({name: 'perfil'})
        } catch (error) {
            console.log('Error al registro de usuarios',error.message);
            alert(error.message)
            
        }
    }
}
}
</script>
