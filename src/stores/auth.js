import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: '',
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
            const user = JSON.parse(localStorage.getItem('user'))
            if (user) {
                this.authUser = user
            }
        },
        async getUser() {
            await this.getToken()
            // const data = await axios.get('/api/user')
            // this.authUser = data.data
            this.isAuth = true
        },
        async handleLogin(data) {
            this.autErrors = []
            await this.getToken()
            try {
                const user = await axios.post('/api/auth/login', {
                    email: data.email,
                    password: data.pass,
                })
                localStorage.setItem('user', JSON.stringify(user.data))
                this.router.push('/')
                this.isAuth = true
            } catch (error) {
                if (error.response.status === 422) {
                    this.autErrors = error.response.data.errors
                }
            }
        },
        async handleLogout() {
            await axios.post('/api/auth/logout', {}, { headers: { Authorization: 'Bearer ' + this.authUser.token } })
            localStorage.clear()
            this.authUser = null
            this.isAuth = false
            this.router.push('/login')
        },
    },
})
