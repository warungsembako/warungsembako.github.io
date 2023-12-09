import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'

export const useProductStore = defineStore('product', {
    state: () => ({
        _products: [],
        _product: null,
        addErrors: [],
        filter: 'terbaru', // Default filter
        filterCat: 'default',
        kind: 'date',
    }),

    getters: {
        products: (state) => {
            if (state.kind == 'date') {
                if (state.filter === 'terbaru') {
                    return state._products // Mengembalikan data terbaru
                } else if (state.filter === 'terlama') {
                    return [...state._products].reverse() // Mengembalikan data terlama
                }
            } else {
                return state._products.filter(
                    (item) => item.relationships.category.id == state.filterCat || state.filterCat == 'default'
                )
            }
        },
        product: (state) => state._product,
        errors: (state) => state.addErrors,
    },

    actions: {
        getToken() {
            const user = JSON.parse(localStorage.getItem('user'))
            return user.token
        },
        async getProducts() {
            const data = await axios.get('/api/product', { headers: { Authorization: 'Bearer ' + this.getToken() } })
            this._products = data.data.data
        },
        async getProductById(id) {
            await this.getToken()
            await axios
                .get(`/api/product/${id}`, { headers: { Authorization: 'Bearer ' + this.getToken() } })
                .then((res) => {
                    this._product = res.data.data
                })
        },
        async handleAddData(data) {
            this.addErrors = []
            await this.getToken()
            try {
                await axios.post(
                    '/api/product',
                    {
                        unit_id: data.unit.id,
                        category_id: data.category.id,
                        name: data.name,
                        desc: data.desc,
                        price_buy: data.price_buy,
                        price_sell: data.price_sell,
                        qty: data.qty,
                    },
                    { headers: { Authorization: 'Bearer ' + this.getToken() } }
                )

                // Menampilkan pemberitahuan SweetAlert2 setelah berhasil
                Swal.fire({
                    icon: 'success',
                    title: 'Sukses!',
                    text: 'Data produk telah berhasil disimpan ke database.',
                })

                if (this.addErrors.length == 0) {
                    this.router.push({ name: 'data-produk' })
                }
            } catch (error) {
                if (error.response.status === 422) {
                    this.addErrors = error.response.data.errors
                } else if (error.response.status === 409) {
                    // Konflik: produk sudah ada
                    this.addErrors.product = ['Produk sudah ada dalam database.']
                }
            }
        },
        async handleUpdateData(data, id) {
            this.addErrors = []
            await this.getToken()
            try {
                await axios
                    .put(
                        `/api/product/${id}`,
                        {
                            unit_id: data.unit.id,
                            category_id: data.category.id,
                            name: data.name,
                            desc: data.desc,
                            price_buy: data.price_buy,
                            price_sell: data.price_sell,
                            qty: data.qty,
                        },
                        { headers: { Authorization: 'Bearer ' + this.getToken() } }
                    )
                    .then(this.router.push({ name: 'data-produk' }))
            } catch (error) {
                if (error.response.status === 422) {
                    this.addErrors = error.response.data.errors
                }
            }
        },
        async handleDeleteData(id) {
            await this.getToken()
            await axios
                .delete(`/api/product/${id}`, { headers: { Authorization: 'Bearer ' + this.getToken() } })
                .then(() => {
                    const productIndex = this.products.findIndex((p) => p.id === id)
                    this.products.splice(productIndex, 1)
                })
        },
        setFilter(kind, filterType) {
            this.kind = kind
            this.filter = filterType
        },
        setFilterCategory(kind, filterType) {
            this.kind = kind
            this.filterCat = filterType
        },
    },
})
