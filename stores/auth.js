import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authUser: null,
        autErrors: [],
        isAuth: false,
    }),

    getters: {
        user: (state) => state.authUser,
        errors: (state) => state.autErrors,
        auth: (state) => state.isAuth,
    },

    actions: {
        async getToken() {
            await axios.get('/sanctum/csrf-cookie')
        },
        async getUser() {
            await this.getToken()
            const data = await axios.get('/api/user')
            this.authUser = data.data
            this.isAuth = true
        },
        async handleLogin(data) {
            this.autErrors = []
            await this.getToken()
            try {
                await axios.post('/login', {
                    email: data.email,
                    password: data.pass,
                })
                this.router.push('/')
                this.isAuth = true
            } catch (error) {
                if (error.response.status === 422) {
                    this.autErrors = error.response.data.errors
                }
            }
        },
        async handleLogout() {
            await axios.post('/logout')
            this.authUser = null
            this.isAuth = false
            this.router.push('/login')
        },
    },
})
