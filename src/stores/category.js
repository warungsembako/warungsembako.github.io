import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'

export const useCategoryStore = defineStore('category', {
    state: () => ({
        _categories: [],
        _category: null,
        addErrors: [],
        filter: 'terbaru', // Default filter
    }),

    getters: {
        categories: (state) => {
            if (state.filter === 'terbaru') {
                // Mengembalikan data terbaru
                return state._categories
            } else if (state.filter === 'terlama') {
                // Mengembalikan data terlama
                return [...state._categories].reverse()
            }
        },
        category: (state) => state._category,
        errors: (state) => state.addErrors,
    },

    actions: {
        getToken() {
            const user = JSON.parse(localStorage.getItem('user'))
            return user.token
        },
        async getCategory() {
            await this.getToken()
            const data = await axios.get('/api/category', { headers: { Authorization: 'Bearer ' + this.getToken() } })
            this._categories = data.data.data
        },
        async getCategoryById(id) {
            await this.getToken()
            await axios
                .get(`/api/category/${id}`, { headers: { Authorization: 'Bearer ' + this.getToken() } })
                .then((res) => {
                    this._category = res.data.data
                })
        },
        async handleAddData(data) {
            this.addErrors = []
            await this.getToken()
            try {
                // Pengecekan apakah kategori dengan nama yang sama sudah ada
                const existingCategory = this._categories.find((category) => category.name === data.category)

                if (existingCategory) {
                    // Menampilkan pemberitahuan SweetAlert2 jika kategori sudah ada
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Kategori sudah ada dalam database.',
                    })
                } else {
                    // Jika kategori belum ada, tambahkan ke database
                    await axios.post(
                        '/api/category',
                        {
                            category: data.category,
                        },
                        { headers: { Authorization: 'Bearer ' + this.getToken() } }
                    )

                    // Menampilkan pemberitahuan SweetAlert2 setelah berhasil
                    Swal.fire({
                        icon: 'success',
                        title: 'Sukses!',
                        text: 'Data telah berhasil disimpan ke database.',
                    })

                    if (this.addErrors.length == 0) {
                        this.router.push({ name: 'data-kategori' })
                    }
                }
            } catch (error) {
                if (error.response.status === 422) {
                    this.addErrors = error.response.data.errors
                }
            }
        },

        async handleUpdateData(data, id) {
            this.addErrors = []
            await this.getToken()
            try {
                await axios
                    .put(
                        `/api/category/${id}`,
                        {
                            category: data.category,
                        },
                        { headers: { Authorization: 'Bearer ' + this.getToken() } }
                    )
                    .then(this.router.push({ name: 'data-kategori' }))
            } catch (error) {
                if (error.response.status === 422) {
                    this.addErrors = error.response.data.errors
                }
            }
        },
        async handleDeleteData(id) {
            await this.getToken()
            await axios
                .delete(`/api/category/${id}`, { headers: { Authorization: 'Bearer ' + this.getToken() } })
                .then(() => {
                    const categoryIndex = this.categories.findIndex((p) => p.id === id)
                    this.categories.splice(categoryIndex, 1)
                })
        },
        setFilter(filterType) {
            this.filter = filterType
        },
    },
})
