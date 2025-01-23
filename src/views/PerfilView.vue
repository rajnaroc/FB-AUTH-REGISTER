<template>
    <section>
        <h1>Perfil</h1>
        <form @submit.prevent="savePerfil">
            <img :src="profile.image" alt="">
            <input type="text" v-model="profile.image" placeholder="¿Introduce la url de tu imagen?">
            <input type="text" v-model="profile.fullname" placeholder="¿Introduce el nombre completo?" required>
            <input type="text" v-model="profile.profession" placeholder="¿En que Trabajas?" required>
            <input type="number" v-model="profile.age" placeholder="¿Dinos tu edad?" required>
            <input type="text" v-model="profile.currentCity" placeholder="¿En que ciudad vives?" required>
            <input type="text" v-model="profile.company" placeholder="¿Cual es tu empresas?" required>
            <textarea v-model="profile.bio" placeholder="¿Cuenta un poco sobre ti?"></textarea>
            <h3>Motivaciones</h3>
            <div v-for="(motivacion,index) in profile.motivations" :key="index">
                <input type="text" v-model="profile.motivations[index]" placeholder="Nueva motivación">
            </div>
            <button @click.prevent="addMotivation">Añadir</button>
            <h3>Objetivos</h3>
            <div v-for="(goal,index) in profile.goals" :key="index">
                <input type="text" v-model="profile.goals[index]" placeholder="Nuevo objetivo">
            </div>
            <button @click.prevent="addGoals">Añadir objetivo</button>
            <h3>Preocupaciones</h3>
            <div v-for="(concern,index) in profile.concern" :key="index">
                <input type="text" v-model="profile.concern[index]" placeholder="Nueva preocupación">
            </div>
            <button @click.prevent="addConcerns">Añadir preocupación</button>
            <button type="submit">Actualizar perfil</button>
        </form>
        <button @click="logout">Cerrar sesión</button>
    </section>
    </template>
    
    <script>
    import { auth, db } from "@/db/firebase"
    import { signOut } from 'firebase/auth'
    import { doc, getDoc, setDoc } from "firebase/firestore";
    export default {
        name: 'PerfilView',
        data() {
            return {
                user: null,
                profile: {
                    fullname: "",
                    profession: "",
                    age: 0,
                    currentCity: "",
                    company: "",
                    bio: "",
                    image: "",
                    motivations: [],
                    goals: [],
                    concern: []
                }
            }
        },
        methods: {
            async logout() {
                await signOut(auth)
                this.$router.push('/')
            },
            async fetchProfile() {
                if (!this.user) return
                try {
                    const docRef = doc(db, "users", this.user.uid)
                    const docSnap = await getDoc(docRef)
                    if (docSnap.exists()) {
                        this.profile = { ...docSnap.data() }
                    } else {
                        console.warn("No se encontró el perfil")
                    }
                } catch (error) {
                    console.log("Error al obtener el perfil", error);
                }
            },
            async savePerfil() {
                try {
                    if (!this.user) return
                    const docRef = doc(db, "users", this.user.uid)
                    await setDoc(docRef, this.profile)
                    alert("Perfil guardado correctamente😘")
                } catch (error) {
                    console.log("Hubo un problema al guardar el perfil!😒");
                }
            },
            addMotivation() {
                this.profile.motivations.push("")
            },
            addGoals() {
                this.profile.goals.push("")
            },
            addConcerns() {
                this.profile.concern.push("")
            },
            handleAuthStateChange() {
                auth.onAuthStateChanged((user) => {
                    this.user = user
                    if (user) {
                        this.fetchProfile()
                    }
                })
            }
        },
        mounted() {
            this.user = auth.currentUser
            this.handleAuthStateChange()
        }
    }
    </script>
    
    <style>
    /* Estilos pueden ser añadidos aquí */
    </style>