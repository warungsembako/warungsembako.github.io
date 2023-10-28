import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'

export const useSatuanStore = defineStore('satuan', {
    state: () => ({
        satuans: [],
        satuan: null,
        addErrors: [],
        filter: 'terbaru', // Default filter
    }),

    getters: {
        units: (state) => {
            if (state.filter === 'terbaru') {
                // Mengembalikan data terbaru
                return state.satuans
            } else if (state.filter === 'terlama') {
                // Mengembalikan data terlama
                return [...state.satuans].reverse()
            }
        },
        unit: (state) => state.satuan,
        errors: (state) => state.addErrors,
    },

    actions: {
        async getToken() {
            await axios.get('/sanctum/csrf-cookie')
        },
        async getSatuan() {
            await this.getToken()
            const data = await axios.get('/api/unit')
            this.satuans = data.data.data
        },
        async getSatuanById(id) {
            await this.getToken()
            await axios.get(`/api/unit/${id}`).then((res) => {
                this.satuan = res.data.data
            })
        },
        async handleAddData(data) {
            this.addErrors = []
            await this.getToken()
            try {
                await axios.post('/api/unit', {
                    unit: data.satuan,
                    desc: data.keterangan,
                })

                // Menampilkan pemberitahuan SweetAlert2 setelah berhasil
                Swal.fire({
                    icon: 'success',
                    title: 'Sukses!',
                    text: 'Data telah berhasil disimpan ke database.',
                })

                if (this.addErrors.length == 0) {
                    this.router.push({ name: 'data-satuan' })
                }
            } catch (error) {
                if (error.response.status === 422) {
                    this.addErrors = error.response.data.errors
                } else if (error.response.status === 409) {
                    // Konflik: unit sudah ada
                    this.addErrors.unit = ['Unit sudah ada dalam database.'] // Menambah pesan error baru ke dalam objek unit
                }
            }
        },
        async handleUpdateData(data, id) {
            this.addErrors = []
            await this.getToken()
            try {
                await axios
                    .put(`/api/unit/${id}`, {
                        unit: data.satuan,
                        desc: data.keterangan,
                    })
                    .then(this.router.push({ name: 'data-satuan' }))
            } catch (error) {
                if (error.response.status === 422) {
                    this.addErrors = error.response.data.errors
                }
            }
        },
        async handleDeleteData(id) {
            await this.getToken()
            try {
                await axios.get(`/api/unitDelete/${id}`).then(() => {
                    const satuanIndex = this.satuans.findIndex((e) => e.id === id)
                    this.satuans.splice(satuanIndex, 1)
                })
            } catch {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal!',
                    text: 'Data sudah memiliki relasi terhadap data lain',
                })
            }
        },
        setFilter(filterType) {
            this.filter = filterType
        },
    },
})
