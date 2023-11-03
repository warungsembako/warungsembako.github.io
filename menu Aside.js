import { mdiCash, mdiCube, mdiHistory, mdiRuler } from '@mdi/js'

export default [
    {
        to: '/data-satuan',
        label: 'Master Satuan',
        icon: mdiRuler,
    },
    {
        to: '/data-kategori',
        label: 'Master Kategori',
        icon: mdiRuler,
    },
    {
        to: '/data-produk',
        label: 'Data Produk',
        icon: mdiCube,
    },
    {
        to: '/data-transaksi',
        label: 'Transaksi',
        icon: mdiCash,
    },
    {
        to: '/data-stok',
        label: 'Data Stok',
        icon: mdiCube,
    },
    {
        to: '/data-riwayat-transaksi',
        label: 'Riwayat',
        icon: mdiHistory,
    },
]
