import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'

export const useTransactionStore = defineStore('transaction', {
    state: () => ({
        _transactions: [],
        _transaction: null,
        addErrors: [],
        filter: new Date(),
    }),

    getters: {
        transactions: (state) =>
            state._transactions.filter((item) => {
                const date = item.attributes.created_at.split('-')
                const dateFix = date[1] + '-' + date[0] + '-' + date[2]
                return new Date(dateFix).toDateString('id-ID') == new Date(state.filter).toDateString('id-ID')
            }),
        transaction: (state) => state._transaction,
        errors: (state) => state.addErrors,
    },

    actions: {
        getToken() {
            const user = JSON.parse(localStorage.getItem('user'))
            return user.token
        },
        async getTransactions() {
            await this.getToken()
            const data = await axios.get('/api/transaction', {
                headers: { Authorization: 'Bearer ' + this.getToken() },
            })
            this._transactions = data.data.data
        },
        async handleAddData(data) {
            this.addErrors = []
            await this.getToken()
            try {
                await axios
                    .post(
                        '/api/transaction',
                        {
                            product_id: data.product.id,
                            qty: data.qty,
                            total: data.qty * data.product.attributes.price_sell,
                        },
                        { headers: { Authorization: 'Bearer ' + this.getToken() } }
                    )
                    .then(() => {
                        // Menampilkan pemberitahuan SweetAlert2 setelah berhasil
                        Swal.fire({
                            icon: 'success',
                            title: 'Sukses!',
                            text: 'Transaksi berhasil disimpan.',
                        })

                        if (this.addErrors.length == 0) {
                            this.router.push({ name: 'data-riwayat-transaksi' })
                        }
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Gagal Transaksi!',
                            text: 'Jumlah yang anda masukan melebihi stock.',
                        })
                    })
            } catch (error) {
                if (error.response.status === 422) {
                    this.addErrors = error.response.data.errors
                }
            }
        },
        setFilter(dateFilter) {
            this.filter = dateFilter
        },
    },
})
